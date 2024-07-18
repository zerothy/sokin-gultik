import React, { useState, useEffect, useRef } from "react"

import { profileConstant } from "./ProfileConstant"
import next from "next"

export default function Hero() {
    const [track, setTrack] = useState(0)
    const [percentage, setPercentage] = useState(0)
    const [prevPercentage, setPrevPercentage] = useState(0)
    const [nextPercentage, setNextPercentage] = useState(0)

    const [selectedImage, setSelectedImage] = useState<number | null>(null)

    const [isClicked, setIsClicked] = useState(false)
    const [isUnclicked, setIsUnclicked] = useState(false)
    const [isHovered, setIsHovered] = useState(false)
    const [isAnimated, setIsAnimated] = useState(false)
    const [isTransitioned, setIsTransitioned] = useState(false)
    const [isSlide, setIsSlide] = useState(false)

    const handleSelectImage = (index: number) => {
        setSelectedImage(index)
        setIsClicked(true)
        setTimeout(() => setIsClicked(false), 500)
    }

    const handleDeselectImage = () => {
        setIsAnimated(false)
        setIsUnclicked(true)
        setTimeout(() => setIsUnclicked(false), 500)
        setTimeout(() => setSelectedImage(null), 500)
    }

    const handleLeft = () => {
        setIsAnimated(false)
        setIsSlide(true)
        setTimeout(() => setIsSlide(false), 500)
        setTimeout(() => {
            setSelectedImage((prev) => {
                if (prev === null) return profileConstant.length - 1
                if (prev === 0) return profileConstant.length - 1
                return prev - 1
            })
        }, 590)
    }

    const handleRight = () => {
        setIsAnimated(false)
        setIsSlide(true)
        setTimeout(() => setIsSlide(false), 500)
        setTimeout(() => {
            setSelectedImage((prev) => {
                if (prev === null) return 0
                if (prev === profileConstant.length - 1) return 0
                return prev + 1
            })
        }, 590);
    }

    const win = typeof window !== "undefined" ? window : null
    if (win) {
        // Desktop
        win.onmousedown = (e) => {
            setTrack(e.clientX)
        }
        win.onmouseup = () => {
            setTrack(0)
            setPrevPercentage(percentage)
        }
        win.onmousemove = (e) => {
            if (track === 0) return

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
            if (track === 0) return

            const mouseDelta = track - e.touches[0].clientX
            const maxDelta = window.innerWidth / 2

            setNextPercentage(Math.min(0, Math.max(-100, prevPercentage + (mouseDelta / maxDelta * -100))))

            setPercentage(nextPercentage)
        }
    }

    useEffect(() => {       
        if(isClicked) setTimeout(() => setIsAnimated(true), 1000)
        else setTimeout(() => setIsAnimated(true), 1200)
    }, [selectedImage])

    useEffect(() => {
        setTimeout(() => setIsTransitioned(true), 400)
        setTimeout(() => setIsTransitioned(false), 1200)
    }, [isSlide])

    return (
        <div className="min-h-screen bg-charcoal fadeInAnimation">
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
                        <div key={index} onClick={() => { handleSelectImage(index) }}>
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
                        className={`z-40 relative flex bg-charcoal ${isClicked ? 'slideUp' : ''} ${isUnclicked ? 'slideDown' : ''} `}
                    >
                        <div 
                            className={`flex flex-col h-screen w-screen`}
                        >
                            <div className={`w-full h-1/3 bg-[#1A2D36] delay-0 transition-all duration-300 ease-out ${isTransitioned ? 'translate-x-0' : 'translate-x-full'}`} />
                            <div className={`w-full h-1/3 bg-[#1A2D36] delay-[200ms] transition-all duration-300 ease-out ${isTransitioned ? 'translate-x-0' : 'translate-x-full'}`} />
                            <div className={`w-full h-1/3 bg-[#1A2D36] delay-[400ms] transition-all duration-300 ease-out ${isTransitioned ? 'translate-x-0' : 'translate-x-full'}`} />
                        </div>

                        <div className="absolute h-screen w-screen z-[80] flex items-center justify-center">
                            <div className="w-[40%] h-full" onClick={() => {if(!isTransitioned) handleLeft()}}></div>
                            <div className="w-[20%] h-full"></div>
                            <div className="w-[40%] h-full" onClick={() => {if(!isTransitioned) handleRight()}}></div>

                            <div 
                                className="absolute w-max h-14 flex justify-center font-serif overflow-hidden" 
                                onClick={() => {if(!isTransitioned) handleDeselectImage()}}
                                onMouseEnter={() => setIsHovered(true)}
                                onMouseLeave={() => setIsHovered(false)}
                            >
                                <div className={`text-5xl text-center text-ecru ${isAnimated ? `${isHovered ? '-translate-y-[185%]' : '-translate-y-[90%]'}` : ''}  transition-all duration-300 ease-out cursor-pointer`}>
                                    <span></span>
                                    <br />
                                    {profileConstant[selectedImage].profileName}
                                    <br />
                                    {profileConstant[selectedImage].fullName}
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    )
}