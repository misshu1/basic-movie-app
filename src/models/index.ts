export enum STATUS {
    IDLE = 'idle',
    PENDING = 'pending',
    RESOLVED = 'resolved',
    REJECTED = 'rejected'
}

export interface ErrorResponse {
    status_message: string;
    status_code: number;
}

export interface GetMovieResponse {
    results?: Movie[];
    page?: number;
    total_results?: number;
    total_pages?: number;
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
