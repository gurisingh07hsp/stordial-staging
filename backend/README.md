# Stordial Backend API

A comprehensive backend API for the Stordial local business directory platform.

## 🚀 Features

- **User Authentication**: Register, login, logout with JWT tokens
- **Business Management**: CRUD operations for business listings
- **Search & Filter**: Location-based and category-based business search
- **Admin Panel**: Admin-only routes for managing users and businesses
- **Reviews System**: Business reviews and ratings (coming soon)
- **File Upload**: Image upload support with Cloudinary integration

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud)
- Cloudinary account (for image uploads)

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   - Copy `config.env.example` to `config.env`
   - Update the environment variables:
     ```env
     PORT=5000
     MONGODB_URI=mongodb://localhost:27017/stordial
     JWT_SECRET=your-super-secret-jwt-key
     CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
     CLOUDINARY_API_KEY=your-cloudinary-api-key
     CLOUDINARY_API_SECRET=your-cloudinary-api-secret
     NODE_ENV=development
     ```

4. **Start the server**
   ```bash
   # Development
   npm run dev
   
   # Production
   npm start
   ```

## 📚 API Endpoints

### Authentication
- `POST /api/v1/auth/register` - Register new user
- `POST /api/v1/auth/login` - Login user
- `GET /api/v1/auth/logout` - Logout user
- `GET /api/v1/auth/me` - Get user profile
- `PUT /api/v1/auth/me/update` - Update user profile

### Businesses
- `GET /api/v1/businesses` - Get all businesses (with filters)
- `GET /api/v1/businesses/featured` - Get featured businesses
- `GET /api/v1/businesses/:id` - Get single business
- `POST /api/v1/businesses/new` - Create new business
- `PUT /api/v1/businesses/:id` - Update business
- `DELETE /api/v1/businesses/:id` - Delete business
- `GET /api/v1/businesses/:location/:category` - Get businesses by location and category

### Categories
- `GET /api/v1/categories` - Get all categories

### Admin (Protected)
- `GET /api/v1/admin/stats` - Get admin dashboard stats
- `GET /api/v1/admin/users` - Get all users
- `PUT /api/v1/businesses/admin/featured/:id` - Toggle featured status
- `PUT /api/v1/businesses/admin/verified/:id` - Toggle verified status

### Health Check
- `GET /api/v1/health` - API health check

## 🔧 Query Parameters

### Business Search
- `location` - Filter by city/location
- `category` - Filter by business category
- `search` - Search in business name, description, or services
- `featured` - Filter featured businesses (true/false)
- `verified` - Filter verified businesses (true/false)

## 🛡️ Authentication

Protected routes require a valid JWT token in cookies. The token is automatically set when users login.

## 📊 Database Models

### User
- Basic info (name, email, phone)
- Role-based access (user, business_owner, admin)
- Password encryption with bcrypt

### Business
- Complete business information
- Location data with coordinates
- Operating hours
- Images and logo
- Menu system for restaurants
- Featured and verified flags

### Review (Coming Soon)
- User reviews and ratings
- Image support
- Helpful votes system

## 🚀 Deployment

1. **Environment Variables**: Set all required environment variables
2. **Database**: Ensure MongoDB is running and accessible
3. **Port**: Default port is 5000, can be changed via PORT env var
4. **CORS**: Configured for frontend integration

## 🔍 Error Handling

The API includes comprehensive error handling:
- Validation errors
- Authentication errors
- Database errors
- File upload errors
- Custom error messages

## 📝 License

This project is licensed under the ISC License. 