import styled from 'styled-components';

interface ContainerProps {
    image: string;
}

export const Container = styled.div<ContainerProps>`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    box-shadow: 0px 0px 4px -2px #202020;
    border-radius: 0.5rem;
    background: #e0dad6;
    color: #58332d;
    padding: 1rem;
    position: relative;

    &&:hover {
        box-shadow: 0px 0px 0px -2px #202020, 0px 0px 0px -7px #202020,
            0px 0px 10px -2px #202020;
        transition: 0.2s;
    }

    .image {
        background: ${({ image }) => `url(${image})`};
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center center;
        width: 100%;
        height: 100%;
        max-width: 15rem;
        max-height: 15rem;
    }

    .title {
        text-transform: capitalize;
    }
`;
