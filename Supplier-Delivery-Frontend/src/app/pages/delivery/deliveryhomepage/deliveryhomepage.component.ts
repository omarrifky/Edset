import { Component, OnInit } from '@angular/core';
import { DeliveryService } from 'src/app/services/delivery/delivery.service';

@Component({
  selector: 'app-deliveryhomepage',
  templateUrl: './deliveryhomepage.component.html',
  styleUrls: ['./deliveryhomepage.component.scss'],
})
export class DeliveryhomepageComponent implements OnInit {
  selectedTable: string = 'all';
  orders: any[] = [];

  path: { [key: string]: string } = {
    all: 'deliveringOne',
    accepted: 'delivered',
    previous: '',
  };

  actions: { [key: string]: string } = {
    all: 'Start Delivery',
    accepted: 'Mark as Delivered',
    previous: '',
  };

  titles: { [key: string]: string } = {
    all: 'Available Orders',
    accepted: 'Accepted Orders',
    previous: 'Previous Orders',
  };

  status: { [key: string]: string } = {
    all: 'Preparing',
    accepted: 'Delivering',
    previous: 'Delivered',
  };

  constructor(private ser: DeliveryService) {}

  ngOnInit(): void {
    this.fetchOrder(this.selectedTable);
  }

  fetchOrder(table: string) {
    const fetchStatus = this.status[this.selectedTable];
    this.ser.getAllDeliveryOrders(fetchStatus).subscribe(
      (res: any) => {
        this.orders = [...res]
          .map((el) => ({
            ...el,
            products: [...el.products].filter(
              ({ status }) => status === fetchStatus
            ),
          }))
          .filter(({ products }) => products.length > 0);
      },
      (err) => {}
    );
  }

  acceptProduct(orderId: string, productId: string) {
      this.ser.updateProductDelivering(orderId, productId,this.path[this.selectedTable]).subscribe(
        (res: any) => {
          this.fetchOrder(this.selectedTable);
        },
        (err) => {}
      );
  }

  changeTable(table: string) {
    this.selectedTable = table;
    this.fetchOrder(table);
  }
}
