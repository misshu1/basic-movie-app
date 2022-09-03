import { SnackbarProvider } from 'notistack';

import { GlobalStyle } from 'styles';
import { Header } from 'components';
import { RoutesApp } from 'routes';
import { NotificationsProvider } from 'contexts';
import './fortawesome';

function App() {
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
