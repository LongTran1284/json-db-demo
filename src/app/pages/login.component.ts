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
          <label for="">Email</label>
          <input type="email" name="email" class="input" [(ngModel)]="userEmail">
        </div>
        <div class="w-[350px] flex justify-between items-center">
          <label for="">Password</label>
          <input type="password" name="password" class="input" [(ngModel)]="userPassword">
        </div>
        <div class=" w-full mt-3 flex justify-between">
          <div class="text-sm">
            <p>Do not have an account?</p>
            <a class="text-blue-500 underline hover:italic" routerLink="../signup">Sign Up</a>
          </div>
          <div class="flex items-center">
            <button type="submit" class="btn submit">Login</button>
          </div>
        </div>        
      </form>
    </div>
  `,
  styles: ``
})
export class LoginComponent {
  userEmail: string = ''
  userPassword: string = ''

  constructor(private authService: AuthService, private router: Router){}

  ngOnInit(){
    localStorage.removeItem('TOKEN')
    localStorage.removeItem('userName')
    localStorage.removeItem('userType')
    localStorage.removeItem('loginStatus')
  }

  submit(){
    if (!this.userEmail || !this.userPassword){
      alert('Please input email or password.')
      return
    }
    const userLogin = {email: this.userEmail, password: this.userPassword}
    this.authService.login(userLogin).subscribe({
      next: (res: any) => {
        localStorage.setItem('TOKEN', res.token)
        localStorage.setItem('userName', res.userName)
        localStorage.setItem('userType', res.userType)
        localStorage.setItem('loginStatus', 'login')
        this.userEmail = this.userPassword = ''
        this.router.navigate(['/'])
        
      },
      error: (err: any) => {
        alert(`${err.error.status}. 
          ${err.error.message}`)
      }
    })

  }
}
