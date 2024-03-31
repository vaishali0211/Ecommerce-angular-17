import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Order, Product, User } from '../../../core/Models/object_model';
import { CustomerService } from '../../services/customer.service';
import { Router, RouterLink } from '@angular/router';
import { zip } from 'rxjs';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent implements OnInit {
  single_product_id: any;
  user_id: any;
  individual_product!: Product;
  userdetails!: User;
  user_address: any;
  user_contact_no: any;
  order_dto!: Order;

  constructor(
    private customerService: CustomerService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.customerService.current_product.subscribe(
      (product) => (this.single_product_id = product)
    );
    this.user_id = Number(sessionStorage.getItem('user_session_id'));
    this.productDetails(this.single_product_id);
    this.userAddress(this.user_id);
  }
  productDetails(single_product_id: any) {
    this.customerService.individualProduct(single_product_id).subscribe(
      (data) => {
        this.individual_product = data;
        console.log('single product', this.individual_product);
      },
      (erorr) => {
        console.log('My error', erorr);
      }
    );
  }
  userAddress(user_id: any) {
    this.customerService.userDetails(user_id).subscribe(
      (data) => {
        this.user_address = data.address;
        this.user_contact_no = data.mobNumber;
      },
      (error) => {
        console.log('error', error);
      }
    );
  }

  placeOrder() {
    this.order_dto = {
      id: 0,
      userId: this.user_id,
      sellerId: 2,
      product: {
        id: this.individual_product.id,
        name: this.individual_product.name,
        uploadPhoto: this.individual_product.uploadPhoto,
        mrp: this.individual_product.mrp,
        dp: this.individual_product.dp,
        productDesc: this.individual_product.productDesc,
        status: this.individual_product.status,
      },
      deliveryAddress: {
        id: 0,
        addLine1: this.user_address.addLine1,
        addLine2: this.user_address.addLine2,
        city: this.user_address.city,
        state: this.user_address.state,
        zipCode: this.user_address.zipCode,
      },
      contact: this.user_contact_no,
      dateTime: new Date().toLocaleDateString(),
    };
    this.customerService.addNewOrder(this.order_dto).subscribe(
      (data) => {
        alert('your Order Place successfull !');
        this.router.navigateByUrl('/buyer-dashboard');
      },
      (error) => {
        console.log('error', error);
      }
    );
  }
}
