import { Component } from '@angular/core';
import { Order } from '../interfaces/order';
import { OrderService } from '../services/order.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  providers: [OrderService],
  template: `
    <div class="w-full p-3">
      <input type="search" name="search" class="input mb-5" placeholder="Search Order" (input)="filter(search.value)" #search>
      <table class="table-auto w-full bg-white  ">
        <thead class="bg-pink-500 text-white text-left">
          <tr >
            <th (click)="sortBy('id')" class="border border-gray-300 px-4 py-2 w-[50px] rounded-ss-lg">OrderID</th>
            <th (click)="sortBy('name')" class="border border-gray-300 px-4 py-2">Name</th>
            <th (click)="sortBy('location')" class="border border-gray-300 px-4 py-2">Location</th>
            <th (click)="sortBy('status')" class="border border-gray-300 px-4 py-2">Status</th>
            <th class="border border-gray-300 px-4 py-2 rounded-se-lg" *ngIf="userType==='admin'">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let order of filterOrders; index as j" [ngClass]="{'bg-blue-100': j%2 === 0}">
            <td class="border border-gray-300 px-4 py-2">{{ order.id }}</td>
            <td class="border border-gray-300 px-4 py-2">{{ order.name }}</td>
            <td class="border border-gray-300 px-4 py-2">{{ order.location }}</td>
            <td class="border border-gray-300 px-4 py-2">{{ order.status }}</td>
            <td class="border border-gray-300 px-4 py-2" *ngIf="userType==='admin'">
              <a class="btn submit mr-2" [routerLink]="['edit', order.id]">Edit</a>
              <button class="btn cancel" (click)="deleteOrder(order)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    
    
  `,
  styles: ``
})
export class HomeComponent {
  orders: Order[] = []
  filterOrders: Order[] = []

  sortOrder: number = 1
  sortProperty: string = 'name'
  token: string = ''
  userType: string | null = ''

  constructor(private orderService: OrderService){}

  ngOnInit(){
    this.userType = localStorage.getItem('userType')
    // this.token = localToken ? localToken : ''
    this.orderService.readAll().subscribe({
      next: (res: any) => {
        this.filterOrders = this.orders = res.message
      },
      error: (err) => {
        console.log(err.error.message)
        // alert(err.error.message)
      }
    })
  }

  deleteOrder(order: Order){
    this.orderService.delete(order.id).subscribe({
      next: () => {        
        this.filterOrders = this.orders.filter(item => item.id !== order.id)
        alert(`The order ${order.name} has been deleted successfully!`)
      },
      error: (err) => alert(err)
    })
  }

  filter(search: string){
    const sval = search.toLowerCase()
    this.filterOrders = this.orders.filter((item: Order) => 
      item.name.toLowerCase().includes(sval) ||
      item.location.toLowerCase().includes(sval) ||
      item.status.toLowerCase().includes(sval)
    )    
  }

  sortBy(value: string){
    this.sortOrder = value===this.sortProperty ? this.sortOrder*-1 : 1
    this.sortProperty = value
    // console.log(this.sortOrder, this.sortProperty)
    this.filterOrders = [...this.orders.sort((a:any, b:any) => {      
      // console.log(`a: ${a[value]}, b: ${b[value]}`)
      // console.log(`result: ${a[value]<b[value]}`)
      let result = 0
      if (a[value]<b[value]) result = -1
      else result = 1
      return (result*this.sortOrder)
    })]
  }
}
