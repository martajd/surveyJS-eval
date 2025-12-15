import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SurveyModule } from 'survey-angular-ui';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SurveyRendererComponent } from './survey-renderer/survey-renderer.component';
import { ImportSchemaComponent } from './import-schema/import-schema.component';

@NgModule({
  declarations: [
    AppComponent,
    SurveyRendererComponent,
    ImportSchemaComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    SurveyModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
