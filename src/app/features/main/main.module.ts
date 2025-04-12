import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainRoutingModule } from '@features/main/main-routing.module';
import { SharedModule } from '@shared/shared.module';
import { TuiLetModule } from '@taiga-ui/cdk';
import { TuiButtonModule, TuiDropdownControllerModule, TuiHintModule, TuiHostedDropdownModule, TuiSvgModule } from '@taiga-ui/core';
import { TuiDropdownHoverModule, TuiIslandModule, TuiProgressModule } from '@taiga-ui/kit';
import { MainPageComponent } from 'src/app/features/main/main-page.component';
import { MainPageTitleComponent } from './components/main-page-title/main-page-title.component';
import { WhatIsTactComponent } from './components/what-is-tact/what-is-tact.component';

@NgModule({
  declarations: [
    MainPageComponent,
    MainPageTitleComponent,
    WhatIsTactComponent,
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    SharedModule,
    TuiHostedDropdownModule,
    TuiProgressModule,
    TuiDropdownHoverModule,
    TuiHintModule,
    TuiButtonModule,
    TuiLetModule,
    TuiSvgModule,
    TuiIslandModule,
    TuiDropdownControllerModule
  ]
})
export class MainModule {}
