import React, { useState, useEffect, useRef } from "react"

import { profileConstant } from "./ProfileConstant"
import next from "next"

export default function Hero() {
    const [track, setTrack] = useState(0)
    const [percentage, setPercentage] = useState(0)
    const [prevPercentage, setPrevPercentage] = useState(0)
    const [nextPercentage, setNextPercentage] = useState(0)

    const [prevImageIndex, setPrevImageIndex] = useState<number | null>(null)
    const [nextImageIndex, setNextImageIndex] = useState<number | null>(null)

    const [selectedImage, setSelectedImage] = useState<number | null>(null)

    const [isSlidingLeft, setIsSlidingLeft] = useState(false)
    const [isSlidingRight, setIsSlidingRight] = useState(false)
    const [isClicked, setIsClicked] = useState(false)
    const [isUnclicked, setIsUnclicked] = useState(false)
    const [isHovered, setIsHovered] = useState(false)
    const [isAnimated, setIsAnimated] = useState(false)

    const handleSelectImage = (index: number) => {
        setSelectedImage(index)
        setIsClicked(true)
        setTimeout(() => setIsClicked(false), 500)
        console.log(isAnimated)
    }

    const handleDeselectImage = () => {
        setIsAnimated(false)
        setIsUnclicked(true)
        setTimeout(() => setIsUnclicked(false), 500)
        setTimeout(() => setSelectedImage(null), 500)
    }

    const handleLeft = () => {
        setIsAnimated(false)
        setIsSlidingLeft(true)
        setTimeout(() => {
            setIsSlidingLeft(false)
            setSelectedImage((prev) => {
                if (prev === null) return profileConstant.length - 1
                if (prev === 0) return profileConstant.length - 1
                return prev - 1
            })
        }, 590)
    }

    const handleRight = () => {
        setIsAnimated(false)
        setIsSlidingRight(true);
        setTimeout(() => {
            setIsSlidingRight(false)
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
        if (selectedImage === null) {
            setPrevImageIndex(null)
            setNextImageIndex(null)
            return
        }
        
        if(isClicked) setTimeout(() => setIsAnimated(true), 500)
        else setTimeout(() => setIsAnimated(true), 200)

        setPrevImageIndex(selectedImage === 0 ? profileConstant.length - 1 : selectedImage - 1)
        setNextImageIndex(selectedImage === profileConstant.length - 1 ? 0 : selectedImage + 1)
    }, [selectedImage])

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
                (selectedImage !== null && prevImageIndex !== null && nextImageIndex !== null) && (
                    <div
                        className={`z-40 relative flex ${isClicked ? 'slideUp' : ''} ${isUnclicked ? 'slideDown' : ''} ${isSlidingLeft ? 'slideLeft' : isSlidingRight ? 'slideRight' : ''}`}
                    >
                        {/* Render Previous Image */}
                        <img
                            src={profileConstant[prevImageIndex].fileName}
                            alt={profileConstant[prevImageIndex].altName}
                            className="object-cover unselectable h-full w-full" draggable="false"
                            style={{ transform: 'translateX(-100%)' }}
                        />
                        {/* Render Current Image */}
                        <img
                            src={profileConstant[selectedImage].fileName}
                            alt={profileConstant[selectedImage].altName}
                            className="object-cover unselectable h-full w-full" draggable="false"
                            style={{ transform: 'translateX(-100%)' }}
                        />
                        {/* Render Next Image */}
                        <img
                            src={profileConstant[nextImageIndex].fileName}
                            alt={profileConstant[nextImageIndex].altName}
                            className="object-cover unselectable h-full w-full" draggable="false"
                            style={{ transform: 'translateX(-100%)' }}
                        />

                        

                        <div className="absolute h-screen w-screen z-[80] flex items-center justify-center">
                            <div className="w-[40%] h-full" onClick={handleLeft}></div>
                            <div className="w-[20%] h-full"></div>
                            <div className="w-[40%] h-full" onClick={handleRight}></div>

                            <div 
                                className="absolute w-max h-14 flex justify-center font-serif overflow-hidden" 
                                onClick={handleDeselectImage}
                                onMouseEnter={() => setIsHovered(true)}
                                onMouseLeave={() => setIsHovered(false)}
                            >
                                <div className={`text-5xl text-center ${isAnimated ? `${isHovered ? '-translate-y-[185%]' : '-translate-y-[90%]'}` : ''}  transition-all duration-300 ease-out cursor-pointer`}>
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