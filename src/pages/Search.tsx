import { ChangeEvent, useState, useCallback, useEffect } from 'react';
import queryString from 'query-string';
import { getYear } from 'date-fns';
import {
    Pagination as PaginationMUI,
    Select,
    FormControl,
    MenuItem,
    InputLabel,
    TextField,
    Box,
    Autocomplete,
    IconButton,
    LinearProgress,
    CircularProgress
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useSearchParams } from 'react-router-dom';
import { SelectChangeEvent } from '@mui/material/Select';

import {
    GetKeywordResponse,
    GetMovieResponse,
    Keyword,
    Movie as MovieModel,
    SortBy,
    Status
} from 'models';
import { buildUrl } from 'utils';
import { useDebounce, useFetch } from 'hooks';
import { SearchContainer } from './styles';
import { Movie } from 'components/movie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

enum DefaultSearchURLParams {
    keywords = '',
    page = '1',
    year = '',
    sortBy = 'original_title.asc'
}

interface SearchURLParams {
    keywordsIds: number[];
    page: string | number | null;
    year: string | number | null;
    sortBy: keyof typeof SortBy | null;
}

const searchKeyword = (keyword: string | null) => {
    if (!keyword) return '';

    const payload = {
        query: keyword
    };
    const query = queryString.stringify(payload);

    return buildUrl('search/keyword', query);
};

const discoverURL = ({ keywordsIds, page, year, sortBy }: SearchURLParams) => {
    if (keywordsIds.length === 0) return '';

    const payload = {
        with_keywords: keywordsIds.join(','),
        page: page,
        include_adult: false,
        primary_release_year: year ? year : undefined,
        sort_by: sortBy ? sortBy : DefaultSearchURLParams.sortBy
    };
    const query = queryString.stringify(payload);

    return buildUrl('discover/movie', query);
};

