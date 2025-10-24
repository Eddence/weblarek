Инструкция по использованию

Обзор

Все классы слоя Представления (View) реализованы согласно архитектурным принципам проекта. Каждый класс отвечает за свой блок разметки и генерирует события для взаимодействия с Презентером.

Структура файлов

```
src/components/View/
├── CardView.ts              # Базовый класс для карточек
├── CardCatalogView.ts       # Карточка товара в каталоге
├── CardPreviewView.ts       # Карточка товара в детальном просмотре
├── CardBasketView.ts        # Карточка товара в корзине
├── FormView.ts              # Базовый класс для форм
├── OrderFormView.ts         # Форма оформления заказа
├── ContactsFormView.ts      # Форма контактных данных
├── HeaderView.ts            # Шапка сайта
├── GalleryView.ts           # Каталог товаров
├── BasketView.ts            # Корзина товаров
├── OrderSuccessView.ts      # Уведомление об успешном заказе
├── ModalView.ts             # Модальное окно
├── index.ts                 # Экспорт всех классов
├── ViewTester.ts            # Тестовый класс
├── ViewExample.ts           # Пример использования
└── test.ts                  # Простой тест
```

Основные принципы реализации


Быстрый старт

1. Импорт классов

```typescript
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
} from './src/components/View';
```

2. Создание EventEmitter

```typescript
const events = new EventEmitter();
```

3. Настройка слушателей событий

```typescript
events.on('card:select', (data) => {

});

events.on('form:submit', (data) => {

});
```

4. Создание и использование компонентов

```typescript

const cardView = createCardCatalogView(events);
const basketView = createBasketView(events);

cardView.render(productData);
basketView.render(cartItems);
```

Примеры использования

Создание каталога товаров

```typescript
const galleryElement = document.querySelector('.gallery') as HTMLElement;
const galleryView = new GalleryView(galleryElement, events);

const products: IProduct[] = [
    {
        id: '1',
        title: 'Товар 1',
        description: 'Описание',
        image: 'image1.jpg',
        category: 'софт-скил',
        price: 1000
    }
];

galleryView.render(products);
```

Работа с модальным окном

```typescript
const modalElement = document.querySelector('.modal') as HTMLElement;
const modalView = new ModalView(modalElement, events);

const orderForm = createOrderFormView(events);
modalView.open(orderForm.container);

modalView.close();
```

Обработка событий форм

```typescript
events.on('order:payment-change', (data) => {
    console.log('Способ оплаты:', data.payment);
});

events.on('contacts:email-change', (data) => {
    console.log('Email:', data.email);
});
```

События

Все события генерируются в формате `компонент:действие`:

- `card:select` - выбор карточки товара
- `card:add-to-cart` - добавление в корзину
- `card:remove-from-cart` - удаление из корзины
- `header:basket-open` - открытие корзины
- `basket:order` - оформление заказа
- `form:submit` - отправка формы
- `order:payment-change` - изменение способа оплаты
- `order:address-change` - изменение адреса
- `contacts:email-change` - изменение email
- `contacts:phone-change` - изменение телефона
- `order-success:close` - закрытие уведомления
- `modal:close` - закрытие модального окна

Тестирование

Запуск тестов

```typescript
import { runViewTests } from './src/components/View/ViewTester';

runViewTests();
```

Тестирование отдельных компонентов

```typescript
import { ViewTester } from './src/components/View/ViewTester';

const tester = new ViewTester();
tester.testHeaderView();
tester.testCardViews();
```

Интеграция с Презентером

View компоненты должны использоваться в Презентере следующим образом:

```typescript
class AppPresenter {
    private events: EventEmitter;
    private headerView: HeaderView;
    private galleryView: GalleryView;
    private modalView: ModalView;

    constructor() {
        this.events = new EventEmitter();
        this.initializeViews();
        this.setupEventListeners();
    }

    private initializeViews(): void { 
    }

    private setupEventListeners(): void {
    }
}
```
