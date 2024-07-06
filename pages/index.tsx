import { useState } from "react";

import Intro from "@/components/intro";
import Hero from "@/components/Hero";

export default function Home() {
    const [showIntro, setShowIntro] = useState(false);

    const handleIntroEnd = () => {
        setShowIntro(false);
    }

    return (
        <div className="bg-charcoal">
            {/* {showIntro && <Intro onEnd={handleIntroEnd} />} */}
            {!showIntro && <Hero />}
        </div>
    );
}