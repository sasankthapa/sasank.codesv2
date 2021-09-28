import React, {useState} from 'react'
import SlideFromTop from './hoc/SlideFromRight';
import SlideFromRight from './hoc/SlideFromRight'

interface NotionCardProps{
    data:NotionCard,
    delay:number
}
const NotionCards:React.FC<NotionCardProps>=({data,delay})=>{
    const [active,setActive] =useState(false);

    return <SlideFromRight delay={delay*500}>
        <div onClick={()=>setActive(prev=>!prev)} className="p-5 bg-blue-200 shadow-lg cursor-pointer rounded-md">
            <h1>{data.name}</h1>
            <div className={`${active?'block':'hidden'} flex`}>
                {data.info.map((val:string,index:number)=>{
                    return <p key={val[0]+index}>{val}</p>
                })}
            </div>
        </div>
    </SlideFromRight>
}

export default NotionCards
