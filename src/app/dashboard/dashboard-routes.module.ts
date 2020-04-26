import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

// routes
import {dashboardRoutes} from './dashboard.routes';

// components
import {DashboardComponent} from './dashboard.component';
// import {AuthGuard} from '../services/auth.guard';

const routes: Routes = [
  {
    path: '', component: DashboardComponent, children: dashboardRoutes
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutesModule {}
