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
    NAME_ASCENDING = 'Name Ascending',
    NAME_DESCENDING = 'Name Descending',
    RELEASE_DATE_ASCENDING = 'Release Date Ascending',
    RELEASE_DATE_DESCENDING = 'Release Date Descending'
}

export interface Pagination {
    totalPages: number;
    currentPage: number;
}
