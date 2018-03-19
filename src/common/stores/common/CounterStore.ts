import { observable, action } from 'mobx';

export default class CounterStore {
    @observable public count: number = 0;

    @action
    public addOne(): void {
        this.count += 1;
    }
}
