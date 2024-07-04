import { clear } from "console";
import { useEffect, useState } from "react";

import { LuSun } from "react-icons/lu";

import LoadingStart from "../loadingstart";

export default function Intro(){
    const [step, setStep] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const [timer, setTimer] = useState(1000);

    useEffect(() => {
        let id: NodeJS.Timeout;
        if(isActive && step < 2){
            id = setTimeout(() => {
                setStep((prev) => {
                    if(prev > 2) return prev
                    // if(prev === 1) setTimer(2000)
    
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
                className="flex flex-col items-center justify-center min-h-screen bg-charcoal text-ecru overflow-hidden"
                onClick={handleStep}
            >
                {
                    (step === 0) && (
                        <div className="font-bold text-lg text-center unselectable flex flex-col justify-between min-h-screen" unselectable="on" draggable="false">
                            <div className="pt-12"></div>
                            <LoadingStart />
                            <div className="pb-12">
                                Click anywhere to start
                            </div>
                        </div>
                    )
                }

                {
                    (step === 1) && (
                        <div className="flex flex-row text-center unselectable" unselectable="on" draggable="false">
                            <h1 className="text-4xl font-bold">Hey, Sokin Gultik .</h1>
                            <LuSun className="text-4xl ml-1 " />
                        </div>
                    )
                }
                {   
                    (step === 2) && (
                        <div className="text-4xl font-bold text-center leading-tight unselectable" unselectable="on" draggable="false">
                            <h1>C&apos;mon now, wake up</h1>
                            <h1>We have so many <span className="underline underline-offset-[7px] decoration-wavy">wonders</span> to explore.</h1>
                        </div>
                    )
                }

            </div>
        </>
    )
}