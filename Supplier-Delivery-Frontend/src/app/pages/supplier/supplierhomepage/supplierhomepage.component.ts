import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SupplierService } from 'src/app/services/supplier/supplier.service';

@Component({
  selector: 'app-supplierhomepage',
  templateUrl: './supplierhomepage.component.html',
  styleUrls: ['./supplierhomepage.component.scss']
})
export class SupplierhomepageComponent implements OnInit {
  selectedTable: string = 'all';
  orders: any[] = [];

  path: { [key: string]: string } = {

  };

  actions: { [key: string]: string } = {

  };

  titles: { [key: string]: string } = {
    all: 'My Orders',
    previous: 'Previous Orders',
    myProducts: 'My Products',
  };

  status: { [key: string]: string } = {
    all: 'Preparing',
    delivering: 'Delivering',
  };

  constructor(private ser: SupplierService, private router: Router
    ) { }

  ngOnInit(): void {
    this.fetchOrder(this.selectedTable);
  }

  fetchOrder(table: string) {
    const fetchStatus = this.status[this.selectedTable];

  }

  acceptProduct(orderId: string, productId: string) {
      // this.ser.updateProductDelivering(orderId, productId,this.path[this.selectedTable]).subscribe(
      //   (res: any) => {
      //     this.fetchOrder(this.selectedTable);
      //   },
      //   (err) => {}
      // );
  }
createProduct(){
  this.router.navigateByUrl("/createproduct")
}
  changeTable(table: string) {
    this.selectedTable = table;
    this.fetchOrder(table);
  }
}
