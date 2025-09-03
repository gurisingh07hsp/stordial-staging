const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const connectDB = require('./config/database');
const errorMiddleware = require('./middleware/error');


// Load environment variables
dotenv.config({ path: './config.env' });

// Create Express app
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({
  // origin: 'https://stordial-staging.vercel.app',
  origin: 'http://localhost:3000',
  credentials: true,
  methods: ['GET','POST','PUT','PATCH','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type','Authorization']
}));
app.use(cookieParser());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Routes
app.use('/api/v1/auth', require('./routes/auth'));
app.use('/api/v1/businesses', require('./routes/businesses'));
app.use('/api/v1/blogs', require('./routes/blogs'));
app.use('/api/v1/categories', require('./routes/categories'));
app.use('/api/v1/users', require('./routes/users'));
app.use('/api/v1/reviews', require('./routes/reviews'));
app.use('/api/v1/admin', require('./routes/admin'));
app.use('/api/v1/places', require('./routes/places'));
app.use('/api/v1/uploadimages', require('./routes/uploadimages'));

// Health check route
app.get('/api/v1/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Stordial API is running',
    timestamp: new Date().toISOString()
  });
});

// Error handling middleware
app.use(errorMiddleware);

app.get('/', (req, res)=>{
  res.send("welcome to api");
})
// Handle unhandled routes
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`
  });
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 Environment: ${process.env.NODE_ENV}`);
  console.log(`🔗 Health check: http://localhost:${PORT}/api/v1/health`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.log(`Error: ${err.message}`);
  console.log('Shutting down the server due to unhandled promise rejection');
  process.exit(1);
}); 