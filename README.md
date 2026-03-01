# WhisperWall - MERN Social Feed Application

A modern social feed application built with the MERN stack, featuring a unique neobrutalism design aesthetic. Users can register, login, and create posts with images that are hosted via ImageKit.

![MERN Stack](https://img.shields.io/badge/MERN-Stack-4B4B4B?style=flat&logo=mongodb&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?style=flat&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-20-339933?style=flat&logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-9-47A248?style=flat&logo=mongodb)

---

## Tech Stack

### Frontend
- **React 19** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling framework
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client
- **Lucide React** - Icon library

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **JSON Web Token (JWT)** - Authentication
- **Bcryptjs** - Password hashing
- **Multer** - File upload middleware
- **ImageKit** - Image hosting and CDN

---

## File Structure

```
MERN PROJECT/
│
├── 📂 BACKEND/                    # Server-side application
│   ├── package.json               # Backend dependencies
│   ├── server.js                  # Application entry point
│   │
│   └── 📂 src/
│       ├── app.js                 # Express configuration & routes
│       │
│       ├── 📂 database/
│       │   └── db.js              # MongoDB connection setup
│       │
│       ├── 📂 middleware/
│       │   └── auth.middleware.js # JWT authentication middleware
│       │
│       ├── 📂 models/
│       │   ├── user.model.js      # User schema (username, email, password)
│       │   └── post.model.js      # Post schema (image, caption)
│       │
│       ├── 📂 routes/
│       │   ├── auth.routes.js     # /api/auth endpoints
│       │   └── post.routes.js     # /api/posts endpoints
│       │
│       ├── 📂 controllers/
│       │   └── auth.controller.js # Auth logic (register, login)
│       │
│       └── 📂 services/
│           └── storage.service.js  # ImageKit image upload service
│
├── 📂 FRONTEND/                   # Client-side application
│   ├── package.json               # Frontend dependencies
│   ├── vite.config.js             # Vite configuration
│   ├── tailwind.config.js         # Tailwind CSS configuration
│   ├── postcss.config.js          # PostCSS configuration
│   │
│   └── 📂 src/
│       ├── main.jsx               # React app entry point
│       ├── App.jsx                # Main app component with routing
│       ├── index.css              # Global styles
│       │
│       ├── 📂 pages/
│       │   ├── Home.jsx           # Main feed displaying all posts
│       │   ├── Login.jsx          # User login page
│       │   ├── CreatePost.jsx     # Page to create new post
│       │   └── AdminSetup.jsx     # Initial admin account setup
│       │
│       ├── 📂 components/
│       │   ├── Navbar.jsx         # Navigation bar with links
│       │   ├── PostCard.jsx       # Individual post display component
│       │   ├── ThemeSwitcher.jsx  # Dark/light mode toggle
│       │   └── ProtectedRoute.jsx # Route guard for auth
│       │
│       ├── 📂 context/
│       │   └── AuthContext.jsx    # Authentication state management
│       │
│       ├── 📂 theme/
│       │   └── ThemeContext.jsx  # Theme state management
│       │
│       └── 📂 services/
│           └── api.js             # Axios API client with interceptors
│
├── netlify.toml                   # Netlify deployment configuration
├── overview.md                    # Project documentation & bug reports
└── README.md                      # This file
```

---

## Project Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                         FRONTEND (React)                        │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐        │
│  │   Home   │  │   Login  │  │CreatePost│  │AdminSetup│        │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  └────┬─────┘        │
│       │             │             │             │               │
│       └─────────────┴─────────────┴─────────────┘               │
│                           │                                      │
│                    ┌──────┴──────┐                               │
│                    │  App.jsx    │  (React Router)              │
│                    └──────┬──────┘                               │
│                           │                                      │
│         ┌─────────────────┼─────────────────┐                   │
│         │                 │                 │                   │
│  ┌──────┴──────┐  ┌───────┴───────┐  ┌──────┴──────┐           │
│  │ AuthContext │  │ThemeContext   │  │  api.js     │           │
│  │ (User Auth) │  │ (Dark/Light)  │  │  (Axios)    │           │
│  └─────────────┘  └───────────────┘  └──────┬──────┘           │
└─────────────────────────────────────────────┼───────────────────┘
                                              │
                                              │ HTTP Requests
                                              │
┌─────────────────────────────────────────────┼───────────────────┐
│                         BACKEND (Express)    │                   │
│                                              ▼                   │
│  ┌─────────────────────────────────────────────────────────────┐ │
│  │                      app.js                                │ │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────────┐   │ │
│  │  │ CORS Config │  │ Auth Routes │  │  Post Routes   │   │ │
│  │  │             │  │ /api/auth   │  │  /api/posts   │   │ │
│  │  └─────────────┘  └──────┬──────┘  └───────┬────────┘   │ │
│  │                          │                  │             │ │
│  └──────────────────────────┼──────────────────┼─────────────┘ │
│                             │                  │               │
│              ┌──────────────┴───────┐  ┌───────┴────────┐     │
│              │   auth.controller.js │  │  post.routes.js │     │
│              │  (register, login)   │  │ (create, fetch)│     │
│              └───────────┬───────────┘  └───────┬────────┘     │
│                          │                      │               │
│         ┌────────────────┼─────────────────────┼───────────┐ │
│         │                │                     │            │ │
│  ┌──────┴──────┐  ┌──────┴──────┐  ┌───────────┴────────┐   │ │
│  │user.model.js│  │post.model.js│  │storage.service.js  │   │ │
│  │ (Mongoose)  │  │ (Mongoose)  │  │    (ImageKit)       │   │ │
│  └──────┬──────┘  └──────┬──────┘  └───────────┬────────┘   │ │
│         │                │                     │            │ │
│         └────────────────┴─────────────────────┘            │ │
│                          │                                  │ │
│                          ▼                                  │ │
│                   ┌──────────┐                            │ │
│                   │ MongoDB  │                            │ │
│                   │          │                            │ │
│                   └──────────┘                            │ │
│                                                             │ │
└─────────────────────────────────────────────────────────────┘ │
                                                                │
                          ┌──────────────┐                      │
                          │   ImageKit   │ ◄── Image CDN       │
                          │   (Images)   │                      │
                          └──────────────┘                      │
```

---

## Features

- **User Authentication**: Register and login with JWT-based authentication
- **Image Posts**: Create posts with images and captions
- **Image Hosting**: Images are uploaded to ImageKit for CDN delivery
- **Protected Routes**: Authenticated access to create posts
- **Dark/Light Theme**: Toggle between themes with theme persistence
- **Responsive Design**: Works on mobile and desktop
- **Neobrutalism UI**: Unique bold design aesthetic

---

## API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login user |

### Posts (Protected)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/posts` | Get all posts |
| POST | `/api/posts/create-post` | Create a new post with image |

---

## Getting Started

### Prerequisites

- Node.js (v18+)
- MongoDB (local or Atlas)
- ImageKit account (free tier)

### Environment Variables

Create a `.env` file in the `BACKEND` directory:

```env
# Backend .env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
IMAGE_KIT_PUBLIC=your_imagekit_public_key
IMAGE_KIT_PRIVATE=your_imagekit_private_key
IMAGE_KIT_ENDPOINT=your_imagekit_endpoint_url
FRONTEND_URL=http://localhost:5173
PORT=3000
```

Create a `.env` file in the `FRONTEND` directory:

```env
# Frontend .env
VITE_BACKEND_URL=http://localhost:3000
```

---

## Installation & Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd "MERN PROJECT"
```

### 2. Install Backend Dependencies

```bash
cd BACKEND
npm install
```

### 3. Install Frontend Dependencies

```bash
cd ../FRONTEND
npm install
```

---

## Running the Application

### Start the Backend Server

```bash
cd BACKEND
npm start
# or for development with nodemon
npx nodemon server.js
```

The backend will run on `http://localhost:3000`

### Start the Frontend Development Server

```bash
cd FRONTEND
npm run dev
```

The frontend will run on `http://localhost:5173`

---

## Building for Production

### Frontend Build

```bash
cd FRONTEND
npm run build
```

The built files will be in the `dist` folder.

---

## Deployment

### Backend
Deploy to platforms like:
- Render
- Railway
- Fly.io
- Heroku

### Frontend
Deploy to platforms like:
- Netlify (configured with `netlify.toml`)
- Vercel

---

## License

ISC License
