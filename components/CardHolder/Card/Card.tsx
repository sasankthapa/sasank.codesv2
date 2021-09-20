import React, {useState} from 'react'
import {CardProps} from '../types/Card.types'

const Card:React.FC<CardProps> = ({title,github,tags}) => {
    const [active,setActive]=useState(false);
    //bgcolor, onhover animation, onclikc animation?
    return <div className="rounded-lg"
            onClick={()=>setActive(prev=>!prev)}>
        <h1>{title}</h1>
        <div className="flex flex-nowrap">
            {tags.map((tag)=>{
                return <span key={title+tag.tag} className={tag.class}>tag.tag</span>
            })}
        </div>
    </div>

}

export default Card;
