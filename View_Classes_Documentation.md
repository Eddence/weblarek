# Документация классов слоя Представления (View)

## Обзор

Слой Представления (View) отвечает за отображение данных пользователю и обработку пользовательских взаимодействий. Все классы View наследуются от базового класса `Component<T>` и используют систему событий `EventEmitter` для коммуникации с Презентером.

## Архитектурные принципы

1. **Разделение ответственности**: каждый класс View отвечает за свой блок разметки
2. **Наследование**: классы карточек и форм имеют общих родителей с общим функционалом
3. **Изоляция модальных окон**: модальное окно не имеет дочерних классов и не наследуется
4. **Событийная модель**: все пользовательские действия генерируют события для Презентера

## Базовые классы

### Component<T>
**Базовый класс для всех компонентов View**

```typescript
abstract class Component<T> {
    protected constructor(protected readonly container: HTMLElement)
    protected setImage(element: HTMLImageElement, src: string, alt?: string): void
    render(data?: Partial<T>): HTMLElement
}
```

**Ответственность:**
- Предоставляет базовый функционал для работы с DOM
- Управляет жизненным циклом компонента
- Обеспечивает типизацию данных компонента

## Классы карточек товаров

### CardView (Родительский класс)
**Базовый класс для всех типов карточек товаров**

```typescript
abstract class CardView<T> extends Component<T> {
    protected constructor(container: HTMLElement)
    protected setCategory(element: HTMLElement, category: string): void
    protected setTitle(element: HTMLElement, title: string): void
    protected setPrice(element: HTMLElement, price: number | null): void
    protected setImage(element: HTMLImageElement, src: string, alt?: string): void
}
```

**Ответственность:**
- Общий функционал для всех типов карточек
- Управление отображением категории, названия, цены и изображения
- Определение общих методов для дочерних классов

**События:**
- `card:select` - выбор карточки товара
- `card:add-to-cart` - добавление товара в корзину
- `card:remove-from-cart` - удаление товара из корзины

### CardCatalogView
**Карточка товара в каталоге (шаблон: card-catalog)**

```typescript
class CardCatalogView extends CardView<IProduct> {
    constructor(container: HTMLElement)
    render(data: Partial<IProduct>): HTMLElement
    private handleClick(): void
}
```

**Ответственность:**
- Отображение товара в каталоге
- Обработка клика для открытия детального просмотра
- Использование класса `card` без модификаторов

**События:**
- `card:select` - при клике на карточку

### CardPreviewView
**Карточка товара в детальном просмотре (шаблон: card-preview)**

```typescript
class CardPreviewView extends CardView<IProduct> {
    constructor(container: HTMLElement)
    render(data: Partial<IProduct>): HTMLElement
    private handleAddToCart(): void
}
```

**Ответственность:**
- Отображение детальной информации о товаре
- Кнопка "В корзину" для добавления товара
- Использование класса `card card_full`

**События:**
- `card:add-to-cart` - при нажатии кнопки "В корзину"

### CardBasketView
**Карточка товара в корзине (шаблон: card-basket)**

```typescript
class CardBasketView extends CardView<ICartItem> {
    constructor(container: HTMLElement)
    render(data: Partial<ICartItem>): HTMLElement
    private handleDelete(): void
}
```

**Ответственность:**
- Отображение товара в списке корзины
- Кнопка удаления товара из корзины
- Использование класса `card card_compact`

**События:**
- `card:remove-from-cart` - при нажатии кнопки удаления

## Классы форм

### FormView (Родительский класс)
**Базовый класс для всех форм**

```typescript
abstract class FormView<T> extends Component<T> {
    protected constructor(container: HTMLElement)
    protected setInputValue(input: HTMLInputElement, value: string): void
    protected getInputValue(input: HTMLInputElement): string
    protected setErrors(errors: Record<string, string>): void
    protected validate(): boolean
    protected handleSubmit(event: Event): void
}
```

**Ответственность:**
- Общий функционал для всех форм
- Валидация полей формы
- Обработка отправки формы
- Управление ошибками валидации

**События:**
- `form:submit` - отправка формы
- `form:validate` - валидация формы

### OrderFormView
**Форма оформления заказа (шаблон: order)**

