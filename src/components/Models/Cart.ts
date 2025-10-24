import { ICartItem, IProduct } from '../../types';
import { EventEmitter } from '../base/Events';

export class Cart {
    private items: ICartItem[] = [];
    private events: EventEmitter;

    constructor(events: EventEmitter) {
        this.events = events;
    }

    getItems(): ICartItem[] {
        return this.items;
    }

    add(product: IProduct): void {
        const existing = this.items.find((i) => i.productId === product.id);
        if (!existing) {
            const newItem: ICartItem = {
                productId: product.id,
                title: product.title,
                price: product.price,
                quantity: 1,
            };
            this.items.push(newItem);
            this.events.emit('cart:item-added', { item: newItem, items: this.items });
        }
    }

    remove(productId: string): void {
        const itemToRemove = this.items.find((i) => i.productId === productId);
        this.items = this.items.filter((i) => i.productId !== productId);
        if (itemToRemove) {
            this.events.emit('cart:item-removed', { item: itemToRemove, items: this.items });
        }
    }

    clear(): void {
        const clearedItems = [...this.items];
        this.items = [];
        this.events.emit('cart:cleared', { items: clearedItems });
    }

    getCount(): number {
        return this.items.reduce((sum, i) => sum + i.quantity, 0);
    }

    getTotal(): number | null {
        if (this.items.some((i) => i.price === null)) return null;
        return this.items.reduce((sum, i) => sum + (i.price as number) * i.quantity, 0);
    }

    has(productId: string): boolean {
        return this.items.some((i) => i.productId === productId);
    }
}

export default Cart;

