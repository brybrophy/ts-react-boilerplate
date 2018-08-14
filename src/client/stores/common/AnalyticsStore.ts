import ua from 'universal-analytics';

export default class AnalyticsStore {
    private _analytics = ua('[ANALYTICS_ID_GOES_HERE]');

    public sendPageView(pagePath: string, hostName: string, pageName: string) {
        this._analytics.pageview(pagePath, hostName, pageName).send();
    }
}

export interface IAnalyticsStore extends AnalyticsStore {};
