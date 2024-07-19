import { useState, useEffect } from 'react';

export default function useWindowWidth() {
    const win = typeof window !== "undefined" ? window : null
    // Initialize width with undefined to match the server-rendered output initially
    const [width, setWidth] = useState(win ? win.innerWidth : 1024);

    useEffect(() => {
        if(win){
            const updateWidth = () => setWidth(win.innerWidth);
    
            updateWidth();
            win.addEventListener('resize', updateWidth);
    
            return () => win.removeEventListener('resize', updateWidth);
        }
    }, []);

    return width;
}