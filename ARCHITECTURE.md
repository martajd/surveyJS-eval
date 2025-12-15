# System Architecture - Complete Overview

## High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    WEB BROWSER (Port 4200)                      │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │                    Angular Application                     │  │
│  │                                                            │  │
│  │  ┌──────────────────────────────────────────────────────┐ │  │
│  │  │              App Component                           │ │  │
│  │  │  ┌──────────────┐  ┌────────────────────────────┐   │ │  │
│  │  │  │ Survey List  │  │   Detail Panel (Tabs)     │   │ │  │
│  │  │  │              │  │  ┌──────────────────────┐ │   │ │  │
│  │  │  │ • Customer   │  │  │ Render Survey  │View │ │   │ │  │
│  │  │  │ • Product    │  │  │ (Selected Tab)│Schema│ │   │ │  │
│  │  │  │ • [Add New]  │  │  └──────────────────────┘ │   │ │  │
│  │  │  └──────────────┘  │           │               │   │ │  │
│  │  │       (Click)      │           │               │   │ │  │
│  │  │         │          │     ┌─────▼──────┐       │   │ │  │
│  │  │         └─────────►│     │ Renderer   │       │   │ │  │
│  │  │                    │     │ Component  │       │   │ │  │
│  │  │                    │     └─────┬──────┘       │   │ │  │
│  │  │                    │           │              │   │ │  │
│  │  │                    └───────────┼──────────────┘   │ │  │
│  │  └────────────────────────────────┼────────────────┘ │  │
│  └───────────────────────────────────┼─────────────────┘  │
│                                      │                     │
│                    ┌─────────────────▼──────────────────┐  │
│                    │  SurveyJS Library (survey-core)   │  │
│                    │  • Model initialization           │  │
│                    │  • Form rendering                 │  │
│                    │  • Response capture               │  │
│                    └──────────────────────────────────┘  │
│                                                           │
└─────────────────────────────────────────────────────────────┘
                             │
                   ┌─────────▼──────────┐
                   │   HTTP Requests    │ (CORS enabled)
                   │   Port 3000-3001   │
                   └─────────┬──────────┘
                             │
┌─────────────────────────────▼──────────────────────────────────┐
│              Node.js Server (Port 3001)                        │
│  ┌────────────────────────────────────────────────────────┐   │
│  │              Express Application                        │   │
│  │                                                         │   │
│  │  ┌─────────────────────────────────────────────────┐   │   │
│  │  │          API Routes / Endpoints                 │   │   │
│  │  │                                                 │   │   │
│  │  │  GET    /api/surveys           ───────┐        │   │   │
│  │  │  GET    /api/surveys/:id           │        │   │   │
│  │  │  POST   /api/surveys            │        │   │   │
│  │  │  PUT    /api/surveys/:id        │        │   │   │
│  │  │  DELETE /api/surveys/:id        │        │   │   │
│  │  │  GET    /api/health             │        │   │   │
│  │  └─────────────────────────────────┼────────────┘   │
│  │                                    │                 │
│  │  ┌─────────────────────────────────▼───────────┐   │
│  │  │   In-Memory Storage (surveys object)        │   │
│  │  │                                             │   │
│  │  │  {                                          │   │
│  │  │    '1': {                                   │   │
│  │  │      id, name, schema, createdAt, updatedAt│   │
│  │  │    },                                       │   │
│  │  │    '2': { ... },                           │   │
│  │  │    ...                                      │   │
│  │  │  }                                          │   │
│  │  │                                             │   │
│  │  │  NOTE: Data resets on server restart       │   │
│  │  │        (For PoC only)                      │   │
│  │  └─────────────────────────────────────────────┘   │
│  │                                                     │
│  └─────────────────────────────────────────────────────┘
│                                                         │
│  Middleware Stack:                                      │
│  • CORS (Cross-Origin Resource Sharing)               │
│  • JSON body parser                                    │
│  • Error handling                                      │
│  └─────────────────────────────────────────────────────┘
│                                                         │
└─────────────────────────────────────────────────────────┘
```

## Component Hierarchy

```
app.module (NgModule)
    │
    ├── Declarations
    │   ├── AppComponent
    │   └── SurveyRendererComponent
    │
    ├── Imports
    │   ├── BrowserModule
    │   ├── AppRoutingModule
    │   ├── HttpClientModule
    │   ├── FormsModule
    │   └── SurveyModule ◄── FROM survey-angular
    │
    └── Providers
        └── [Services]


