import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-import-schema',
  templateUrl: './import-schema.component.html',
  styleUrls: ['./import-schema.component.css']
})
export class ImportSchemaComponent {
  @Output() schemaImported = new EventEmitter<{ name: string; schema: any }>();

  isOpen = false;
  jsonText = '';
  surveyName = '';
  errorMessage = '';
  isLoading = false;

  openDialog(): void {
    this.isOpen = true;
    this.jsonText = '';
    this.surveyName = '';
    this.errorMessage = '';
  }

  closeDialog(): void {
    this.isOpen = false;
    this.jsonText = '';
    this.surveyName = '';
    this.errorMessage = '';
  }

  importSchema(): void {
    this.errorMessage = '';

    // Validate name
    if (!this.surveyName.trim()) {
      this.errorMessage = 'Please enter a survey name';
      return;
    }

    // Validate JSON
    if (!this.jsonText.trim()) {
      this.errorMessage = 'Please paste a JSON schema';
      return;
    }

    try {
      const schema = JSON.parse(this.jsonText);

      // Validate that it looks like a SurveyJS schema
      if (!schema.pages && !schema.elements) {
        this.errorMessage = 'Invalid SurveyJS schema. Must have "pages" or "elements" property.';
        return;
      }

      // Emit the imported schema
      this.schemaImported.emit({
        name: this.surveyName.trim(),
        schema: schema
      });

      this.closeDialog();
    } catch (error) {
      this.errorMessage = `Invalid JSON: ${error instanceof Error ? error.message : String(error)}`;
    }
  }

  onKeyDown(event: KeyboardEvent): void {
    // Allow Ctrl+Enter or Cmd+Enter to submit
    if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') {
      this.importSchema();
    }
  }
}
