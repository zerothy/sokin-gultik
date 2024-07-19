import React, { useState, useEffect } from "react";
import { Howl } from "howler";
import Intro from "@/components/intro";
import Hero from "@/components/Hero";
import useWindowWidth from "@/hooks/useWindowWidth";

export default function Home() {
    const [showIntro, setShowIntro] = useState(false);
    const [music, setMusic] = useState(false);
    const windowWidth = useWindowWidth(); // Use the custom hook

    const handleIntroEnd = () => {
        setShowIntro(false);
    };

    const handleMusicStart = () => {
        setMusic(true);
    };

    useEffect(() => {
        const sound = new Howl({
            src: ["/sounds/musicbg.mp3"],
            loop: true,
            autoplay: false,
            volume: 0.2,
        });

        if (music) sound.play();
    }, [music]);

    const isWiderScreen = windowWidth >= 1024;

    return (
        <div className="bg-charcoal">
            {!isWiderScreen ? (
                <div className="flex justify-center items-center h-screen w-screen">
                    <h1 className="text-center text-ecru">Please open this website using wider screen :D</h1>
                </div>
            ) : (
                <>
                    {showIntro && <Intro onEnd={handleIntroEnd} musicStart={handleMusicStart} />}
                    {!showIntro && <Hero />}
                </>
            )}
        </div>
    );
}