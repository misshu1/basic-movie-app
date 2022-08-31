export const buildUrl = (path: string, query: string = '') =>
    `https://api.themoviedb.org/3/${path}?api_key=${process.env.REACT_APP_TMDB_API}&${query}`;

export const generateConfig = (method: string, body?: RequestInit) => {
    const config: RequestInit = {
        method,
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        }
    };

    if (body) {
        config.body = JSON.stringify(body);
    }

    return config;
};
