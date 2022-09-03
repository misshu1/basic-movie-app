import { FC } from 'react';
import { Movie as MovieModel } from 'models';
import { Container } from './styles';

interface MovieProps {
    movie: MovieModel;
}

export const Movie: FC<MovieProps> = ({ movie }) => {
    const image = movie.poster_path
        ? `https://image.tmdb.org/t/p/w300/${movie.poster_path}`
        : 'https://via.placeholder.com/300';

    return (
        <Container image={image}>
            <div className='image' />
            <h3 className='title'>{movie.title}</h3>
        </Container>
    );
};
