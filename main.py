from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from pydantic import BaseModel
import requests
import os
from dotenv import load_dotenv

# Load biến môi trường khi chạy local
load_dotenv()

app = FastAPI()

# Mount thư mục static và templates
app.mount("/static", StaticFiles(directory="static"), name="static")
templates = Jinja2Templates(directory="templates")

# Lấy biến môi trường
OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")
MODEL = os.getenv("MODEL", "deepseek-ai/deepseek-chat")

# Schema dữ liệu gửi từ frontend
class Prompt(BaseModel):
    message: str

# Trang chủ
@app.get("/", response_class=HTMLResponse)
def get_home(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})

# API chat
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

    try:
        res = requests.post("https://openrouter.ai/api/v1/chat/completions", headers=headers, json=data)

        print("🔄 Status Code:", res.status_code)
        print("📩 Body:", res.text)

        if res.status_code == 200:
            reply = res.json()["choices"][0]["message"]["content"]
            return {"response": reply}
        else:
            return {"response": f"Lỗi từ API: {res.status_code}. Vui lòng thử lại."}

    except Exception as e:
        print("❌ Ngoại lệ:", e)
        return {"response": "Lỗi nghiêm trọng. Vui lòng thử lại."}