AppComponent (Root)
    │
    ├── Properties
    │   ├── title: string
    │   ├── surveys: Survey[]
    │   ├── selectedSurvey: Survey | null
    │   ├── newSurveyName: string
    │   └── viewMode: 'render' | 'schema'
    │
    ├── Injected Services
    │   └── SurveyService (HTTP client)
    │
    └── Template Structure
        │
        ├── Header
        │   └── Title + Create form
        │
        ├── Main Content (Two Column Layout)
        │   │
        │   ├── LEFT: Survey List Panel
        │   │   ├── *ngFor (iterate surveys)
        │   │   ├── Click handler (selectSurvey)
        │   │   └── Delete button (deleteSurvey)
        │   │
        │   └── RIGHT: Detail Panel
        │       ├── [*ngIf] selectedSurvey
        │       ├── Tab Interface
        │       │   ├── Tab 1: "Render Survey"
        │       │   │   └── <app-survey-renderer>
        │       │   │       └── SurveyRendererComponent
        │       │   │
        │       │   └── Tab 2: "View Schema"
        │       │       └── [JSON display + metadata]
        │       │
        │       └── [*ngIf] !selectedSurvey
        │           └── "Select a survey..." message


SurveyRendererComponent
    │
    ├── @Input Properties
    │   └── surveySchema: any
    │
    ├── Internal Properties
    │   ├── surveyModel: Model | null
    │   ├── responses: any
    │   └── hasResponded: boolean
    │
    ├── Lifecycle Hooks
    │   ├── ngOnInit()
    │   │   └── Call initializeSurvey()
    │   │
    │   └── ngOnChanges()
    │       └── Call initializeSurvey()
    │
    ├── Methods
    │   ├── initializeSurvey()
    │   │   ├── Validate schema
    │   │   ├── new Model(surveySchema)
    │   │   └── Register completion listener
    │   │
    │   └── resetSurvey()
    │       └── Clear responses & reinitialize
    │
    ├── Template
    │   ├── [*ngIf] surveyModel
    │   │   ├── <survey [model]="surveyModel">
    │   │   │   └── SurveyJS component (renders form)
    │   │   │
    │   │   └── [*ngIf] !hasResponded (show form)
    │   │       [*ngIf] hasResponded (show responses)
    │   │
    │   └── [*ngIf] !surveyModel
    │       └── "No valid schema" message
    │
    └── Event Handlers
        └── surveyModel.onComplete.add(callback)
            └── Capture responses


SurveyService
    │
    ├── Properties
    │   └── apiUrl: string = 'http://localhost:3001/api/surveys'
    │
    ├── Methods
    │   ├── getSurveys(): Observable<Survey[]>
    │   ├── getSurvey(id: string): Observable<Survey>
    │   ├── createSurvey(survey): Observable<Survey>
    │   ├── updateSurvey(id, survey): Observable<Survey>
    │   └── deleteSurvey(id): Observable<any>
    │
    └── HTTP Client (Injected)
        └── HttpClient (from @angular/common/http)
```

## Data Flow Diagrams

### 1. Loading Surveys

```
Component Loads
    │
    ├─► ngOnInit()
    │   └─► loadSurveys()
    │       └─► surveyService.getSurveys()
    │           └─► HTTP GET /api/surveys
    │               └─► Backend returns surveys[]
    │                   └─► Subscribe.next(data)
    │                       └─► this.surveys = data
    │                           └─► *ngFor renders list
```

### 2. Displaying Survey Form

```
User clicks survey in list
    │
    ├─► selectSurvey(survey)
    │   └─► this.selectedSurvey = survey
    │       └─► Template detects change
    │           └─► Detail panel shows
    │
    ├─► "Render Survey" tab active (default)
    │   └─► <app-survey-renderer [surveySchema]="selectedSurvey.schema">
    │       │
    │       ├─► Input property receives schema
    │       ├─► ngOnInit() or ngOnChanges() triggered
    │       ├─► initializeSurvey() called
    │       ├─► new Model(surveySchema) created
    │       └─► <survey [model]="surveyModel">
    │           └─► SurveyJS renders interactive form
    │               └─► HTML form elements displayed
```

### 3. Submitting Survey Response

```
User fills form and clicks Submit
    │
    ├─► surveyModel.onComplete event fires
    │   └─► Callback function triggered
    │       ├─► responses = survey.data
    │       ├─► hasResponded = true
    │       └─► Template re-renders
    │
    └─► Response display shows
        ├─► Success message (green panel)
        ├─► JSON responses displayed
        └─► "Take Survey Again" button enabled
            └─► Click resets form
```

## Request/Response Cycle

### API Request Example

```
Angular Component
    │
    ├─► surveyService.getSurveys()
    │   └─► this.http.get<Survey[]>(apiUrl)
    │       └─► HTTP Request
    │
        GET /api/surveys HTTP/1.1
        Host: localhost:3001
        Accept: application/json
        Origin: http://localhost:4200
        │
        ├─► CORS Check (server allows origin)
        │
        └─► Express Routes
            └─► app.get('/api/surveys', (req, res) => {
                  return res.json(Object.values(surveys))
                })
                    │
                    └─► Response
                        HTTP/1.1 200 OK
                        Content-Type: application/json
                        Access-Control-Allow-Origin: *

                        [
                          {
                            "id": "1",
                            "name": "Customer Satisfaction Survey",
                            "schema": { ... },
                            "createdAt": "2025-12-15T10:00:00Z",
                            "updatedAt": "2025-12-15T10:00:00Z"
                          },
                          ...
                        ]
                            │
                            └─► Angular receives response
                                └─► Subscribe callbacks triggered
                                    └─► this.surveys = data
                                        └─► Template updates (*ngFor)
