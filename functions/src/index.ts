import { onRequest } from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { initializeApp } from 'firebase-admin/app';
import conversationCardsRoutes from './routes/conversationCards';

// Initialize Firebase Admin
initializeApp();

// Create Express app
const app = express();

// Middleware
app.use(helmet());
app.use(cors({
  origin: true, // Allow all origins for now
  credentials: true
}));
app.use(express.json());

// Request logging
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.path}`, { 
    method: req.method, 
    path: req.path, 
    query: req.query 
  });
  next();
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'success',
    message: 'API is healthy',
    timestamp: new Date().toISOString(),
    environment: 'firebase-functions'
  });
});

// API routes
app.use('/v1/conversation-cards', conversationCardsRoutes);

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    status: 'error',
    message: 'Endpoint not found',
    timestamp: new Date().toISOString()
  });
});

// Error handler
app.use((error: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  logger.error('Unhandled error:', error);
  res.status(500).json({
    status: 'error',
    message: 'Internal server error',
    timestamp: new Date().toISOString()
  });
});

// Export the Express app as a Firebase Function with European region
export const api = onRequest({
  region: 'europe-west1',
  invoker: 'public' // Allow unauthenticated access
}, app);