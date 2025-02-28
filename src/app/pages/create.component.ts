import { Component } from '@angular/core';
import { Order } from '../interfaces/order';
import { FormsModule } from '@angular/forms';
import { OrderService } from '../services/order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  standalone: true,
  providers: [OrderService],
  imports: [FormsModule],
  template: `
    <form class="m-10 pb-10 w-[250px] md:w-[350px]" (submit)="submit()">
      <div class="w-full flex justify-between">
        <label >Name</label>
        <input type="text" class="input" name="name" [(ngModel)]="order.name">
      </div>
      <div class="w-full flex justify-between">
        <label >Location</label>
        <input type="text" class="input" name="location" [(ngModel)]="order.location">
      </div>
      <div class="w-full flex justify-between">
        <label >Status</label>
        <input type="text" class="input" name="status" [(ngModel)]="order.status">
      </div>
      <div class="w-full flex justify-between mt-5 ">
        <button type="submit" class="btn submit">Submit</button>
        <button type="button" class="btn cancel" (click)="cancel()">Cancel</button>
      </div>
    </form>
  `,
  styles: ``
})
export class CreateComponent {

  order: Order = {
    id: 0,
    name: '',
    location: '',
    status: ''
  }

  constructor(private orderService: OrderService, private router: Router){}

  submit(){
    this.orderService.create(this.order).subscribe({
      next: () => this.router.navigate(['/']),
      error: (err) => alert(err.error.message)
    })
  }

  cancel(){
    this.router.navigate(['/'])
  }
}
