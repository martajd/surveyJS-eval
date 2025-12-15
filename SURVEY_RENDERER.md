# Survey Renderer - Display & Take Surveys

## Overview

The survey renderer allows you to display interactive surveys based on JSON schemas. Users can fill out surveys, submit responses, and see their data.

## Components Created

### 1. SurveyRendererComponent
**File:** `frontend/src/app/survey-renderer/survey-renderer.component.ts`

Responsible for:
- Converting JSON schemas to interactive SurveyJS models
- Rendering the survey form
- Capturing user responses
- Displaying completion status

### 2. Supporting Files
- **Template:** `survey-renderer.component.html` - HTML structure
- **Styles:** `survey-renderer.component.css` - Component styling with SurveyJS customizations

## How It Works

### Architecture

```
App Component
    ↓
Survey List (User selects survey)
    ↓
Survey Renderer Component
    ↓
SurveyJS Model (from JSON schema)
    ↓
Interactive Survey Form
    ↓
User Responses → Captured on Completion
```

### Component Usage

In the app component template:
```html
<app-survey-renderer [surveySchema]="selectedSurvey.schema"></app-survey-renderer>
```

The renderer accepts a `surveySchema` input and displays it as an interactive form.

## Features

### 1. Survey Rendering
- Converts JSON schema to interactive form
- Supports all SurveyJS question types:
  - Text input
  - Radio buttons
  - Checkboxes
  - Dropdowns
  - Rating scales
  - Comments
  - Multi-page surveys

### 2. Response Capture
- Captures user responses on form completion
- Displays responses in JSON format
- Shows success message with green highlight

### 3. User Actions
- **Take Survey:** Fill out the form and submit
- **View Responses:** See all captured data
- **Reset Survey:** Clear responses and retake the survey

### 4. Error Handling
- Validates schema before rendering
- Handles invalid or empty schemas gracefully
- Shows user-friendly error messages

## UI Features

### Tab Interface
Two view modes for each survey:

1. **Render Survey Tab** (Default)
   - Shows interactive form
   - Users can fill out and submit
   - Displays responses after completion

2. **View Schema Tab**
   - Shows raw JSON schema
   - Displays survey metadata (ID, created, updated dates)
   - Useful for debugging and understanding structure

### Response Display
After survey completion:
- Green highlighted success panel
- JSON representation of responses
- "Take Survey Again" button to reset

## Styling

### SurveyJS Customizations
The component includes custom CSS for:
- Input field styling (borders, focus states)
- Button styling (next, previous, submit)
- Question styling (titles, choices)
- Responsive layout

### Color Scheme
- Primary: #1976d2 (blue)
- Success: #4caf50 (green)
- Text: #333 (dark)
- Background: white/light gray

## JSON Schema Example

```json
{
  "title": "Customer Feedback",
  "description": "Please help us improve",
  "pages": [
    {
      "name": "page1",
      "elements": [
        {
          "type": "radiogroup",
          "name": "satisfaction",
          "title": "How satisfied are you?",
          "choices": ["Very", "Somewhat", "Not at all"],
          "isRequired": true
        },
        {
          "type": "comment",
          "name": "feedback",
          "title": "Additional comments",
          "rows": 5
        }
      ]
    }
  ]
}
```

## Response Format

When a survey is completed, responses are captured as:

```json
{
  "satisfaction": "Very",
  "feedback": "Great service!"
}
```

Each field name corresponds to the `name` property in the schema element.

## Implementation Details

### Component Initialization

```typescript
ngOnInit(): void {
  this.initializeSurvey();
}

private initializeSurvey(): void {
  if (!this.surveySchema) return;

  try {
    this.surveyModel = new Model(this.surveySchema);

    // Listen for completion
    this.surveyModel.onComplete.add((survey) => {
      this.responses = survey.data;
      this.hasResponded = true;
    });
  } catch (error) {
    console.error('Error initializing survey:', error);
  }
}
```

### Change Detection

The component listens for schema changes:
```typescript
ngOnChanges(): void {
  this.initializeSurvey();
}
```

When you select a different survey, the renderer automatically updates.

