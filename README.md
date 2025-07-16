# Advanced MERN Authentication

A full-stack authentication system built with the MERN stack, featuring advanced security, email verification, password reset, and a modern React frontend.





## Backend

**Features**

- User registration with email verification
- Secure login with JWT and HTTP-only cookies
- Password hashing with bcrypt
- Forgot password and password reset via email
- Welcome email on successful verification
- Logout (cookie clearing)
- Token-based authentication
- Role-based access control (structure in place)
- MongoDB for persistent storage


**Tech Stack**
- Node.js
- Express.js
- MongoDB & Mongoose
- JWT (JSON Web Tokens)
- bcryptjs
- Mailtrap (for email testing)
- dotenv
- morgan, cors, cookie-parser

**Folder Structure**

- `config/`: Database connection logic
- `controllers/`: Business logic for authentication and user actions
- `models/`: User schema with password hashing and methods
- `routes/`: API endpoints for auth (signup, login, verify, reset)
- `utils/`: JWT/cookie helpers
- `Email/`: Email sending utilities


## Frontend
**Features**
- Modern React UI with styled-components
- Signup, Login, Email Verification, Forgot Password, and Reset Password pages
- Password strength meter
- Toast notifications for user feedback
- React Query for API state management
- Responsive and accessible forms


**Tech stack**


- React
- Vite
- styled-components
- React Router
- React Query
- Axios
- react-hot-toast
- react-icons
- react-verification-input

**Folder Structure**

- `components/`: UI pieces (forms, pattern background, etc.)
- `pages/`: Signup, Login, Verification, Home, Forgot/Reset Password
- `utils/`: Axios instance for API calls
- `App.jsx`, `main.jsx`: Entry points and routing setup




---

## Environment Variables

| Variable Name      | Description                                 | Example Value                                 |
|--------------------|---------------------------------------------|-----------------------------------------------|
| `PORT`             | Port for backend server                     | `3000`                                        |
| `MONGO_URI`        | MongoDB connection string (with `<db_password>` placeholder) | `mongodb+srv://user:<db_password>@cluster.mongodb.net/db` |
| `MONGO_PASSWORD`   | Password for MongoDB user                   | `your_mongo_password`                         |
| `JWT_SECRET`       | Secret key for JWT signing                  | `supersecretkey`                              |
| `CLIENT_URL`       | URL of the frontend app (for email links)   | `http://localhost:5173`                       |
| `MAILTRAP_TOKEN`   | Mailtrap API token for sending emails       | `your_mailtrap_token`                         |

> **Note:**  
> - Place these variables in a `.env` file in the `backend/` directory.
> - The frontend does not require environment variables by default, but if you use a custom API URL, you may add a `VITE_API_URL` variable in a `.env` file in the `frontend/` directory.



## Setup Guide

 **1. Clone the Repository**

```bash
git clone <repo-url>
cd mern-advanced-auth/advanced-auth
```

**2. Setup the Backend**

```bash
cd backend
cp .env.example .env   # (create .env manually if .env.example is missing, see above)
npm install
npm start
```

- The backend will run on `http://localhost:3000` by default.

 **3. Setup the Frontend**

Open a new terminal window/tab:

```bash
cd frontend
npm install
npm run dev
```

- The frontend will run on `http://localhost:5173` by default.

