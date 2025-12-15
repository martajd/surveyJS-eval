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

  resetSurvey(): void {
    this.hasResponded = false;
    this.responses = null;
    this.initializeSurvey();
  }
}
