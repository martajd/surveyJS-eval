# SOC 2 System Description Schema - Usage Guide

## Overview

The `soc2-system-description-schema.json` schema provides a comprehensive SurveyJS form for collecting SOC 2 Type I/II System Description information from Section 3 of the SOC 2 audit report template.

## Key Design Features

### 1. Single-Entry Variables
All variables that appear multiple times throughout the document are collected once on the first page:
- Client Legal Name
- System Name
- Assessment Period Start Date
- Assessment Period End Date
- Subservice Organization (e.g., AWS)
- Subservice System Name

These values are stored as form data and can be programmatically inserted into the export template during the export process.

### 2. Instructions as Field Descriptions
All template instructions (highlighted in yellow in the PDF and included in comments) are embedded as:
- HTML descriptions at the top of sections
- Field-level descriptions
- Inline instructions using conditional visibility

### 3. Compact Dense Layout
- 6 pages organized by logical sections
- Matrix dynamic questions for tables
- Conditional visibility for optional sections (e.g., incidents when "Yes" is selected)
- No unnecessary whitespace or styling

## Page Structure

### Page 1: System Information (Variables)
Collects all unique variables used throughout the document.

**Elements:**
- `client_legal_name` (text, required)
- `system_name` (text, required)
- `start_date` (date, required)
- `end_date` (date, required)
- `subservice_org` (text)
- `subservice_system` (text)

**Output:** These form the basis for template substitution during export.

### Page 2: Type of Services Provided
Describes what the system does and principal service commitments.

**Elements:**
- `service_description` (comment, 5 rows)
- `trust_services_commitments` (matrixdynamic)
  - Category (read-only): Security, Availability, Processing Integrity, Confidentiality, Privacy
  - In Scope (checkbox)
  - Service Commitment (text)

**Key Feature:** Trust Services commitments must match client's SLA. The matrix allows users to check which categories apply and enter specific commitments.

### Page 3: System Components
Documents Infrastructure, Software, and People components.

**Sections:**
1. **Infrastructure**
   - Description (comment)
   - Components table (matrixdynamic)
     - Production Tool
     - Business Function
     - Operating System
     - Hosted Location

2. **Software**
   - Description (comment)
   - Components table (matrixdynamic)
     - Production Application
     - Business Function

3. **People**
   - Roles and Responsibilities (matrixdynamic, pre-populated roles)
     - Group/Role Name (Executive Management, Operations/Engineering, etc.)
     - Function/Responsibility

**Instruction Integration:** Each section includes specific instructions about scope and what to include/exclude.

### Page 4: Procedures
Documents key operational procedures.

**Elements:**
- `procedures_list` (matrixdynamic, pre-populated procedures)
  - Procedure (Logical and Physical Access, System Operation, Change Management, Risk Mitigation)
  - Description

**Key Feature:** Instructions emphasize that procedures are updated "no less than annually."

### Page 5: Data and Incidents
Describes data types and system incidents during the assessment period.

**Sections:**
1. **Data**
   - Data description (comment)
   - Data protection methods (checkbox)
     - Encryption at Rest
     - Encryption in Transit
     - Database Encryption
     - Access Controls
     - Data Masking

2. **Incidents**
   - Incidents occurred (radiogroup: Yes/No)
   - Incident description (comment, conditional - only shows if Yes selected)

**Instruction Integration:** Includes specific instructions for Type I vs Type II reports and Privacy scope considerations.

### Page 6: Trust Services Criteria
Specifies which Trust Services Criteria are in scope.

**Elements:**
- `trust_criteria_in_scope` (checkbox, required)
  - Security
  - Availability
  - Processing Integrity
  - Confidentiality
  - Privacy
- Criteria categories (HTML reference)
- Scope notes (comment)

## Variable Substitution Strategy

During export, the collected variables should be substituted in the following places:

### Global Variables
- `{CLIENT_LEGAL_NAME}` → client_legal_name
- `{SYSTEM_NAME}` → system_name
- `{START_DATE}` → start_date (formatted as "Month Day, Year")
- `{END_DATE}` → end_date (formatted as "Month Day, Year")
- `{SUBSERVICE_ORG}` → subservice_org
- `{SUBSERVICE_SYSTEM}` → subservice_system

### Smart Substitution Rules

1. **System Name Variations**
   - `[System Name]` → system_name
   - If system_name is empty/generic: "the {client_legal_name} processing system/platform"

2. **Phrase Replacements**
   - `[Client Name]` → client_legal_name
   - `[Client Legal Name]` → client_legal_name
   - `[Month Day, Year]` → start_date (first occurrence) or end_date (second occurrence)