```typescript
class OrderFormView extends FormView<IBuyer> {
    constructor(container: HTMLElement)
    render(data: Partial<IBuyer>): HTMLElement
    private handlePaymentSelect(event: Event): void
    private handleAddressChange(event: Event): void
}
```

**Ответственность:**
- Выбор способа оплаты (онлайн/при получении)
- Ввод адреса доставки
- Валидация обязательных полей

**События:**
- `order:payment-change` - изменение способа оплаты
- `order:address-change` - изменение адреса
- `form:submit` - отправка формы заказа

### ContactsFormView
**Форма контактных данных (шаблон: contacts)**

```typescript
class ContactsFormView extends FormView<IBuyer> {
    constructor(container: HTMLElement)
    render(data: Partial<IBuyer>): HTMLElement
    private handleEmailChange(event: Event): void
    private handlePhoneChange(event: Event): void
}
```

**Ответственность:**
- Ввод email и телефона покупателя
- Валидация формата email и телефона
- Финальное подтверждение заказа

**События:**
- `contacts:email-change` - изменение email
- `contacts:phone-change` - изменение телефона
- `form:submit` - отправка формы контактов

## Основные компоненты интерфейса

### HeaderView
**Шапка сайта**

```typescript
class HeaderView extends Component<{ count: number }> {
    constructor(container: HTMLElement)
    render(data: Partial<{ count: number }>): HTMLElement
    private handleBasketClick(): void
}
```

**Ответственность:**
- Отображение логотипа сайта
- Счетчик товаров в корзине
- Кнопка открытия корзины

**События:**
- `header:basket-open` - открытие корзины

### GalleryView
**Каталог товаров**

```typescript
class GalleryView extends Component<IProduct[]> {
    constructor(container: HTMLElement)
    render(data: Partial<IProduct[]>): HTMLElement
    private createCard(product: IProduct): HTMLElement
}
```

**Ответственность:**
- Отображение сетки товаров
- Создание карточек товаров
- Управление макетом каталога

**События:**
- События передаются через дочерние CardCatalogView

### BasketView
**Корзина товаров (шаблон: basket)**

```typescript
class BasketView extends Component<ICartItem[]> {
    constructor(container: HTMLElement)
    render(data: Partial<ICartItem[]>): HTMLElement
    private createBasketItem(item: ICartItem, index: number): HTMLElement
    private handleOrderClick(): void
    private updateTotal(): void
}
```

**Ответственность:**
- Отображение списка товаров в корзине
- Подсчет общей стоимости
- Кнопка оформления заказа

**События:**
- `basket:order` - переход к оформлению заказа
- События удаления товаров передаются через дочерние CardBasketView

### OrderSuccessView
**Уведомление об успешном заказе (шаблон: success)**

```typescript
class OrderSuccessView extends Component<{ total: number }> {
    constructor(container: HTMLElement)
    render(data: Partial<{ total: number }>): HTMLElement
    private handleCloseClick(): void
}
```

**Ответственность:**
- Отображение сообщения об успешном оформлении заказа
- Показ суммы списанных синапсов
- Кнопка возврата к покупкам

**События:**
- `order-success:close` - закрытие уведомления

## Модальные окна

### ModalView
**Базовое модальное окно**

```typescript
class ModalView extends Component<{ content: HTMLElement }> {
    constructor(container: HTMLElement)
    render(data: Partial<{ content: HTMLElement }>): HTMLElement
    open(content: HTMLElement): void
    close(): void
    private handleCloseClick(): void
    private handleOverlayClick(event: Event): void
}
```

**Ответственность:**
- Управление отображением модального окна
- Обработка закрытия по клику на крестик или фон
- Вставка контента в модальное окно

**Особенности:**
- Не имеет дочерних классов
- Не наследуется другими компонентами
- Содержит любые компоненты как контент

**События:**
- `modal:close` - закрытие модального окна

## Схема наследования

```
Component<T>
├── CardView<T>
│   ├── CardCatalogView
│   ├── CardPreviewView
│   └── CardBasketView
├── FormView<T>
│   ├── OrderFormView
│   └── ContactsFormView
├── HeaderView
├── GalleryView
├── BasketView
├── OrderSuccessView
└── ModalView
```

## Событийная модель

Все классы View генерируют события в ответ на пользовательские действия:

