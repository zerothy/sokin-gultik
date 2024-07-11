import Image from "next/image"
import { loadingStart } from "./LoadingConstant"

export default function LoadingStart(){
    return (
        <div className="flex flex-col">
            <div className="flex flex-row items-center space-x-2 pt-5">
                {loadingStart.map(({fileName, altName}, index) => (
                    <div key={index}>
                        <Image 
                            src={`/images/loadingstate/${fileName}`}
                            alt={altName}
                            width={`${index === 2 ? 100 : 60}`}
                            height={`${index === 2 ? 100 : 60}`}
                            className={`${index === 2 ? '' : `shake-effect-2 delay-0.${index}s`}`}
                        />
                    </div>
                ))}
            </div>
            <div className="pt-3 shake-effect">
                Sokin Gultik&apos;s<br/>Production
            </div>
        </div>
    )
}