3. **Conditional Phrases**
   - Phrases in comments like "If Type 1, replace with 'AS OF [MONTH DAY, YEAR]'" should be applied based on report type

## Data Structure

### Input (What the form collects)

```json
{
  "client_legal_name": "Acme Corporation",
  "system_name": "CloudSync Platform",
  "start_date": "2024-01-01",
  "end_date": "2024-12-31",
  "subservice_org": "Amazon Web Services",
  "subservice_system": "AWS Infrastructure",
  "service_description": "CloudSync provides...",
  "trust_services_commitments": [
    {
      "category": "Security",
      "has_commitment": true,
      "commitment_text": "99.99% uptime SLA"
    }
  ],
  "infrastructure_description": "Infrastructure includes...",
  "infrastructure_components": [...],
  "software_components": [...],
  "people_roles": [
    { "group_role": "Executive Management", "function": "Oversight and direction" }
  ],
  "procedures_list": [...],
  "data_description": "Customer data is stored in...",
  "data_protection_methods": ["encryption_rest", "encryption_transit"],
  "incidents_occurred": "no",
  "trust_criteria_in_scope": ["security", "availability", "processing_integrity"]
}
```

### Output (Export Template)
The form data combined with template substitution should produce:

```
Section 3
Acme Corporation's Description of Its CloudSync Platform Throughout the Period January 1, 2024, to December 31, 2024

Type of Services Provided
Provide a summary of the services Acme Corporation provides...

Principal Service Commitments and System Requirements
Commitments related to CloudSync Platform include:
- Security: 99.99% uptime SLA
...
```

## Element Reference

### Matrix Dynamic Elements
The schema uses matrix dynamic elements for tables. These allow users to:
- Add/remove rows dynamically
- Edit each cell
- Mark read-only columns

**Pre-populated vs. Empty:**
- Trust Services Commitments: Pre-populated with 5 categories (users check scope and enter commitment)
- Infrastructure/Software: Empty, users can add as many rows as needed
- People Roles: Pre-populated with standard roles, users can modify
- Procedures: Pre-populated with common procedures, users can modify

### Conditional Elements
- `incidents_description`: Only visible when `incidents_occurred = 'yes'`
- Other sections shown/hidden based on navigation flow

### Required Fields
- `client_legal_name` (page 1)
- `system_name` (page 1)
- `start_date` (page 1)
- `end_date` (page 1)
- `service_description` (page 2)
- `trust_services_commitments` (page 2)
- `trust_criteria_in_scope` (page 6)

## Integration Notes

1. **No Styling**: All styling handled by your theme system
2. **No HTML Markup**: Only semantic tags (p, h4, ol, li, strong, em)
3. **Template Instructions**: All yellow highlights from PDF are embedded as descriptions/instructions
4. **Comment Fields**: 3-5 row comments for detailed text entry
5. **Date Formatting**: Dates collected as ISO format, export should format as "Month Day, Year"

## Example Usage

```javascript
const schema = require('soc2-system-description-schema.json');
const survey = new Survey.Model(schema);

survey.onComplete.add(function(survey) {
  const data = survey.data;

  // Substitute variables in template
  let template = templateMarkup;
  template = template.replace(/\{CLIENT_LEGAL_NAME\}/g, data.client_legal_name);
  template = template.replace(/\{SYSTEM_NAME\}/g, data.system_name);
  template = template.replace(/\{START_DATE\}/g, formatDate(data.start_date));
  template = template.replace(/\{END_DATE\}/g, formatDate(data.end_date));

  // Export as PDF
  exportToPDF(template);
});
```

## Customization Examples

### Add Required Field Validation
```json
{
  "name": "service_description",
  "isRequired": true,
  "requiredErrorText": "Service description is required"
}
```

### Add Pattern Validation
```json
{
  "name": "client_legal_name",
  "validators": [{
    "type": "regex",
    "regex": "^[a-zA-Z0-9\\s]+$",
    "text": "Client name can only contain letters, numbers, and spaces"
  }]
}
```

### Conditional Sections
```json
{
  "name": "privacy_details",
  "type": "comment",
  "visibleIf": "{trust_criteria_in_scope} contains 'privacy'"
}
```

## Testing

Both schemas have been validated as:
✓ Valid JSON syntax
✓ Proper SurveyJS structure with 6 pages
✓ All element types supported by SurveyJS
✓ Matrix dynamic elements with proper configuration
✓ Conditional logic implemented correctly
✓ No hardcoded styling

