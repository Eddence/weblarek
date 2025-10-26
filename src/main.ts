import './scss/styles.scss';
import { EventEmitter } from './components/base/Events';
import { ProductCatalog } from './components/Models/ProductCatalog';
import { ShoppingCart } from './components/Models/ShoppingCart';
import { Buyer } from './components/Models/Buyer';
import { Api } from './components/base/Api';
import { LarekAPI } from './components/Api/ShopApi';
import { API_URL } from './utils/constants';
import { Gallery } from './components/View/Gallery';
import { ModalView } from './components/View/ModalView';
import { AppPresenter } from './presenter/AppPresenter';
import { Page } from './components/View/Page';

console.log('API_URL:', API_URL);
console.log('VITE_API_ORIGIN:', import.meta.env.VITE_API_ORIGIN);

const events = new EventEmitter();
const catalog = new ProductCatalog(events);
const cart = new ShoppingCart(events);
const buyer = new Buyer(events);
const api = new Api(API_URL);
const larekApi = new LarekAPI(api);

const pageContainer = document.querySelector('.page') as HTMLElement;
const page = new Page(pageContainer);
const gallery = new Gallery(page.gallery);
const headerBasket = page.basketButton;

headerBasket.addEventListener('click', () => {
    events.emit('header:basket-click');
});

const modalContainer = document.getElementById('modal-container') as HTMLElement;
const modal = new ModalView(modalContainer, events);

new AppPresenter(
    events,
    catalog,
    cart,
    buyer,
    larekApi,
    gallery,
    page,
    modal
);

larekApi.getProducts()
    .then(products => {
        catalog.setProducts(products);
    })
    .catch(err => {
        console.error('Ошибка при загрузке товаров:', err);
    });