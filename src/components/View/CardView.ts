import { Component } from '../base/Component';
import { EventEmitter } from '../base/Events';
import { IProduct, ICartItem } from '../../types';
import { categoryMap, CDN_URL } from '../../utils/constants';

export abstract class CardView<T> extends Component<T> {
    protected categoryElement: HTMLElement;
    protected titleElement: HTMLElement;
    protected priceElement: HTMLElement;
    protected imageElement: HTMLImageElement;

    constructor(container: HTMLElement) {
        super(container);
        
        this.categoryElement = this.container.querySelector('.card__category') as HTMLElement;
        this.titleElement = this.container.querySelector('.card__title') as HTMLElement;
        this.priceElement = this.container.querySelector('.card__price') as HTMLElement;
        this.imageElement = this.container.querySelector('.card__image') as HTMLImageElement;
    }

    protected setCategory(category: string): void {
        if (this.categoryElement) {
            this.categoryElement.textContent = category;
            
            Object.values(categoryMap).forEach(modifier => {
                this.categoryElement.classList.remove(modifier);
            });
            const modifier = categoryMap[category as keyof typeof categoryMap];
            if (modifier) {
                this.categoryElement.classList.add(modifier);
            }
        }
    }

    protected setTitle(title: string): void {
        if (this.titleElement) {
            this.titleElement.textContent = title;
        }
    }

    protected setPrice(price: number | null): void {
        if (this.priceElement) {
            if (price === null) {
                this.priceElement.textContent = 'Бесценно';
            } else {
                this.priceElement.textContent = `${price} синапсов`;
            }
        }
    }

    protected setImage(src: string, alt?: string): void {
        if (this.imageElement) {
            const fullImageUrl = `${CDN_URL}${src}`;
            this.imageElement.src = fullImageUrl;
            if (alt) {
                this.imageElement.alt = alt;
            }
        }
    }
}
