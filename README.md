# Expense Tracker

Full-stack Expense Tracker built with React (frontend), Node/Express (backend), and MySQL (database).

Features
- Record, categorize, and track daily expenses
- Interactive dashboard with monthly and category-wise summaries
- RESTful APIs for CRUD operations on expenses
- Optimized MySQL queries to generate financial summaries

Getting started

Prerequisites: Node 18+, npm, Docker (optional)

1. Backend

cd backend
cp .env.example .env
npm install
npm run dev

2. Frontend

cd frontend
npm install
npm start

3. Using Docker (optional)

docker-compose up --build

API
- GET /api/expenses
- POST /api/expenses
- GET /api/expenses/:id
- PUT /api/expenses/:id
- DELETE /api/expenses/:id
- GET /api/summary/monthly?year=2026&month=7
- GET /api/summary/categories?year=2026&month=7

Database
- See backend/migrations/schema.sql for table structure and indexes

