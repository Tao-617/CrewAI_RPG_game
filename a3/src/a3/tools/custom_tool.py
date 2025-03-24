from crewai.tools import BaseTool
from pydantic import BaseModel, Field
from typing import Type, Dict
import os

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


# ===================== 2️⃣ 文件修改工具 =====================
class FileModifyToolInput(BaseModel):
    """修改文件内容"""
    file_path: str = Field(..., description="要修改的文件路径")
    old_text: str = Field(..., description="要替换的旧文本")
    new_text: str = Field(..., description="替换为的新文本")

class FileModifyTool(BaseTool):
    name: str = "File Modify Tool"
    description: str = "修改文件内容，将指定的文本替换为新文本"
    args_schema: Type[BaseModel] = FileModifyToolInput

    def _run(self, file_path: str, old_text: str, new_text: str) -> str:
        """修改文件内容"""
        try:
            with open(file_path, "r", encoding="utf-8") as file:
                content = file.read()

            modified_content = content.replace(old_text, new_text)

            with open(file_path, "w", encoding="utf-8") as file:
                file.write(modified_content)

            return f"✅ 已成功替换 '{old_text}' 为 '{new_text}' 在 {file_path}"
        except FileNotFoundError:
            return f"❌ 错误：文件 {file_path} 未找到"
        except Exception as e:
            return f"❌ 错误：无法修改 {file_path}，错误信息：{str(e)}"


# ===================== 3️⃣ 文件写入工具 =====================
class FileWriteToolInput(BaseModel):
    """写入文件内容"""
    file_path: str = Field(..., description="要写入的文件路径")
    content: str = Field(..., description="要写入的文本内容")
    overwrite: bool = Field(False, description="是否覆盖已有文件")

class FileWriteTool(BaseTool):
    name: str = "File Write Tool"
    description: str = "向文件写入内容，可选择是否覆盖"
    args_schema: Type[BaseModel] = FileWriteToolInput

    def _run(self, file_path: str, content: str, overwrite: bool = False) -> str:
        """写入文件内容"""
        mode = "w" if overwrite else "a"  # 'w' 为覆盖，'a' 为追加
        try:
            with open(file_path, mode, encoding="utf-8") as file:
                file.write(content + "\n")
            action = "覆盖" if overwrite else "追加"
            return f"✅ 已成功{action}内容到 {file_path}"
        except Exception as e:
            return f"❌ 错误：无法写入 {file_path}，错误信息：{str(e)}"


# ===================== 4️⃣ 文件批量替换工具 =====================
class FileBatchReplaceToolInput(BaseModel):
    """批量修改文件内容"""
    file_path: str = Field(..., description="要修改的文件路径")
    replacements: Dict[str, str] = Field(..., description="替换字典 {旧文本: 新文本}")

class FileBatchReplaceTool(BaseTool):
    name: str = "File Batch Replace Tool"
    description: str = "批量替换文件内容中的多个文本"
    args_schema: Type[BaseModel] = FileBatchReplaceToolInput

    def _run(self, file_path: str, replacements: dict) -> str:
        """批量修改文件内容"""
        try:
            with open(file_path, "r", encoding="utf-8") as file:
                content = file.read()

            for old_text, new_text in replacements.items():
                content = content.replace(old_text, new_text)

            with open(file_path, "w", encoding="utf-8") as file:
                file.write(content)

            return f"✅ 已成功在 {file_path} 批量替换文本"
        except FileNotFoundError:
            return f"❌ 错误：文件 {file_path} 未找到"
        except Exception as e:
            return f"❌ 错误：无法修改 {file_path}，错误信息：{str(e)}"

