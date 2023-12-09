import { useEffect } from 'react';
import { navigate } from 'gatsby';

export default function(): React.ReactNode {
    useEffect(() => {
        /** Every missing page goes to the homepage */
        navigate('/');
    }, []);
    return null;
};
