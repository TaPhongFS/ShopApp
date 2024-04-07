import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { Category } from '../models/category';
import { CategoryResponse } from '../responses/category/category.response';
import { CategoryDTO } from '../dtos/category/category.dto';
@Injectable({
    providedIn: 'root'
})
export class CategoryService {
    private apiGetCategories = `${environment.apiBaseUrl}/categories`;
    private apiGetAllCategories = `${environment.apiBaseUrl}/categories/get-category-by-keyword`;

    constructor(private http: HttpClient) { }
    getCategories(): Observable<Category[]> {
        return this.http.get<Category[]>(this.apiGetCategories);
    }

    getAllCategories(keyword: string,
        page: number, limit: number
    ): Observable<CategoryResponse[]> {
        debugger
        const params = new HttpParams()
            .set('keyword', keyword)
            .set('page', page.toString())
            .set('limit', limit.toString());
        return this.http.get<any>(this.apiGetAllCategories, { params });
    }

    deleteCategory(id: number): Observable<any> {
        const url = `${environment.apiBaseUrl}/categories/${id}`;
        return this.http.delete(url, { responseType: 'text' });
    }

    createCategory(data: CategoryDTO): Observable<any> {
        return this.http.post(this.apiGetCategories, data);
    }
}
