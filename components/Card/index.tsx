import { profileConstant } from "../Hero/ProfileConstant"

export default function Card({ index }: { index: number }) {
    return (
        <div>
            <img 
                src={profileConstant[index].fileName} 
                alt={profileConstant[index].altName}
                className="w-[20rem] h-[28rem] object-cover shadow-lg shadow-[#1A2D36] slideUpCard z-[60]"
            />
        </div>
    )
}