export const Search = () => {
    const [favoriteMovies, setFavoriteMovies] = useState<MovieModel[]>([]);
    const [defaultKeywords, setDefaultKeywords] = useState<Keyword[]>([]);
    const [searchKey, setSearchKey] = useState('');
    const [keywordsIds, setKeywordsIds] = useState<number[]>([]);
    const [sort, setSort] = useState<keyof typeof SortBy>(
        DefaultSearchURLParams.sortBy
    );
    const [totalPages, setTotalPages] = useState(1);
    const [shouldFetch, setShouldFetch] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams({
        keywords: DefaultSearchURLParams.keywords,
        page: DefaultSearchURLParams.page,
        year: DefaultSearchURLParams.year,
        sortBy: DefaultSearchURLParams.sortBy
    });
    const page = searchParams.get('page');
    const keywords = searchParams.get('keywords');
    const year = searchParams.get('year');
    const sortBy = searchParams.get('sortBy');
    const debouncedSearchKey = useDebounce(searchKey, 500);

    const onFetchSuccess = useCallback((data: GetMovieResponse) => {
        setTotalPages(data.total_pages || 1);
    }, []);

    const { status, data } = useFetch<GetMovieResponse>(
        discoverURL({
            keywordsIds: keywordsIds,
            page,
            year,
            sortBy: sortBy as keyof typeof SortBy
        }),
        shouldFetch,
        onFetchSuccess
    );

    const { data: keywordsData, status: keywordStatus } =
        useFetch<GetKeywordResponse>(searchKeyword(debouncedSearchKey), true);

    useEffect(() => {
        const keywordsStorage = localStorage.getItem('keywords');
        const pageStorage = localStorage.getItem('page');
        const yearStorage = localStorage.getItem('year');
        const sortByStorage = localStorage.getItem('sortBy');

        setSearchParams({
            keywords: keywordsStorage || DefaultSearchURLParams.keywords,
            page: pageStorage || DefaultSearchURLParams.page,
            year: yearStorage || DefaultSearchURLParams.year,
            sortBy: sortByStorage || DefaultSearchURLParams.sortBy
        });
    }, [setSearchParams]);

    useEffect(() => {
        const keywordsStorage = localStorage.getItem('keywords');
        const favoritesStorage = localStorage.getItem('favorites');
        if (keywordsStorage) {
            const ids = keywordsStorage
                .split(',')
                .map((keywords) => +keywords.split('|')[0]);
            const defaultKeywords = keywordsStorage
                .split(',')
                .map((keywords) => {
                    const [id, keyword] = keywords.split('|');

                    return { id: +id, name: keyword } as Keyword;
                });
            setDefaultKeywords(defaultKeywords);
            setKeywordsIds(ids);
            setShouldFetch(true);
        }

        if (favoritesStorage) {
            try {
                const savedFavorites = JSON.parse(favoritesStorage);
                setFavoriteMovies(savedFavorites);
            } catch (error) {
                console.log(error);
            }
        }
    }, []);

    const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;

        setSearchKey(value);
    };

    const handleAutocompleteChange = useCallback(
        (newValue: Keyword[]) => {
            if (newValue.length === 0) {
                setShouldFetch(false);
                setTotalPages(1);
            } else {
                setShouldFetch(true);
            }

            const ids = newValue.map((item) => item.id);
            const newKeywords = newValue.map(
                (item) => `${item.id}|${item.name}`
            );
            setShouldFetch(true);
            setKeywordsIds(ids);
            setDefaultKeywords(newValue);

            localStorage.setItem('keywords', newKeywords.join(','));
            localStorage.setItem('page', DefaultSearchURLParams.page);
            setSearchParams({
                keyword: newKeywords.join(','),
                page: DefaultSearchURLParams.page,
                year: year || DefaultSearchURLParams.year,
                sortBy: sortBy || DefaultSearchURLParams.sortBy
            });
        },
        [setSearchParams, year, sortBy]
    );

    const handleSortChange = (
        event: SelectChangeEvent<keyof typeof SortBy>
    ) => {
        const newSort = event.target.value as keyof typeof SortBy;

        setSort(newSort);
        localStorage.setItem('sortBy', newSort);
        setSearchParams({
            keywords: keywords || DefaultSearchURLParams.keywords,
            page: page || DefaultSearchURLParams.page,
            year: year || DefaultSearchURLParams.year,
            sortBy: newSort
        });
    };

    const handlePageChange = (event: ChangeEvent<unknown>, page: number) => {
        localStorage.setItem('page', page.toString());

        setSearchParams({
            page: page.toString(),
            keywords: keywords || DefaultSearchURLParams.keywords,
            year: year || DefaultSearchURLParams.year,
            sortBy: sortBy || DefaultSearchURLParams.sortBy
        });
    };

    const handleYearChange = (year: string | null) => {
        const newYear = year
            ? getYear(new Date(year)).toString()
            : DefaultSearchURLParams.year;

        localStorage.setItem('year', newYear);
        localStorage.setItem('page', DefaultSearchURLParams.page);
        setSearchParams({
            page: DefaultSearchURLParams.page,
            keywords: keywords || DefaultSearchURLParams.keywords,
            year: newYear,
            sortBy: sortBy || DefaultSearchURLParams.sortBy
        });
    };

    const toggleFavorites = (movie: MovieModel) => {
        if (favoriteMovies.findIndex((item) => item.id === movie.id) !== -1) {
            setFavoriteMovies((prevState) => {
                const newValue = [
                    ...prevState.filter((item) => item.id !== movie.id)
                ];
                localStorage.setItem('favorites', JSON.stringify(newValue));

                return newValue;
            });
        } else {
            setFavoriteMovies((prevState) => {
                const newValue = [...prevState, movie];
                localStorage.setItem('favorites', JSON.stringify(newValue));

                return newValue;
            });
        }
    };

    return (
        <SearchContainer>
            <Box sx={{ p: 2, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Autocomplete
                    options={keywordsData?.results ? keywordsData.results : []}
                    getOptionLabel={(option) => option.name}
                    isOptionEqualToValue={(option, value) =>
                        option.id === value.id
                    }
                    onChange={(event, newValue) =>
                        handleAutocompleteChange(newValue)
                    }
                    value={[...defaultKeywords]}
                    inputValue={searchKey}
                    loading={keywordStatus === Status.LOADING}
                    loadingText={<LinearProgress />}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label='Search Movie'
                            variant='outlined'
                            size='small'
                            margin='dense'
                            sx={{ width: '350px' }}
                            onChange={handleSearchChange}
                        />
                    )}
                    disableClearable
                    disablePortal
                    multiple
                />

                <DatePicker
                    views={['year']}
                    label='Year'
                    value={year || null}
                    onChange={handleYearChange}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            helperText={null}
                            variant='outlined'
                            size='small'
                            margin='dense'
                            sx={{ width: '150px' }}
                            onKeyDown={(e) => e.preventDefault()}
                            disabled
                            InputProps={{
                                endAdornment: (
                                    <>
                                        {year && (
                                            <IconButton
                                                aria-label='clear year'
                                                onClick={() =>
                                                    handleYearChange(null)
                                                }
                                            >
                                                <FontAwesomeIcon
                                                    icon={['fas', 'times']}
                                                    style={{ color: '#000' }}
                                                    size='xs'
                                                />
                                            </IconButton>
                                        )}
                                        {params.InputProps?.endAdornment}
                                    </>
                                )
                            }}
                        />
                    )}
                />

                <FormControl
                    margin='dense'
                    size='small'
                    sx={{ width: '150px' }}
                >
                    <InputLabel id='sortBy'>Sort by</InputLabel>
                    <Select
                        labelId='sortBy'
                        value={sortBy ? (sortBy as keyof typeof SortBy) : sort}
                        label='Sort by'
                        onChange={handleSortChange}
                    >
                        {Object.entries(SortBy).map(([key, value]) => (
                            <MenuItem key={key} value={key}>
                                {value}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>
            {!data?.total_results && (
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: ' center',
                        flex: 1
                    }}
                >
                    {status === Status.IDLE && (
                        <span>Search for movie by keyword.</span>
                    )}
                    {status === Status.LOADING && <CircularProgress />}
                    {status === Status.ERROR ||
                        (status === Status.SUCCESS && <span>No Data</span>)}
                </Box>
            )}
            {data?.total_results !== undefined && data?.total_results !== 0 && (
                <Box
                    sx={{
                        py: 2,
                        display: 'grid',
                        gap: 2,
                        gridTemplateColumns:
                            'repeat(auto-fill, minmax(16rem, 18rem))',
                        gridTemplateRows:
                            ' repeat(auto-fit, minmax(16rem, 18rem))',
                        gridAutoRows: 'minmax(16rem, 18rem)',
                        justifyContent: 'center',
                        overflow: 'auto',
                        flex: 1
                    }}
                >
                    {data?.results.map((movie) => (
                        <Movie
                            key={movie.id}
                            movie={movie}
                            toggleFavorites={toggleFavorites}
                            isFavorite={
                                favoriteMovies.findIndex(
                                    (item) => item.id === movie.id
                                ) !== -1
                            }
                        />
                    ))}
                </Box>
            )}
            <PaginationMUI
                variant='outlined'
                shape='rounded'
                count={totalPages}
                page={page ? +page : 1}
                onChange={handlePageChange}
                size='small'
                sx={{
                    mx: 'auto',
                    width: 'fit-content',
                    py: 2
                }}
            />
        </SearchContainer>
    );
};
