import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainRoutingModule } from '@features/main/main-routing.module';
import { SharedModule } from '@shared/shared.module';
import { TuiLetModule } from '@taiga-ui/cdk';
import { TuiDropdownControllerModule, TuiHostedDropdownModule, TuiSvgModule } from '@taiga-ui/core';
import { TuiDropdownHoverModule, TuiIslandModule } from '@taiga-ui/kit';
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
    TuiDropdownHoverModule,
    TuiLetModule,
    TuiSvgModule,
    TuiIslandModule,
    TuiDropdownControllerModule
  ]
})
export class MainModule {}
