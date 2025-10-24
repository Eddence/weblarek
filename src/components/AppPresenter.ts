import { EventEmitter } from '../base/Events';
import { Products, Cart, Buyer } from './Models';
import { 
    HeaderView,
    GalleryView,
    ModalView,
    createBasketView,
    createOrderFormView,
    createContactsFormView,
    createOrderSuccessView
} from '../View';
import { IProduct } from '../../types';

export class AppPresenter {
    private events: EventEmitter;
    private products: Products;
    private cart: Cart;
    private buyer: Buyer;
    private headerView: HeaderView;
    private galleryView: GalleryView;
    private modalView: ModalView;

    constructor() {
        this.events = new EventEmitter();
        this.initializeModels();
        this.initializeViews();
        this.setupEventListeners();
    }

    private initializeModels(): void {
        this.products = new Products(this.events);
        this.cart = new Cart(this.events);
        this.buyer = new Buyer(this.events);
    }

    private initializeViews(): void {
        const headerElement = document.querySelector('.header') as HTMLElement;
        const galleryElement = document.querySelector('.gallery') as HTMLElement;
        const modalElement = document.querySelector('.modal') as HTMLElement;

        if (headerElement) {
            this.headerView = new HeaderView(headerElement, this.events);
        }
        if (galleryElement) {
            this.galleryView = new GalleryView(galleryElement, this.events);
        }
        if (modalElement) {
            this.modalView = new ModalView(modalElement, this.events);
        }
    }

    private setupEventListeners(): void {
        this.events.on('products:items-changed', (data) => {
            this.galleryView.render(data.items);
        });

        this.events.on('cart:item-added', (data) => {
            this.headerView.render({ count: data.items.length });
        });

        this.events.on('cart:item-removed', (data) => {
            this.headerView.render({ count: data.items.length });
        });

        this.events.on('cart:cleared', () => {
            this.headerView.render({ count: 0 });
        });

        this.events.on('card:select', (data) => {
            const productId = data.product.dataset.productId;
            const product = this.products.getById(productId);
            if (product) {
                this.products.setSelected(product);
                this.showProductPreview(product);
            }
        });

        this.events.on('card:add-to-cart', (data) => {
            const productId = data.product.dataset.productId;
            const product = this.products.getById(productId);
            if (product) {
                this.cart.add(product);
            }
        });

        this.events.on('card:remove-from-cart', (data) => {
            this.cart.remove(data.productId);
        });

        this.events.on('header:basket-open', () => {
            this.showBasket();
        });

        this.events.on('basket:order', () => {
            this.showOrderForm();
        });

        this.events.on('order:payment-change', (data) => {
            this.buyer.setData({ payment: data.payment });
        });

        this.events.on('order:address-change', (data) => {
            this.buyer.setData({ address: data.address });
        });

        this.events.on('contacts:email-change', (data) => {
            this.buyer.setData({ email: data.email });
        });

        this.events.on('contacts:phone-change', (data) => {
            this.buyer.setData({ phone: data.phone });
        });

        this.events.on('form:submit', (data) => {
            if (data.form === 'order') {
                this.processOrderForm();
            } else if (data.form === 'contacts') {
                this.processContactsForm();
            }
        });

        this.events.on('order-success:close', () => {
            this.modalView.close();
            this.cart.clear();
            this.buyer.clear();
        });

        this.events.on('modal:close', () => {
            this.modalView.close();
        });
    }

    private showProductPreview(product: IProduct): void {
        const previewCard = createCardPreviewView(this.events);
        previewCard.render(product);
        this.modalView.open(previewCard.container);
    }

    private showBasket(): void {
        const basketView = createBasketView(this.events);
        basketView.render(this.cart.getItems());
        this.modalView.open(basketView.container);
    }

    private showOrderForm(): void {
        const orderForm = createOrderFormView(this.events);
        orderForm.render(this.buyer.getData());
        this.modalView.open(orderForm.container);
    }

    private processOrderForm(): void {
        const errors = this.buyer.validate();
        if (Object.keys(errors).length === 0) {
            this.showContactsForm();
        }
    }

    private showContactsForm(): void {
        const contactsForm = createContactsFormView(this.events);
        contactsForm.render(this.buyer.getData());
        this.modalView.open(contactsForm.container);
    }

    private processContactsForm(): void {
        const errors = this.buyer.validate();
        if (Object.keys(errors).length === 0) {
            this.showOrderSuccess();
        }
    }

    private showOrderSuccess(): void {
        const successView = createOrderSuccessView(this.events);
        const total = this.cart.getTotal();
        successView.render({ total: total || 0 });
        this.modalView.open(successView.container);
    }

    public loadProducts(products: IProduct[]): void {
        this.products.setItems(products);
    }
}

export function createApp(): AppPresenter {
    return new AppPresenter();
}
