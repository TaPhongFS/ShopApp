import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../../services/order.service';
import { environment } from '../../../environments/environment';
import { OrderResponse } from '../../../responses/order/order.response';
import { OrderDetail } from '../../../models/order.detail';
import { TokenService } from '../../../services/token.service';
import moment from 'moment';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order.detail.component.html',
  styleUrls: ['./order.detail.component.scss']
})
export class OrderDetailComponent implements OnInit {
  orderResponseList: OrderResponse[] = [];

  constructor(private orderService: OrderService,
    private tokenService: TokenService,
  ) { }

  ngOnInit(): void {
    this.getOrderList();
  }

  getOrderList(): void {
    debugger
    const userId = this.tokenService.getUserId();
    this.orderService.getOrderByUserId(userId).subscribe({
      next: (response: OrderResponse[]) => {
        this.orderResponseList = response.map((item: OrderResponse) => {
          item.order_date = moment(item.order_date).subtract(1, 'months').format('YYYY-MM-DD');

          item.order_details = item.order_details.map((order_detail: OrderDetail) => {
            order_detail.product.thumbnail = `${environment.apiBaseUrl}/products/images/${order_detail.product.thumbnail}`;
            order_detail.totalMoney = order_detail.price * order_detail.numberOfProducts;
            return order_detail;
          });
          return item;
        })
      },
      complete: () => {
        debugger;
      },
      error: (error: any) => {
        debugger;
        console.error('Error fetching detail:', error);
      }
    });
  }
}

