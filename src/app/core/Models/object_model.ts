export class User {
  name!: string;
  password!: string;
  uploadPhoto!: string;
  role!: string;
  mobNumber!: string;
  address!: Address;
  gender!: string;
  language!: string;
  dob!: string;
  email!: string;
  age!: number;
  aboutYou!: string;
  agreetc!: string;
}

export class Address {
  id!: number;
  addLine1!: string;
  addLine2!: string;
  city!: string;
  state!: string;
  zipCode!: string;
}
export class Product {
  id!: number;
  name!: string;
  uploadPhoto!: string;
  productDesc!: string;
  mrp!: string;
  dp!: string;
  status!: boolean;
}
export class Order {
  id!: number;
  userId!: number;
  sellerId!: number;
  product!: Product;
  deliveryAddress!: Address;
  contact!: number;
  dateTime!: string;
}
