import { Component } from '../base/Component';
import { IProduct } from '../../types';
import { EventEmitter } from '../base/Events';
import { createCardCatalogView } from './CardCatalogView';

export class GalleryView extends Component<IProduct[]> {
    private events: EventEmitter;

    constructor(container: HTMLElement, events: EventEmitter) {
        super(container);
        this.events = events;
    }

    render(data: Partial<IProduct[]>): HTMLElement {
        if (data) {
            this.clearGallery();
            this.renderProducts(data);
        }
        return this.container;
    }

    private clearGallery(): void {
        this.container.innerHTML = '';
    }

    private renderProducts(products: IProduct[]): void {
        products.forEach(product => {
            const cardView = createCardCatalogView(this.events);
            cardView.render(product);
            
            cardView.container.dataset.productId = product.id;
            
            this.container.appendChild(cardView.container);
        });
    }
}
