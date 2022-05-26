import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainRoutingModule } from '@features/main/main-routing.module';
import { EditorService } from '@features/main/services/editor.service';
import { SharedModule } from '@shared/shared.module';
import { MainPageComponent } from 'src/app/features/main/main-page.component';
import { MainPageTitleComponent } from './components/main-page-title/main-page-title.component';
import { EditorsComponent } from './components/editors/editors.component';
import { LabeledEditorComponent } from 'src/app/features/main/components/labeled-editor/labeled-editor.component';
import { CodeExamplesSelectComponent } from './components/code-examples-select/code-examples-select.component';
import { WhatIsTactComponent } from './components/what-is-tact/what-is-tact.component';

@NgModule({
  declarations: [
    MainPageComponent,
    MainPageTitleComponent,
    EditorsComponent,
    LabeledEditorComponent,
    CodeExamplesSelectComponent,
    WhatIsTactComponent
  ],
  imports: [CommonModule, MainRoutingModule, SharedModule],
  providers: [EditorService]
})
export class MainModule {}
