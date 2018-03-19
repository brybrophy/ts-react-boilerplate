import CounterStore from '../stores/common/CounterStore';
import HomePageStore from '../stores/containers/HomePageStore';
import Stores from '../stores';
import { Response } from 'express';

export interface IServerLogProps {
    apiEnv: string;
    nodeEnv: string;
    port: string;
    seoEnv: string;
}

export interface IStores extends Stores {}
export interface ICounterStore extends CounterStore {}
export interface IHomePageStore extends HomePageStore {}

export interface IHomePageProps {
    stores: IStores;
}
