export interface Category {
    name: string,
    value: string
}

export interface User {
    name: string,
    lastname: string
}

export interface Country {
    name: string,
    code: string
}

export interface NewsResp {
    status: string;
    totalResults: number;
    articles?: Article[];
    message?: string;
}

export interface Article {
    source: Source;
    author?: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
    content?: string;
}

export interface Source {
    id?: string;
    name: string;
}
