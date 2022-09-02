import React, { useCallback, useEffect } from 'react';
import { Status, ErrorResponse } from 'models';

interface StateType<T> {
    status: Status;
    data?: T | null;
    error?: string;
}

export const useFetch = <T>(url: string, shouldFetch: boolean = false) => {
    const [state, setState] = React.useState<StateType<T>>({
        status: Status.IDLE
    });

    const fetchData = useCallback(async (): Promise<void> => {
        try {
            const data = await fetch(url);

            if (data.status >= 300) {
                throw new ErrorResponse('Failed to fetch data.', data.status);
            }

            const dataJSON = await data.json();
            setState({ status: Status.SUCCESS, data: dataJSON });
        } catch (error: unknown) {
            if (error instanceof Error) {
                setState({
                    status: Status.ERROR,
                    error: error.message
                });
            }

            if (error instanceof ErrorResponse) {
                setState({
                    status: Status.ERROR,
                    error: error.status_message
                });
            }
        }
    }, [url]);

    useEffect(() => {
        if (!shouldFetch) {
            setState({ status: Status.IDLE });

            return;
        }

        setState({ status: Status.LOADING });
        fetchData();
    }, [url, shouldFetch, fetchData]);

    return state;
};
