import { FC } from 'react';

interface EmopyProps {
    label?: string;
    symbol: string;
}

export const Emoji: FC<EmopyProps> = ({ label, symbol }) => (
    <span
        role='img'
        aria-label={label ? label : ''}
        aria-hidden={label ? 'false' : 'true'}
    >
        {symbol}
    </span>
);
