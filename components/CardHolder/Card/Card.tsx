import React, {useState} from 'react'
import {TransitionGroup} from 'react-transition-group';
import {CardProps} from '../../../types/Card.types'

const Card:React.FC<CardProps> = ({title,github,tags}) => {
    const [active,setActive]=useState(false);
    //bgcolor, onhover animation, onclikc animation?
    return <div className="rounded-sm lg:rounded-lg"
            onClick={()=>setActive(prev=>!prev)}>
        <h1>{title}</h1>
        <div className="flex flex-nowrap">
        <TransitionGroup component={null}>
            {tags.map((tag)=>{
                return <CSSTransition>
                    <span key={title+tag.tag} className={tag.class}>tag.tag</span>
                </CSSTransition>
            })}
        </TransitionGroup>
        </div>
    </div>

}

export default Card;
