import React, { useState, useEffect, useRef } from "react"
import Image from "next/image"

import { profileConstant } from "./ProfileConstant"
import Card from "../Card"

import useWindowWidth from "@/hooks/useWindowWidth"

export default function Hero() {
    const [track, setTrack] = useState(0)
    const [percentage, setPercentage] = useState(0)
    const [prevPercentage, setPrevPercentage] = useState(0)
    const [nextPercentage, setNextPercentage] = useState(0)

    const windowWidth = useWindowWidth();

    const [selectedImage, setSelectedImage] = useState<number | null>(null)

    const [isClicked, setIsClicked] = useState(false)
    const [isUnclicked, setIsUnclicked] = useState(false)
    const [isHovered, setIsHovered] = useState(false)
    const [isAnimated, setIsAnimated] = useState(false)
    const [isAnimatedCard, setIsAnimatedCard] = useState(false)
    const [isTransitioned, setIsTransitioned] = useState(false)
    const [isSlide, setIsSlide] = useState(false)

    const handleSelectImage = (index: number) => {
        setSelectedImage(index)
        setIsClicked(true)
        setTimeout(() => setIsClicked(false), 500)
    }

    const handleDeselectImage = () => {
        setIsHovered(false)
        setIsAnimated(false)
        setIsUnclicked(true)
        setTimeout(() => setIsAnimatedCard(false), 1200)
        setTimeout(() => setIsUnclicked(false), 500)
        setTimeout(() => setSelectedImage(null), 500)
    }

    const handleLeft = () => {
        setIsAnimated(false)
        setIsSlide(true)
        setTimeout(() => setIsAnimatedCard(false), 1200)
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
        setTimeout(() => setIsAnimatedCard(false), 1200)
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
        if(isClicked) {
            setTimeout(() => {
                setIsAnimated(true)
                setIsAnimatedCard(true)
            }, 1000)
        }
        else {
            setTimeout(() => {
                setIsAnimated(true)
                setIsAnimatedCard(true)
            }, 1200)
        }
    }, [selectedImage])

    useEffect(() => {
        setIsTransitioned(true)
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
                            <Image
                                src={`/images/profile/${profile.fileName}`}
                                alt={profile.altName}
                                className="object-cover unselectable h-96 w-64" draggable="false"
                                style={{
                                    objectPosition: `${nextPercentage + 100}% 50%`,
                                    transition: "object-position 1200ms",
                                    animationFillMode: "forwards",
                                }}
                                width={1024}
                                height={1024}
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
                            className={`flex flex-col h-screen w-screen z-[100]`}
                        >
                            <div className={`w-full h-1/3 bg-[#1A2D36] delay-0 transition-all duration-300 ease-out ${isTransitioned ? 'translate-x-0' : 'translate-x-full'}`} />
                            <div className={`w-full h-1/3 bg-[#1A2D36] delay-[200ms] transition-all duration-300 ease-out ${isTransitioned ? 'translate-x-0' : 'translate-x-full'}`} />
                            <div className={`w-full h-1/3 bg-[#1A2D36] delay-[400ms] transition-all duration-300 ease-out ${isTransitioned ? 'translate-x-0' : 'translate-x-full'}`} />
                        </div>

                        <div className="absolute h-screen w-screen z-60 flex items-center justify-center">
                            <div className="w-[40%] h-full z-[100]" onClick={() => {if(!isTransitioned) handleLeft()}}></div>
                            <div className="w-[20%] h-full z-[100]"></div>
                            <div className="w-[40%] h-full z-[100]" onClick={() => {if(!isTransitioned) handleRight()}}></div>

                            <div 
                                className={`absolute ${windowWidth < 1285 ? 'ml-[6.5rem] mt-[25%]' : 'ml-48 mt-[20%]'} left-0 top-0 w-max h-[3.4rem] flex justify-between font-serif overflow-hidden`} 
                                onClick={() => {if(!isTransitioned) handleDeselectImage()}}
                                onMouseEnter={() => setIsHovered(true)}
                                onMouseLeave={() => setIsHovered(false)}
                            >
                                <div className={`text-5xl text-center text-ecru z-[100] ${isAnimated ? `${isHovered ? '-translate-y-[190%]' : '-translate-y-[90%]'}` : ''}  transition-all duration-300 ease-out cursor-pointer`}>
                                    <span></span>
                                    <br />
                                    {profileConstant[selectedImage].profileName}
                                    <br />
                                    {profileConstant[selectedImage].fullName}
                                </div>

                                <div className={`relative font-serif text-ecru overflow-hidden h-6`}>
                                    <h1 className={`${isAnimated ? `${isHovered ? 'translate-y-[0%]' : 'translate-y-[90%]'}` : 'translate-y-[90%]'} transition-all duration-400 ease-out`}>return</h1>
                                </div>
                            </div>

                            <div className={`absolute font-serif text-ecru w-96 h-max overflow-hidden text-lg text-pretty left-0 top-0 ${windowWidth <= 1285 ? 'ml-[6.5rem] mt-[30%]' : 'ml-48 mt-[24%]'}`}>
                                <p className={`${isAnimated ? `${isHovered ? 'translate-y-[0%]' : 'translate-y-[90%]'}` : 'translate-y-[90%]'} transition-all duration-300 ease-out italic`}>{profileConstant[selectedImage].quotes}</p>
                            </div>

                            <div className={`absolute right-0 z-[60] ${windowWidth <= 1285 ? (windowWidth <= 1124 ? 'mr-[9%]' : 'mr-[13%]') : 'mr-64'}`}>
                                {
                                    (isAnimatedCard) && (<Card index={selectedImage} />)
                                }
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    )
}