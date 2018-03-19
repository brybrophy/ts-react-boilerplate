import HomePageStore from './containers/HomePageStore';

export default class Stores {
    homePageStore: HomePageStore;

    constructor(state?: Stores) {
        this.homePageStore = new HomePageStore(
            state ? state.homePageStore : {}
        );
    }
}
