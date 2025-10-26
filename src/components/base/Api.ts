type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';

export class Api {
    readonly baseUrl: string;
    protected options: RequestInit;

    constructor(baseUrl: string, options: RequestInit = {}) {
        this.baseUrl = baseUrl;
        this.options = {
            headers: {
                'Content-Type': 'application/json',
                ...(options.headers as object ?? {})
            }
        };
    }

    protected handleResponse<T>(response: Response): Promise<T> {
        if (response.ok) {
            return response.json();
        } else {
            console.error('Api.handleResponse: ошибка', response.status, response.statusText);
            return response.text().then(text => {
                console.error('Api.handleResponse: тело ответа', text);
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            });
        }
    }

    get<T extends object>(uri: string) {
        const fullUrl = this.baseUrl + uri;
        console.log('Api.get: запрос к', fullUrl);
        return fetch(fullUrl, {
            ...this.options,
            method: 'GET'
        }).then(this.handleResponse<T>);
    }

    post<T extends object>(uri: string, data: object, method: ApiPostMethods = 'POST') {
        return fetch(this.baseUrl + uri, {
            ...this.options,
            method,
            body: JSON.stringify(data)
        }).then(this.handleResponse<T>);
    }
}
