import './scss/styles.scss';
import { apiProducts } from './utils/data';
import Products from './components/Models/Products';
import Cart from './components/Models/Cart';
import Buyer from './components/Models/Buyer';

// Instantiate models
const productsModel = new Products();
const cartModel = new Cart();
const buyerModel = new Buyer();

// Products model checks
productsModel.setItems(apiProducts.items);
console.log('Массив товаров из каталога:', productsModel.getItems());
const firstId = apiProducts.items[0]?.id;
console.log('Товар по id:', firstId, productsModel.getById(firstId));
productsModel.setSelected(productsModel.getById(firstId) ?? null);
console.log('Выбранный товар:', productsModel.getSelected());

// Cart model checks
if (firstId) {
    const firstProduct = productsModel.getById(firstId)!;
    cartModel.add(firstProduct);
    cartModel.add(firstProduct);
}
console.log('Корзина - позиции:', cartModel.getItems());
console.log('Корзина - количество:', cartModel.getCount());
console.log('Корзина - сумма:', cartModel.getTotal());
if (firstId) {
    console.log('Корзина - содержит товар?', firstId, cartModel.has(firstId));
    cartModel.remove(firstId);
}
console.log('Корзина после удаления:', cartModel.getItems());
cartModel.clear();
console.log('Корзина после очистки:', cartModel.getItems());

// Buyer model checks
buyerModel.setData({ payment: 'card' });
buyerModel.setData({ email: 'test@example.com' });
buyerModel.setData({ phone: '+7 000 000-00-00' });
buyerModel.setData({ address: 'Пример, д. 1' });
console.log('Данные покупателя:', buyerModel.getData());
console.log('Валидация покупателя (ok):', buyerModel.validate());
buyerModel.setData({ email: '' });
console.log('Валидация покупателя (ошибки):', buyerModel.validate());
