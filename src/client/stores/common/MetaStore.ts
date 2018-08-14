import { observable, action } from 'mobx';

interface IState {
    description: string;
    imageUrl?: string;
    title: string;
}

export default class MetaStore {
    private _defaultMetaImageUrl: string ='';
    @observable public canonicalUrl: string = '';
    @observable public description: string = '';
    @observable public imageUrl: string = '';
    @observable public title: string = '';

    public constructor(state: IState) {
        this.description = state.description;
        this.title = state.title;
        this.title = state.title;
        this.imageUrl = state.imageUrl || this._defaultMetaImageUrl;
    }

    @action
    public setCanonicalUrl(nextCanonicalUrl: string): void {
        this.canonicalUrl = nextCanonicalUrl;
    }

    @action
    public setDescription(nextDescription: string): void {
        this.description = nextDescription;
    }

    @action
    public setImageUrl(nextImageUrl: string): void {
        this.imageUrl = nextImageUrl;
    }

    @action
    public setTitle(nextTitle: string): void {
        this.title = nextTitle;
    }
}

export interface IMetaStore extends MetaStore {};
