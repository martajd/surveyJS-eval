# JSON Schema Storage & Management

## Current Storage Location

All survey JSON schemas are currently stored **in-memory** in the backend.

**File:** `backend/server.js` (lines 13-62)

### Storage Structure

```javascript
const surveys = {
  '1': {
    id: '1',
    name: 'Survey Name',
    schema: { /* JSON Schema here */ },
    createdAt: new Date(),
    updatedAt: new Date()
  }
}
```

## Test Schema Included

A sample "Customer Satisfaction Survey" has been pre-loaded with the following schema:

```json
{
  "title": "Customer Feedback",
  "description": "Please help us improve our service",
  "pages": [
    {
      "name": "page1",
      "elements": [
        {
          "type": "radiogroup",
          "name": "satisfaction",
          "title": "How satisfied are you with our service?",
          "choices": [
            "Very Satisfied",
            "Satisfied",
            "Neutral",
            "Dissatisfied",
            "Very Dissatisfied"
          ],
          "isRequired": true
        },
        {
          "type": "checkbox",
          "name": "improvements",
          "title": "What areas need improvement? (Select all that apply)",
          "choices": [
            "Customer Service",
            "Product Quality",
            "Pricing",
            "Delivery Time",
            "Website Experience"
          ]
        },
        {
          "type": "comment",
          "name": "feedback",
          "title": "Additional Comments",
          "placeholder": "Please share your thoughts..."
        }
      ]
    }
  ]
}
```

## How to View the Schema

1. **Start the application:**
   ```bash
   ./start.sh
   ```

2. **Open browser:** http://localhost:4200

3. **View the test survey:**
   - The "Customer Satisfaction Survey" will appear in the left panel
   - Click on it to see the JSON schema in the right panel
   - Schema displays formatted as JSON

## How to Add More Test Schemas

### Method 1: Add to Backend (Persistent During Session)

Edit `backend/server.js` and add more surveys to the `surveys` object:

```javascript
const surveys = {
  '1': { /* existing survey */ },
  '2': {
    id: '2',
    name: 'Product Feedback Survey',
    schema: {
      "title": "Product Feedback",
      "elements": [
        {
          "type": "rating",
          "name": "rating",
          "title": "Rate this product",
          "rateCount": 5
        }
      ]
    },
    createdAt: new Date(),
    updatedAt: new Date()
  }
};
```

Then restart the backend:
```bash
cd backend
npm start
```

### Method 2: Create via API (Using curl)

```bash
curl -X POST http://localhost:3001/api/surveys \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Product Feedback",
    "schema": {
      "title": "Product Feedback",
      "elements": [
        {
          "type": "rating",
          "name": "rating",
          "title": "Rate this product",
          "rateCount": 5
        }
      ]
    }
  }'
```

### Method 3: Create via UI

1. Type survey name in the input field
2. Click "Create Survey"
3. The survey is created with an **empty schema** `{}`
4. Update via API using the PUT endpoint to add schema

## API Endpoints for Schemas

### Get all surveys with schemas
```bash
curl http://localhost:3001/api/surveys
```

### Get specific survey schema
```bash
curl http://localhost:3001/api/surveys/{id}
```

### Create survey with schema
```bash
curl -X POST http://localhost:3001/api/surveys \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Survey Name",
    "schema": { /* your schema */ }
  }'
```

### Update survey schema
```bash
curl -X PUT http://localhost:3001/api/surveys/{id} \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Updated Name",
    "schema": { /* updated schema */ }
  }'
```

## SurveyJS Schema Format

The schemas follow SurveyJS format. Common element types:

```json
{
  "title": "Survey Title",
  "description": "Survey description",
  "pages": [
    {
      "name": "page1",
      "elements": [
        {
          "type": "text",
          "name": "field_name",
          "title": "Question Title",
          "isRequired": true
        },
        {
          "type": "radiogroup",
          "name": "choice_field",
          "title": "Choose one",
          "choices": ["Option 1", "Option 2", "Option 3"]
        },
        {
          "type": "checkbox",
          "name": "multi_choice",
          "title": "Choose multiple",
          "choices": ["Option 1", "Option 2", "Option 3"]
        },
        {
          "type": "rating",
          "name": "rating_field",
          "title": "Rate your experience",
          "rateCount": 5
        },
        {
          "type": "dropdown",
          "name": "dropdown_field",
          "title": "Select from dropdown",
          "choices": ["Option 1", "Option 2", "Option 3"]
        },
        {
          "type": "comment",
          "name": "comment_field",
          "title": "Enter your comments",
          "rows": 5
        }
      ]
    }
  ]
}
```

## Data Persistence Notes

**Current Behavior:**
- Schemas are stored **in-memory only**
- Data is **lost when server restarts**
- Perfect for PoC and testing

**For Production:**
- Replace in-memory storage with database (MongoDB, PostgreSQL, etc.)
- Add file-based persistence (JSON files)
- Implement proper backup/recovery

## Next Steps

1. **Integrate SurveyJS Creator:**
   - Use visual survey builder instead of manual JSON
   - Real-time schema generation

2. **Add Database Storage:**
   - Store schemas persistently
   - Version control for schemas

3. **Export/Import:**
   - Export schemas as JSON files
   - Import existing schemas

4. **Schema Validation:**
   - Validate schemas before saving
   - Schema templates/presets

## Example: Adding a Custom Schema

To add a "Registration Form" survey with custom schema:

1. Edit `backend/server.js`
2. Add to surveys object:

```javascript
'3': {
  id: '3',
  name: 'Registration Form',
  schema: {
    "title": "User Registration",
    "description": "Please complete your profile",
    "elements": [
      {
        "type": "text",
        "name": "firstName",
        "title": "First Name",
        "isRequired": true
      },
      {
        "type": "text",
        "name": "email",
        "title": "Email Address",
        "inputType": "email",
        "isRequired": true
      },
      {
        "type": "radiogroup",
        "name": "accountType",
        "title": "Account Type",
        "choices": ["Personal", "Business"],
        "isRequired": true
      }
    ]
  },
  createdAt: new Date(),
  updatedAt: new Date()
}
```

3. Restart backend and the new survey will be available
