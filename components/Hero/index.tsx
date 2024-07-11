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

    const handleSelectImage = (index: number) => {
        setSelectedImage(index)
        setIsClicked(true)
        setTimeout(() => setIsClicked(false), 500)
    }

    const handleDeselectImage = () => {
        setIsUnclicked(true)
        setTimeout(() => setIsUnclicked(false), 500)
        setTimeout(() => setSelectedImage(null), 500)
    }

    const handleLeft = () => {
        setIsSlidingLeft(true)
        setTimeout(() => setIsSlidingLeft(false), 590);
        setSelectedImage((prev) => {
            if (prev === null) return profileConstant.length - 1
            if (prev === 0) return profileConstant.length - 1
            return prev - 1
        })
    }

    const handleRight = () => {
        setIsSlidingRight(true);
        setTimeout(() => setIsSlidingRight(false), 590);
        setSelectedImage((prev) => {
            if (prev === null) return 0
            if (prev === profileConstant.length - 1) return 0
            return prev + 1
        })
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

        setPrevImageIndex(selectedImage === 0 ? profileConstant.length - 1 : selectedImage - 1)
        setNextImageIndex(selectedImage === profileConstant.length - 1 ? 0 : selectedImage + 1)
    }, [selectedImage])

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


                        <div className="absolute h-screen w-screen top-0 left-0 opacity-30 z-60 flex items-center">
                            <div className="bg-blue-600 w-[40%] h-full" onClick={handleLeft}></div>
                            <div className="bg-yellow-600 w-[20%] h-max flex justify-center font-serif text-5xl" onClick={handleDeselectImage}>Name</div>
                            <div className="bg-red-600 w-[40%] h-full" onClick={handleRight}></div>
                        </div>
                    </div>
                )
            }
        </div>
    )
}