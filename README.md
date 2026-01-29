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
  PORT=3000
  JWT_SECRET_KEY=your_secret_key
  PGUSER=your_username
  PGPASSWORD=your_password
  PGHOST=localhost
  PGPORT=5432
  PGDATABASE=marketplace
  ```
4. `mkdir uploads`

## Frontend Setup
1. `cd frontend/marketplace-app`
2. `npm install`
3. .env file in frontend:
```
VITE_API_BASE_URL=http://localhost:3000
```

## Database Setup
1. Run the setup.sql script in PostgreSQL 

## Root folder
1. `npm install`
2. `npm run dev` (Runs frontend and backend concurrently)

## Images
<img width="640" height="480" alt="Screenshot 2026-01-29 162113" src="https://github.com/user-attachments/assets/5c3a3890-2538-4207-8334-400f1f4aaa69" />
<img width="640" height="480" alt="Screenshot 2026-01-29 162105" src="https://github.com/user-attachments/assets/4aad47a4-9899-482c-995b-968d4afddb11" />
<img width="640" height="480" alt="Screenshot 2026-01-29 162053" src="https://github.com/user-attachments/assets/42aa0435-cfb5-496a-8d4e-0868e616da69" />

## Deployment Soon
