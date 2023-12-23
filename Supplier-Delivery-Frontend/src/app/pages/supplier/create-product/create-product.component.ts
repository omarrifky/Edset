import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/supplier/product.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent implements OnInit {
  productName:string = "";
  productDescription:string = "";
  productPrice:number = 0;
  productQuantity:number =  0;
  productPhoto:string = "";
  productCategory:string = "";
  selectedCategory : string ="";
  categories = [
    "Office",
    "School",
    "Drawing & Painting",
    "Books",
    "Crafts",
    "Games",
    "Copybooks",
    "Sculpture",
    "Adhesives",
    "Architecture Engineering",
    "Civil Engineering",
    "Mechanical Engineering",
    "Electrical Engineering",
    "Computer Engineering",
    "Applied Arts",
    "Medicine",
    "Dentistry",
    "Pharmacy"
  
  ];
 
  constructor(private productSer: ProductService ,private router: Router) { }

  ngOnInit(): void {
  }
  createProduct(){
    this.productSer.createProduct(this.productName,
      this.productDescription,
      this.productQuantity,
      this.productPhoto,
      this.productCategory,
      this.productPrice).subscribe((res: any) => {
      console.log(res);
        this.router.navigateByUrl("/supplier")
      
    }, err => {
      console.log(err)
    })
  }
  

}
