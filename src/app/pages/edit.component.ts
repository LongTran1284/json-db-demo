import { ChangeDetectionStrategy, Component } from '@angular/core';
import { OrderService } from '../services/order.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Order } from '../interfaces/order';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-edit',
  standalone: true,
  providers: [OrderService],
  imports: [FormsModule, HttpClientModule],
  // changeDetection: ChangeDetectionStrategy.OnPush,
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
        <button type="submit" class="btn submit">Update</button>
        <button type="button" class="btn cancel" (click)="cancel()">Cancel</button>
      </div>
    </form>
  `,
  styles: ``
})
export class EditComponent {

  order: Order = {
    id: 0,
    name: '',
    location: '',
    status: ''
  }

  token: string = ''

  constructor(private orderService: OrderService, private router: Router, private activeRoute: ActivatedRoute){}

  ngOnInit(){
    const url_id = Number(this.activeRoute.snapshot.params['id'])    
    // const localToken = localStorage.getItem('TOKEN')
    // / = localToken ? localToken : ''
    this.orderService.readOne(url_id).subscribe({
      next: (res: any) => {this.order = res.message},
      error: (err) => alert(err.error.message)
    })
  }

  submit(){
    this.orderService.update(this.order).subscribe({
      next: () => this.router.navigate(['/']),
      error: (err) => alert(err.error.message)
    })
  }

  cancel(){
    this.router.navigate(['/'])
  }
}
