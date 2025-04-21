from crewai.tools import BaseTool
from pydantic import BaseModel, Field
from rembg import remove
from PIL import Image
from typing import Type, Dict
import os, re, time, shutil
import openai
import requests
from typing import Optional

# ===================== 1️⃣ 文件读取工具 =====================
class FileReadToolInput(BaseModel):
    """输入文件路径以读取内容"""
    file_path: str = Field(..., description="要读取的文件路径")

class FileReadTool(BaseTool):
    name: str = "File Read Tool"
    description: str = "读取指定路径的文件内容"
    args_schema: Type[BaseModel] = FileReadToolInput

    def _run(self, file_path: str) -> str:
        """读取文件内容"""
        try:
            with open(file_path, "r", encoding="utf-8") as file:
                return file.read()
        except FileNotFoundError:
            return f"❌ 错误：文件 {file_path} 未找到"
        except Exception as e:
            return f"❌ 错误：无法读取 {file_path}，错误信息：{str(e)}"

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