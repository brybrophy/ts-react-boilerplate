import { action, computed, observable } from 'mobx';
import autobind from 'autobind-decorator';
import homePageMeta from '../../../common/data/meta/homePageMeta.json';
import MetaStore from '../common/MetaStore';


@autobind
export default class HomePageStore {
    public meta = new MetaStore(homePageMeta);
}


export interface IHomePageStore extends HomePageStore {};
