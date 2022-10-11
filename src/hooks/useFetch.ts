import React, { useCallback, useEffect } from 'react';
import { Status, ErrorResponse } from 'models';
import { useNotificationsContext } from 'contexts';

interface StateType<T> {
    status: Status;
    data?: T | null;
    error?: string;
}

let controller: AbortController;
export const useFetch = <T>(
    url: string,
    shouldFetch: boolean = true,
    onSuccessCallback?: (data: T) => void
) => {
    const { showError } = useNotificationsContext();
    const [state, setState] = React.useState<StateType<T>>({
        status: Status.IDLE
    });

    const fetchData = useCallback(async (): Promise<T | null> => {
        setState({ status: Status.LOADING });
        controller = new AbortController();
        const signal = controller.signal;

        try {
            const data = await fetch(url, { signal });
            const dataJSON = await data.json();
            if (dataJSON.success === false) {
                throw new ErrorResponse(
                    dataJSON?.status_message,
                    dataJSON?.status_code
                );
            } else if (data.status === 200) {
                setState({ status: Status.SUCCESS, data: dataJSON });
                return Promise.resolve(dataJSON as T);
            } else {
                throw new ErrorResponse('Failed to fetch data.', data.status);
            }
        } catch (error: unknown) {
            if (error instanceof Error) {
                setState({
                    status: Status.ERROR,
                    error: error.message
                });
                showError('Error', error.message, 500);
            }

            if (error instanceof ErrorResponse) {
                setState({
                    status: Status.ERROR,
                    error: error.status_message
                });
                showError('Error', error.status_message, error.status_code);
            }

            return Promise.resolve(null);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [url]);

    useEffect(() => {
        if (!shouldFetch || !url) {
            setState({ status: Status.IDLE });

            return;
        }

        fetchData().then(
            (data) => data && onSuccessCallback && onSuccessCallback(data)
        );

        return () => {
            // cancel the previous request if the URL changes before getting response
            Status.LOADING && controller.abort();
        };
    }, [url, shouldFetch, fetchData, onSuccessCallback]);

    return state;
};
