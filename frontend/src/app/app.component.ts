import { Component, OnInit } from '@angular/core';
import { SurveyService, Survey } from './survey.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'SurveyJS Evaluation Tool';
  surveys: Survey[] = [];
  newSurveyName: string = '';
  selectedSurvey: Survey | null = null;
  viewMode: 'schema' | 'selector' = 'schema';

  constructor(private surveyService: SurveyService) {}

  ngOnInit(): void {
    this.loadSurveys();
  }

  loadSurveys(): void {
    this.surveyService.getSurveys().subscribe({
      next: (data) => {
        this.surveys = data;
        // Auto-select the first survey if available
        if (data.length > 0) {
          this.selectSurvey(data[0]);
        }
      },
      error: (error) => {
        console.error('Failed to load surveys:', error);
      }
    });
  }

  createSurvey(): void {
    if (!this.newSurveyName.trim()) {
      return;
    }
    this.surveyService.createSurvey({
      name: this.newSurveyName,
      schema: {}
    }).subscribe({
      next: (survey) => {
        this.surveys.push(survey);
        this.newSurveyName = '';
      },
      error: (error) => {
        console.error('Failed to create survey:', error);
      }
    });
  }

  selectSurvey(survey: Survey): void {
    this.selectedSurvey = survey;
    this.viewMode = 'schema';
  }

  deleteSurvey(id: string): void {
    this.surveyService.deleteSurvey(id).subscribe({
      next: () => {
        this.surveys = this.surveys.filter(s => s.id !== id);
        if (this.selectedSurvey?.id === id) {
          this.selectedSurvey = null;
        }
      },
      error: (error) => {
        console.error('Failed to delete survey:', error);
      }
    });
  }

  getSurveySchemaJson(schema: any): string {
    try {
      return JSON.stringify(schema, null, 2);
    } catch (error) {
      return '{}';
    }
  }

  onSchemaImported(data: { name: string; schema: any }): void {
    this.surveyService.createSurvey({
      name: data.name,
      schema: data.schema
    }).subscribe({
      next: (survey) => {
        this.surveys.push(survey);
        this.selectedSurvey = survey;
        this.viewMode = 'schema';
        console.log('Survey imported successfully:', survey.name);
      },
      error: (error) => {
        console.error('Failed to import survey:', error);
      }
    });
  }
}
