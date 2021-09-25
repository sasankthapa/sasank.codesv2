import React from 'react'

const ThreedButton:React.FC<{className:string}>=({className})=>{
    return (
    <div className={className}>
    <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 viewBox="0 0 64 64" xmlSpace="preserve">
        <circle className="text-gray-300 bg-transparent fill-current" cx="32" cy="32" r="31.5"/>
        <g>
            <polygon className="text-green-900 fill-current" points="51.8,12.5 39.8,23.5 39.8,51.5 51.8,38.5 	"/>
            <polygon className="text-green-500 fill-current" points="25.8,12.5 51.8,12.5 40.3,23 11.8,23.5 	"/>
            <polygon className="text-green-700 fill-current" points="11.8,23.5 39.8,23.1 39.8,51.5 11.8,52.4 	"/>
        </g>
    </svg>
    </div>
    )
}

export default ThreedButton;
