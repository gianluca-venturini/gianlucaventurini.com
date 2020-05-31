import { AnyPrismicSlice } from "../slices/SliceJson";

export interface PrismicPage<TData = {}> {
    alternate_languages: []
    data: TData & {
        body: AnyPrismicSlice[]
    }
    first_publication_date: string;
    href: string;
    id: string;
    lang: string;
    last_publication_date: string;
    linked_documents: string[];
    slugs: string[];
    tags: string[];
    type: 'page'
    uid: null
}