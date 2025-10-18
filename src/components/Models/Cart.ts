import { ICartItem, IProduct } from '../../types';

export class Cart {
    private items: ICartItem[] = [];

    getItems(): ICartItem[] {
        return this.items;
    }

    add(product: IProduct): void {
        const existing = this.items.find((i) => i.productId === product.id);
        if (!existing) {
            this.items.push({
                productId: product.id,
                title: product.title,
                price: product.price,
                quantity: 1,
            });
        }
    }

    remove(productId: string): void {
        this.items = this.items.filter((i) => i.productId !== productId);
    }

    clear(): void {
        this.items = [];
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

