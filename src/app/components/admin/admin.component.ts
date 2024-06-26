import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { UserResponse } from '../../responses/user/user.response';
import { TokenService } from '../../services/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-detail',
  templateUrl: './admin.component.html',
  styleUrls: [
    './admin.component.scss',
  ]
})
export class AdminComponent implements OnInit {
  adminComponent: string = 'orders';
  userResponse?: UserResponse | null;
  constructor(
    private userService: UserService,
    private tokenService: TokenService,
    private router: Router,
  ) {

  }
  ngOnInit() {
    this.userResponse = this.userService.getUserResponseFromLocalStorage();
  }
  logout() {
    this.userService.removeUserFromLocalStorage();
    this.tokenService.removeToken();
    this.userResponse = this.userService.getUserResponseFromLocalStorage();
    this.userService.savePage(3);
    this.router.navigate(['/login']);
  }

  showAdminComponent(componentName: string): void {
    // this.adminComponent = componentName;
    if (componentName == 'orders') {
      this.router.navigate(['/admin/orders']);
    } else if (componentName == 'categories') {
      this.router.navigate(['/admin/categories']);
    } else if (componentName == 'products') {
      this.router.navigate(['/admin/products']);
    } else if (componentName == 'home') {
      this.userService.savePageProduct(1);
      this.userService.savePage(0);
      this.router.navigate(['/home']);
    }
  }

}

/**
 npm install --save font-awesome
 angular.json:
 "styles": [   
    "node_modules/font-awesome/css/font-awesome.min.css"
],

 */