```

## State Management Flow

```
AppComponent State
├─ surveys: Survey[]
│   └─ Loaded from /api/surveys
│   └─ Updated on create/delete
│
├─ selectedSurvey: Survey | null
│   └─ Set by selectSurvey(survey)
│   └─ Passed to SurveyRendererComponent
│   └─ Cleared on delete
│
├─ newSurveyName: string
│   └─ Two-way bound to input [(ngModel)]
│   └─ Cleared after create
│
└─ viewMode: 'render' | 'schema'
   └─ Set by tab click handlers
   └─ Controls which template section shows


SurveyRendererComponent State
├─ @Input surveySchema: any
│   └─ Receives from parent component
│   └─ Triggers ngOnChanges on update
│
├─ surveyModel: Model | null
│   └─ Created from surveySchema
│   └─ Owns form state
│
├─ responses: any
│   └─ Set on form completion
│   └─ Displayed to user
│
└─ hasResponded: boolean
   └─ Controls view mode (form vs responses)
   └─ Toggle with resetSurvey()
```

## File Structure

```
surveyJS-eval/
│
├── backend/
│   ├── server.js                    # Express server
│   ├── package.json                 # Dependencies
│   └── node_modules/                # Installed packages
│
├── frontend/
│   ├── angular.json                 # Angular CLI config
│   ├── tsconfig.json               # TypeScript config
│   ├── package.json                # Dependencies
│   │
│   └── src/
│       ├── main.ts                 # Entry point
│       ├── index.html              # HTML host
│       ├── styles.css              # Global styles
│       │
│       └── app/
│           ├── app.module.ts                    # Root module
│           ├── app.component.ts                 # Root component
│           ├── app.component.html               # Root template
│           ├── app.component.css                # Root styles
│           ├── app-routing.module.ts            # Routing
│           ├── survey.service.ts                # HTTP service
│           │
│           └── survey-renderer/                 # NEW
│               ├── survey-renderer.component.ts
│               ├── survey-renderer.component.html
│               └── survey-renderer.component.css
│
├── Documentation
│   ├── README.md                  # Main docs
│   ├── QUICKSTART.md             # Quick start
│   ├── PROJECT_SETUP.md          # Setup details
│   ├── GETTING_STARTED.txt       # Getting started
│   ├── SCHEMA_STORAGE.md         # Schema docs
│   ├── SURVEY_RENDERER.md        # Renderer docs
│   ├── RENDERER_SETUP.md         # Renderer setup
│   ├── RENDERER_SUMMARY.txt      # Renderer summary
│   ├── ARCHITECTURE.md           # This file
│   └── FILES_CREATED.txt         # File manifest
│
└── start.sh                       # Start script
```

## Technology Stack Summary

```
Frontend Stack:
├── Angular 16.2
│   ├── Core (@angular/core)
│   ├── Forms (@angular/forms)
│   ├── HTTP Client (@angular/common/http)
│   └── Routing (@angular/router)
├── TypeScript 5.1
├── RxJS 7.8
├── SurveyJS
│   ├── survey-core 2.5.0
│   └── survey-angular 1.9.25
└── CSS (custom styling)

Backend Stack:
├── Node.js (v18.19.1+)
├── Express 5.2.1
├── CORS 2.8.5
├── Body-Parser 2.2.1
└── JSON format

Communication:
├── HTTP REST API
├── JSON data format
├── CORS headers
└── In-memory storage (PoC)
```

## Deployment Architecture (Future)

```
┌─────────────────────────────────────────────┐
│           CDN / Static Server                │
│  (Serves Angular production build)           │
│                                              │
│  frontend/dist/                              │
│  ├── index.html                              │
│  ├── bundle.js                               │
│  ├── styles.css                              │
│  └── [compiled assets]                       │
└──────────────────┬───────────────────────────┘
                   │ (HTTP)
        ┌──────────▼──────────┐
        │    Web Server        │
        │  (e.g., Nginx)       │
        └──────────┬───────────┘
                   │
        ┌──────────▼──────────┐
        │   API Gateway        │
        │  (Optional)          │
        └──────────┬───────────┘
                   │ (HTTP/HTTPS)
        ┌──────────▼──────────────┐
        │  Backend Server         │
        │  Node.js + Express      │
        └──────────┬──────────────┘
                   │
        ┌──────────▼──────────────┐
        │     Database            │
        │  (MongoDB/PostgreSQL)   │
        └─────────────────────────┘
```

## Summary

This architecture demonstrates:
- **Separation of Concerns**: Frontend (Angular) and Backend (Node.js) are independent
- **Component-Based**: UI built with reusable Angular components
- **Service Layer**: HTTP communication abstracted in services
- **Reactive Forms**: SurveyJS library handles dynamic form rendering
- **REST API**: Standard HTTP methods for CRUD operations
- **Scalability**: Ready for database integration and microservices
