import CounterStore from './common/CounterStore';
import HomePageStore from './containers/HomePageStore';
import Stores from './index';

export interface ICounterStore extends CounterStore {}
export interface IHomePageStore extends HomePageStore {}
export interface IStores extends Stores {}
