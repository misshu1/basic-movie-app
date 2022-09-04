import { Route, Routes } from 'react-router-dom';
import { Search, Favorites } from 'pages';
import { RoutePaths } from 'routes';

export const RoutesApp = () => {
    return (
        <Routes>
            <Route path={RoutePaths.root} element={<Search />} />
            <Route path={RoutePaths.favorites} element={<Favorites />} />
        </Routes>
    );
};
