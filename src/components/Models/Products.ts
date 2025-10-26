import { IProduct } from '../../types';
import { EventEmitter } from '../base/Events';

export class Products {
    private products: IProduct[] = [];
    private selected: IProduct | null = null;
    private events: EventEmitter;

    constructor(events: EventEmitter) {
        this.events = events;
    }

    setItems(items: IProduct[]): void {
        console.log('Products.setItems вызван с', items.length, 'товарами');
        this.products = Array.isArray(items) ? items.slice() : [];
        console.log('Products эмитит событие products:items-changed');
        this.events.emit('products:items-changed', { items: this.products });
    }

    getItems(): IProduct[] {
        return this.products.slice();
    }

    getById(id: string): IProduct | undefined {
        return this.products.find((p) => p.id === id);
    }

    setSelected(product: IProduct | null): void {
        this.selected = product;
        this.events.emit('products:selected-changed', { product: this.selected });
    }

    getSelected(): IProduct | null {
        return this.selected;
    }
}

export default Products;

