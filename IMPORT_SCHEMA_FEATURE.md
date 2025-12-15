# Import Schema Feature

## Overview

The Import Schema feature allows users to import SurveyJS JSON schemas directly into the application. This is perfect for:

- Importing schemas created by the SurveyJS Survey Creator
- Sharing survey schemas between different instances
- Bulk importing predefined surveys
- Testing with complex survey definitions

## How to Use

### 1. Click the Import Button

In the top control bar, you'll see a green **"📥 Import Schema"** button next to the Create Survey button.

### 2. Fill in the Form

In the import dialog:

**Survey Name:** Enter a name for this survey
**JSON Schema:** Paste or edit your SurveyJS JSON schema

### 3. Submit

Click **"✓ Import Survey"** or press **Ctrl+Enter** to import.

The survey will be created immediately and automatically selected with the Render Survey tab open.

## Schema Validation

The import feature validates that your JSON:

✓ Is valid JSON syntax
✓ Contains either "pages" or "elements" property
✓ Follows SurveyJS schema format

Invalid schemas will show clear error messages.

## Example Schemas

### Basic Survey

```json
{
  "title": "Simple Survey",
  "elements": [
    {
      "type": "text",
      "name": "name",
      "title": "What is your name?"
    }
  ]
}
```

### Multi-Page Survey

```json
{
  "title": "Multi-Page Survey",
  "pages": [
    {
      "name": "page1",
      "elements": [
        {
          "type": "radiogroup",
          "name": "q1",
          "title": "Question 1?",
          "choices": ["Option A", "Option B", "Option C"]
        }
      ]
    },
    {
      "name": "page2",
      "elements": [
        {
          "type": "checkbox",
          "name": "q2",
          "title": "Question 2?",
          "choices": ["Yes", "No", "Maybe"]
        }
      ]
    }
  ]
}
```

### Survey with Various Question Types

```json
{
  "title": "Mixed Question Types",
  "elements": [
    {
      "type": "text",
      "name": "email",
      "title": "Email Address",
      "inputType": "email"
    },
    {
      "type": "radiogroup",
      "name": "satisfaction",
      "title": "How satisfied are you?",
      "choices": ["Very Satisfied", "Satisfied", "Neutral", "Dissatisfied"]
    },
    {
      "type": "rating",
      "name": "rating",
      "title": "Rate your experience",
      "rateCount": 5
    },
    {
      "type": "comment",
      "name": "feedback",
      "title": "Additional Comments"
    }
  ]
}
```

## Keyboard Shortcuts

**Ctrl+Enter** or **Cmd+Enter** - Submit the import form

## Features

### Automatic Survey Selection

After importing, the new survey is:
- Automatically added to the survey list
- Automatically selected
- Automatically displayed with the "Render Survey" tab active
- Ready to fill out immediately

### Error Handling

The feature provides helpful error messages for:
- Empty survey name
- Empty JSON schema
- Invalid JSON syntax
- Invalid schema structure (missing pages/elements)

### Modal Dialog

- Click outside the dialog to close
- Click the ✕ button to close
- Paste formatted or minified JSON - both work

## Keyboard Shortcuts

- **Ctrl+Enter** or **Cmd+Enter**: Submit the import form
- **Escape**: Close the dialog (can be added in future updates)

## Integration with SurveyJS Creator

You can export a schema from the SurveyJS Survey Creator and import it here:

1. Create/design a survey in SurveyJS Survey Creator
2. Export the JSON schema
3. Copy the JSON
4. Click "📥 Import Schema" in this application
5. Paste the JSON and give it a name
6. Click "✓ Import Survey"

Your survey will now appear in the list and be ready to use!

## Technical Implementation

### Files Modified

- `app.component.ts` - Added `onSchemaImported()` handler
- `app.component.html` - Added import button and integration
- `app.module.ts` - Registered ImportSchemaComponent

### Files Created

- `import-schema/import-schema.component.ts` - Main component logic
- `import-schema/import-schema.component.html` - Dialog template
- `import-schema/import-schema.component.css` - Styling

### Component Features

```typescript
@Output() schemaImported: EventEmitter<{name: string, schema: any}>
```

The component emits an event with:
- `name`: The survey name entered by the user
- `schema`: The parsed JSON schema object

### Validation

The component validates:

1. **Name validation**: Survey name cannot be empty
2. **JSON validation**: Valid JSON syntax required
3. **Schema validation**: Must have "pages" or "elements" property

## Future Enhancements

Potential additions to the import feature:

- [ ] File upload (.json files)
- [ ] Drag and drop support
- [ ] URL import (fetch from endpoint)
- [ ] Schema preview before import
- [ ] Import history/templates
- [ ] Schema beautification/formatting
- [ ] Export current survey as JSON
- [ ] Batch import multiple surveys
- [ ] Schema versioning

## Troubleshooting

### "Invalid JSON" Error

Make sure your JSON is properly formatted. You can validate JSON at:
- https://jsonlint.com/
- https://jsonformatter.org/

### "Invalid SurveyJS schema"

Your schema must have either:
- `"pages"` array for multi-page surveys
- `"elements"` array for single-page surveys

Example:
```json
{
  "elements": [
    {"type": "text", "name": "q1"}
  ]
}
```

### Survey not rendering

Make sure the schema is valid. Check the browser console (F12) for error messages.

## Examples

### Customer Satisfaction Survey

```json
{
  "title": "Customer Satisfaction",
  "elements": [
    {
      "type": "radiogroup",
      "name": "satisfaction",
      "title": "How satisfied are you with our service?",
      "choices": ["Very Satisfied", "Satisfied", "Neutral", "Dissatisfied", "Very Dissatisfied"],
      "isRequired": true
    },
    {
      "type": "comment",
      "name": "feedback",
      "title": "Please tell us how we can improve:"
    }
  ]
}
```

### Product Feedback Form

```json
{
  "title": "Product Feedback",
  "elements": [
    {
      "type": "text",
      "name": "productName",
      "title": "What product did you use?"
    },
    {
      "type": "rating",
      "name": "quality",
      "title": "Product Quality",
      "rateCount": 5
    },
    {
      "type": "checkbox",
      "name": "features",
      "title": "Which features did you use?",
      "choices": ["Feature A", "Feature B", "Feature C"]
    }
  ]
}
```

---

**Ready to import surveys?** Click the 📥 Import Schema button in the top bar to get started!
