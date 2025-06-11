from fastapi import FastAPI
from pydantic import BaseModel
import requests
import os
from dotenv import load_dotenv

# Load biến môi trường (chỉ dùng local)
load_dotenv()

# FastAPI khởi tạo
app = FastAPI()

# Lấy API key và model từ biến môi trường
OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")
MODEL = os.getenv("MODEL", "deepseek-chat")

# Định nghĩa schema cho request body
class Prompt(BaseModel):
    message: str

@app.post("/chat")
def chat(prompt: Prompt):
    headers = {
        "Authorization": f"Bearer {OPENROUTER_API_KEY}",
        "Content-Type": "application/json"
    }

    data = {
        "model": MODEL,
        "messages": [
            {"role": "system", "content": "Bạn là trợ lý AI thông minh."},
            {"role": "user", "content": prompt.message}
        ]
    }

    res = requests.post("https://openrouter.ai/api/v1/chat/completions", headers=headers, json=data)

    # Trích nội dung trả lời
    if res.status_code == 200:
        reply = res.json()["choices"][0]["message"]["content"]
        return {"response": reply}
    else:
        return {"error": res.text}
