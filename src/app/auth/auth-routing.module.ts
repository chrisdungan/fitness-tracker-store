import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: 'signup', component: SignupComponent},
  { path: 'login', component: LoginComponent },
];

// These routes need to available immediately,
// and therefore are eagerly loaded...
@NgModule({
  imports: [
    RouterModule.forChild(routes) // We only call forRoot once in an Angular app
                                  // Instead we call for Child which merges this module with the other Root router module.
  ],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
