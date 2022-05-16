import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

enum ROUTE_PATH {
  NONE = ''
}

const routes: Routes = [
  {
    path: ROUTE_PATH.NONE,
    loadChildren: () => import('./features/main/main.module').then(m => m.MainModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
