# 🤖✨ DeepSeek Chatbot

<div align="center">

![DeepSeek Chatbot](https://img.shields.io/badge/AI-DeepSeek-ff6b6b?style=for-the-badge&logo=openai&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi)
![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)
![OpenRouter](https://img.shields.io/badge/OpenRouter-4285f4?style=for-the-badge&logo=router&logoColor=white)

**🚀 Chatbot AI thông minh với giao diện đẹp mắt, powered by DeepSeek & OpenRouter**

*Trải nghiệm trò chuyện AI mượt mà như ChatGPT ngay trên máy của bạn!*

---

### 🌟 **Demo Live**
[![Demo](https://img.shields.io/badge/🔗_Live_Demo-Click_Here-success?style=for-the-badge)](https://your-demo-link.com)

</div>

## 📋 Mục lục
- [✨ Tính năng](#-tính-năng)
- [🛠️ Công nghệ](#️-công-nghệ)
- [⚡ Cài đặt nhanh](#-cài-đặt-nhanh)
- [🔧 Cấu hình](#-cấu-hình)
- [🚀 Chạy ứng dụng](#-chạy-ứng-dụng)
- [📖 API Documentation](#-api-documentation)
- [🤝 Đóng góp](#-đóng-góp)
- [📞 Liên hệ](#-liên-hệ)

---

## ✨ Tính năng

<table>
<tr>
<td width="50%">

### 🎯 **Core Features**
- 🤖 **AI Chat**: Trò chuyện thông minh với DeepSeek
- ⚡ **FastAPI**: REST API hiệu suất cao
- 🎨 **UI đẹp**: Giao diện modern, responsive
- 💬 **Real-time**: Chat trực tiếp không lag
- 📱 **Mobile-friendly**: Tương thích mọi thiết bị

</td>
<td width="50%">

### 🔥 **Advanced Features**
- 🧠 **Context Memory**: Nhớ ngữ cảnh cuộc trò chuyện
- 🌐 **Multi-language**: Hỗ trợ đa ngôn ngữ
- 📊 **Analytics**: Thống kê usage và performance
- 🔐 **Secure**: Bảo mật API key và data
- 🎛️ **Customizable**: Dễ dàng tùy chỉnh parameters

</td>
</tr>
</table>

---

## 🛠️ Công nghệ

<div align="center">

| Frontend | Backend | AI/ML | Tools |
|:--------:|:-------:|:-----:|:-----:|
| ![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white) | ![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi) | ![DeepSeek](https://img.shields.io/badge/DeepSeek-ff6b6b?style=for-the-badge&logo=openai&logoColor=white) | ![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white) |
| ![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white) | ![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54) | ![OpenRouter](https://img.shields.io/badge/OpenRouter-4285f4?style=for-the-badge&logo=router&logoColor=white) | ![VS Code](https://img.shields.io/badge/Visual%20Studio%20Code-0078d4.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white) |
| ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) | ![Uvicorn](https://img.shields.io/badge/uvicorn-499848?style=for-the-badge&logo=gunicorn&logoColor=white) | ![API](https://img.shields.io/badge/REST-API-orange?style=for-the-badge&logo=postman&logoColor=white) | ![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white) |

</div>

---

## ⚡ Cài đặt nhanh

### 📋 **Yêu cầu hệ thống**
```bash
Python 3.8+
Git
OpenRouter API Key
```

### 🔽 **Clone repository**
```bash
git clone https://github.com/vanhai1231/deepseek-chatbot.git
cd deepseek-chatbot
```

### 📦 **Cài đặt dependencies**
```bash
# Tạo virtual environment (khuyến nghị)
python -m venv venv
source venv/bin/activate  # Linux/Mac
# hoặc
venv\Scripts\activate     # Windows

# Cài đặt packages
pip install -r requirements.txt
```

---

## 🔧 Cấu hình

### 🔑 **Thiết lập API Key**

1. **Tạo file `.env`**:
```bash
cp .env.example .env
```

2. **Thêm API key của bạn**:
```env
OPENROUTER_API_KEY=your_openrouter_api_key_here
DEEPSEEK_MODEL=deepseek/deepseek-chat
PORT=8000
HOST=127.0.0.1
```

### 🎨 **Tùy chỉnh cấu hình** (tùy chọn)
```python
# config.py
CHAT_SETTINGS = {
    "temperature": 0.7,
    "max_tokens": 2048,
    "top_p": 0.9,
    "frequency_penalty": 0.1
}
```

---

## 🚀 Chạy ứng dụng

### 🖥️ **Development Mode**
```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

### 🐳 **Docker (tùy chọn)**
```bash
# Build image
docker build -t deepseek-chatbot .

# Run container
docker run -p 8000:8000 --env-file .env deepseek-chatbot
```

### 🌐 **Truy cập ứng dụng**
- **Web Interface**: http://localhost:8000
- **API Docs**: http://localhost:8000/docs
- **Health Check**: http://localhost:8000/health

---

## 📖 API Documentation

### 🔗 **Endpoints chính**

<details>
<summary><b>📝 POST /chat</b> - Gửi tin nhắn chat</summary>

```json
{
  "message": "Xin chào! Bạn có thể giúp tôi không?",
  "temperature": 0.7,
  "max_tokens": 1000
}
```

**Response:**
```json
{
  "response": "Chào bạn! Tôi sẵn sàng giúp đỡ bạn...",
  "usage": {
    "prompt_tokens": 15,
    "completion_tokens": 25,
    "total_tokens": 40
  }
}
```
</details>

<details>
<summary><b>📊 GET /health</b> - Kiểm tra trạng thái</summary>

```json
{
  "status": "healthy",
  "timestamp": "2024-01-01T00:00:00Z",
  "version": "1.0.0"
}
```
</details>

---

## 🎯 Roadmap

- [ ] 🔄 **Streaming responses** - Real-time message streaming
- [ ] 💾 **Chat history** - Lưu lịch sử trò chuyện
- [ ] 🎨 **Themes** - Multiple UI themes
- [ ] 📱 **Mobile app** - React Native companion
- [ ] 🌍 **Multi-language UI** - Interface đa ngôn ngữ
- [ ] 🔌 **Plugin system** - Extensible architecture

---

## 🤝 Đóng góp

Chúng tôi rất hoan nghênh mọi đóng góp! 

### 🔀 **Cách đóng góp:**
1. Fork repository này
2. Tạo feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Tạo Pull Request

### 🐛 **Báo lỗi:**
- Sử dụng [Issues](https://github.com/vanhai1231/deepseek-chatbot/issues) để báo cáo bug
- Cung cấp thông tin chi tiết về lỗi và cách tái tạo

---

## 📈 Stats

<div align="center">

![GitHub stars](https://img.shields.io/github/stars/vanhai1231/deepseek-chatbot?style=social)
![GitHub forks](https://img.shields.io/github/forks/vanhai1231/deepseek-chatbot?style=social)
![GitHub issues](https://img.shields.io/github/issues/vanhai1231/deepseek-chatbot)
![GitHub license](https://img.shields.io/github/license/vanhai1231/deepseek-chatbot)

</div>

---

## 📞 Liên hệ

<div align="center">

### 👨‍💻 **Tác giả: Van Hai**

[![GitHub](https://img.shields.io/badge/GitHub-vanhai1231-181717?style=for-the-badge&logo=github)](https://github.com/vanhai1231)
[![Email](https://img.shields.io/badge/Email-vanhai11203@gmail.com-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:vanhai11203@gmail.com)

---

### 💖 **Hỗ trợ dự án**

Nếu bạn thấy dự án này hữu ích, hãy cho một ⭐ để động viên tác giả!

[![Buy Me A Coffee](https://img.shields.io/badge/Buy%20Me%20A%20Coffee-FFDD00?style=for-the-badge&logo=buy-me-a-coffee&logoColor=black)](https://www.buymeacoffee.com/vanhai1231)

</div>

---

<div align="center">

**📝 License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<sub>🚀 **Made with ❤️ in Vietnam** 🇻🇳</sub>

</div>