import React from 'react';
import Card from './Card/Card';
import {CardHolderProps} from './types/Card.types';

const CardHolder:React.FC<CardHolderProps>=({cards})=>{
    return <div className="flex justify-center">
        {cards.map((card)=>{
            return <Card key={card.title} title={card.title} github={card.github} tags={card.tags}/>
        })}
    </div>
}

export default CardHolder;
