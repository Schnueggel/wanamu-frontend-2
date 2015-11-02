import MenuModel from './MenuModel';

export default class AppStateModel {
    menu: any;

    constructor() {
        this.menu = new MenuModel();
    }
}