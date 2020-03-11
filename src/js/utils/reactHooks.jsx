import { useEffect, useState } from 'react';

const useStateWithLocalStorage = (localStorageKey, defaultValue) => {
    // eslint-disable-next-line max-len
    const [value, setValue] = useState(JSON.parse(localStorage.getItem(localStorageKey)) || defaultValue);

    useEffect(() => {
        localStorage.setItem(localStorageKey, JSON.stringify(value));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);

    return [value, setValue];
};

export default useStateWithLocalStorage;
