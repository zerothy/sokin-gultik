import { clear } from "console";
import { useEffect, useState } from "react";

import { LuSun } from "react-icons/lu";

import LoadingStart from "../loadingstart";

export default function Intro({ onEnd }: { onEnd: any}){
    const [step, setStep] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const [timer, setTimer] = useState(400);

    useEffect(() => {
        let id: NodeJS.Timeout;
        if(step === 15){
            setTimeout(() => {
                onEnd()
            }, 2600)
        }

        if(isActive && step < 15){
            id = setTimeout(() => {
                setStep((prev) => {
                    if(prev > 15) return prev
                    if(prev === 3) setTimer(1400)
                    if(prev === 4) setTimer(400)
                    if(prev === 5) setTimer(800)
                    if(prev === 6) setTimer(400)
                    if(prev === 7) setTimer(1000)
                    if(prev === 8) setTimer(300)
                    if(prev === 12) setTimer(400)
                    if(prev === 13) setTimer(300)
    
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
                            <div className="pb-12 shake-effect">
                                Click anywhere to start
                            </div>
                        </div>
                    )
                }

                {
                    (step > 0 && step < 5) && (
                        <div className={`flex flex-row text-center unselectable ${step === 4 ? "fadeOutAnimation" : ""}`} unselectable="on" draggable="false">
                            <h1 className="text-xl md:text-4xl font-bold">
                                <span className={`${step >= 1 ? "fadeInAnimation" : ""}`}>Hey,&nbsp;</span>
                                <span className={`${step >= 2 ? "opacity-100" : "opacity-0"} transition-all ease-in duration-[400ms]`}>Sokin&nbsp;</span>
                                <span className={`${step >= 3 ? "opacity-100" : "opacity-0"} transition-all ease-in duration-[400ms]`}>Gultik .</span>
                            </h1>
                            <LuSun className={`${step >= 4 ? "opacity-100" : "opacity-0"} transition-all ease-in duration-[400ms] text-4xl ml-1`} />
                        </div>
                    )
                }
                {   
                    (step >= 5) && (
                        <div className={`text-xl md:text-4xl font-bold text-center leading-tight unselectable ${step === 15 ? "fadeOutAnimation2" : ""}`} unselectable="on" draggable="false">
                            <h1>
                                <span className={`${step >= 5 ? "fadeInAnimation" : ""}`}>C&apos;mon&nbsp;</span>
                                <span className={`${step >= 6 ? "opacity-100" : "opacity-0"} transition-all ease-in duration-[400ms]`}>now,&nbsp;</span>
                                <span className={`${step >= 7 ? "opacity-100" : "opacity-0"} transition-all ease-in duration-[400ms]`}>wake&nbsp;</span>
                                <span className={`${step >= 8 ? "opacity-100" : "opacity-0"} transition-all ease-in duration-[400ms]`}>up</span>
                            </h1>
                            <h1>
                                <span className={`${step >= 9 ? "opacity-100" : "opacity-0"} transition-all ease-in duration-[400ms]`}>We&nbsp;</span>
                                <span className={`${step >= 10 ? "opacity-100" : "opacity-0"} transition-all ease-in duration-[400ms]`}>have&nbsp;</span>
                                <span className={`${step >= 11 ? "opacity-100" : "opacity-0"} transition-all ease-in duration-[400ms]`}>so&nbsp;</span>
                                <span className={`${step >= 12 ? "opacity-100" : "opacity-0"} transition-all ease-in duration-[400ms]`}>many&nbsp;</span> 
                                <span className={`${step >= 13 ? "opacity-100" : "opacity-0"} transition-all ease-in duration-[400ms] underline underline-offset-[7px] decoration-wavy`}>wonders&nbsp;</span>
                                <span className={`${step >= 14 ? "opacity-100" : "opacity-0"} transition-all ease-in duration-[400ms]`}>to&nbsp;</span>
                                <span className={`${step >= 15 ? "opacity-100" : "opacity-0"} transition-all ease-in duration-[400ms]`}>explore.</span>
                            </h1>
                        </div>
                    )
                }

            </div>
        </>
    )
}