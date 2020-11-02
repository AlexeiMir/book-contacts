import React from 'react'

export const useEditeHook = (initialValue) => {
    const [value, setValue] = React.useState(initialValue);
    const onChange = React.useCallback((e) => setValue(!value), [value]);
    return { value, onChange };
};
