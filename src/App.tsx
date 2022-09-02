// import { useFetch } from 'hooks';
import { SnackbarProvider } from 'notistack';

import { GlobalStyle } from 'styles';
import { Header } from 'components';
import { RoutesApp } from 'routes';
import './fortawesome';
import { NotificationsProvider } from 'contexts';

function App() {
    // const { status, data, error } = useFetch<Movie>(
    //     `https://api.themoviedb.org/3/search/movie?api_key=${
    //         process.env.REACT_APP_TMDB_API
    //     }&query=${'batman'}&language=en-US&page=1&include_adult=false`,
    //     true
    // );
    // console.log({
    //     status,
    //     data,
    //     error,
    //     buildUrl: buildUrl('/search/movie', 'superman')
    // });
    return (
        <>
            <SnackbarProvider
                dense
                domRoot={document.getElementById('modal') as HTMLElement}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right'
                }}
            >
                <NotificationsProvider>
                    <GlobalStyle />
                    <Header />
                    <RoutesApp />
                </NotificationsProvider>
            </SnackbarProvider>
        </>
    );
}

export default App;