### События карточек
- `card:select` - выбор карточки товара
- `card:add-to-cart` - добавление в корзину
- `card:remove-from-cart` - удаление из корзины

### События форм
- `form:submit` - отправка формы
- `form:validate` - валидация формы
- `order:payment-change` - изменение способа оплаты
- `order:address-change` - изменение адреса
- `contacts:email-change` - изменение email
- `contacts:phone-change` - изменение телефона

### События интерфейса
- `header:basket-open` - открытие корзины
- `basket:order` - оформление заказа
- `order-success:close` - закрытие уведомления
- `modal:close` - закрытие модального окна

## Принципы работы

1. **Инициализация**: каждый компонент получает контейнер DOM-элемента в конструкторе
2. **Рендеринг**: метод `render()` обновляет отображение компонента
3. **События**: все пользовательские действия генерируют события через `EventEmitter`
4. **Валидация**: формы самостоятельно валидируют данные перед отправкой
5. **Состояние**: компоненты не хранят состояние, только отображают переданные данные

## Шаблоны HTML

Каждый компонент использует соответствующий HTML-шаблон:
- `card-catalog` - для CardCatalogView
- `card-preview` - для CardPreviewView  
- `card-basket` - для CardBasketView
- `basket` - для BasketView
- `order` - для OrderFormView
- `contacts` - для ContactsFormView
- `success` - для OrderSuccessView

Все шаблоны определены в `index.html` и используются для создания экземпляров компонентов.

## События моделей данных

В моделях данных генерируются следующие события при изменении состояния:

### События модели Products

#### `products:items-changed`
**Описание:** Изменение списка товаров  
**Генерируется:** При вызове `setItems()`  
**Данные:** `{ items: IProduct[] }` - новый список товаров  
**Модель:** `Products`

#### `products:selected-changed`
**Описание:** Изменение выбранного товара  
**Генерируется:** При вызове `setSelected()`  
**Данные:** `{ product: IProduct | null }` - выбранный товар или null  
**Модель:** `Products`

### События модели Cart

#### `cart:item-added`
**Описание:** Добавление товара в корзину  
**Генерируется:** При вызове `add()` с новым товаром  
**Данные:** `{ item: ICartItem, items: ICartItem[] }` - добавленный товар и весь список  
**Модель:** `Cart`

#### `cart:item-removed`
**Описание:** Удаление товара из корзины  
**Генерируется:** При вызове `remove()` с существующим товаром  
**Данные:** `{ item: ICartItem, items: ICartItem[] }` - удаленный товар и обновленный список  
**Модель:** `Cart`

#### `cart:cleared`
**Описание:** Очистка корзины  
**Генерируется:** При вызове `clear()`  
**Данные:** `{ items: ICartItem[] }` - список товаров до очистки  
**Модель:** `Cart`

### События модели Buyer

#### `buyer:data-changed`
**Описание:** Изменение данных покупателя  
**Генерируется:** При вызове `setData()` с изменениями  
**Данные:** `{ data: IBuyer }` - полные данные покупателя  
**Модель:** `Buyer`

#### `buyer:cleared`
**Описание:** Очистка данных покупателя  
**Генерируется:** При вызове `clear()`  
**Данные:** `{ data: IBuyer }` - данные покупателя до очистки  
**Модель:** `Buyer`

## Принципы работы событий моделей

1. **Изменения отслеживаются:** События генерируются только при реальных изменениях данных
2. **Полная информация:** События содержат все необходимые данные для обновления UI
3. **Консистентность:** Состояние модели всегда синхронизировано с событиями
4. **Производительность:** События не генерируются при установке тех же значений

## Примеры использования событий моделей

```typescript
// Настройка слушателей событий в Презентере
events.on('products:items-changed', (data) => {
    // Обновить каталог товаров
    this.galleryView.render(data.items);
});

events.on('cart:item-added', (data) => {
    // Обновить счетчик в шапке
    this.headerView.render({ count: data.items.length });
});

events.on('buyer:data-changed', (data) => {
    // Обновить форму с новыми данными
    this.orderFormView.render(data.data);
});
```

## Интеграция с View компонентами

События моделей работают совместно с событиями View компонентов:

