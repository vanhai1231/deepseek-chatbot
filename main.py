from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from pydantic import BaseModel
import requests
import os
from dotenv import load_dotenv

load_dotenv()
app = FastAPI()

# Mount thư mục
app.mount("/static", StaticFiles(directory="static"), name="static")
templates = Jinja2Templates(directory="templates")

OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")
MODEL = os.getenv("MODEL", "deepseek-chat")

class Prompt(BaseModel):
    message: str

@app.get("/", response_class=HTMLResponse)
def get_home(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})

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
    if res.status_code == 200:
        reply = res.json()["choices"][0]["message"]["content"]
        return {"response": reply}
    else:
        return {"error": res.text}
