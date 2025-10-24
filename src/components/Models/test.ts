import { EventEmitter } from '../base/Events';
import { Products } from './Products';
import { Cart } from './Cart';
import { Buyer } from './Buyer';

console.log('Starting Model Events Test...');

const events = new EventEmitter();

events.on('products:items-changed', (data) => {
    console.log('✓ Event: products:items-changed', data);
});

events.on('products:selected-changed', (data) => {
    console.log('✓ Event: products:selected-changed', data);
});

events.on('cart:item-added', (data) => {
    console.log('✓ Event: cart:item-added', data);
});

events.on('cart:item-removed', (data) => {
    console.log('✓ Event: cart:item-removed', data);
});

events.on('cart:cleared', (data) => {
    console.log('✓ Event: cart:cleared', data);
});

events.on('buyer:data-changed', (data) => {
    console.log('✓ Event: buyer:data-changed', data);
});

events.on('buyer:cleared', (data) => {
    console.log('✓ Event: buyer:cleared', data);
});

const products = new Products(events);
const cart = new Cart(events);
const buyer = new Buyer(events);

console.log('\n=== Testing Products ===');
const testProducts = [
    {
        id: '1',
        title: 'Тестовый товар',
        description: 'Описание',
        image: 'test.jpg',
        category: 'софт-скил',
        price: 1000
    }
];

products.setItems(testProducts);
products.setSelected(testProducts[0]);

console.log('\n=== Testing Cart ===');
cart.add(testProducts[0]);
cart.remove(testProducts[0].id);

console.log('\n=== Testing Buyer ===');
buyer.setData({ payment: 'card', email: 'test@example.com' });
buyer.clear();

console.log('\n✓ All model events tests completed!');
