# SOC 2 Template Variable Mapping Guide

## Overview
This guide explains how to substitute form-collected variables into the SOC 2 System Description template during the export process.

## Variables Collected from Form

| Variable Name | Form Field | Type | Required | Example |
|---------------|-----------|------|----------|---------|
| CLIENT_LEGAL_NAME | client_legal_name | text | Yes | Acme Corporation |
| SYSTEM_NAME | system_name | text | Yes | CloudSync Platform |
| START_DATE | start_date | date | Yes | 2024-01-01 |
| END_DATE | end_date | date | Yes | 2024-12-31 |
| SUBSERVICE_ORG | subservice_org | text | No | Amazon Web Services |
| SUBSERVICE_SYSTEM | subservice_system | text | No | AWS Infrastructure |

## Template Placeholders and Substitution Rules

### Page/Section Level Substitutions

#### Section 3 Title
**Template Text:**
```
Section 3
[Client Legal Name]'s Description of Its [System Name] Throughout the Period [Month Day, Year], to [Month Day, Year]
```

**Substitution:**
```
Section 3
Acme Corporation's Description of Its CloudSync Platform Throughout the Period January 1, 2024, to December 31, 2024
```

**Regex Pattern:**
```javascript
template = template.replace(/\[Client Legal Name\]/g, data.client_legal_name);
template = template.replace(/\[System Name\]/g, data.system_name);
template = template.replace(/\[Month Day, Year\],\s*to\s*\[Month Day, Year\]/g,
  `${formatDate(data.start_date)}, to ${formatDate(data.end_date)}`);
```

### Inline Substitutions Within Paragraphs

#### Type of Services Provided Section
**Template:**
```
Provide a summary of the services you provide, what [System Name] does, how customers use it, etc.

The system description in this section of the report details [System Name]. Any other Company services are not within the scope of this report.
```

**Substitution:**
```
Provide a summary of the services you provide, what CloudSync Platform does, how customers use it, etc.

The system description in this section of the report details CloudSync Platform. Any other Company services are not within the scope of this report.
```

**Code:**
```javascript
const systemName = data.system_name || 'the system';
template = template.replace(/\[System Name\]/g, systemName);
```

#### Infrastructure Subservice Organization
**Template:**
```
The Company utilizes [Subservice Organization], (e.g., Amazon Web Services (AWS)) to provide the resources to host [System Name]. The Company leverages the experience and resources of [Subservice Organization] to provision [System Name] infrastructure quickly and securely.
```

**Substitution Rules:**
1. If `subservice_org` is provided, use it
2. If not provided, use default text "dedicated infrastructure"

**Code:**
```javascript
if (data.subservice_org) {
  template = template.replace(/\[Subservice Organization\]/g, data.subservice_org);
  template = template.replace(/\(e\.g\., Amazon Web Services \(AWS\)\)/g,
    `(e.g., ${data.subservice_org})`);
} else {
  // Remove subservice references
  template = template.replace(/The Company utilizes.*?to host.*?\./s,
    'The Company utilizes dedicated infrastructure.');
}
```

### Conditional Text Substitutions

#### Type I vs Type II (Based on Report Type Parameter)
**Template Instruction:** "If Type I, replace with 'AS OF [MONTH DAY, YEAR]'"

**Template Text:**
```
There were no identified significant system incidents...as of [Month Day, Year]
```

**Type I Substitution:**
```javascript
if (reportType === 'TypeI') {
  const asOfDate = formatDate(data.end_date);
  template = template.replace(/from \[.*?\] to \[.*?\]/g, `as of ${asOfDate}`);
}
```

#### Privacy Scope (Conditional on Trust Services Selection)
**Template Instruction:** "If Privacy is in scope, consider adding responsible parties..."

**Code:**
```javascript
const privacyInScope = data.trust_criteria_in_scope.includes('privacy');
if (privacyInScope) {
  // Include Privacy-related sections
  template = template.replace(/<!--PRIVACY_SECTION-->/g, privacyContent);
} else {
  // Remove Privacy-related sections
  template = template.replace(/<!--PRIVACY_SECTION-->[\s\S]*?<!--END_PRIVACY_SECTION-->/g, '');
}
```

#### System Name Variations
**Rule:** If system_name is generic or empty, substitute with "the [Client Name] processing system/platform"

**Code:**
```javascript
const systemName = data.system_name;
const processingSuffix = ' processing system';

// For phrases like "the system"
if (systemName.toLowerCase() === 'system' || !systemName) {
  const fullName = `the ${data.client_legal_name}${processingSuffix}`;
  template = template.replace(/the system/gi, fullName);
}

// For [System Name] placeholders
template = template.replace(/\[System Name\]/g, systemName);
```

