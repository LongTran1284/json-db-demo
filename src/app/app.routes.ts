import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home.component';
import { CreateComponent } from './pages/create.component';
import { EditComponent } from './pages/edit.component';
import { LoginComponent } from './pages/login.component';
import { SignupComponent } from './pages/signup.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'create', component: CreateComponent},
    {path: 'edit/:id', component: EditComponent},
    {path: 'login', component: LoginComponent},
    {path: 'signup', component: SignupComponent},
    {path: '**', redirectTo: '/', pathMatch: 'full'}
];
