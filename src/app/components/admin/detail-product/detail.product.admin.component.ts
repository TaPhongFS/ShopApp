import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ProductService } from "../../../services/product.service";
import { ActivatedRoute, Router } from "@angular/router";
import { ProductDTO } from "../../../dtos/product/product.dto";
import { CategoryService } from "../../../services/category.service";
import { Category } from "../../../models/category";

@Component({
    selector: 'app-add-product',
    templateUrl: './detail.product.admin.component.html',
    styleUrls: [
        './detail.product.admin.component.scss',
    ]
})
export class DetailProductComponent implements OnInit {
    productForm: FormGroup;
    categories: Category[] = [];
    productId: number = 0;
    productData: ProductDTO = {
        name: '',

        price: 0,

        thumbnail: '',

        description: '',

        category_id: 0,
    };


    constructor(
        private productService: ProductService,
        private categoryService: CategoryService,
        private fb: FormBuilder,
        private router: Router,
        private route: ActivatedRoute,
    ) {
        this.productForm = this.fb.group({
            name: ['', Validators.required],
            price: ['', [Validators.required]],
            description: [''],
            category_id: ['0']
        });
    }


    ngOnInit(): void {
        this.getCategories(1, 100);
        this.getProducts();
    }

    getProducts() {
        this.productId = Number(this.route.snapshot.paramMap.get('id'));
        this.productService.getDetailProduct(this.productId).subscribe({
            next: (product: ProductDTO) => {
                debugger
                this.productForm.patchValue({
                    name: product.name,
                    price: product.price,
                    description: product.description,
                    category_id: product.category_id
                });
                debugger
            },
            complete: () => {
                debugger;
            },
            error: (error: any) => {
                console.error('Error fetching products:', error);
            }
        })
    }

    getCategories(page: number, limit: number) {
        this.categoryService.getCategories(page, limit).subscribe({
            next: (categories: Category[]) => {
                debugger
                this.categories = categories;
            },
            complete: () => {
                debugger;
            },
            error: (error: any) => {
                console.error('Error fetching categories:', error);
            }
        });
    }



    saveProduct() {
        if (this.productForm.valid) {
            this.productData = {
                ...this.productData,
                ...this.productForm.value
            }
            debugger
            this.productService.updateProduct(this.productId, this.productData).subscribe({
                next: (response) => {
                    debugger;
                    alert('Cập nhật thành công');
                    this.router.navigate(['/admin/products']);
                },
                complete: () => {
                    debugger;
                },
                error: (error: any) => {
                    debugger;
                    alert(`Lỗi khi cập nhật: ${error}`);
                },
            })
        } else {
            // Hiển thị thông báo lỗi hoặc xử lý khác
            alert('Dữ liệu không hợp lệ. Vui lòng kiểm tra lại.');
        }
    }

}