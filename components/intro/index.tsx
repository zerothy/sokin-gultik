import { clear } from "console";
import { useEffect, useState } from "react";

import { LuSun } from "react-icons/lu";

export default function Intro(){
    const [step, setStep] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const [timer, setTimer] = useState(1000);

    useEffect(() => {
        let id: NodeJS.Timeout;
        if(isActive && step < 4){
            id = setTimeout(() => {
                setStep((prev) => {
                    if(prev > 4) return prev
                    if(prev === 1) setTimer(2000)
    
                    return prev + 1
                })
            }, timer);
        }

        return () => clearTimeout(id)
    }, [isActive, step, timer])

    const handleStep = () => {
        if(!isActive && step === 0) setIsActive(true)
    }

    return (
        <>
            <div 
                className="flex flex-col items-center justify-center min-h-screen"
            >
                {
                    <div
                        className="bg-red-200"
                        onClick={handleStep}
                    >
                        <h1>Click</h1>
                        {step}
                    </div>
                }

                {
                    (step === 1) && (
                        <div className="flex flex-row text-center unselectable" unselectable="on" draggable="false">
                            <h1 className="text-4xl font-extrabold">Hey, Sokin Gultik .</h1>
                            <LuSun className="text-4xl ml-1 " />
                        </div>
                    )
                }
                {   
                    (step === 2) && (
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