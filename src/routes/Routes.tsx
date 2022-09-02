import { Route, Routes } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { Emoji } from 'components/emoji';
import { Search, Favorites } from 'pages';
import { RoutePaths } from 'routes';
import { useNotificationsContext } from 'contexts';

const WelcomeTitle: unknown = (
    <span>
        Welcome <Emoji symbol='🌞' label='happy sun' />
    </span>
);

const welcomeMessage: unknown = (
    <span>
        This website is usless
        <br />
        Check out my{' '}
        <a
            href='https://github.com/misshu1'
            target='_blank'
            rel='noopener noreferrer'
            style={{
                color: 'inherit',
                fontSize: '1.1rem',
                fontStyle: 'italic'
            }}
        >
            Github Profile
        </a>{' '}
        for better apps.
    </span>
);

export const RoutesApp = () => {
    const { showInfo } = useNotificationsContext();
    const notification = useRef(() =>
        showInfo(WelcomeTitle as string, welcomeMessage as string)
    );

    useEffect(() => {
        notification.current();
    }, []);

    return (
        <Routes>
            <Route path={RoutePaths.root} element={<Search />} />
            <Route path={RoutePaths.favorites} element={<Favorites />} />
        </Routes>
    );
};
