# PCI DSS Control Assessment Schema - Usage Guide

## Overview

Two schemas have been created for compact PCI DSS control assessments:

1. **`pci-control-single.json`** - Template schema with variables for dynamic control data
2. **`pci-control-example.json`** - Example showing how to populate a specific control (3.6.1.4)

## Schema Structure

Each control assessment contains:

### 1. Control Header
- **Control ID** (e.g., "3.6.1.4")
- **Control Description** (e.g., "Cryptographic keys are stored in the fewest possible locations.")

### 2. Assessment Status (Required)
Radio button selection with 4 options:
- In Place
- Not Applicable
- Not Tested
- Not in Place
- **Default**: In Place

### 3. Assessment Narrative (Required)
- Comment field (4 rows)
- For describing why the finding was selected
- Supports detailed assessment notes

### 4. Customized Approach
- Yes/No radio buttons
- **Default**: No

### 5. Defined Approach (Compensating Control)
- Yes/No radio buttons
- **Default**: No

### 6. Testing Procedures (Dynamic)
- **Structure**: Panel Dynamic with multiple test rows
- **Per test procedure**:
  - Procedure description (HTML display)
  - Reporting instructions (HTML display)
  - Assessor response (comment field - 2 rows)

## Using the Template Schema

### Option A: Dynamic Data Binding
If using dynamic data binding in your application:

```javascript
const survey = new Survey.Model(templateSchema);
survey.data = {
  controlId: "3.6.1.4",
  controlDescription: "Cryptographic keys are stored in the fewest possible locations.",
  testing_procedures: [
    {
      procedure: "Examine key management system...",
      reportingInstructions: "Identify the number and location..."
    },
    {
      procedure: "Interview key management personnel...",
      reportingInstructions: "Identify evidence reference..."
    }
  ]
};
```

### Option B: Pre-populated Schema
Modify the template before rendering (like `pci-control-example.json`):

1. Replace `{controlId}` with actual ID
2. Replace `{controlDescription}` with actual description
3. Add `panelCount` to the `testing_procedures` element
4. Populate the `data` section with testing procedures

## Data Structure

### Input Data Format

```json
{
  "controlId": "3.6.1.4",
  "controlDescription": "Cryptographic keys are stored in the fewest possible locations.",
  "testing_procedures": [
    {
      "procedure": "Examine key management system...",
      "reportingInstructions": "Identify the number and location..."
    }
  ]
}
```

### Output Data Format (Survey Response)

```json
{
  "assessment_status": "in_place",
  "assessment_narrative": "Key storage locations verified to be minimal and secure.",
  "customized_approach": "no",
  "defined_approach": "no",
  "testing_procedures": [
    {
      "procedure": "Examine key management system...",
      "reportingInstructions": "Identify the number and location...",
      "assessor_response": "Observed 2 key storage locations..."
    }
  ]
}
```

## Element Reference

### Control Header (HTML)
- **Name**: `control_header`
- **Type**: HTML
- **Content**: Control ID and description
- **Display**: Single line with bold ID

### Assessment Status (RadioGroup)
- **Name**: `assessment_status`
- **Required**: Yes
- **Choices**: in_place, not_applicable, not_tested, not_in_place
- **Default**: in_place

### Assessment Narrative (Comment)
- **Name**: `assessment_narrative`
- **Required**: Yes
- **Rows**: 4
- **Purpose**: Detailed finding description

### Customized Approach (RadioGroup)
- **Name**: `customized_approach`
- **Choices**: yes, no
- **Default**: no

### Defined Approach (RadioGroup)
- **Name**: `defined_approach`
- **Choices**: yes, no
- **Default**: no

### Testing Procedures (PanelDynamic)
- **Name**: `testing_procedures`
- **Type**: Dynamic panel
- **Per Panel Contains**:
  - Procedure description (HTML display)
  - Reporting instructions (HTML display)
  - Assessor response (comment, 2 rows)

## Compact Design Features

✓ **Minimal HTML**: Only semantic markup (p, div, h4, strong)
- No styling (relies on theme)
- Clean, semantic structure

✓ **Efficient Layout**:
- Single page per control
- 7 top-level elements
- Dynamic testing procedures (scales with number of tests)

✓ **Assessment-Focused**:
- All 4 required components visible at once
- No deep nesting or tabs
- Easy to read and complete

✓ **SurveyJS Native**:
- Uses radiogroup for binary/limited choices
- Uses paneldynamic for repeating test procedures
- Uses comment fields for free-form text
- Uses HTML elements for display-only content

## Customization Examples

### Add Evidence References
Add fields for AUD/INT/CONF references:

```json
{
  "type": "text",
  "name": "evidence_references",
  "title": "Evidence References",
  "description": "e.g., AUD-016, INT-04, CONF-01"
}
```

### Add Required Fields
Make Customized/Defined Approach required:

```json
{
  "isRequired": true,
  "requiredErrorText": "This field is required"
}
```

### Add Conditional Logic
Show additional fields based on status:

```json
{
  "type": "comment",
  "name": "remediation_plan",
  "title": "Remediation Plan",
  "visibleIf": "{assessment_status} = 'not_in_place'",
  "rows": 4
}
```

## Integration Notes

1. **Dynamic Number of Tests**: Use `panelCount` to set initial test count
2. **Empty Assessor Responses**: Leave blank in initial data; assessor fills them
3. **Theme Styling**: All styling handled by application theme
4. **Validation**: Configure required fields and error messages as needed

## Testing

Both schemas have been validated as:
✓ Valid JSON syntax
✓ Proper SurveyJS structure
✓ All element types supported by SurveyJS
✓ No hardcoded styling

