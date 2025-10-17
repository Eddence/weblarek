import { IProduct } from '../../types';

export class Products {
    private products: IProduct[] = [];
    private selected: IProduct | null = null;

    setItems(items: IProduct[]): void {
        this.products = Array.isArray(items) ? items.slice() : [];
    }

    getItems(): IProduct[] {
        return this.products.slice();
    }

    getById(id: string): IProduct | undefined {
        return this.products.find((p) => p.id === id);
    }

    setSelected(product: IProduct | null): void {
        this.selected = product;
    }

    getSelected(): IProduct | null {
        return this.selected;
    }
}

export default Products;

