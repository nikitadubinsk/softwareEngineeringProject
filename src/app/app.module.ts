import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPageComponent } from './shared/components/main-page/main-page.component';
import { LoginAdminComponent } from './shared/components/admin/login-admin/login-admin.component';
import { AdminOneRequestComponent } from './shared/components/admin/admin-one-request/admin-one-request.component';
import { PanelAdminComponent } from './shared/components/admin/panel-admin/panel-admin.component';
import { LoginWorkerComponent } from './shared/components/worker/login-worker/login-worker.component';
import { PanelWorkerComponent } from './shared/components/worker/panel-worker/panel-worker.component';
import { WorkerOneRequestComponent } from './shared/components/worker/worker-one-request/worker-one-request.component';
import { LoginUserComponent } from './shared/components/user/login-user/login-user.component';
import { PanelUserComponent } from './shared/components/user/panel-user/panel-user.component';
import { MiniOneRequestComponent } from './shared/components/user/mini-one-request/mini-one-request.component';
import { OneWorkerComponent } from './shared/components/admin/one-worker/one-worker.component';
import { RequestAdminPipe } from './shared/pipes/request-admin.pipe';
import { WorkerPipe } from './shared/pipes/worker.pipe';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    LoginAdminComponent,
    AdminOneRequestComponent,
    PanelAdminComponent,
    LoginWorkerComponent,
    PanelWorkerComponent,
    WorkerOneRequestComponent,
    LoginUserComponent,
    PanelUserComponent,
    MiniOneRequestComponent,
    OneWorkerComponent,
    RequestAdminPipe,
    WorkerPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
