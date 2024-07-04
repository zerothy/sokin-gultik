import Image from "next/image"
import { loadingStart } from "./LoadingConstant"

export default function LoadingStart(){
    return (
        <div className="flex flex-row items-center space-x-2">
            {loadingStart.map(({fileName, altName}, index) => (
                <div key={index}>
                    <Image 
                        src={`/images/loadingstate/${fileName}`}
                        alt={altName}
                        width={`${index === 2 ? 100 : 60}`}
                        height={`${index === 2 ? 100 : 60}`}
                    />
                </div>
            ))}
        </div>
    )
}