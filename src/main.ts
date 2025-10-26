import './scss/styles.scss';
import { Api } from './components/base/Api';
import ShopApi from './components/Api/ShopApi';
import { API_URL } from './utils/constants';
import { AppPresenter } from './components/AppPresenter';

console.log('API_URL:', API_URL);
console.log('VITE_API_ORIGIN:', import.meta.env.VITE_API_ORIGIN);

// Initialize application
const app = new AppPresenter();

// Load products from API
const apiClient = new Api(API_URL);
const shopApi = new ShopApi(apiClient);

console.log('Загрузка продуктов с сервера...');
shopApi.getProducts()
    .then((items) => {
        console.log('Товары загружены с сервера:', items.length, 'шт.');
        console.log('Товары:', items);
        app.loadProducts(items);
    })
    .catch((err) => {
        console.error('Ошибка загрузки каталога:', err);
    });