## Substitution Function Template

```javascript
function substituteSOC2Variables(templateMarkup, formData, reportType = 'TypeII') {
  let output = templateMarkup;

  // 1. Date formatting
  const startDate = new Date(formData.start_date);
  const endDate = new Date(formData.end_date);
  const formatDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  // 2. Core variables
  const substitutions = {
    '[Client Legal Name]': formData.client_legal_name,
    '[System Name]': formData.system_name,
    'Client Name': formData.client_legal_name,
  };

  Object.entries(substitutions).forEach(([placeholder, value]) => {
    output = output.replace(new RegExp(placeholder, 'g'), value);
  });

  // 3. Date range
  output = output.replace(
    /\[Month Day, Year\],\s*to\s*\[Month Day, Year\]/g,
    `${formatDate(startDate)}, to ${formatDate(endDate)}`
  );

  // 4. Type-specific substitutions
  if (reportType === 'TypeI') {
    output = output.replace(
      /from.*?to.*?([,.])/g,
      `as of ${formatDate(endDate)}$1`
    );
  }

  // 5. Subservice organization (optional)
  if (formData.subservice_org) {
    output = output.replace(/\[Subservice Organization\]/g, formData.subservice_org);
  }

  // 6. Conditional sections based on Trust Services
  const trustServices = formData.trust_criteria_in_scope || [];

  if (!trustServices.includes('privacy')) {
    output = output.replace(/<!--PRIVACY_START-->[\s\S]*?<!--PRIVACY_END-->/g, '');
  }

  if (!trustServices.includes('availability')) {
    output = output.replace(/<!--AVAILABILITY_START-->[\s\S]*?<!--AVAILABILITY_END-->/g, '');
  }

  return output;
}
```

## Usage Example

```javascript
// Load form data from SurveyJS
const formData = survey.data;

// Load template
const template = fs.readFileSync('soc2-template.docx');

// Substitute variables
const filledTemplate = substituteSOC2Variables(template, formData, 'TypeII');

// Export
exportToWord(filledTemplate, 'SOC2-Section3.docx');
```

## Special Cases

### Multiple Occurrences
Some variables appear multiple times. Use global regex replacement:
```javascript
template = template.replace(/\[System Name\]/g, systemName);  // 'g' flag = global
```

### Nested Placeholders
Handle nested brackets carefully:
```javascript
// Wrong: Would match inner brackets
template = template.replace(/\[.*?\]/g, value);

// Right: Match specific placeholders
template = template.replace(/\[Client Legal Name\]/g, value);
template = template.replace(/\[System Name\]/g, value);
```

### Escaped Characters
If importing from Word docs, watch for:
- Curly quotes vs straight quotes: " vs " (use normalize)
- Non-breaking spaces: \u00A0
- Smart apostrophes vs straight apostrophes

### Table Cell Substitutions
For form data that populates table cells (like trust_services_commitments):

```javascript
function populateCommitmentTable(table, commitments) {
  commitments.forEach((commitment, index) => {
    const row = table.rows[index];
    row.cells[0].text = commitment.category;
    row.cells[1].text = commitment.commitment_text;
  });
}

populateCommitmentTable(table, formData.trust_services_commitments);
```

## Validation Checklist

Before exporting, verify:
- [ ] All instances of `[Client Legal Name]` are replaced
- [ ] All instances of `[System Name]` are replaced
- [ ] Date ranges are in "Month Day, Year" format
- [ ] System Name is not empty (use default if needed)
- [ ] Privacy sections included/excluded based on trust_criteria_in_scope
- [ ] Subservice organization references correct (or removed if not provided)
- [ ] Type I/II conditional text is correct
- [ ] No placeholder brackets remain `[...]`
- [ ] No orphaned HTML comments `<!--...-->`

## Common Pitfalls

1. **Partial Placeholder Matches**
   - ❌ `[System]` won't match `[System Name]`
   - ✓ Use exact placeholders from template

2. **Case Sensitivity**
   - ❌ `\[system name\]` won't match `[System Name]`
   - ✓ Use exact case or add `i` flag: `/\[system name\]/i`

3. **Forgetting g Flag**
   - ❌ Only replaces first occurrence
   - ✓ Use `replace(/placeholder/g, value)`

4. **Special Regex Characters**
   - ❌ `[` and `]` have special meaning in regex
   - ✓ Escape: `\[` and `\]` or use `String.replace()`

5. **Date Format Mismatches**
   - ❌ Using ISO date "2024-01-01" in output
   - ✓ Format as "January 1, 2024"

