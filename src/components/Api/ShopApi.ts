import { IApi, ICreateOrderRequest, ICreateOrderResponse, IGetProductsResponse, IProduct } from '../../types';

export class ShopApi {
    private api: IApi;

    constructor(api: IApi) {
        this.api = api;
    }

    async getProducts(): Promise<IProduct[]> {
        const data = await this.api.get<IGetProductsResponse>(`/product/`);
        return data.items;
    }

    createOrder(payload: ICreateOrderRequest): Promise<ICreateOrderResponse> {
        return this.api.post<ICreateOrderResponse>(`/order/`, payload);
    }
}

export default ShopApi;

