import AppStore from './common/AppStore';
import HomePageStore from './containers/HomePageStore';
import NotFoundPageStore from './containers/NotFoundPageStore';


export default class Stores {
    app: AppStore = new AppStore();
    home: HomePageStore = new HomePageStore();
    notFound: NotFoundPageStore = new NotFoundPageStore();
}

export interface IStores extends Stores {};
