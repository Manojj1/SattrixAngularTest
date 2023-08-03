import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { RegisterComponent } from './register/register.component';
import { ListComponent } from './list/list.component';

const routes: Routes = [
  // { path: '', redirectTo: 'register', pathMatch: 'full' },
  // {
  //   path: 'register',
  //   loadChildren: () =>
  //     import('./register/register.module').then((m) => m.RegisterModule),
  // },
  // {
  //   path: 'list',
  //   loadChildren: () => import('./list/list.module').then((m) => m.ListModule),
  // },
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'register',
        loadChildren: () =>
          import('./register/register.module').then((m) => m.RegisterModule),
      },
      {
        path: 'list',
        loadChildren: () =>
          import('./list/list.module').then((m) => m.ListModule),
      },
      { path: '', redirectTo: 'register', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
