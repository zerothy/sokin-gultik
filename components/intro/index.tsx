import { useState } from "react";

import { LuSun } from "react-icons/lu";

export default function Intro(){
    const [step, setStep] = useState(0);

    return (
        <>
            <div 
                className="flex flex-col items-center justify-center min-h-screen"
                onClick={() => {
                    if(step < 1) setStep(step + 1)
                }}
            >
                {
                    (step === 0) && (
                        <div className="flex flex-row text-center unselectable" unselectable="on" draggable="false">
                            <h1 className="text-4xl font-extrabold">Hey, Sokin Gultik .</h1>
                            <LuSun className="text-4xl ml-1 " />
                        </div>
                    )
                }
                {   
                    (step === 1) && (
                        <div className="text-4xl font-extrabold text-center leading-tight unselectable" unselectable="on" draggable="false">
                            <h1>C&apos;mon now, wake up</h1>
                            <h1>We have so many <span className="underline underline-offset-[7px] decoration-wavy">wonders</span> to explore.</h1>
                        </div>
                    )
                }

            </div>
        </>
    )
}