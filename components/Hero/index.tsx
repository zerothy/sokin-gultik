import React, { useState, useEffect } from "react"

import { profileConstant } from "./ProfileConstant"

export default function Hero(){
    const [track, setTrack] = useState(0)
    const [percentage, setPercentage] = useState(0)
    const [prevPercentage, setPrevPercentage] = useState(0)
    const [nextPercentage, setNextPercentage] = useState(0)

    const win = typeof window !== "undefined" ? window : null

    if (win) {
        win.onmousedown = (e) => {
            setTrack(e.clientX)
        }

        
        win.onmouseup = () => {
            setTrack(0)
            setPrevPercentage(percentage)
        }

        win.onmousemove = (e) => {
            if(track === 0) return

            const mouseDelta = track - e.clientX
            const maxDelta = window.innerWidth / 2

            setNextPercentage(Math.min(0, Math.max(-100, prevPercentage + (mouseDelta / maxDelta * -100))))

            setPercentage(nextPercentage)
        }

        win.ontouchstart = (e) => {
            setTrack(e.touches[0].clientX)
        }

        win.ontouchend = () => {
            setTrack(0)
            setPrevPercentage(percentage)
        }

        win.ontouchmove = (e) => {
            if(track === 0) return

            const mouseDelta = track - e.touches[0].clientX
            const maxDelta = window.innerWidth / 2

            setNextPercentage(Math.min(0, Math.max(-100, prevPercentage + (mouseDelta / maxDelta * -100))))

            setPercentage(nextPercentage)
        }
    }

    return (
        <div className="min-h-screen bg-charcoal" >
            <div 
                className="flex flex-row gap-4 absolute left-1/2 top-1/2 w-full" 
                style={{
                    transform: `translate(${nextPercentage}%, -50%)`,
                    transition: "transform 1200ms",
                    animationFillMode: "forwards",
                }}
            >
                {
                    profileConstant.map((profile, index) => (
                        <div key={index}>
                            <img 
                                src={profile.fileName} 
                                alt={profile.altName} 
                                className="object-cover unselectable h-80 w-56" draggable="false" 
                                style={{
                                    objectPosition: `${nextPercentage + 100}% 50%`,
                                    transition: "object-position 1200ms",
                                    animationFillMode: "forwards",
                                }}
                            />
                        </div>
                    ))
                }
            </div>
        </div>
    )
}