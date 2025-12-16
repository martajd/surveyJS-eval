# SOC 2 System Description Schema - Summary

## What Was Generated

Three files have been created for SOC 2 Type I/II System Description (Section 3):

### 1. `soc2-system-description-schema.json` (16 KB)
The complete SurveyJS form schema with 6 pages and 34 elements organized by section:
- **Page 1**: System Information (collects all reusable variables)
- **Page 2**: Type of Services Provided (service commitments by trust services category)
- **Page 3**: System Components (infrastructure, software, people)
- **Page 4**: Procedures (operational procedures with update frequency)
- **Page 5**: Data and Incidents (data protection and incident reporting)
- **Page 6**: Trust Services Criteria (in-scope criteria selection)

### 2. `SOC2_SCHEMA_GUIDE.md` (9.2 KB)
Comprehensive user guide covering:
- Overview and design features
- Detailed explanation of each page and element
- Variable substitution strategy
- Data structures (input/output)
- Element reference guide
- Integration notes
- Customization examples

### 3. `SOC2_VARIABLE_MAPPING.md` (9.0 KB)
Technical guide for implementing export functionality:
- Variable mapping table
- Template placeholder documentation
- Substitution rules and regex patterns
- Complete substitution function template
- Special cases and edge cases
- Validation checklist
- Common pitfalls and solutions

## Key Features

✓ **Single-Entry Variables**: All variables collected once, applied everywhere during export
- Client Legal Name
- System Name
- Date Range (Start/End)
- Subservice Organization
- Subservice System Name

✓ **Instructions Embedded**: All PDF template guidance integrated:
- Yellow-highlighted instructions included as field descriptions
- Comment guidance integrated into sections
- Scope instructions embedded as HTML

✓ **Compact Dense Layout**:
- 6 focused pages (no unnecessary nesting)
- Matrix dynamic questions for efficient table entry
- Conditional visibility for optional sections
- Minimal HTML (semantic only, no styling)

✓ **Real-World Template Mapping**:
- Designed to integrate with Word/PDF export templates
- Variable substitution process documented
- Type I vs Type II differences handled
- Conditional content logic explained

## Usage Workflow

```
1. User fills out SurveyJS form (6 pages)
   ↓
2. Form data collected with all responses
   ↓
3. Export button triggered
   ↓
4. Variables substituted using mapping guide
   ↓
5. Template populated and generated
   ↓
6. Export to Word/PDF
```

## Form Data Output Example

```json
{
  "client_legal_name": "Acme Corporation",
  "system_name": "CloudSync Platform",
  "start_date": "2024-01-01",
  "end_date": "2024-12-31",
  "subservice_org": "Amazon Web Services",
  "subservice_system": "AWS Infrastructure",
  "service_description": "CloudSync provides secure cloud storage...",
  "trust_services_commitments": [
    { "category": "Security", "has_commitment": true, "commitment_text": "99.99% uptime" },
    { "category": "Privacy", "has_commitment": false, "commitment_text": "" }
  ],
  "infrastructure_description": "Multi-region deployment...",
  "infrastructure_components": [
    { "production_tool": "Databases", "business_function": "Customer data storage", "operating_system": "MySQL, Postgres", "hosted_location": "AWS" }
  ],
  "people_roles": [
    { "group_role": "Executive Management", "function": "Oversight of security controls" }
  ],
  "procedures_list": [
    { "procedure_name": "Change Management", "procedure_description": "All changes follow change advisory board process" }
  ],
  "data_description": "Customer transaction data stored encrypted...",
  "data_protection_methods": ["encryption_rest", "encryption_transit", "access_controls"],
  "incidents_occurred": "no",
  "trust_criteria_in_scope": ["security", "availability", "processing_integrity"]
}
```

## Integration Steps

### Step 1: Load Schema
```javascript
const schema = require('./soc2-system-description-schema.json');
const survey = new Survey.Model(schema);
```

### Step 2: Attach Export Handler
```javascript
survey.onComplete.add((survey) => {
  const formData = survey.data;
  exportSOC2Document(formData);
});
```

### Step 3: Implement Export Function
Use `SOC2_VARIABLE_MAPPING.md` as reference for substitution logic:
- Replace all `[Client Legal Name]` with `formData.client_legal_name`
- Replace all `[System Name]` with `formData.system_name`
- Format dates as "Month Day, Year"
- Apply conditional logic for Privacy/Type I vs II
- Handle optional subservice organization

### Step 4: Generate Document
- Populate template with substituted variables
- Insert table data from matrix responses
- Export to Word/PDF format

## Element Reference by Type

### Text Inputs (7 total)
- client_legal_name
- system_name
- start_date
- end_date
- subservice_org
- subservice_system

### Comments (6 total - free form text, 3-5 rows each)
- service_description
- infrastructure_description
- software_description
- data_description
- incidents_description
- scope_notes

### Matrix Dynamic (5 total - for efficient table entry)
- trust_services_commitments (5 rows, pre-populated)
- infrastructure_components (2+ rows)
- software_components (3+ rows)
- people_roles (5 rows, pre-populated)
- procedures_list (4 rows, pre-populated)

### Checkboxes (2 total)
- data_protection_methods (5 choices)
- trust_criteria_in_scope (5 choices, required)

### Radio Groups (1 total)
- incidents_occurred (Yes/No, required)

### HTML Display (8 total)
- Section headers, instructions, and reference content
- No styling, semantic markup only

## Validation Rules

Required Fields:
- client_legal_name
- system_name
- start_date
- end_date
- service_description
- trust_services_commitments
- incidents_occurred
- trust_criteria_in_scope

Conditional Fields:
- incidents_description (required only if incidents_occurred = 'yes')

## Template Compatibility

Designed for use with SOC 2 System Description templates that include:
- Section 3 title section
- Type of Services Provided
- Principal Service Commitments
- System Components (Infrastructure/Software/People)
- Procedures section
- Data section
- System Incidents disclosure
- Applicable Trust Services Criteria section

## Notes for Developers

1. **Date Formatting**: Form collects ISO format (YYYY-MM-DD), export should format as "Month Day, Year"
2. **Matrix Data**: Responses are arrays of objects, not simple strings
3. **Trust Services**: Multiple selections allowed; use `.includes()` for conditional logic
4. **Scope Comments**: Some sections have inline guidance - integrate into UI messaging
5. **Conditional Logic**: Privacy scope triggers additional text throughout template - plan accordingly

## Testing Checklist

- [ ] JSON schema loads without errors
- [ ] All 6 pages render correctly
- [ ] Matrix dynamic elements allow add/remove rows
- [ ] Conditional visibility works (incidents description)
- [ ] Form submission collects all data correctly
- [ ] Variable substitution produces correct output
- [ ] Date formatting is correct
- [ ] No placeholder brackets remain in export
- [ ] Optional fields handled properly
- [ ] Privacy conditionals work correctly

## Files Included

- `soc2-system-description-schema.json` - Main form schema
- `SOC2_SCHEMA_GUIDE.md` - User guide
- `SOC2_VARIABLE_MAPPING.md` - Developer integration guide
- `SOC2_SCHEMA_SUMMARY.md` - This file

Total: 3 files, ~34 KB of content

---

Generated: December 16, 2024
Based on: SOC-TEM-2025 SOC 2 System Description Template (Coalfire)
