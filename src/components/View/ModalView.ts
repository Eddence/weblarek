import { Component } from '../base/Component';
import { IEvents } from '../../types';

export class ModalView extends Component<{}> {
    private _content: HTMLElement;
    private _handleEscape: (event: KeyboardEvent) => void;

    constructor(container: HTMLElement, private events: IEvents) {
        super(container);
        this._content = container.querySelector('.modal__content')!;

        this._handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                this.close();
            }
        };

        const closeBtn = container.querySelector('.modal__close');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                this.close();
            });
        }

        container.addEventListener('click', (e) => {
            if (e.target === container) {
                this.close();
            }
        });
    }

    open(content: HTMLElement) {
        this._content.replaceChildren(content);
        this.toggleModal(true);
        document.addEventListener('keydown', this._handleEscape);
        // Блокируем скролл основной страницы
        document.body.style.overflow = 'hidden';
    }

    close() {
        this.toggleModal(false);
        document.removeEventListener('keydown', this._handleEscape);
        // Восстанавливаем скролл основной страницы
        document.body.style.overflow = '';
        this.events.emit('modal:close');
    }

    private toggleModal(state: boolean) {
        this.toggleClass(this.container, 'modal_active', state);
    }
}