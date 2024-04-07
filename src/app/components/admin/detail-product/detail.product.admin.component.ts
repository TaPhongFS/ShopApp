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
        this.getCategories();
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
            },
            complete: () => {
                debugger;
            },
            error: (error: any) => {
                console.error('Error fetching products:', error);
            }
        })
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

    // uploadImage() {
    //     const formData = new FormData();
    //     const element = document.getElementById('files');
    //     if (element instanceof HTMLInputElement && element.type === 'file') {
    //         const files = element.files;
    //         for (let i = 0; i < files!.length; i++) {
    //             formData.append('files', files![i]);
    //         }
    //         debugger
    //         this.productService.uploadImage(formData, this.productId).subscribe({
    //             next: (response) => {
    //                 debugger;
    //                 alert('Thêm ảnh thành công');
    //                 location.reload();
    //             },
    //             complete: () => {
    //                 debugger;
    //             },
    //             error: (error: any) => {
    //                 debugger;
    //                 alert(`Lỗi khi thêm ảnh: ${error}`);
    //             },
    //         })
    //         // Xử lý danh sách file tại đây
    //     } else {
    //         console.error('Không tìm thấy phần tử input file có id "files"');
    //     }
    // }

}