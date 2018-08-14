import { action, computed, observable } from 'mobx';
import autobind from 'autobind-decorator';
import notFoundPageMeta from '../../../common/data/meta/notFoundPageMeta.json';
import MetaStore from '../common/MetaStore';


@autobind
export default class NotFoundPageStore {
    public meta = new MetaStore(notFoundPageMeta);
}


export interface INotFoundPageStore extends NotFoundPageStore {};
