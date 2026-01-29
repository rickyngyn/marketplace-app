# Campus Marketplace
A full-stack marketplace web application using React, Node.js, Express, and PostgreSQL.

## Tech Stack

### Frontend
- React
- Tailwind CSS
- [shadcn/ui](https://ui.shadcn.com/)

### Backend
- Node.js
- Express
- PostgreSQL
- [JWT authentication](https://www.npmjs.com/package/jsonwebtoken)
- [bcrypt for password hashing](https://www.npmjs.com/package/bcrypt)

## Backend Setup
1. `cd backend`
2. `npm install`
3. .env file in backend:
  ```
  PORT=5000
  DATABASE_URL=postgresql://username:password@localhost:5432/your_db_name
  JWT_SECRET_KEY=your_secret_key
  ```
4. `mkdir uploads`

## Frontend Setup
1. `cd frontend/marketplace-app`
2. `npm install`
3. .env file in frontend:
```
VITE_API_BASE_URL=http://localhost:5000
```

## Root folder
1. `npm install`
2. `npm run dev` (Runs frontend and backend concurrently)

## Deployment Soon
