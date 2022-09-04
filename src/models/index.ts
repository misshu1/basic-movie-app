export enum Status {
    IDLE = 'IDLE',
    LOADING = 'LOADING',
    SUCCESS = 'SUCCESS',
    ERROR = 'ERROR'
}

export enum NotificationType {
    INFO = 'INFO',
    WARNING = 'WARNING',
    SUCCESS = 'SUCCESS',
    ERROR = 'ERROR'
}

export class ErrorResponse {
    constructor(public status_message: string, public status_code: number) {
        this.status_code = status_code;
        this.status_message = status_message;
    }
}

export interface GetMovieResponse {
    results: Movie[];
    page: number;
    total_results: number;
    total_pages: number;
}

export interface Keyword {
    id: number;
    name: string;
}

export interface GetKeywordResponse {
    results: Keyword[];
    page: number;
    total_results: number;
    total_pages: number;
}

export interface Movie {
    poster_path?: string | null;
    adult?: boolean;
    overview?: string;
    release_date?: string;
    genre_ids?: number[];
    id?: number;
    original_title?: string;
    original_language?: string;
    title?: string;
    backdrop_path?: string | null;
    popularity?: number;
    vote_count?: number;
    video?: boolean;
    vote_average?: number;
}

export enum SortBy {
    'popularity.asc' = 'Popularity Ascending',
    'popularity.desc' = 'Popularity Descending',
    'release_date.asc' = 'Release Date Ascending',
    'release_date.desc' = 'Release Date Descending',
    'revenue.asc' = 'Revenue Ascending',
    'revenue.desc' = 'Revenue Descending',
    'primary_release_date.asc' = 'Primary Release Date Ascending',
    'primary_release_date.desc' = 'Primary Release Date Descending',
    'original_title.asc' = 'Title Ascending',
    'original_title.desc' = 'Title Descending',
    'vote_average.asc' = 'Vote Average Ascending',
    'vote_average.desc' = 'Vote Average Descending',
    'vote_count.asc' = 'Vote Count Ascending',
    'vote_count.desc' = 'Vote Count Descending'
}

export interface Pagination {
    totalPages: number;
    currentPage: number;
}
