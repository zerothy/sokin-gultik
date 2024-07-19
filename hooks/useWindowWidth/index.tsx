import { useState, useEffect } from 'react';

export default function useWindowWidth() {
    const win = typeof window !== "undefined" ? window : null

    const [width, setWidth] = useState(1024);

    useEffect(() => {
        if(win) {
            const handleResize = () => setWidth(win.innerWidth);
            win.addEventListener('resize', handleResize);
            return () => win.removeEventListener('resize', handleResize);
        }
    }, []);

    return width;
}