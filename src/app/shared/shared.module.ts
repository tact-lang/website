import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LinkDirective } from '@shared/directives/link.directive';
import { EditorComponent } from './components/editor/editor.component';
import { CodeSnippetComponent } from './components/code-snippet/code-snippet.component';

@NgModule({
  declarations: [LinkDirective, EditorComponent, CodeSnippetComponent],
  imports: [CommonModule],
  exports: [LinkDirective, EditorComponent, CodeSnippetComponent]
})
export class SharedModule {}
