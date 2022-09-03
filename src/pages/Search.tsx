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
    Box
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useSearchParams } from 'react-router-dom';
import { SelectChangeEvent } from '@mui/material/Select';

import { GetMovieResponse, SortBy, Status } from 'models';
import { buildUrl } from 'utils';
import { useDebounce, useFetch } from 'hooks';
import { SearchContainer } from './styles';
import { Movie } from 'components/movie';

enum DefaultSearchURLParams {
    keyword = '',
    page = '1',
    year = ''
}

interface SearchURLParams {
    keyword: string | null;
    page: string | number | null;
    year: string | number | null;
}

const searchURL = ({ keyword, page, year }: SearchURLParams) => {
    if (!keyword) return '';

    const payload = {
        query: keyword,
        page: page,
        include_adult: false,
        primary_release_year: year ? year : undefined
    };
    const query = queryString.stringify(payload);

    return buildUrl('search/movie', query);
};

export const Search = () => {
    const [sort, setSort] = useState<SortBy>(SortBy.NAME_ASCENDING);
    const [totalPages, setTotalPages] = useState(1);
    const [shouldFetch, setShouldFetch] = useState(true);
    const [searchParams, setSearchParams] = useSearchParams({
        keyword: DefaultSearchURLParams.keyword,
        page: DefaultSearchURLParams.page,
        year: DefaultSearchURLParams.year
    });
    const page = searchParams.get('page');
    const keyword = searchParams.get('keyword');
    const year = searchParams.get('year');
    const debouncedKeyword = useDebounce(keyword, 500);

    const onFetchSuccess = useCallback((data: GetMovieResponse) => {
        setTotalPages(data.total_pages || 1);
    }, []);

    const { status, data } = useFetch<GetMovieResponse>(
        searchURL({ keyword: debouncedKeyword, page, year }),
        shouldFetch,
        onFetchSuccess
    );

    useEffect(() => {
        const keywordStorage = localStorage.getItem('keyword');
        const pageStorage = localStorage.getItem('page');
        const yearStorage = localStorage.getItem('year');

        setSearchParams({
            keyword: keywordStorage || DefaultSearchURLParams.keyword,
            page: pageStorage || DefaultSearchURLParams.page,
            year: yearStorage || DefaultSearchURLParams.year
        });
    }, [setSearchParams]);

    const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;

        if (!value) {
            setShouldFetch(false);
            setTotalPages(1);
        } else {
            setShouldFetch(true);
        }

        localStorage.setItem('keyword', value);
        setSearchParams({
            keyword: value,
            page: DefaultSearchURLParams.page,
            year: year || DefaultSearchURLParams.year
        });
    };

    const handleSortChange = (event: SelectChangeEvent<SortBy>) => {
        setSort(event.target.value as SortBy);
    };

    const handlePageChange = (event: ChangeEvent<unknown>, page: number) => {
        localStorage.setItem('page', page.toString());
        setSearchParams({
            page: page.toString(),
            keyword: keyword || DefaultSearchURLParams.keyword,
            year: year || DefaultSearchURLParams.year
        });
    };

    const handleYearChange = (year: string | null) => {
        const newYear = year
            ? getYear(new Date(year)).toString()
            : DefaultSearchURLParams.year;

        localStorage.setItem('year', newYear);
        setSearchParams({
            page: DefaultSearchURLParams.page,
            keyword: keyword || DefaultSearchURLParams.keyword,
            year: newYear
        });
    };

    return (
        <SearchContainer>
            <Box sx={{ p: 2, display: 'flex', gap: 2 }}>
                <TextField
                    label='Search Movie'
                    variant='outlined'
                    size='small'
                    margin='dense'
                    onChange={handleSearchChange}
                    value={keyword ? keyword : DefaultSearchURLParams.keyword}
                    sx={{ width: '150px' }}
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
                        value={sort}
                        label='Sort by'
                        onChange={handleSortChange}
                    >
                        {Object.entries(SortBy).map(([key, value]) => (
                            <MenuItem key={key} value={value}>
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
                        <span>Search for movie name.</span>
                    )}
                    {status === Status.LOADING && <span>Loading...</span>}
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
                        <Movie key={movie.id} movie={movie} />
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
