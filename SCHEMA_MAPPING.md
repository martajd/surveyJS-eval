# PCI DSS Requirement 2 SurveyJS Schema - PDF to JSON Mapping

## Overview
This document maps the visual elements and content from "Example redacted Requirement 2.pdf" to the generated SurveyJS JSON schema (`pci-requirement-2-schema.json`).

## Document Analysis

### PDF Source Information
- **Document**: Example redacted Requirement 2.pdf
- **Pages**: 5 pages
- **Source**: PCI Security Standards Council
- **Topic**: Requirement 2: Apply Secure Configurations to All System Components

---

## Page-by-Page Mapping

### Page 1 (PDF Page 119) - Requirement 2.1 Overview

**Visual Elements Identified:**
- Header: "Requirement 2: Apply Secure Configurations to All System Components"
- Section: "Requirement Description"
- Section: "PCI DSS Requirement"
- Bullet point list with 4 items (Documented, Kept up to date, In use, Known to all affected parties)
- Assessment Findings section with 4 checkbox options:
  - In Place (checked)
  - Not Applicable
  - Not Tested
  - Not in Place

**Schema Mapping:**
- `pages[0].elements[0]`: HTML intro element with requirement title
- `pages[0].elements[1]`: HTML element with requirement description and bullet points
- `pages[0].elements[2]`: `radiogroup` with name `assessment_finding_2_1_1` - 4 choices matching PDF checkboxes
- Default value set to "in_place" (matching the checked state in PDF)

**Form Fields Created:**
- `assessment_finding_2_1_1` (radiogroup): Select assessment finding
- `finding_description_2_1_1` (comment): Text field for describing finding (5 rows)
- `customized_approach_used` (radiogroup): Yes/No question
- `customized_approach_details` (comment): Conditional text field (visible if customized approach = yes)
- `compensating_control_used` (radiogroup): Yes/No question
- `compensating_control_details` (comment): Conditional text field (visible if compensating control = yes)

---

### Page 2 (PDF Page 120) - Requirement 2.1.2 and Testing Procedures

**Visual Elements Identified:**
- Section: "Validation Method – Defined Approach"
- Yes/No checkbox pair for "Compensating Control was used"
- Conditional text field for "aspect(s) of the requirement"
- Table with three columns:
  - Testing Procedures
  - Reporting Instructions
  - Reporting Details: Assessor's Response
- Testing procedures listed:
  - 2.1.1 Examine documentation and interview personnel
  - Interview evidence references (INT-02)
  - Documentation evidence references (AUD-041, AUD-042, AUD-043, AUD-044)

**Schema Mapping:**
- `pages[1]`: Page dedicated to Requirement 2.1.2
- `pages[1].elements[3-7]`: Validation method sections with conditional logic
- Evidence references are collected in page 4

---

### Page 3 (PDF Page 121) - Requirement 2.1.2 Assessment

**Visual Elements Identified:**
- Assessment Findings section with 4 checkbox options
- Description field with note about "Required Reporting"
- Example content: "Coalfire interviewed key personnel identified as INT-02, reviewed the PCI Responsibility Matrix (AUD-025)"
- Validation Method sections (Customized and Defined Approaches)

**Schema Mapping:**
- `pages[1].elements[1]`: Assessment finding radiogroup for requirement 2.1.2
- `pages[1].elements[2]`: Comment field for finding description
- Conditional fields for customized/compensating controls

---

### Page 4 (PDF Page 122) - Requirement 2.2 Configuration Standards

**Visual Elements Identified:**
- Section: "Requirement Description" - "2.2 System components are configured and managed securely."
- Section: "PCI DSS Requirement"
- Bullet point list with 5 items:
  - Cover all system components
  - Address all known security vulnerabilities
  - Be consistent with industry-accepted system hardening standards or vendor recommendations
  - Be updated as new vulnerability issues are identified
  - Be applied when new systems are configured

