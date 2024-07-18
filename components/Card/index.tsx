import { profileConstant } from "../Hero/ProfileConstant"

export default function Card({ index }: { index: number }) {
    return (
        <div>
            <img 
                src={profileConstant[index].fileName} 
                alt={profileConstant[index].altName}
                className="w-[24rem] h-[32rem] object-cover slideUpCard rotate-[6deg] z-[60]"
            />
        </div>
    )
}