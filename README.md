# SurveyJS Evaluation Tool

A simple proof of concept to evaluate the SurveyJS library with Angular frontend and Node.js backend.

## Project Structure

```
surveyJS-eval/
├── frontend/          # Angular 16 application
│   ├── src/
│   │   └── app/
│   │       ├── app.component.ts
│   │       ├── app.component.html
│   │       └── survey.service.ts
│   └── package.json
├── backend/           # Node.js Express server
│   ├── server.js
│   └── package.json
└── README.md
```

## Setup Instructions

### Backend

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. The dependencies are already installed. Start the server:
   ```bash
   npm start
   ```

   The server will run on `http://localhost:3001`

### Frontend

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. The dependencies are already installed. Start the development server:
   ```bash
   npm start
   ```

   The application will be available at `http://localhost:4200`

## Features

### Current Implementation

- **Survey Management**: Create, read, update, and delete surveys
- **Backend API**: RESTful API with CORS support for survey operations
- **Simple UI**: Clean interface to manage surveys
- **Service Integration**: Angular service for backend communication

### API Endpoints

- `GET /api/surveys` - Get all surveys
- `GET /api/surveys/:id` - Get a specific survey
- `POST /api/surveys` - Create a new survey
- `PUT /api/surveys/:id` - Update a survey
- `DELETE /api/surveys/:id` - Delete a survey
- `GET /api/health` - Health check

## Next Steps for SurveyJS Integration

1. **Install SurveyJS Creator**: Already included in frontend dependencies
   - `survey-creator-angular`
   - `survey-creator-core`

2. **Create Survey Editor Component**: Build a component using SurveyJS Creator for visual survey editing

3. **Survey Preview**: Add ability to preview and take surveys

4. **Data Persistence**: Enhance backend storage (currently uses in-memory storage for PoC)

5. **Advanced Features**:
   - Survey responses/submissions
   - Survey analytics
   - Export/import surveys
   - Conditional logic support

## Technology Stack

### Frontend
- Angular 16
- TypeScript
- RxJS (for HTTP requests)
- SurveyJS Creator (survey building library)

### Backend
- Node.js
- Express.js
- CORS (for cross-origin requests)

## Development Notes

- The backend uses in-memory storage for this PoC. Replace with database in production.
- CORS is configured to allow requests from localhost:4200
- Dates are stored as ISO strings for simplicity