## Module Integration

### app.module.ts Setup

```typescript
import { SurveyModule } from 'survey-angular';

@NgModule({
  imports: [SurveyModule]
})
export class AppModule { }
```

### Styles Configuration

Added to `angular.json`:
```json
"styles": [
  "src/styles.css",
  "node_modules/survey-core/survey-core.min.css"
]
```

## Usage Flow

### 1. User Views Survey
- Clicks survey name in left panel
- "Render Survey" tab opens automatically
- Interactive form displays

### 2. User Completes Survey
- Fills out all questions
- Clicks Submit button
- Responses captured and displayed

### 3. User Reviews Responses
- See completion message
- View JSON response data
- Option to retake survey

### 4. Viewing Schema
- Click "View Schema" tab
- See raw JSON definition
- View metadata

## Advanced Features

### Multi-Page Surveys
Surveys can span multiple pages:

```json
{
  "pages": [
    {
      "name": "page1",
      "elements": [/* questions */]
    },
    {
      "name": "page2",
      "elements": [/* more questions */]
    }
  ]
}
```

Navigation buttons (Previous/Next) appear automatically.

### Conditional Logic
Support for show/hide conditions:

```json
{
  "type": "text",
  "name": "company",
  "title": "Company Name",
  "visibleIf": "{employmentType} = 'employed'"
}
```

### Validation
Built-in validation support:

```json
{
  "type": "text",
  "name": "email",
  "inputType": "email",
  "title": "Email",
  "isRequired": true,
  "validators": [
    {
      "type": "email"
    }
  ]
}
```

## Testing Your Surveys

### With the Test Survey
1. Start the application: `./start.sh`
2. Open http://localhost:4200
3. Click "Customer Satisfaction Survey" in the left panel
4. Click "Render Survey" tab
5. Fill out the form and submit
6. View your responses

### Creating New Test Surveys
Add to `backend/server.js`:

```javascript
'newId': {
  id: 'newId',
  name: 'My Survey',
  schema: {
    "title": "My Survey",
    "elements": [
      {
        "type": "text",
        "name": "question1",
        "title": "Your question"
      }
    ]
  },
  createdAt: new Date(),
  updatedAt: new Date()
}
```

## API Integration

The renderer works with your existing API:

1. **Fetch surveys:** `GET /api/surveys`
2. **Load schema:** Schema is part of survey object
3. **Save responses:** Can be added as new endpoint

## Next Steps

### Future Enhancements

1. **Response Storage**
   - Create `/api/responses` endpoint
   - Save responses to database
   - Retrieve response history

2. **Analytics**
   - Analyze response data
   - Generate reports
   - Visualize patterns

3. **Survey Builder**
   - Integrate SurveyJS Creator
   - Visual form designer
   - Drag-and-drop builder

4. **Export/Import**
   - Export survey definitions
   - Export response data
   - Import existing surveys

## Troubleshooting

### Survey Not Rendering
**Issue:** "No valid survey schema provided" message
**Solution:** Ensure schema is not empty and has valid structure

### Form Not Responding
**Issue:** Form fields don't accept input
**Solution:**
- Check browser console for errors
- Verify schema is valid JSON
- Check SurveyJS library is loaded

### Styles Not Applied
**Issue:** Survey looks plain, no styling
**Solution:**
- Verify `survey-core.min.css` is in `angular.json`
- Clear browser cache
- Rebuild: `npm run build`

### Responses Not Captured
**Issue:** "Take Survey Again" button doesn't appear
**Solution:**
- Check form validation - all required fields must be filled
- Check browser console for JavaScript errors
- Verify survey has valid completion handler

## Performance Notes

- Renderer efficiently handles large surveys
- Change detection only triggers on schema changes
- Responses stored in component (not in memory globally)
- Multiple surveys can run independently

## Browser Compatibility

Works with all modern browsers:
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers supported

## Resources

- [SurveyJS Official Docs](https://surveyjs.io)
- [Angular Documentation](https://angular.io)
- [Survey Question Types](https://surveyjs.io/form-library/documentation/question-types)
