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
import { BasketButtonView } from './components/View/BasketButtonView';

const events = new EventEmitter();
const catalog = new ProductCatalog(events);
const cart = new ShoppingCart(events);
const buyer = new Buyer(events);
const api = new Api(API_URL);
const larekApi = new LarekAPI(api);

const pageContainer = document.querySelector('.page') as HTMLElement;
const page = new Page(pageContainer);
const gallery = new Gallery(page.gallery);
const basketButtonContainer = document.querySelector('.header') as HTMLElement;
const basketButton = new BasketButtonView(basketButtonContainer, events);

const modalContainer = document.getElementById('modal-container') as HTMLElement;
const modal = new ModalView(modalContainer, events);

new AppPresenter(
    events,
    catalog,
    cart,
    buyer,
    larekApi,
    gallery,
    basketButton,
    modal
);

larekApi.getProducts()
    .then(products => {
        catalog.setProducts(products);
    })
    .catch(err => {
        console.error('Ошибка при загрузке товаров:', err);
    });