import { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { Movie } from 'components/movie';
import { Movie as MovieModel } from 'models';

export const Favorites = () => {
    const [favorites, setFavorites] = useState<MovieModel[]>([]);

    useEffect(() => {
        const favoritesStorage = localStorage.getItem('favorites');

        if (favoritesStorage) {
            try {
                const savedFavorites = JSON.parse(favoritesStorage);
                setFavorites(savedFavorites);
            } catch (error) {
                console.log(error);
            }
        }
    }, []);

    const removeFromFavorites = (movie: MovieModel) => {
        if (favorites.findIndex((item) => item.id === movie.id) !== -1) {
            setFavorites((prevState) => {
                const newValue = [
                    ...prevState.filter((item) => item.id !== movie.id)
                ];
                localStorage.setItem('favorites', JSON.stringify(newValue));

                return newValue;
            });
        }
    };

    return (
        <Box
            sx={{
                py: 2,
                display: 'grid',
                gap: 2,
                gridTemplateColumns: 'repeat(auto-fill, minmax(16rem, 18rem))',
                gridTemplateRows: ' repeat(auto-fit, minmax(16rem, 18rem))',
                gridAutoRows: 'minmax(16rem, 18rem)',
                justifyContent: 'center',
                overflow: 'auto',
                flex: 1,
                height: 'calc(100% - 64px)'
            }}
        >
            {favorites.map((movie) => (
                <Movie
                    key={movie.id}
                    movie={movie}
                    toggleFavorites={() => {
                        removeFromFavorites(movie);
                    }}
                    isFavorite={true}
                />
            ))}
        </Box>
    );
};
