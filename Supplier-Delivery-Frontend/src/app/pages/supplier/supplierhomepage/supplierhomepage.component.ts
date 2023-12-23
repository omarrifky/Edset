import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/supplier/product.service';
import { SupplierService } from 'src/app/services/supplier/supplier.service';

@Component({
  selector: 'app-supplierhomepage',
  templateUrl: './supplierhomepage.component.html',
  styleUrls: ['./supplierhomepage.component.scss'],
})
export class SupplierhomepageComponent implements OnInit {
  selectedTable: string = 'all';
  orders: any[] = [];
  products: any[] = [];
  quanity: number = 0;
  path: { [key: string]: string } = {};
  selectedProductID = '';

  mappedStatus: { [key: string]: string } = {
    Preparing: 'Prepared',
  };

  actions: { [key: string]: string } = {
    all: 'Prepared',
    accepted: '',
    previous: '',
  };

  titles: { [key: string]: string } = {
    all: 'My Orders',
    previous: 'Previous Orders',
    myProducts: 'My Products',
  };

  status: { [key: string]: string } = {
    all: 'Pending',
    delivering: 'Delivering',
  };

  constructor(
    private ser: SupplierService,
    private prodSer: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchOrder(this.selectedTable);
    this.fetchMyProducts();
  }
  fetchMyProducts() {
    this.ser.getMyProducts().subscribe(
      (products: any) => {
        this.products = products;
        console.log(this.products);
      },
      (err) => {}
    );
  }

  fetchOrder(table: string) {
    const fetchStatus = this.status[this.selectedTable];
    this.ser.getAllOrders(fetchStatus).subscribe(
      (res: any) => {
        this.orders = [...res]
          .map((el) => {
            const products = [...el.products].filter(({ status }) =>
              fetchStatus ? status === fetchStatus : status !== 'Pending'
            );

            const totalPrice = products.reduce((total, prod) => {
              const currentPrice =
                (prod.deliveryFees || 0) + (prod.priceatPurchase || 0);
              total += currentPrice;
              return total;
            }, 0);

            return {
              ...el,
              products,
              totalPrice,
            };
          })
          .filter(({ products }) => products.length > 0);
      },
      (err) => {}
    );
  }

  changeOrderStatus(orderId: string) {
    this.ser.changeOrderStatus(orderId).subscribe(
      (res: any) => {
        this.fetchOrder(this.selectedTable);
      },
      (err) => {}
    );
  }
  createProduct() {
    this.router.navigateByUrl('/createproduct');
  }
  changeTable(table: string) {
    this.selectedTable = table;
    this.fetchOrder(table);
  }
  openPopup(productID: string) {
    var popup = document.getElementById('popup');
    if (popup) popup.style.display = 'block';
    this.selectedProductID = productID;
  }

  closePopup() {
    var popup = document.getElementById('popup');
    this.quanity = 0;
    if (popup) popup.style.display = 'none';
  }

  restock() {
    this.prodSer
      .restock(this.selectedProductID, Math.abs(this.quanity))
      .subscribe(
        (res) => {
          console.log(res);
          this.closePopup();
          this.fetchMyProducts();
        },
        (err) => {}
      );
  }
}