1. **View события** → Презентер → **Изменение модели** → **Модель события** → Презентер → **Обновление View**
2. **Прямые изменения модели** → **Модель события** → Презентер → **Обновление View**

Это обеспечивает полную реактивность приложения и синхронизацию состояния между всеми компонентами.

## События приложения

В приложении генерируются следующие события в ответ на действия пользователя:

### События карточек товаров

#### `card:select`
**Описание:** Выбор карточки товара в каталоге  
**Генерируется:** При клике на карточку товара в каталоге  
**Данные:** `{ product: HTMLElement }` - элемент карточки товара  
**Компонент:** `CardCatalogView`

#### `card:add-to-cart`
**Описание:** Добавление товара в корзину  
**Генерируется:** При нажатии кнопки "В корзину" в детальном просмотре  
**Данные:** `{ product: HTMLElement }` - элемент карточки товара  
**Компонент:** `CardPreviewView`

#### `card:remove-from-cart`
**Описание:** Удаление товара из корзины  
**Генерируется:** При нажатии кнопки удаления товара в корзине  
**Данные:** `{ productId: string }` - ID товара для удаления  
**Компонент:** `CardBasketView`

### События интерфейса

#### `header:basket-open`
**Описание:** Открытие корзины  
**Генерируется:** При клике на кнопку корзины в шапке  
**Данные:** отсутствуют  
**Компонент:** `HeaderView`

#### `basket:order`
**Описание:** Переход к оформлению заказа  
**Генерируется:** При нажатии кнопки "Оформить" в корзине  
**Данные:** отсутствуют  
**Компонент:** `BasketView`

#### `modal:close`
**Описание:** Закрытие модального окна  
**Генерируется:** При клике на кнопку закрытия или фон модального окна  
**Данные:** отсутствуют  
**Компонент:** `ModalView`

### События форм

#### `form:submit`
**Описание:** Отправка формы  
**Генерируется:** При отправке любой формы (заказ, контакты)  
**Данные:** `{ form: string }` - название формы ('order' или 'contacts')  
**Компоненты:** `OrderFormView`, `ContactsFormView`

#### `order:payment-change`
**Описание:** Изменение способа оплаты  
**Генерируется:** При выборе способа оплаты (онлайн/при получении)  
**Данные:** `{ payment: TPayment }` - выбранный способ оплаты  
**Компонент:** `OrderFormView`

#### `order:address-change`
**Описание:** Изменение адреса доставки  
**Генерируется:** При вводе текста в поле адреса  
**Данные:** `{ address: string }` - введенный адрес  
**Компонент:** `OrderFormView`

#### `contacts:email-change`
**Описание:** Изменение email  
**Генерируется:** При вводе текста в поле email  
**Данные:** `{ email: string }` - введенный email  
**Компонент:** `ContactsFormView`

#### `contacts:phone-change`
**Описание:** Изменение телефона  
**Генерируется:** При вводе текста в поле телефона  
**Данные:** `{ phone: string }` - введенный телефон  
**Компонент:** `ContactsFormView`

### События завершения заказа

#### `order-success:close`
**Описание:** Закрытие уведомления об успешном заказе  
**Генерируется:** При нажатии кнопки "За новыми покупками!"  
**Данные:** отсутствуют  
**Компонент:** `OrderSuccessView`

## Принципы работы с событиями

1. **Единообразие:** Все события следуют единому формату `компонент:действие`
2. **Типизация:** Данные событий типизированы в соответствии с интерфейсами
3. **Обработка:** События обрабатываются Презентером через EventEmitter
4. **Изоляция:** View компоненты не знают о том, кто обрабатывает события
5. **Расширяемость:** Легко добавлять новые события без изменения существующего кода

## Примеры использования событий

```typescript
// Настройка слушателей событий в Презентере
events.on('card:select', (data) => {
    // Открыть модальное окно с детальным просмотром товара
    const productId = data.product.dataset.productId;
    this.showProductPreview(productId);
});

events.on('card:add-to-cart', (data) => {
    // Добавить товар в корзину
    const productId = data.product.dataset.productId;
    this.addToCart(productId);
});

events.on('form:submit', (data) => {
    // Обработать отправку формы
    if (data.form === 'order') {
        this.processOrder();
    } else if (data.form === 'contacts') {
        this.processContacts();
    }
});
```
