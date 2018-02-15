import { action, computed, observable } from 'mobx';
import { merge } from 'lodash';
import Counter from '../common/Counter';

export default class HomePageStore {
    counter = new Counter();
    @observable title: string = 'The home page count is';

    constructor(state) {
        merge(this, state);
    }

    @computed
    get countDisplay() {
        return `${this.title} ${this.counter.count}`;
    }

    @action
    setTitle(nextTitle: string) {
        this.title = nextTitle;
    }
}
