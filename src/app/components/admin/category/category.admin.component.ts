import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from '../../../services/category.service';
import { CategoryResponse } from '../../../responses/category/category.response';
import { CategoryDTO } from '../../../dtos/category/category.dto';

@Component({
    selector: 'app-category-admin',
    templateUrl: './category.admin.component.html',
    styleUrls: [
        './category.admin.component.scss',
    ]
})

export class CategoryAdminComponent implements OnInit {
    categories: CategoryResponse[] = [];
    keyword: string = "";
    addKeyword: string = "";
    currentPage: number = 1;
    itemsPerPage: number = 12;
    totalPages: number = 0;
    // pages: number[] = [];
    visiblePages: number[] = [];
    newCategory: CategoryDTO = {
        name: ""
    }

    constructor(
        private router: Router,
        private categoryService: CategoryService
    ) { }

    ngOnInit() {
        this.getAllCategory(this.keyword, this.currentPage, this.itemsPerPage);
    }

    search(): void {
        this.currentPage = 1;
        this.getAllCategory(this.keyword, this.currentPage, this.itemsPerPage);
        this.keyword = "";
    }

    getAllCategory(keyword: string, page: number, limit: number) {
        this.categoryService.getAllCategories(keyword, page, limit).subscribe({
            next: (response: any) => {
                debugger
                this.categories = response.categories;
                this.totalPages = response.totalPages;
                this.visiblePages = this.generateVisiblePageArray(this.currentPage, this.totalPages);
            },
            complete: () => {
                debugger;
            },
            error: (error: any) => {
                debugger;
                console.error('Error fetching categories:', error);
            }
        }

        )
    }

    onPageChange(page: number) {
        debugger;
        this.currentPage = page;
        this.getAllCategory(this.keyword, this.currentPage, this.itemsPerPage);
    }

    generateVisiblePageArray(currentPage: number, totalPages: number): number[] {
        const maxVisiblePages = 5;
        const halfVisiblePages = Math.floor(maxVisiblePages / 2);

        let startPage = Math.max(currentPage - halfVisiblePages, 1);
        let endPage = Math.min(startPage + maxVisiblePages - 1, totalPages);

        if (endPage - startPage + 1 < maxVisiblePages) {
            startPage = Math.max(endPage - maxVisiblePages + 1, 1);
        }

        return new Array(endPage - startPage + 1).fill(0)
            .map((_, index) => startPage + index);
    }

    deleteCategory(id: number) {
        const confirmation = window
            .confirm('Are you sure you want to delete this category?');
        if (confirmation) {
            debugger
            this.categoryService.deleteCategory(id).subscribe({
                next: (response: any) => {
                    debugger
                    location.reload();
                },
                complete: () => {
                    debugger;
                },
                error: (error: any) => {
                    debugger;
                    console.error('Error fetching categories:', error);
                }
            });
        }
    }

    add() {
        if (this.addKeyword !== "") {
            this.newCategory.name = this.addKeyword;
            this.categoryService.createCategory(this.newCategory).subscribe({
                next: (response: any) => {
                    debugger
                    location.reload();
                    alert("Thêm thành công")
                },
                complete: () => {
                    debugger;
                },
                error: (error: any) => {
                    debugger;
                    console.error('Error fetching categories:', error);
                }
            });;
        }
    }

}

