# Mini LinkedIn-like Community Platform

A full-stack social media platform built with React, Node.js, Express, and MongoDB. Features user authentication, post creation and management, user profiles, and real-time interactions.

## Features

### User Authentication
- Register/Login with email and password
- JWT-based authentication
- Profile management with name, email, and bio

### Public Post Feed
- Create and view text-only posts
- Home feed displaying all posts with author information and timestamps
- Like and comment on posts
- Delete your own posts

### Profile Pages
- View user profiles with their information and posts
- Edit your own profile (name and bio)
- User-specific post feeds

## Tech Stack

### Frontend
- **React 18** with TypeScript
- **React Router DOM** for navigation
- **React Hook Form** for form handling
- **Axios** for API calls
- **TailwindCSS** for styling

### Backend
- **Node.js** with **Express.js**
- **MongoDB** with **Mongoose** ODM
- **JWT** for authentication
- **bcryptjs** for password hashing
- **express-validator** for input validation

## Project Structure

```
mini-linkedin-platform/
├── frontend/                 # React frontend
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── context/        # React context for state management
│   │   ├── services/       # API service functions
│   │   ├── types/          # TypeScript type definitions
│   │   └── utils/          # Utility functions
│   └── package.json
├── backend/                 # Express.js backend
│   ├── models/             # MongoDB models
│   ├── routes/             # API routes
│   ├── middleware/         # Custom middleware
│   ├── server.js           # Main server file
│   └── package.json
└── package.json            # Root package.json for monorepo scripts
```

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account (or local MongoDB installation)
- Git

### 1. Clone the Repository
```bash
git clone <repository-url>
cd mini-linkedin-platform
```

### 2. Install Dependencies
```bash
# Install root dependencies
npm install

# Install all project dependencies
npm run install:all
```

### 3. Environment Configuration

#### Backend Configuration
Create a `.env` file in the `backend` directory:

```env
PORT=5000
MONGODB_URI=mongodb+srv://your-username:your-password@cluster.mongodb.net/mini-linkedin?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-jwt-key-here-make-it-long-and-random
NODE_ENV=development
```

Replace the MongoDB URI with your actual MongoDB connection string from MongoDB Atlas.

#### Frontend Configuration
Create a `.env` file in the `frontend` directory:

```env
REACT_APP_API_URL=http://localhost:5000/api
```

### 4. Start Development Servers

#### Option 1: Start both servers simultaneously
```bash
npm run dev
```

#### Option 2: Start servers separately
```bash
# Terminal 1 - Backend
npm run backend:dev

# Terminal 2 - Frontend
npm run frontend:dev
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## Deployment

### Backend Deployment (Render)

1. **Create a Render Account**: Sign up at [render.com](https://render.com)

2. **Create a Web Service**:
   - Connect your GitHub repository
   - Choose "backend" as the root directory
   - Set build command: `npm install`
   - Set start command: `npm start`

3. **Environment Variables**:
   Add these environment variables in Render:
   ```
   MONGODB_URI=your-mongodb-atlas-connection-string
   JWT_SECRET=your-jwt-secret-key
   NODE_ENV=production
   ```

4. **Deploy**: Render will automatically deploy your backend

### Frontend Deployment (Vercel)

1. **Create a Vercel Account**: Sign up at [vercel.com](https://vercel.com)

2. **Deploy from GitHub**:
   - Import your GitHub repository
   - Set framework preset to "Create React App"
   - Set root directory to "frontend"

3. **Environment Variables**:
   Add this environment variable in Vercel:
   ```
   REACT_APP_API_URL=https://your-backend-url.onrender.com/api
   ```

4. **Deploy**: Vercel will automatically deploy your frontend

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Posts
- `GET /api/posts` - Get all posts
- `POST /api/posts` - Create a new post
- `GET /api/posts/:id` - Get a specific post
- `DELETE /api/posts/:id` - Delete a post
- `PUT /api/posts/:id/like` - Like/unlike a post
- `POST /api/posts/:id/comment` - Add a comment to a post

### Users
- `GET /api/users/:id` - Get user profile
- `GET /api/users/:id/posts` - Get user's posts
- `PUT /api/users/profile` - Update user profile
- `GET /api/users` - Search users

## Development Scripts

### Root Level
- `npm run dev` - Start both frontend and backend in development mode
- `npm run install:all` - Install dependencies for both frontend and backend

### Backend
- `npm run backend:dev` - Start backend in development mode
- `npm run backend:install` - Install backend dependencies

### Frontend
- `npm run frontend:dev` - Start frontend in development mode
- `npm run frontend:install` - Install frontend dependencies

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b add-user-notifications`
3. Make your changes and commit: `git commit -m 'Add user notification system'`
4. Push to the branch: `git push origin add-user-notifications`
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.