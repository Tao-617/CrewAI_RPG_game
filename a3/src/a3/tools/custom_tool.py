from crewai.tools import BaseTool
from pydantic import BaseModel, Field
from rembg import remove
from PIL import Image
from typing import Type, Dict
import os, re, time, shutil
import openai
import requests
from typing import Optional


class GenerateImageTool(BaseTool):
    name: str = "Generate Image"
    description: str = "Generate an image from a visual prompt using DALL·E"

    def _run(self, prompt: str, output_dir: str = "game_data/images", filename: Optional[str] = None) -> str:
        import os, re, openai, requests

        openai.api_key = os.getenv("OPENAI_API_KEY")

        response = openai.images.generate(
            model="dall-e-3",
            prompt=prompt,
            n=1,
            size="1024x1024"
        )
        image_url = response.data[0].url
        image_data = requests.get(image_url).content

        if not filename:
            safe_name = re.sub(r'\W+', '_', prompt[:40]).strip("_").lower()
            filename = f"{safe_name}.png"

        os.makedirs(output_dir, exist_ok=True)
        filepath = os.path.join(output_dir, filename)
        with open(filepath, "wb") as f:
            f.write(image_data)

        return f"✅ Image saved to: {filepath}"


class FileWriteTool(BaseTool):
    name: str = "File Write Tool"
    description: str = "Save a given text content into a specified file path."

    def _run(self, content: str, output_path: str) -> str:
        import os

        # 确保目录存在
        os.makedirs(os.path.dirname(output_path), exist_ok=True)

        # 写入文件
        with open(output_path, 'w', encoding='utf-8') as file:
            file.write(content)

        return f"✅ Successfully saved to: {output_path}"

class FileInsertOrReplaceTool(BaseTool):
    name: str = "File Insert or Replace Tool"
    description: str = "Insert or replace a specific function in a file with new content."

    def _run(self, function_name: str, new_function_content: str, output_path: str) -> str:
        import os
        import re

        # 确保目录存在
        os.makedirs(os.path.dirname(output_path), exist_ok=True)

        if not os.path.exists(output_path):
            return f"❌ Error: File {output_path} does not exist."

        with open(output_path, 'r', encoding='utf-8') as file:
            original_code = file.read()

        # 正则定位目标函数
        pattern = rf"(def {function_name}\b[\s\S]*?)(?=\ndef |\Z)"
        matches = re.search(pattern, original_code)

        if matches:
            # 找到并替换
            new_code = re.sub(pattern, new_function_content.strip() + "\n", original_code)
            action = "replaced"
        else:
            # 没找到就直接追加到末尾
            new_code = original_code.strip() + "\n\n" + new_function_content.strip()
            action = "inserted"

        # 写回文件
        with open(output_path, 'w', encoding='utf-8') as file:
            file.write(new_code)

        return f"✅ Successfully {action} function '{function_name}' in: {output_path}"

class RemoveBGTool(BaseTool):
    name: str = Field(default="Remove Background Tool", description="Remove backgrounds from character images")
    description: str = "Remove backgrounds from generated character images and save them"
    
    def _run(self, image_path: str, output_dir: str = "game_data/images/characters_rmv") -> str:
        if not os.path.exists(image_path):
            return f"❌ File not found: {image_path}"
        
        os.makedirs(output_dir, exist_ok=True)
        try:
            img = Image.open(image_path).convert("RGBA")
            out = remove(img)
            output_path = os.path.join(output_dir, os.path.basename(image_path))
            out.save(output_path)
            return f"✅ Removed background: {image_path} → {output_path}"
        except Exception as e:
            return f"❌ Failed to remove background from {image_path}: {e}"


class CodeCleanArgs(BaseModel):
    raw_output: str

class CleanCodeOutputTool(BaseTool):
    name: str = "Clean Code Output"
    description: str = "Removes markdown and explanation, returns raw JS code"
    args_schema: type = CodeCleanArgs  # ✅ 添加类型注解！！

    def _run(self, raw_output: str) -> str:
        # 提取 ```js ``` 或 ```javascript ```之间的内容
        import re
        match = re.search(r"```(?:javascript|js)?\n(.*?)```", raw_output, re.DOTALL)
        return match.group(1).strip() if match else raw_output.strip()