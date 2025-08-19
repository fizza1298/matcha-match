# MatchaMatch

Discover the perfect matcha experience near you.

**Demo:** https://matcha-match-eight.vercel.app  
**API:** https://matcha-match.onrender.com/api/places/?lat=-33.8688&lng=151.2093  
**Repo:** https://github.com/fizza1298/matcha-match

## Stack
- Frontend: React + Vite + Tailwind (Vercel)
- Backend: Django + DRF + Gunicorn (Render)
- Extras: django-cors-headers, Google Maps Places API

## Deploy
Frontend: Vercel → Framework “Vite”, Output `dist`, `VITE_API_BASE_URL=https://matcha-match.onrender.com/api`  
Backend: Render → `pip install -r requirements.txt`, `gunicorn backend.wsgi`
