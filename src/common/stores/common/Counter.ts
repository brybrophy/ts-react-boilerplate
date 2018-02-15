import { observable, action } from 'mobx';

export default class CounterStore {
    @observable count: number = 0;

    @action
    addOne() {
        this.count += 1;
    }
}
