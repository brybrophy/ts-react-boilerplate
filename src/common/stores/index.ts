import HomePageStore from './containers/HomePageStore';

export default class Stores {
    homePageStore: HomePageStore;

    constructor(state) {
        this.homePageStore = new HomePageStore(state.homePageStore);
    }
}
