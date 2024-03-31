import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-buyer-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, RouterLink],
  templateUrl: './buyer-dashboard.component.html',
  styleUrl: './buyer-dashboard.component.css',
})
export class BuyerDashboardComponent implements OnInit {
  all_products: any;
  show_checkout: boolean = false;

  constructor(
    private router: Router,
    private customerService: CustomerService
  ) {}

  ngOnInit(): void {
    this.getAllProducts();
  }
  getAllProducts() {
    this.customerService.allProduct().subscribe(
      (data) => {
        this.all_products = data;
      },
      (error) => {
        console.log('My error', error);
      }
    );
  }
  buyProduct(id: number) {
    this.show_checkout = true;
    this.customerService.quickByProduct(id);
    this.router.navigateByUrl('/checkout');
  }
  addtoCart() {
    alert('This is show case');
  }
}
