import { ProductImage } from "../../models/product.image";

export interface ProductResponse {
    id: number;
    name: string;
    price: number;
    thumbnail: string;
    description: string;
    category_id: number;
    url: string;
    product_images: ProductImage[];
    created_at: any;
    updated_at: any;
}


