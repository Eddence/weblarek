import { Component } from '../base/Component';

export class Page extends Component<{}> {
    protected _gallery: HTMLElement;

    constructor(container: HTMLElement) {
        super(container);
        this._gallery = container.querySelector('.gallery')!;
    }

    get gallery(): HTMLElement {
        return this._gallery;
    }
}