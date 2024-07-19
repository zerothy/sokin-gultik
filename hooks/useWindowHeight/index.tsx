import { useState, useEffect } from 'react';

export default function useWindowHeight() {
    const win = typeof window !== "undefined" ? window : null

    const [height, setHeight] = useState(695);

    useEffect(() => {
        if(win) {
            const handleResize = () => setHeight(win.innerHeight);
            win.addEventListener('resize', handleResize);
            return () => win.removeEventListener('resize', handleResize);
        }
    }, []);

    return height;
}