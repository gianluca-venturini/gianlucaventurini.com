import * as Prismic from 'prismic-javascript';
import ResolvedApi from 'prismic-javascript/d.ts/ResolvedApi';

const API_ENDPOINT = 'https://gianlucaventurini.cdn.prismic.io/api/v2';

export class PrismicService {
    private apiPromise: Promise<ResolvedApi>;

    constructor() {
        this.apiPromise = Prismic.getApi(API_ENDPOINT);
    }

    async getBookshelf() {
        const api = await this.apiPromise;        
        const response = await api.query(Prismic.Predicates.at('document.type', 'page'), {});
        return response;
    }

    async getPages() {
        const api = await this.apiPromise;        
        const response = await api.query(Prismic.Predicates.at('document.type', 'page'), {});
        return response.results;
    }
}
