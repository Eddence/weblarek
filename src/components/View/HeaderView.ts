import { Component } from '../base/Component';
import { IEvents } from '../../types';

export class HeaderView extends Component<{}> {
    protected _basketCounter: HTMLElement;
    protected _basketButton: HTMLElement;

    constructor(container: HTMLElement, private events: IEvents) {
        super(container);
        this._basketButton = container.querySelector('.header__basket')!;
        this._basketCounter = this._basketButton.querySelector('.header__basket-counter')!;

        this._basketButton.addEventListener('click', () => {
            this.events.emit('header:basket-click');
        });
    }

    set counter(value: number) {
        this.setText(this._basketCounter, String(value));
    }

    get basketButton(): HTMLElement {
        return this._basketButton;
    }
}
