# Quick Start Guide

## Project Overview

This is a proof of concept application to evaluate **SurveyJS** - a powerful JavaScript library for creating surveys, forms, and questionnaires.

- **Frontend**: Angular 16 with TypeScript
- **Backend**: Node.js with Express
- **Survey Library**: SurveyJS Creator Core & Angular

## Prerequisites

- Node.js v18.19.1 or compatible
- npm (comes with Node.js)

## Running the Application

### Option 1: Using the Start Script (Recommended)

```bash
chmod +x start.sh
./start.sh
```

This will start both servers automatically.

### Option 2: Manual Start

**Terminal 1 - Backend Server:**
```bash
cd backend
npm start
# Server runs on http://localhost:3001
```

**Terminal 2 - Frontend Application:**
```bash
cd frontend
npm start
# Application runs on http://localhost:4200
```

## First Time Setup

If you need to reinstall dependencies:

```bash
# Backend
cd backend
npm install

# Frontend
cd frontend
npm install --legacy-peer-deps
```

## What You'll See

When the application starts, you'll have:

1. **Survey List** (left panel):
   - Create new surveys
   - View all surveys
   - Delete surveys

2. **Survey Details** (right panel):
   - View survey metadata
   - See survey schema (JSON)

3. **API Connection**:
   - All operations communicate with the backend API
   - Backend stores surveys in memory (PoC)

## Backend API

The backend provides these endpoints:

```
GET    /api/surveys           - List all surveys
GET    /api/surveys/:id       - Get specific survey
POST   /api/surveys           - Create survey
PUT    /api/surveys/:id       - Update survey
DELETE /api/surveys/:id       - Delete survey
GET    /api/health            - Health check
```

## Next Steps for Evaluation

1. **Integrate SurveyJS Creator**:
   - Create a visual survey builder component
   - Allow users to design surveys with drag-and-drop

2. **Add Survey Preview**:
   - Display surveys to end users
   - Collect responses

3. **Implement Persistence**:
   - Replace in-memory storage with a database
   - Add authentication if needed

4. **Explore SurveyJS Features**:
   - Conditional logic
   - Validation rules
   - Custom themes
   - Export/import functionality

## Useful Resources

- [SurveyJS Official Site](https://surveyjs.io/)
- [SurveyJS Creator Documentation](https://surveyjs.io/survey-creator/documentation/overview)
- [SurveyJS Angular Integration](https://surveyjs.io/survey-creator/documentation/get-started-angular)
- [SurveyJS GitHub Repository](https://github.com/surveyjs/survey-creator)

## Troubleshooting

### Port Already in Use

If port 3001 or 4200 are already in use:

```bash
# Backend - use different port
PORT=3002 npm start

# Frontend - use different port
ng serve --port 4201
```

### CORS Issues

The backend is configured to accept requests from `http://localhost:4200`. If running on a different port, update the proxy configuration in `frontend/src/proxy.conf.json` or modify the backend CORS settings.

### Module Not Found Errors

```bash
cd frontend
npm install --legacy-peer-deps
```

## Project Architecture

```
surveyJS-eval/
├── backend/
│   ├── server.js          # Express server with API endpoints
│   └── package.json
├── frontend/
│   ├── src/
│   │   └── app/
│   │       ├── app.component.ts       # Main component
│   │       ├── app.component.html     # UI template
│   │       ├── survey.service.ts      # API client
│   │       └── app.module.ts          # Module configuration
│   └── package.json
├── README.md              # Full documentation
├── QUICKSTART.md          # This file
└── start.sh              # Script to start both servers
```

## Notes

- This is a **proof of concept** demonstrating basic survey management
- The backend uses **in-memory storage** (data resets on server restart)
- For production, implement proper database storage
- SurveyJS Creator is installed but not yet integrated into the UI
- The next phase would be to add the visual survey builder

---

**Ready to evaluate SurveyJS? Start the application and explore!**
