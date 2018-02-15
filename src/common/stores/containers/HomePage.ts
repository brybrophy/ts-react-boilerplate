import { computed, observable } from 'mobx';
import Counter from '../common/Counter';

export default class HomePage {
    counter = new Counter();
    @observable title: string = 'The home page count is';

    constructor(state) {
        Object.assign(this, state);
    }

    @computed
    get countDisplay() {
        return `${this.title} ${this.counter.count}`;
    }
}
