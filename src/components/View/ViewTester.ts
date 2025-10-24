import { EventEmitter } from '../base/Events';
import { 
    HeaderView, 
    GalleryView, 
    ModalView,
    createCardCatalogView,
    createCardPreviewView,
    createCardBasketView,
    createBasketView,
    createOrderFormView,
    createContactsFormView,
    createOrderSuccessView
} from './index';
import { IProduct, ICartItem, IBuyer } from '../../types';

export class ViewTester {
    private events: EventEmitter;

    constructor() {
        this.events = new EventEmitter();
        this.setupEventListeners();
    }

    testHeaderView(): void {
        console.log('Testing HeaderView...');
        
        const headerElement = document.querySelector('.header') as HTMLElement;
        if (headerElement) {
            const headerView = new HeaderView(headerElement, this.events);
            headerView.render({ count: 5 });
            console.log('✓ HeaderView rendered successfully');
        } else {
            console.log('✗ Header element not found');
        }
    }

    testGalleryView(): void {
        console.log('Testing GalleryView...');
        
        const galleryElement = document.querySelector('.gallery') as HTMLElement;
        if (galleryElement) {
            const galleryView = new GalleryView(galleryElement, this.events);
            
            const testProducts: IProduct[] = [
                {
                    id: '1',
                    title: 'Тестовый товар 1',
                    description: 'Описание товара 1',
                    image: 'test1.jpg',
                    category: 'софт-скил',
                    price: 1000
                },
                {
                    id: '2',
                    title: 'Тестовый товар 2',
                    description: 'Описание товара 2',
                    image: 'test2.jpg',
                    category: 'хард-скил',
                    price: 2000
                }
            ];
            
            galleryView.render(testProducts);
            console.log('✓ GalleryView rendered successfully');
        } else {
            console.log('✗ Gallery element not found');
        }
    }

    testModalView(): void {
        console.log('Testing ModalView...');
        
        const modalElement = document.querySelector('.modal') as HTMLElement;
        if (modalElement) {
            const modalView = new ModalView(modalElement, this.events);
            
            // Создаем тестовый контент
            const testContent = document.createElement('div');
            testContent.textContent = 'Тестовый контент модального окна';
            
            modalView.open(testContent);
            console.log('✓ ModalView opened successfully');
            
            setTimeout(() => {
                modalView.close();
                console.log('✓ ModalView closed successfully');
            }, 2000);
        } else {
            console.log('✗ Modal element not found');
        }
    }

    testCardViews(): void {
        console.log('Testing Card Views...');
        
        const catalogCard = createCardCatalogView(this.events);
        catalogCard.render({
            id: '1',
            title: 'Тестовая карточка каталога',
            description: 'Описание',
            image: 'test.jpg',
            category: 'софт-скил',
            price: 1000
        });
        console.log('✓ CardCatalogView created successfully');
        
        const previewCard = createCardPreviewView(this.events);
        previewCard.render({
            id: '2',
            title: 'Тестовая карточка предпросмотра',
            description: 'Описание товара',
            image: 'test.jpg',
            category: 'хард-скил',
            price: 2000
        });
        console.log('✓ CardPreviewView created successfully');
        
        const basketCard = createCardBasketView(this.events);
        basketCard.render({
            productId: '3',
            title: 'Тестовый товар в корзине',
            price: 1500,
            quantity: 1
        });
        console.log('✓ CardBasketView created successfully');
    }

    testFormViews(): void {
        console.log('Testing Form Views...');
        
        const orderForm = createOrderFormView(this.events);
        orderForm.render({
            payment: 'card',
            email: '',
            phone: '',
            address: 'Тестовый адрес'
        });
        console.log('✓ OrderFormView created successfully');
        
        const contactsForm = createContactsFormView(this.events);
        contactsForm.render({
            payment: 'card',
            email: 'test@example.com',
            phone: '+7 (999) 123-45-67',
            address: ''
        });
        console.log('✓ ContactsFormView created successfully');
    }

    testBasketAndSuccess(): void {
        console.log('Testing Basket and Success Views...');
        
        const basket = createBasketView(this.events);
        const testItems: ICartItem[] = [
            {
                productId: '1',
                title: 'Товар 1',
                price: 1000,
                quantity: 1
            },
            {
                productId: '2',
                title: 'Товар 2',
                price: 2000,
                quantity: 2
            }
        ];
        basket.render(testItems);
        console.log('✓ BasketView created successfully');
        
        const successView = createOrderSuccessView(this.events);
        successView.render({ total: 5000 });
        console.log('✓ OrderSuccessView created successfully');
    }

    runAllTests(): void {
        console.log('Starting View Components Tests...\n');
        
        this.testHeaderView();
        this.testGalleryView();
        this.testModalView();
        this.testCardViews();
        this.testFormViews();
        this.testBasketAndSuccess();
        
        console.log('\n✓ All tests completed!');
    }

    private setupEventListeners(): void {
        this.events.on('card:select', (data) => {
            console.log('Event: card:select', data);
        });
        
        this.events.on('card:add-to-cart', (data) => {
            console.log('Event: card:add-to-cart', data);
        });
        
        this.events.on('card:remove-from-cart', (data) => {
            console.log('Event: card:remove-from-cart', data);
        });
        
        this.events.on('header:basket-open', () => {
            console.log('Event: header:basket-open');
        });
        
        this.events.on('basket:order', () => {
            console.log('Event: basket:order');
        });
        
        this.events.on('order:payment-change', (data) => {
            console.log('Event: order:payment-change', data);
        });
        
        this.events.on('order:address-change', (data) => {
            console.log('Event: order:address-change', data);
        });
        
        this.events.on('contacts:email-change', (data) => {
            console.log('Event: contacts:email-change', data);
        });
        
        this.events.on('contacts:phone-change', (data) => {
            console.log('Event: contacts:phone-change', data);
        });
        
        this.events.on('form:submit', (data) => {
            console.log('Event: form:submit', data);
        });
        
        this.events.on('order-success:close', () => {
            console.log('Event: order-success:close');
        });
        
        this.events.on('modal:close', () => {
            console.log('Event: modal:close');
        });
    }
}

export function runViewTests(): void {
    const tester = new ViewTester();
    tester.runAllTests();
}
