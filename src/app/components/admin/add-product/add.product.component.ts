import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ProductService } from "../../../services/product.service";
import { ActivatedRoute, Router } from "@angular/router";
import { ProductDTO } from "../../../dtos/product/product.dto";
import { CategoryService } from "../../../services/category.service";
import { Category } from "../../../models/category";

@Component({
    selector: 'app-add-product',
    templateUrl: './add.product.component.html',
    styleUrls: [
        './add.product.component.scss',
    ]
})
export class AddProductComponent implements OnInit {
    productForm: FormGroup;
    categories: Category[] = [];
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
        this.getCategories();
    }

    getCategories() {
        this.categoryService.getCategories().subscribe({
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

    createProduct() {
        if (this.productForm.valid) {
            this.productData = {
                ...this.productData,
                ...this.productForm.value
            }
            debugger
            this.productService.createProduct(this.productData).subscribe({
                next: (response) => {
                    debugger;
                    alert('Tạo mới thành công');
                    this.router.navigate(['/admin/products']);
                },
                complete: () => {
                    debugger;
                },
                error: (error: any) => {
                    debugger;
                    alert(`Lỗi khi tạo mới: ${error}`);
                },
            })
        } else {
            // Hiển thị thông báo lỗi hoặc xử lý khác
            alert('Dữ liệu không hợp lệ. Vui lòng kiểm tra lại.');
        }
    }

}