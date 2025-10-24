import { Component } from '../base/Component';
import { EventEmitter } from '../base/Events';

export class ModalView extends Component<{ content: HTMLElement }> {
    private events: EventEmitter;
    private modalContainer: HTMLElement;
    private closeButton: HTMLButtonElement;
    private contentContainer: HTMLElement;

    constructor(container: HTMLElement, events: EventEmitter) {
        super(container);
        this.events = events;
        
        this.modalContainer = this.container;
        this.closeButton = this.container.querySelector('.modal__close') as HTMLButtonElement;
        this.contentContainer = this.container.querySelector('.modal__content') as HTMLElement;
        
        if (this.closeButton) {
            this.closeButton.addEventListener('click', this.handleCloseClick.bind(this));
        }
        
        this.modalContainer.addEventListener('click', this.handleOverlayClick.bind(this));
        
        if (this.contentContainer) {
            this.contentContainer.addEventListener('click', (event) => {
                event.stopPropagation();
            });
        }
    }

    render(data: Partial<{ content: HTMLElement }>): HTMLElement {
        if (data && data.content) {
            this.setContent(data.content);
        }
        return this.container;
    }

    open(content: HTMLElement): void {
        this.setContent(content);
        this.show();
    }

    close(): void {
        this.hide();
        this.clearContent();
    }

    private show(): void {
        this.modalContainer.classList.add('modal_active');
    }

    private hide(): void {
        this.modalContainer.classList.remove('modal_active');
    }

    private setContent(content: HTMLElement): void {
        if (this.contentContainer) {
            this.contentContainer.innerHTML = '';
            this.contentContainer.appendChild(content);
        }
    }

    private clearContent(): void {
        if (this.contentContainer) {
            this.contentContainer.innerHTML = '';
        }
    }

    private handleCloseClick(): void {
        this.close();
        this.events.emit('modal:close');
    }

    private handleOverlayClick(event: Event): void {
        if (event.target === this.modalContainer) {
            this.close();
            this.events.emit('modal:close');
        }
    }
}
