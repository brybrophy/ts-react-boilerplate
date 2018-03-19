import { action, computed, observable } from 'mobx';
import { merge } from 'lodash';
import CounterStore from '../common/CounterStore';

export default class HomePageStore {
    public counter = new CounterStore();
    @observable public title: string = 'The home page count is';

    public constructor(state: HomePageStore | {}) {
        merge(this, state);
    }

    @computed
    public get countDisplay(): string {
        return `${this.title} ${this.counter.count}`;
    }

    @action
    public setTitle(nextTitle: string): void {
        this.title = nextTitle;
    }
}
