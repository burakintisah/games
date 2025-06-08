import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { db } from './firebase';

const app = express();
const PORT = process.env.PORT || 3001;
const API_VERSION = '1.0.0';

// Middleware
app.use(cors());
app.use(express.json());

// Root endpoint
app.get('/', (req, res) => {
  res.json({ 
    message: 'Games Platform Backend API',
    version: API_VERSION,
    status: 'running'
  });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development',
    version: API_VERSION,
    services: {
      firebase: db ? 'connected' : 'disconnected'
    }
  });
});

// Firebase connection test endpoint
app.get('/api/firebase/test', async (req, res) => {
  try {
    if (!db) {
      return res.status(500).json({
        status: 'error',
        message: 'Firestore is not initialized',
        timestamp: new Date().toISOString()
      });
    }

    // Test Firestore with read/write operations
    const testCollectionRef = db.collection('system-tests');
    const testDocumentRef = testCollectionRef.doc('connection-test');
    
    const testData = {
      timestamp: new Date().toISOString(),
      message: 'Connection test successful',
      environment: process.env.NODE_ENV || 'development'
    };
    
    // Write test document
    await testDocumentRef.set(testData);
    
    // Read test document back
    const testDocument = await testDocumentRef.get();
    
    res.status(200).json({
      status: 'success',
      message: 'Firebase Firestore connection verified',
      timestamp: new Date().toISOString(),
      data: {
        documentExists: testDocument.exists,
        documentData: testDocument.data()
      }
    });
  } catch (error) {
    console.error('❌ Firebase test failed:', error);
    res.status(500).json({
      status: 'error',
      message: 'Firebase connection test failed',
      timestamp: new Date().toISOString(),
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Backend server running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
  console.log(`🔥 Firebase test: http://localhost:${PORT}/api/firebase/test`);
});