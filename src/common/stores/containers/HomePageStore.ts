import { computed, observable } from 'mobx';
import { cloneDeep } from 'lodash';
import Counter from '../common/Counter';

export default class HomePageStore {
    counter = new Counter();
    @observable title: string = 'The home page count is';

    constructor(state) {
        cloneDeep([this, state]);
    }

    @computed
    get countDisplay() {
        return `${this.title} ${this.counter.count}`;
    }
}
