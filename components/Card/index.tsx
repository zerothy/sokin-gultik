import Image from "next/image"

import { profileConstant } from "../Hero/ProfileConstant"

export default function Card({ index }: { index: number }) {
    const moveClassClara = "object-left"
    const moveClassIyan = "object-right"
    const moveClassJordan = "translate-x-[5rem]"

    return (
        <div>
            <Image
                src={`/images/profile/${profileConstant[index].fileName}`} 
                alt={profileConstant[index].altName}
                className={`w-[20rem] h-[28rem] object-cover shadow-lg shadow-[#1A2D36] slideUpCard z-[60] 
                    ${profileConstant[index].altName === "clara" ? moveClassClara : ""}
                    ${profileConstant[index].altName === "iyan" ? moveClassIyan : ""}
                    ${profileConstant[index].altName === "jordan" ? moveClassJordan : ""}
                `}
                width={1024}
                height={1024}
            />
        </div>
    )
}