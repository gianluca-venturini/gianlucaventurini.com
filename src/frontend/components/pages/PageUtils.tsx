import * as React from "react";
import { useEffect, useState } from "react";
import { prismic } from "../../services";
import { BookshelfPage } from "./BookshelfPage";
import { HomePage } from "./HomePage";
import { PrismicPage } from "./PageJson";

const PAGES: {[index: string]: React.ComponentType<{page: PrismicPage}>} = {
    bookshelf: BookshelfPage,
    home: HomePage
};

interface RoutePageProps {
    pageName: string;
}

export const RoutePage: React.FC<RoutePageProps> = props => {
    const {pageName} = props;

    const [page, setPage] = useState(null);
    
    useEffect(() => {
        async function fetchData() {
            const page = await prismic.getPage(pageName);
            if (!page) {
                console.error(`Page ${pageName} not found. Is it tagged correctly?`);
            }
            setPage(page);
        }
        fetchData();
    }, []);

    const PageComponent = PAGES[pageName];

    if (!PageComponent) {
        console.error(`Page name not found ${pageName}. Did you add it to PAGES?`);
        return null;
    }

    return page ? <PageComponent page={page} /> : null;
}
