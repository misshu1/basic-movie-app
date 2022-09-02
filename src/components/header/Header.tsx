import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { Button } from '@mui/material';
import { RoutePaths } from 'routes';

export const Header = () => {
    return (
        <AppBar position='static'>
            <Toolbar
            //  disableGutters
            >
                <Button
                    component={Link}
                    to={RoutePaths.root}
                    // key={page}
                    // onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                >
                    search
                </Button>
                <Button
                    to={RoutePaths.favorites}
                    component={Link}
                    // key={page}
                    // onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                >
                    favorites
                </Button>
            </Toolbar>
        </AppBar>
    );
};
