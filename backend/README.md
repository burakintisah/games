# Backend Setup

## Environment Variables

The backend requires Firebase authentication. Here are the required environment variables:

### Development Mode
```bash
export GOOGLE_APPLICATION_CREDENTIALS="$HOME/.config/firebase/burak_intisah_gmail.com_application_default_credentials.json"
```

### Production Mode
```bash
export FIREBASE_SERVICE_ACCOUNT_KEY='{"type":"service_account",...}'
```

## Quick Start

1. Make sure you're logged into Firebase CLI:
   ```bash
   firebase login
   ```

2. Set the credentials environment variable:
   ```bash
   export GOOGLE_APPLICATION_CREDENTIALS="$HOME/.config/firebase/burak_intisah_gmail.com_application_default_credentials.json"
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

## API Endpoints

- `GET /` - Root endpoint
- `GET /api/health` - Health check
- `GET /api/firebase/test` - Firebase connection test 