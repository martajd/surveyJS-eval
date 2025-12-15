import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Model } from 'survey-core';

@Component({
  selector: 'app-survey-renderer',
  templateUrl: './survey-renderer.component.html',
  styleUrls: ['./survey-renderer.component.css']
})
export class SurveyRendererComponent implements OnInit, OnChanges {
  @Input() surveySchema: any;

  surveyModel: Model | null = null;
  responses: any = null;
  hasResponded = false;
  responsesJson = '';

  ngOnInit(): void {
    this.initializeSurvey();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['surveySchema']) {
      this.initializeSurvey();
    }
  }

  private initializeSurvey(): void {
    if (!this.surveySchema || Object.keys(this.surveySchema).length === 0) {
      console.warn('No survey schema provided');
      this.surveyModel = null;
      return;
    }

    try {
      console.log('Initializing survey with schema:', this.surveySchema);
      this.surveyModel = new Model(this.surveySchema);

      // Extract and apply initial data from schema elements
      const initialData = this.extractInitialData(this.surveySchema);
      if (Object.keys(initialData).length > 0) {
        this.surveyModel.data = initialData;
        console.log('Applied initial data to survey:', initialData);
      }

      // Handle survey completion
      this.surveyModel.onComplete.add((sender: any) => {
        this.responses = sender.data;
        this.responsesJson = JSON.stringify(this.responses, null, 2);
        this.hasResponded = true;
        console.log('Survey completed with responses:', this.responses);
      });

      console.log('Survey model created and ready to render');
    } catch (error) {
      console.error('Error initializing survey:', error);
      this.surveyModel = null;
    }
  }

  private extractInitialData(schema: any): any {
    const data: any = {};

    if (schema.pages && Array.isArray(schema.pages)) {
      for (const page of schema.pages) {
        this.extractDataFromElements(page.elements, data);
      }
    }

    return data;
  }

  private extractDataFromElements(elements: any[], data: any): void {
    if (!elements || !Array.isArray(elements)) {
      return;
    }

    for (const element of elements) {
      // Extract value from element if it has a value property
      if (element.value !== undefined && element.name) {
        data[element.name] = element.value;
      }

      // For panels, recursively extract from nested elements
      if (element.type === 'panel' && element.elements) {
        this.extractDataFromElements(element.elements, data);
      }

      // For matrix elements, handle rows with value property
      if (element.type === 'matrixdynamic' && element.value && Array.isArray(element.value) && element.name) {
        data[element.name] = element.value;
      }
    }
  }

  resetSurvey(): void {
    this.hasResponded = false;
    this.responses = null;
    this.initializeSurvey();
  }
}
