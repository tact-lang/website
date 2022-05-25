import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainRoutingModule } from '@features/main/main-routing.module';
import { EditorService } from '@features/main/services/editor.service';
import { MainPageComponent } from 'src/app/features/main/main-page.component';
import { MainPageTitleComponent } from './components/main-page-title/main-page-title.component';
import { EditorsComponent } from './components/editors/editors.component';
import { EditorComponent } from './components/editor/editor.component';
import { CodeExamplesSelectComponent } from './components/code-examples-select/code-examples-select.component';
import { WhatIsTactComponent } from './components/what-is-tact/what-is-tact.component';

@NgModule({
  declarations: [
    MainPageComponent,
    MainPageTitleComponent,
    EditorsComponent,
    EditorComponent,
    CodeExamplesSelectComponent,
    WhatIsTactComponent
  ],
  imports: [CommonModule, MainRoutingModule],
  providers: [EditorService]
})
export class MainModule {}
