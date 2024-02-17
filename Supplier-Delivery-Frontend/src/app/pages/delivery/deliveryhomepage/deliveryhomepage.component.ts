import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

  statusMapper: { [key: string]: string } = {
    'Preparing': 'Ready for pickup '
  }

  constructor(
    private ser: DeliveryService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.selectedTable = params['p'] || 'all';
    });
    this.fetchOrder(this.selectedTable);
  }

  fetchOrder(table: string) {
    const fetchStatus = this.status[this.selectedTable];
    this.orders = [];
    this.ser.getAllDeliveryOrders(fetchStatus).subscribe(
      (res: any) => {
        this.orders = [...res]
          .map((el) => {
            const products = [...el.products].filter(
              ({ status }) => status === fetchStatus
            );

            const deliveryPrice = products.reduce((total, prod) => {
              const currentPrice =
                (prod.deliveryFees || 0) + (prod.priceatPurchase || 0);
              total += currentPrice;
              return total;
            }, 0);

            return {
              ...el,
              products,
              deliveryPrice,
            };
          })
          .filter(({ products }) => products.length > 0);
      },
      (err) => {}
    );
  }

  acceptProduct(orderId: string, productId: string) {
    this.ser
      .updateProductDelivering(
        orderId,
        productId,
        this.path[this.selectedTable]
      )
      .subscribe(
        (res: any) => {
          this.fetchOrder(this.selectedTable);
        },
        (err) => {}
      );
  }

  changeTable(table: string) {
    this.selectedTable = table;
    this.navigateToTab(table);
    this.fetchOrder(table);
  }

  navigateToTab(table: string){
    this.router.navigate([], {
     relativeTo: this.route,
     queryParams: {
       p: table
     },
     queryParamsHandling: 'merge'
   });
  }
}
