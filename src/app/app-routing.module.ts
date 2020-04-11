import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainPageComponent } from './shared/components/main-page/main-page.component';
import { LoginUserComponent } from './shared/components/user/login-user/login-user.component';
import { LoginWorkerComponent } from './shared/components/worker/login-worker/login-worker.component';
import { LoginAdminComponent } from './shared/components/admin/login-admin/login-admin.component';
import { PanelAdminComponent } from './shared/components/admin/panel-admin/panel-admin.component';
import { PanelWorkerComponent } from './shared/components/worker/panel-worker/panel-worker.component';
import { PanelUserComponent } from './shared/components/user/panel-user/panel-user.component';


const routes: Routes = [
  {path: '', component: MainPageComponent},
  {path: 'loginUser', component: LoginUserComponent},
  {path: 'loginWorker', component: LoginWorkerComponent},
  {path: 'loginAdmin', component: LoginAdminComponent},
  {path: 'admin', component: PanelAdminComponent},
  {path: 'worker', component: PanelWorkerComponent},
  {path: 'user', component: PanelUserComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