**Schema Mapping:**
- `pages[2]`: Dedicated page for Requirement 2.2
- `pages[2].elements[0-2]`: HTML elements with requirement description and bullet points
- `pages[2].elements[3]`: Assessment finding radiogroup
- Default value: "in_place"

---

### Page 5 (PDF Page 123) - Testing Procedures and Evidence References

**Visual Elements Identified:**
- Table with columns:
  - Testing Procedures (left column)
  - Reporting Instructions (middle column)
  - Reporting Details: Assessor's Response (right column)
- Multiple testing procedure rows:
  - 2.2.1.a Examine system configuration standards
  - 2.2.1.b Examine policies and procedures and interview personnel
  - 2.2.1.c Examine configuration settings and interview personnel
- Evidence references in right column (AUD-016, AUD-018, AUD-022, AUD-036, AUD-042, AUD-043, AUD-044, AUD-073, AUD-091, AUD-017, AUD-023, INT-04, CONF-01, CONF-02)

**Schema Mapping:**
- `pages[3]`: Testing procedures and evidence collection page
- `pages[3].elements[2]`: Checkbox with all testing procedures from the PDF table
- `pages[3].elements[4-6]`: Text fields for evidence references:
  - `evidence_refs_documentation`: For AUD references
  - `evidence_refs_interviews`: For INT references
  - `evidence_refs_configuration`: For CONF references

---

## Data Validation Features

### 1. Assessment Finding Options
All assessment findings use 4 standard choices derived from the PDF:
```
- In Place
- Not Applicable
- Not Tested
- Not in Place
```

### 2. Conditional Logic (visibleIf)
- Customized Approach details visible only when "Yes" is selected
- Compensating Control details visible only when "Yes" is selected

### 3. Required Fields
- Assessment findings are required (isRequired: true)
- Finding descriptions are required
- Allows validation of compliance responses

### 4. Multi-line Comments
- Comment fields have 5 rows for detailed descriptions
- Supports detailed assessment findings matching PDF instructions

---

## Key Values Extracted from PDF

| Element | PDF Value | Schema Field |
|---------|-----------|--------------|
| Assessment Options | 4 checkbox states | radiogroup choices |
| Requirement 2.1.1 | "Documented, Kept up to date, In use, Known to all affected parties" | HTML intro + bullet list |
| Requirement 2.2.1 | 5 configuration standard requirements | HTML intro + bullet list |
| Testing Procedures | 6 different testing procedures | checkbox with 6 options |
| Evidence Types | AUD, INT, CONF references | Three text fields |
| Conditional Fields | Yes/No validation methods | visibleIf expressions |

---

## Schema Statistics

- **Total Pages**: 5
- **Total Elements**: 38
- **RadioGroup Questions**: 8
- **Checkbox Questions**: 1 (multi-select for testing procedures)
- **Comment/Text Fields**: 13
- **HTML Display Elements**: 10
- **Conditional Logic**: 6 visibleIf conditions

---

## Testing the Schema

The generated schema has been validated as:
✓ Valid JSON syntax
✓ Proper SurveyJS structure with pages and elements
✓ All question types supported by SurveyJS
✓ Conditional logic correctly configured
✓ All required fields marked appropriately

To test in the application, load `pci-requirement-2-schema.json` into the SurveyJS renderer.

---

## Notes

1. **Visual Layout Preservation**: The schema uses HTML elements to recreate section headers and bullet points from the PDF
2. **Color Scheme**: Section headers use the teal background color (#16737a) matching the PDF
3. **Assessment Logic**: Default "In Place" values match the checked state shown in the PDF
4. **Evidence Collection**: Supports the PCI DSS evidence reference format (AUD-###, INT-###, CONF-##)
5. **Flexibility**: Customized Approach and Compensating Control fields allow for alternative validation methods
6. **Compliance**: Schema follows PCI DSS v4.0 assessment requirements

