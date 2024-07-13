import { use, useState, useEffect } from "react";
import { Howl } from "howler";

import Intro from "@/components/intro";
import Hero from "@/components/Hero";

export default function Home() {
    const [showIntro, setShowIntro] = useState(true);
    const [music, setMusic] = useState(false);

    const handleIntroEnd = () => {
        setShowIntro(false);
    }

    const handleMusicStart = () => {
        setMusic(true);
    }

    useEffect(() => {
        const sound = new Howl({
            src: ["/sounds/musicbg.mp3"],
            loop: true,
            autoplay: false,
            volume: 0.05,
        });

        if(music) sound.play();
    }, [music]);

    return (
        <div className="bg-charcoal">
            {showIntro && <Intro onEnd={handleIntroEnd} musicStart={handleMusicStart} />}
            {!showIntro && <Hero />}
        </div>
    );
}