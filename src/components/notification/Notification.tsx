import { forwardRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconButton } from '@material-ui/core';
import { NotificationType } from 'models';
import { Container } from './style';

interface NotificationProps {
    id: string | number;
    message: string;
    title: string;
    type: NotificationType;
    onClose: (id: string | number) => void;
    isModal: boolean;
    code?: number;
}

export const Notification = forwardRef<any, NotificationProps>((props, ref) => {
    const { id, message, title, code, type, onClose, isModal } = props;

    return (
        <Container type={type} ref={ref} isModal={isModal}>
            <div className='icon'>
                {type === NotificationType.SUCCESS && (
                    <FontAwesomeIcon icon={['fas', 'check']} size='lg' />
                )}
                {type === NotificationType.ERROR && (
                    <FontAwesomeIcon icon={['fas', 'exclamation']} size='lg' />
                )}
                {type === NotificationType.WARNING && (
                    <FontAwesomeIcon
                        icon={['fas', 'exclamation-triangle']}
                        size='lg'
                    />
                )}
                {type === NotificationType.INFO && (
                    <FontAwesomeIcon icon={['fas', 'info']} size='lg' />
                )}
            </div>
            <div className='content'>
                <span className='title'>
                    <h3>{title}</h3>
                    <IconButton
                        size='small'
                        onClick={() => onClose(id)}
                        style={{ padding: '0.5rem' }}
                        aria-label='hide notification'
                    >
                        <FontAwesomeIcon
                            icon={['fas', 'times']}
                            style={{ color: '#fff' }}
                        />
                    </IconButton>
                </span>
                <p className='message'>{message}</p>
                {code && type === NotificationType.ERROR && (
                    <p>
                        {`Error code `}
                        <span className='code'>{code}</span>
                    </p>
                )}

                {code && type === NotificationType.WARNING && (
                    <p>
                        {`Warn code `}
                        <span className='code'>{code}</span>
                    </p>
                )}
            </div>
        </Container>
    );
});
