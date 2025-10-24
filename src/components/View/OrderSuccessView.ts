import { Component } from '../base/Component';
import { EventEmitter } from '../base/Events';
import { cloneTemplate } from '../../utils/utils';

export class OrderSuccessView extends Component<{ total: number }> {
    private events: EventEmitter;
    private titleElement: HTMLElement;
    private descriptionElement: HTMLElement;
    private closeButton: HTMLButtonElement;

    constructor(container: HTMLElement, events: EventEmitter) {
        super(container);
        this.events = events;
        
        this.titleElement = this.container.querySelector('.order-success__title') as HTMLElement;
        this.descriptionElement = this.container.querySelector('.order-success__description') as HTMLElement;
        this.closeButton = this.container.querySelector('.order-success__close') as HTMLButtonElement;
        
        if (this.closeButton) {
            this.closeButton.addEventListener('click', this.handleCloseClick.bind(this));
        }
    }

    render(data: Partial<{ total: number }>): HTMLElement {
        if (data && data.total !== undefined) {
            this.setTotal(data.total);
        }
        return this.container;
    }

    private setTotal(total: number): void {
        if (this.descriptionElement) {
            this.descriptionElement.textContent = `Списано ${total} синапсов`;
        }
    }

    private handleCloseClick(): void {
        this.events.emit('order-success:close');
    }
}

export function createOrderSuccessView(events: EventEmitter): OrderSuccessView {
    const template = cloneTemplate<HTMLElement>('#success');
    return new OrderSuccessView(template, events);
}
