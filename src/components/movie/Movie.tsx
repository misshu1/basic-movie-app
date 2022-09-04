import { FC } from 'react';
import { Tooltip } from '@mui/material';
import { Movie as MovieModel } from 'models';
import { Container, FavoriteIcon } from './styles';

interface MovieProps {
    movie: MovieModel;
    isFavorite: boolean;
    toggleFavorites: (movie: MovieModel) => void;
}

export const Movie: FC<MovieProps> = ({
    movie,
    toggleFavorites,
    isFavorite
}) => {
    const image = movie.poster_path
        ? `https://image.tmdb.org/t/p/w300/${movie.poster_path}`
        : 'https://via.placeholder.com/300';

    const handleToggleFavorites = () => {
        toggleFavorites(movie);
    };

    return (
        <Container image={image}>
            <Tooltip
                title={
                    isFavorite ? 'Remove from favorites' : 'Add to favorites'
                }
            >
                <FavoriteIcon
                    icon={['fas', 'heart-circle-plus']}
                    size='2xl'
                    onClick={handleToggleFavorites}
                    color={isFavorite ? '#ff605c' : '#00ca4e'}
                />
            </Tooltip>
            <div className='image' />
            <h3 className='title'>{movie.title}</h3>
        </Container>
    );
};
