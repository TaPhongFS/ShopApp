import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { Product } from '../models/product';
import { ProductDTO } from '../dtos/product/product.dto';

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    private apiGetProducts = `${environment.apiBaseUrl}/products`;
    // private apiConfig = {
    //     headers: this.createHeaders()
    // }

    constructor(private http: HttpClient) { }

    // private createHeaders(): HttpHeaders {
    //     return new HttpHeaders({
    //         'Content-Type': 'multipart/form-data'
    //     });
    // }

    getProducts(keyword: string, categoryId: number,
        page: number, limit: number
    ): Observable<Product[]> {
        const params = new HttpParams()
            .set('keyword', keyword)
            .set('category_id', categoryId)
            .set('page', page.toString())
            .set('limit', limit.toString());
        return this.http.get<Product[]>(this.apiGetProducts, { params });
    }

    getDetailProduct(productId: number): Observable<Product> {
        return this.http.get<Product>(`${environment.apiBaseUrl}/products/${productId}`);
    }

    getProductsByIds(productIds: number[]): Observable<Product[]> {
        // Chuyển danh sách ID thành một chuỗi và truyền vào params
        debugger
        const params = new HttpParams().set('ids', productIds.join(','));
        return this.http.get<Product[]>(`${this.apiGetProducts}/by-ids`, { params });
    }

    createProduct(product: ProductDTO): Observable<any> {
        return this.http.post(this.apiGetProducts, product);
    }

    updateProduct(id: number, product: ProductDTO): Observable<any> {
        return this.http.put(`${environment.apiBaseUrl}/products/${id}`, product);
    }


    deleteProduct(id: number): Observable<any> {
        const url = `${environment.apiBaseUrl}/products/${id}`;
        return this.http.delete(url, { responseType: 'text' });
    }

    // uploadImage(files: FormData, id: number) {
    //     return this.http.post(`${environment.apiBaseUrl}/products/uploads/${id}`, files, this.apiConfig);
    // }
}
