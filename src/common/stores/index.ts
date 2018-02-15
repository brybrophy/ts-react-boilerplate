import HomePage from './containers/HomePage';

export default class Stores {
    homePage: HomePage;

    constructor(state) {
        this.homePage = new HomePage(state.homePage);
    }
}
