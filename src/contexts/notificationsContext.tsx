import { createContext, ReactNode, useCallback, useContext, FC } from 'react';
import { useSnackbar } from 'notistack';
import { NotificationType } from 'models';
import { Notification } from 'components';

interface NotificationsProviderProps {
    children: ReactNode;
}

interface NotificationsContextProps {
    showSuccess: (title: string, message: string) => void;
    showError: (title: string, message: string, code: number) => void;
    showWarning: (title: string, message: string, code: number) => void;
    showInfo: (title: string, message: string) => void;
}

const NotificationsContext = createContext<NotificationsContextProps>(
    {} as NotificationsContextProps
);
export const NotificationsProvider: FC<NotificationsProviderProps> = ({
    children
}) => {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const showSuccess = useCallback(
        (title: string, message: string) => {
            enqueueSnackbar(message, {
                content: (key) => (
                    <Notification
                        id={key}
                        message={message}
                        type={NotificationType.SUCCESS}
                        title={title}
                        onClose={closeSnackbar}
                        isModal={true}
                    />
                )
            });
        },
        [closeSnackbar, enqueueSnackbar]
    );

    const showError = useCallback(
        (title: string, message: string, code: number) => {
            enqueueSnackbar(message, {
                content: (key) => (
                    <Notification
                        id={key}
                        message={message}
                        type={NotificationType.ERROR}
                        title={title}
                        code={code}
                        onClose={closeSnackbar}
                        isModal={true}
                    />
                )
            });
        },
        [closeSnackbar, enqueueSnackbar]
    );

    const showWarning = useCallback(
        (title: string, message: string, code: number) => {
            enqueueSnackbar(message, {
                content: (key) => (
                    <Notification
                        id={key}
                        message={message}
                        type={NotificationType.WARNING}
                        title={title}
                        code={code}
                        onClose={closeSnackbar}
                        isModal={true}
                    />
                )
            });
        },
        [closeSnackbar, enqueueSnackbar]
    );

    const showInfo = useCallback(
        (title: string, message: string) => {
            enqueueSnackbar(message, {
                content: (key) => (
                    <Notification
                        id={key}
                        message={message}
                        type={NotificationType.INFO}
                        title={title}
                        onClose={closeSnackbar}
                        isModal={true}
                    />
                )
            });
        },
        [closeSnackbar, enqueueSnackbar]
    );

    return (
        <NotificationsContext.Provider
            value={{ showSuccess, showError, showWarning, showInfo }}
        >
            {children}
        </NotificationsContext.Provider>
    );
};

export const useNotificationsContext = () => {
    return useContext(NotificationsContext);
};
