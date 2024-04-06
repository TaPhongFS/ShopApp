import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { UserResponse } from '../../../responses/user/user.response';
import { NgbPopoverConfig } from '@ng-bootstrap/ng-bootstrap';
import { TokenService } from '../../../services/token.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../../../services/cart.service';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../models/product';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  userResponse?: UserResponse | null;
  isPopoverOpen = false;
  activeNavItem: number = 0;
  role: number = 0;
  cartItems: { product: Product, checked: number }[] = [];

  constructor(
    private userService: UserService,
    private cartService: CartService,
    // private popoverConfig: NgbPopoverConfig,
    private productService: ProductService,
    private tokenService: TokenService,
    private router: Router
  ) {


  }
  ngOnInit() {
    this.userResponse = this.userService.getUserResponseFromLocalStorage();
    this.activeNavItem = this.userService.getPage() ?? 0;
    this.role = this.userResponse ? this.userResponse?.role.id : 0;
    const listCheck = this.cartService.getListCheck();
    const checksIds = Array.from(listCheck.keys());



    // Gọi service để lấy thông tin sản phẩm dựa trên danh sách ID
    debugger
    if (checksIds.length === 0) {
      return;
    }

    this.productService.getProductsByIds(checksIds).subscribe({
      next: (products) => {
        debugger
        // Lấy thông tin sản phẩm và số lượng từ danh sách sản phẩm và giỏ hàng
        this.cartItems = checksIds.map((checkedId) => {
          debugger
          const product = products.find((p) => p.id === checkedId);
          if (this.cartService.getChecked(checkedId)) {
            return {
              product: product!,
              checked: 0
            };
          }
          return {
            product: product!,
            checked: 1
          };
        });
      },
      complete: () => {
        debugger;
      },
      error: (error: any) => {
        debugger;
        console.error('Error fetching products:', error);
      }
    });
  }

  togglePopover(event: Event): void {
    event.preventDefault();
    this.isPopoverOpen = !this.isPopoverOpen;
  }

  handleItemClick(index: number): void {
    // alert(`Clicked on "${index}"`);
    if (index === 0) {
      debugger
      this.router.navigate(['/user-profile']);
      this.activeNavItem = 3;
    } else if (index === 1) {
      this.router.navigate(['/orders-list']);
      this.activeNavItem = 3;
    } else if (index === 2) {
      this.userService.removeUserFromLocalStorage();
      this.tokenService.removeToken();
      this.userResponse = this.userService.getUserResponseFromLocalStorage();
      this.router.navigate(['/login']);
      this.activeNavItem = 3;
      this.role = 0;
    }
    this.isPopoverOpen = false; // Close the popover after clicking an item    
  }




  setActiveNavItem(index: number) {
    this.activeNavItem = index;
  }
}
