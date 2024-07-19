import React, { useState, useEffect } from "react";
import { Howl } from "howler";
import Intro from "@/components/intro";
import Hero from "@/components/Hero";
import useWindowWidth from "@/hooks/useWindowWidth";

export default function Home() {
    const [showIntro, setShowIntro] = useState(false);
    const [music, setMusic] = useState(false);
    const [soundplay, setSoundplay] = useState(false);
    const windowWidth = useWindowWidth();

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

        if (music) setTimeout(() => setSoundplay(true), 800);

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
                    {
                        soundplay && (
                            <div className={`absolute flex flex-row justify-center items-center text-xs text-ecru top-4 right-4 ${music ? 'opacity-100' : 'opacity-0'} transition-all duration-300 ease-out`}>
                                <h1 className="mr-3 font-semibold">Daystar - Cozy Cafe</h1>
                                <div className="w-10 h-10">
                                    <video src="/videos/soundplay.mp4" loop autoPlay muted></video>
                                </div>
                            </div>
                        )
                    }
                </>
            )}
        </div>
    );
}