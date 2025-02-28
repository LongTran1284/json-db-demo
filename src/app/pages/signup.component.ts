import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  providers: [AuthService],
  imports: [FormsModule, RouterLink],
  template: `
    <div class="p-5">
      <form action="" class="w-fit p-5 mx-auto my-5 flex flex-col justify-center items-center gap-2 border border-blue-500 rounded-lg" 
      (submit)="submit()">
        <div class="w-[350px] flex justify-between items-center">
          <label for="">First Name</label>
          <input type="text" name="firstName" class="input" [(ngModel)]="firstName">
        </div>
        <div class="w-[350px] flex justify-between items-center">
          <label for="">Last Name</label>
          <input type="text" name="lastName" class="input" [(ngModel)]="lastName">
        </div>
        <div class="w-[350px] flex justify-between items-center">
          <label for="">Email</label>
          <input type="email" name="email" class="input" [(ngModel)]="userEmail">
        </div>
        <div class="w-[350px] flex justify-between items-center">
          <label for="">Password</label>
          <input type="password" name="password" class="input" [(ngModel)]="userPassword">
        </div>
        <div class=" w-full mt-3 flex justify-between">
          <div class="text-sm">
            <p>Already have an account?</p>
            <a class="text-blue-500 underline hover:italic" routerLink="../login">Login</a>
          </div>
          <div class="flex items-center">
            <button type="submit" class="btn submit">Sign Up</button>
          </div>
        </div>        
      </form>
    </div>
  `,
  styles: ``
})
export class SignupComponent {
  userEmail: string = ''
  userPassword: string = ''
  firstName: string = ''
  lastName: string = ''

  constructor(private authService: AuthService, private router: Router){}

  submit(){
    if (!this.userEmail || !this.userPassword){
      alert('Please input email or password.')
      return
    }
    const newUser = {
      userType: 'user', 
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.userEmail, 
      password: this.userPassword
    }
    this.authService.signup(newUser).subscribe({
      next: (res: any) => {        
        alert('A new account has been created successfully! Please login.')
        this.userEmail = this.userPassword = this.firstName = this.lastName = ''
        this.router.navigate(['../login'])        
      },
      error: (err: any) => {
        alert(`${err.error.status}. 
          ${err.error.message}`)
      }
    })

  }
}
