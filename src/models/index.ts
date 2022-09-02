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
    constructor(public status_message: string, public status_code: number) {}
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

// export class Test {
//     static id: number;

//     constructor(public id: number) {
//         Test.id = id;
//     }

//     search = 'search/movie';
//     static movie = `movie${Test.id}`;
// }
// console.log(new Test().search);
