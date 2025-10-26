import { IApi } from '../../types';
import { IProduct, IOrderRequest, IOrderResponse } from '../../types';

export class LarekAPI {
    protected api: IApi;

    constructor(api: IApi) {
        this.api = api;
    }

    async getProducts(): Promise<IProduct[]> {
        const response = await this.api.get<{ items: IProduct[] }>('/product');
        return response.items || [];
    }

    async sendOrder(order: IOrderRequest): Promise<IOrderResponse> {
        return await this.api.post<IOrderResponse>('/order', order);
    }
}