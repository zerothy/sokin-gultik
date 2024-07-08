import React, { useState, useEffect, useRef } from "react"

import { profileConstant } from "./ProfileConstant"

export default function Hero(){
    const [track, setTrack] = useState(0)
    const [percentage, setPercentage] = useState(0)
    const [prevPercentage, setPrevPercentage] = useState(0)
    const [nextPercentage, setNextPercentage] = useState(0)
    
    const [selectedImage, setSelectedImage] = useState<number | null>(null)

    const [anyImage, setAnyImage] = useState(true)

    const handleSelectImage = (index: number) => {
        setSelectedImage(index)
        setAnyImage(true)
    }

    const handleDeselectImage = () => {
        setAnyImage(false)
    }

    const handleLeft = () => {
        setSelectedImage((prev) => {
            if(prev === null) return profileConstant.length - 1
            if(prev === 0) return profileConstant.length - 1
            return prev - 1
        })
    }

    const handleRight = () => {
        setSelectedImage((prev) => {
            if(prev === null) return 0
            if(prev === profileConstant.length - 1) return 0
            return prev + 1
        })
    }

    const win = typeof window !== "undefined" ? window : null
    if(win){
        // Desktop
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

        // Mobile
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
        <div className="min-h-screen bg-charcoal">
            <div 
                className="flex flex-row gap-4 absolute left-1/2 top-1/2 w-max" 
                style={{
                    transform: `translate(${nextPercentage}%, -50%)`,
                    transition: "transform 1200ms",
                    animationFillMode: "forwards",
                }}
            >
                {
                    profileConstant.map((profile, index) => (
                        <div key={index} onClick={() => {handleSelectImage(index)}}>
                            <img 
                                src={profile.fileName} 
                                alt={profile.altName} 
                                className="object-cover unselectable h-96 w-64" draggable="false" 
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

            {
                (selectedImage !== null) && (
                    <div 
                        className={`z-40 absolute ${anyImage ? 'slideUp' : 'slideDown'}`}
                    >
                        <img
                            src={profileConstant[selectedImage].fileName}
                            alt={profileConstant[selectedImage].altName}
                            className="object-cover unselectable h-screen w-screen" draggable="false"
                        />
                        <div>
                            <div className="bg-blue-600 opacity-30 z-60 absolute w-[90vh] h-screen left-0 top-0" onClick={handleLeft}></div>
                            <div className="bg-yellow-600 opacity-30 z-60 absolute w-[41vh] h-screen left-[90vh] top-0" onClick={handleDeselectImage}></div>
                            <div className="bg-red-600 opacity-30 z-60 absolute w-[90vh] h-screen right-0 top-0" onClick={handleRight}></div>
                        </div>
                    </div>
                )
            }
        </div>
    )
}