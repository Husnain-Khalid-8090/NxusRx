

import React,{useState} from 'react'

const PreviewProductImage = ({imgUrl}) => {
console.log('dd',imgUrl)
    return (
        <div className="image-preview"><img src={imgUrl}/></div>
    )
}

export default PreviewProductImage