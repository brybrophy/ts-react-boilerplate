import { observable, action } from 'mobx';

export default class RootStore {
	@observable count: number;

	constructor(initialState?) {
		this.count = initialState ? initialState.rootStore.count : 0;
	}

	@action
	addOne() {
		this.count += 1;
	}
}
