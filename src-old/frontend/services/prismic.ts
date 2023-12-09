import * as Prismic from 'prismic-javascript';
import ResolvedApi from 'prismic-javascript/d.ts/ResolvedApi';

const API_ENDPOINT = 'https://gianlucaventurini.cdn.prismic.io/api/v2';

export class PrismicService {
    private apiPromise: Promise<ResolvedApi>;

    constructor() {
        this.apiPromise = Prismic.getApi(API_ENDPOINT);
    }

    async getPage(pageName: string) {
        const api = await this.apiPromise;        
        const response = await api.query([
            Prismic.Predicates.at('document.type', 'page'),
            Prismic.Predicates.at('document.tags', [pageName])
        ], {});
        return response.results[0];
    }

    async getPages() {
        const api = await this.apiPromise;        
        const response = await api.query(Prismic.Predicates.at('document.type', 'page'), {});
        return response.results;
    }
}
