import { initializeApp, getApps, cert, applicationDefault } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

const PROJECT_ID = 'games-123f7';

// Initialize Firebase Admin SDK
let firebaseApp;
let firestoreDatabase: FirebaseFirestore.Firestore | null = null;

try {
  // Prevent multiple initializations
  if (getApps().length === 0) {
    const isProduction = process.env.NODE_ENV === 'production';
    
    if (isProduction && process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
      // Production: Use service account credentials
      const serviceAccountCredentials = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
      firebaseApp = initializeApp({
        credential: cert(serviceAccountCredentials),
        projectId: PROJECT_ID,
      });
    } else {
      // Development: Use Application Default Credentials from Firebase CLI
      firebaseApp = initializeApp({
        credential: applicationDefault(),
        projectId: PROJECT_ID,
      });
    }
  } else {
    firebaseApp = getApps()[0];
  }

  // Initialize Firestore
  firestoreDatabase = getFirestore(firebaseApp);
  console.log(`✅ Firebase connected to project: ${PROJECT_ID}`);
  
} catch (error) {
  console.error('❌ Firebase initialization failed:', error);
  console.log('💡 Make sure you are logged in with: firebase login');
}

export { firestoreDatabase as db };
export default firebaseApp; 