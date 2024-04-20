import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../models/product';
import { environment } from '../../../environments/environment';
import { ProductResponse } from '../../../responses/product/product.response';
import moment from 'moment';

@Component({
    selector: 'app-product-admin',
    templateUrl: './product.admin.component.html',
    styleUrls: [
        './product.admin.component.scss',
    ]
})

export class ProductAdminComponent implements OnInit {
    products: ProductResponse[] = [];
    keyword: string = "";
    currentPage: number = 1;
    itemsPerPage: number = 7;
    totalPages: number = 0;
    // pages: number[] = [];
    visiblePages: number[] = [];
    selectedCategoryId: number = 0;

    constructor(
        private router: Router,
        private productService: ProductService
    ) { }

    ngOnInit() {
        this.getProducts(this.keyword, this.selectedCategoryId, this.currentPage, this.itemsPerPage);
    }

    search() {
        this.currentPage = 1;
        this.getProducts(this.keyword, this.selectedCategoryId, this.currentPage, this.itemsPerPage);
        this.keyword = "";
    }

    getProducts(keyword: string, selectedCategoryId: number, page: number, limit: number) {
        this.productService.getProducts(keyword, selectedCategoryId, page, limit).subscribe({
            next: (response: any) => {
                debugger
                response.products.forEach((product: Product) => {
                    debugger
                    product.url = `${environment.apiBaseUrl}/products/images/${product.thumbnail}`;
                    product.created_at = moment(product.created_at).subtract(1, 'months').format('YYYY-MM-DD');
                    product.updated_at = moment(product.updated_at).subtract(1, 'months').format('YYYY-MM-DD');
                });
                this.products = response.products;
                this.totalPages = response.totalPages;
                this.visiblePages = this.generateVisiblePageArray(this.currentPage, this.totalPages);
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

    onPageChange(page: number) {
        debugger;
        this.currentPage = page;
        this.getProducts(this.keyword, this.selectedCategoryId, this.currentPage, this.itemsPerPage);
    }

    generateVisiblePageArray(currentPage: number, totalPages: number): number[] {
        const maxVisiblePages = 5;
        const halfVisiblePages = Math.floor(maxVisiblePages / 2);

        let startPage = Math.max(currentPage - halfVisiblePages, 1);
        let endPage = Math.min(startPage + maxVisiblePages - 1, totalPages);

        if (endPage - startPage + 1 < maxVisiblePages) {
            startPage = Math.max(endPage - maxVisiblePages + 1, 1);
        }

        return new Array(endPage - startPage + 1).fill(0).map((_, index) => startPage + index);
    }

    deleteProduct(id: number) {
        const confirmation = window
            .confirm('Are you sure you want to delete this product?');
        if (confirmation) {
            debugger
            this.productService.deleteProduct(id).subscribe({
                next: (response: any) => {
                    debugger
                    location.reload();
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
    }

    updateProduct(id: number) {
        this.router.navigate(['/admin/detail-product', id]);
    }
}

