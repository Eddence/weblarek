# Модели данных с событиями

## Обзор

Все модели данных доработаны для генерации событий при изменении состояния. Это обеспечивает реактивность приложения и синхронизацию между слоями.

## Структура моделей

```
src/components/Models/
├── Products.ts              # Модель товаров
├── Cart.ts                  # Модель корзины
├── Buyer.ts                 # Модель покупателя
├── ModelEventsTester.ts     # Тестовый класс
└── test.ts                  # Простой тест
```

## Изменения в моделях

### ✅ Добавлен EventEmitter
- Все модели теперь принимают `EventEmitter` в конструкторе
- События генерируются при каждом изменении данных

### ✅ Сохранена структура
- Все существующие методы и свойства остались без изменений
- Добавлена только генерация событий

### ✅ Оптимизация событий
- События генерируются только при реальных изменениях
- В модели `Buyer` проверяется, изменились ли данные перед генерацией события

## События моделей

### Products модель
- `products:items-changed` - изменение списка товаров
- `products:selected-changed` - изменение выбранного товара

### Cart модель
- `cart:item-added` - добавление товара в корзину
- `cart:item-removed` - удаление товара из корзины
- `cart:cleared` - очистка корзины

### Buyer модель
- `buyer:data-changed` - изменение данных покупателя
- `buyer:cleared` - очистка данных покупателя

## Использование

### Создание моделей с событиями

```typescript
import { EventEmitter } from '../base/Events';
import { Products, Cart, Buyer } from './Models';

const events = new EventEmitter();

const products = new Products(events);
const cart = new Cart(events);
const buyer = new Buyer(events);
```

### Настройка слушателей событий

```typescript
events.on('products:items-changed', (data) => {
    console.log('Товары обновлены:', data.items);
});

events.on('cart:item-added', (data) => {
    console.log('Товар добавлен:', data.item);
    console.log('Всего товаров:', data.items.length);
});

events.on('buyer:data-changed', (data) => {
    console.log('Данные покупателя изменены:', data.data);
});
```

### Работа с моделями

```typescript
// Products
products.setItems([
    { id: '1', title: 'Товар 1', price: 1000, ... }
]);
products.setSelected(products.getById('1'));

// Cart
cart.add(product);
cart.remove('1');
cart.clear();

// Buyer
buyer.setData({ payment: 'card', email: 'test@example.com' });
buyer.clear();
```

## Интеграция с Презентером

Модели с событиями идеально подходят для использования в Презентере:

```typescript
class AppPresenter {
    private events: EventEmitter;
    private products: Products;
    private cart: Cart;
    private buyer: Buyer;

    constructor() {
        this.events = new EventEmitter();
        this.initializeModels();
        this.setupModelEventListeners();
    }

    private initializeModels(): void {
        this.products = new Products(this.events);
        this.cart = new Cart(this.events);
        this.buyer = new Buyer(this.events);
    }

    private setupModelEventListeners(): void {
        this.events.on('products:items-changed', (data) => {
            this.galleryView.render(data.items);
        });

        this.events.on('cart:item-added', (data) => {
            this.headerView.render({ count: data.items.length });
        });

        this.events.on('buyer:data-changed', (data) => {
            this.orderFormView.render(data.data);
        });
    }
}
```

## Тестирование

### Запуск тестов

```typescript
import { runModelEventsTests } from './src/components/Models/ModelEventsTester';

runModelEventsTests();
```

### Тестирование отдельных моделей

```typescript
import { ModelEventsTester } from './src/components/Models/ModelEventsTester';

const tester = new ModelEventsTester();
tester.testProductsEvents();
tester.testCartEvents();
tester.testBuyerEvents();
```

## Принципы работы

1. **Реактивность:** Любое изменение данных генерирует событие
2. **Консистентность:** Состояние модели всегда синхронизировано с событиями
3. **Производительность:** События не генерируются при установке тех же значений
4. **Полная информация:** События содержат все необходимые данные для обновления UI

## Совместимость

- ✅ Все существующие методы работают как прежде
- ✅ Добавлена только генерация событий
- ✅ Обратная совместимость сохранена
- ✅ Типизация не нарушена

## Заключение

Модели данных теперь полностью реактивны и готовы для использования в архитектуре MVP. События обеспечивают автоматическую синхронизацию состояния между слоями приложения.
