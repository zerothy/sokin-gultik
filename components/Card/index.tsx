import Image from "next/image"

import { profileConstant } from "../Hero/ProfileConstant"

export default function Card({ index }: { index: number }) {
    const moveClassClara = "object-left"
    const moveClassIyan = "object-right"

    return (
        <div>
            <Image
                src={`/images/profile/${profileConstant[index].fileName}`} 
                alt={profileConstant[index].altName}
                className={`w-[20rem] h-[28rem] object-cover shadow-lg shadow-[#1A2D36] slideUpCard z-[60] transition-all duration-150 ease-out
                    ${profileConstant[index].altName === "clara" ? moveClassClara : ""}
                    ${profileConstant[index].altName === "iyan" ? moveClassIyan : ""}
                `}
                width={1024}
                height={1024}
            />
        </div>
    )
}