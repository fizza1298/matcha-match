# 🍵 MatchaMatch - AI-Powered Matcha Café Finder

**🏆 2nd Place Winner | OpenxAI Global AI Accelerator 2025**  
**🎥 [Watch the Live Demo](https://www.google.com/search?q=https://www.youtube.com/watch%3Fv%3Dp_Va9aGfPpY)**

MatchaMatch is an intelligent full-stack application that helps users find their perfect matcha café using natural language queries, AI-powered recommendations, and real-time sentiment analysis. Instead of rigid search filters, users can describe their mood, preferences, and needs in plain English, and our AI-orchestration layer finds the perfect match.

## ✨ Key Features

* **🤖 AI-Powered Search:** Natural language processing to understand complex user intent (e.g., "I need a quiet spot with good lighting to study for my USYD finals").
* **🗺️ Google Maps Integration:** Seamlessly fetches real-time location data and café details using the Google Maps Places API.
* **💬 Intelligent Chat Interface:** A conversational AI assistant that provides personalized recommendations based on real-time sentiment.
* **❤️ Social Engagement:** Full favorites system and community review platform to save and rate matcha spots.
* **📱 Modern Tech Stack:** A responsive, high-performance interface built with **React (TypeScript)** and a **Django REST Framework** backend.

## 🧠 Technical Implementation

### **AI & Sentiment Analysis**

* **Ollama Integration:** Utilizes local LLM processing for high-speed, privacy-focused natural language understanding.
* **Sentiment Tracking:** Analyzes user queries to detect emotional context and adjust recommendations dynamically.

### **Architecture**

* **Backend:** Django 4.2 with REST API, SQLite development database, and Google Maps SDK integration.
* **Frontend:** React 18, Vite, and Tailwind CSS for a professional, mobile-first UI.
* **Security:** Environment-based credential management (dotenv) for API key protection.

## 🌐 Deployment Status & Infrastructure Note

> **Note on Live Demo:** The live version currently hosted on Vercel serves as a **Frontend UI/UX showcase**. Due to Google Cloud Platform billing restrictions and the computational requirements of the Ollama LLM, the full **AI-powered backend** and **Google Maps API integrations** are configured to run in a **local development environment** only.

To experience the full end-to-end functionality (AI recommendations + Real-time Maps), please follow the **Quick Start** guide below to run the Django backend and Ollama locally.

## 🚀 Quick Start

### **Prerequisites**

* Python 3.9+
* Node.js 18+
* [Ollama](https://ollama.ai/) installed and running locally

### **One-Command Setup**

1. **Clone and Enter**
```bash
git clone <your-repo-url>
cd matcha-match
```

2. **Local AI Engine (Required for Backend)**
* Ensure **Ollama** is running locally.
* Pull the required model: `ollama pull llama2` (or your preferred model).

3. **Backend Setup (Django REST Framework)**
```bash
python3 -m venv .venv
source .venv/bin/activate  # Windows: .venv\Scripts\activate
pip install -r requirements.txt
python manage.py runserver
```

4. **Frontend Setup (React + Vite)**
```bash
npm install
npm run dev
```

## 🎨 User Flow

1. **Query:** User types: "I want a peaceful café for studying."
2. **Analyze:** AI extracts key intents: *Quiet*, *Study-friendly*, *Matcha*.
3. **Fetch:** System queries Google Maps API for local cafés.
4. **Rank:** Sentiment-aware algorithms match the best results.
5. **Display:** Map highlights locations with AI-generated insights.

## 🔧 Environment Configuration

Create a `.env` file in the root directory to manage your keys:

```env
GOOGLE_MAPS_API_KEY=your_key_here
SECRET_KEY=your_django_key_here
DEBUG=True
```

## 📞 Contact & Support

Developed by **Fizza Fatima** Bachelor of Advanced Computing (Cybersecurity) | University of Sydney

**Email:** thefizzafatima@gmail.com

---

*Built for the OpenxAI Global AI Accelerator 2025 - Awarded 2nd Place Overall.*
