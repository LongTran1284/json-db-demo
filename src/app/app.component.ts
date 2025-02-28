import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { HomeComponent } from "./pages/home.component";
import { AuthService } from './services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { EventService } from './services/event.service';

@Component({
  selector: 'app-root',
  standalone: true,
  providers: [AuthService],
  imports: [
    CommonModule, RouterOutlet, RouterLink, HttpClientModule,
    
  ],
  template: `
    <main class="container mx-auto bg-white">
      <div class="w-full h-[40px] bg-green-400 flex justify-between items-center">
        @if(userName) {
          <p class="px-5">Welcome {{userName}}</p>
        } @else {
          <p class="px-5" >Hello guest!</p>
        }
        <div>
          <button class="btn submit mx-5" routerLink="/login" *ngIf="!login_status">Login</button>
          <button class="btn cancel mr-5" (click)="logout()" *ngIf="login_status">Logout</button>
        </div>        
      </div>
      <header class="text-center h1 my-5 pt-5">Full Stack with Angular and json database</header>
      <nav class="w-full h-[45px] bg-cyan-400 flex gap-2 relative">
        <a class="h-full flex items-center px-3 hover:bg-cyan-500 hover:text-white" routerLink="/"
        [ngClass]="{'activeNav': activePage==='/'}"
        >
          Home
        </a>
        @if (userName) {
          <a class="h-full flex items-center px-3 hover:bg-cyan-500 hover:text-white active:text-white" routerLink="/create"
          [ngClass]="{'activeNav': activePage==='/create'}"
          >
            Create
          </a>
          <a class="h-[80%] absolute right-2 top-1/2 -translate-y-1/2 px-5 bg-blue-500 hover:bg-blue-600 text-white rounded-md flex items-center"
          routerLink="create"
          >
            Add
          </a>
        }
      </nav>
      <router-outlet></router-outlet>
    </main>
    <!-- <app-home></app-home> -->
    
  `,
})
export class AppComponent {
  activePage: string = ''
  login_status: boolean = false
  userName: string | null = ''

  constructor(private eventService: EventService, private authService: AuthService, private route: Router){
    // this.authService.login().subscribe(res => console.log(res))
    // console.log(this.activeRoute.params.subscribe(param => console.log(param)))
    this.route.events.subscribe(val => {
      if (val instanceof NavigationEnd) {
        this.activePage = val.url        
        this.login_status = localStorage.getItem('loginStatus')==='login' ? true : false
        this.userName = localStorage.getItem('userName')
        // this.eventService.listen('login', (data: boolean) => {this.login_status = data, console.log(data)})
        console.log('login_status:', this.login_status)
      }
      
    })
  }

  ngOnInit(){
    // if (localStorage.getItem('TOKEN')) this.login_status = true
    // else this.login_status = false
    // this.eventService.listen('login', (data: boolean) => {this.login_status = data, console.log(data)})
  }

  // ngOnDestroy(){localStorage.removeItem('TOKEN')}

  logout(){
    localStorage.removeItem('TOKEN')
    localStorage.removeItem('userName')
    localStorage.removeItem('loginStatus')
    // this.eventService.emitt('login', false)
    this.login_status = false
    this.userName = ''
    // this.route.navigate(['/'])
    window.location.reload()
  }

}
