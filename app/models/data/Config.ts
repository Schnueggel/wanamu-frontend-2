
export class Config implements wu.model.data.IConfig {
    apiBaseUrl: string;

    constructor(data: any) {
        this.fromJSON(data);
    }

    fromJSON(data) {
        Object.assign(this, data);
    }
}