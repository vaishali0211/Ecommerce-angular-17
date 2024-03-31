import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ProductService } from '../shared/product.service';
import { Product } from '../core/Models/object_model';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class ProductComponent implements OnInit {
  all_product_data: any;
  addEditProductForm!: FormGroup;
  addEditProduct: boolean = false;
  popup_header!: string;
  addProduct!: boolean;
  product_data: any;
  single_product_data: any;
  product_dto!: Product;
  editProductId: any;
  edit_product!: boolean;
  constructor(
    private router: Router,
    private productService: ProductService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.addEditProductForm = this.formBuilder.group({
      name: ['', Validators.required],
      uploadPhoto: ['', Validators.required],
      mrp: ['', Validators.required],
      dp: ['', Validators.required],
      productDesc: ['', Validators.required],
      status: ['', Validators.required],
    });
    this.getAllProduct();
  }
  get rf() {
    return this.addEditProductForm.controls;
  }
  getAllProduct() {
    this.productService.allProduct().subscribe(
      (data) => {
        this.all_product_data = data;
      },
      (error) => {
        console.log('error', error);
      }
    );
  }
  addProductPopup() {
    this.addProduct = true;
    this.edit_product = false;
    this.popup_header = 'Add new Product';
    this.addEditProductForm.reset();
  }
  addNewProduct() {
    this.addEditProduct = true;
    if (this.addEditProductForm.invalid) {
      return;
    }
    this.product_data = this.addEditProductForm.value;
    this.product_dto = {
      id: 0,
      name: this.product_data.name,
      uploadPhoto: this.product_data.uploadPhoto,
      productDesc: this.product_data.productDesc,
      mrp: this.product_data.mrp,
      dp: this.product_data.dp,
      status: this.product_data.status,
    };
    this.productService.addnewProduct(this.product_dto).subscribe(
      (data) => {
        this.getAllProduct();
      },
      (error) => {
        console.log('something went wrong', error);
      }
    );
  }
  edtProductPopup(id: any) {
    this.addProduct = false;
    this.edit_product = true;
    this.popup_header = 'Edit  Product';
    this.addEditProductForm.reset();
    this.productService.singleProduct(id).subscribe((data) => {
      this.single_product_data = data;
      this.editProductId = data.id;
      this.addEditProductForm.setValue({
        name: this.single_product_data.name,
        uploadPhoto: this.single_product_data.uploadPhoto,
        productDesc: this.single_product_data.productDesc,
        mrp: this.single_product_data.mrp,
        dp: this.single_product_data.dp,
        status: this.single_product_data.status,
      });
    });
  }
  updateProduct() {
    this.addEditProduct = true;
    if (this.addEditProductForm.invalid) {
      return;
    }
    this.product_data = this.addEditProductForm.value;
    this.product_dto = {
      id: 0,
      name: this.product_data.name,
      uploadPhoto: this.product_data.uploadPhoto,
      productDesc: this.product_data.productDesc,
      mrp: this.product_data.mrp,
      dp: this.product_data.dp,
      status: this.product_data.status,
    };
    this.productService
      .updateProduct(this.editProductId, this.product_dto)
      .subscribe(
        (data) => {
          this.getAllProduct();
        },
        (error) => {
          console.log(error);
        }
      );
  }
  deleteProduct(id: any) {
    let conf = confirm('Do you want to delete this prouct id:' + id);
    if (conf) {
      this.productService.deleteProduct(id).subscribe(
        (data) => {
          console.log('deleted sucessfully', data);
          this.getAllProduct();
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      alert('You Pressed cancle!');
    }
  }
}
