import { action, computed, observable } from 'mobx';
import autobind from 'autobind-decorator';
import AnalyticsStore from './AnalyticsStore';

@autobind
export default class AppStore {
    public analytics = new AnalyticsStore();
}

export interface IAppStore extends AppStore {};
