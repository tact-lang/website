import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainRoutingModule } from '@features/main/main-routing.module';
import { MainPageComponent } from 'src/app/features/main/main-page.component';
import { MainPageTitleComponent } from './components/main-page-title/main-page-title.component';
import { EditorsComponent } from './components/editors/editors.component';
import { EditorComponent } from './components/editor/editor.component';

@NgModule({
  declarations: [MainPageComponent, MainPageTitleComponent, EditorsComponent, EditorComponent],
  imports: [CommonModule, MainRoutingModule]
})
export class MainModule {}
