// script.js - Enhanced chatbot functionality
const chatMessages = document.getElementById('chatMessages');
const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendButton');
const typingIndicator = document.getElementById('typingIndicator');

// Chat history storage
let chatHistory = [];

// Configuration
const CONFIG = {
    maxMessages: 100,
    typingDelay: 1000,
    animationDelay: 300
};

// Utility functions
function getCurrentTime() {
    return new Date().toLocaleTimeString('vi-VN', { 
        hour: '2-digit', 
        minute: '2-digit' 
    });
}

function formatMessage(text) {
    // Basic markdown-like formatting
    return text
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/`(.*?)`/g, '<code>$1</code>')
        .replace(/\n/g, '<br>');
}

function addMessage(content, isUser = false, options = {}) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
    
    const formattedContent = formatMessage(content);
    
    messageDiv.innerHTML = `
        <div class="message-content">${formattedContent}</div>
        <div class="message-time">${getCurrentTime()}</div>
    `;
    
    // Add to chat history
    chatHistory.push({
        content: content,
        isUser: isUser,
        timestamp: new Date().toISOString()
    });
    
    // Limit chat history
    if (chatHistory.length > CONFIG.maxMessages) {
        chatHistory = chatHistory.slice(-CONFIG.maxMessages);
    }
    
    chatMessages.appendChild(messageDiv);
    
    // Smooth scroll to bottom
    setTimeout(() => {
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 100);
    
    // Remove welcome message if exists
    const welcomeMessage = chatMessages.querySelector('.welcome-message');
    if (welcomeMessage) {
        welcomeMessage.style.animation = 'fadeOut 0.5s ease-out';
        setTimeout(() => welcomeMessage.remove(), 500);
    }
    
    // Auto-resize chat if needed
    adjustChatHeight();
}

function showTypingIndicator() {
    typingIndicator.style.display = 'block';
    chatMessages.appendChild(typingIndicator);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function hideTypingIndicator() {
    typingIndicator.style.display = 'none';
}

function setInputState(disabled) {
    sendButton.disabled = disabled;
    messageInput.disabled = disabled;
    
    if (disabled) {
        sendButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
    } else {
        sendButton.innerHTML = '<i class="fas fa-paper-plane"></i>';
    }
}

function adjustChatHeight() {
    // Auto-adjust chat container height on mobile
    if (window.innerWidth <= 768) {
        const chatContainer = document.querySelector('.chat-container');
        chatContainer.style.height = '100vh';
    }
}

async function sendMessage() {
    const message = messageInput.value.trim();
    if (!message || sendButton.disabled) return;

    // Add user message
    addMessage(message, true);
    messageInput.value = '';
    
    // Set loading state
    setInputState(true);
    showTypingIndicator();

    try {
        const response = await fetch('/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                message: message,
                history: chatHistory.slice(-10) // Send last 10 messages for context
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        
        // Hide typing indicator
        hideTypingIndicator();
        
        if (data.response) {
            // Simulate realistic typing delay
            setTimeout(() => {
                addMessage(data.response);
            }, CONFIG.typingDelay);
        } else if (data.error) {
            addMessage(`❌ Lỗi: ${data.error}`);
        } else {
            addMessage('❌ Phản hồi không hợp lệ từ server');
        }
    } catch (error) {
        hideTypingIndicator();
        console.error('Chat error:', error);
        
        let errorMessage = '🔌 Không thể kết nối đến server. ';
        
        if (error.name === 'TypeError') {
            errorMessage += 'Vui lòng kiểm tra kết nối mạng!';
        } else if (error.message.includes('500')) {
            errorMessage += 'Server đang gặp sự cố, vui lòng thử lại sau!';
        } else {
            errorMessage += 'Vui lòng thử lại sau!';
        }
        
        addMessage(errorMessage);
    } finally {
        setInputState(false);
        messageInput.focus();
    }
}

// Keyboard shortcuts
function handleKeyPress(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
    } else if (e.key === 'Enter' && e.shiftKey) {
        // Allow new line with Shift+Enter
        return true;
    }
}

// Auto-resize textarea
function autoResizeInput() {
    messageInput.style.height = 'auto';
    messageInput.style.height = Math.min(messageInput.scrollHeight, 120) + 'px';
}

// Clear chat function
function clearChat() {
    if (confirm('Bạn có chắc muốn xóa toàn bộ cuộc trò chuyện?')) {
        chatHistory = [];
        chatMessages.innerHTML = `
            <div class="welcome-message">
                <i class="fas fa-robot"></i>
                <p>Cuộc trò chuyện đã được xóa!<br>Hãy bắt đầu cuộc trò chuyện mới! 😊</p>
            </div>
        `;
    }
}

// Export chat function
function exportChat() {
    const chatData = {
        messages: chatHistory,
        exportDate: new Date().toISOString(),
        totalMessages: chatHistory.length
    };
    
    const blob = new Blob([JSON.stringify(chatData, null, 2)], { 
        type: 'application/json' 
    });
    
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `chat-export-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// Event listeners
sendButton.addEventListener('click', sendMessage);
messageInput.addEventListener('keypress', handleKeyPress);
messageInput.addEventListener('input', autoResizeInput);

// Window resize handler
window.addEventListener('resize', adjustChatHeight);

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    messageInput.focus();
    adjustChatHeight();
    
    // Add welcome tips after delay
    setTimeout(() => {
        if (chatMessages.querySelector('.welcome-message') && chatHistory.length === 0) {
            setTimeout(() => {
                if (chatHistory.length === 0) {
                    addMessage('💡 <strong>Gợi ý:</strong> Bạn có thể hỏi tôi về:<br>• Lập trình & công nghệ<br>• Toán học & khoa học<br>• Viết văn & dịch thuật<br>• Và nhiều chủ đề khác!');
                }
            }, 3000);
        }
    }, 5000);
});

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeOut {
        from { opacity: 1; transform: translateY(0); }
        to { opacity: 0; transform: translateY(-20px); }
    }
    
    .message-content code {
        background: rgba(0, 0, 0, 0.1);
        padding: 2px 6px;
        border-radius: 4px;
        font-family: 'Courier New', monospace;
    }
    
    .message-content strong {
        font-weight: 600;
    }
    
    .message-content em {
        font-style: italic;
    }
`;
document.head.appendChild(style);