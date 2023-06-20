import React from 'react'
import Button from '../../commonComponents/button'

function EpisodeDetails({title,key,index,desc,audio,onClick}) {
  return (
    <div style={{width:'100%',textAlign:'left'}} key={key}>
      <h1 style={{textAlign:'left'}}>{index}. {title}</h1>
      <p>{desc}</p>
      <Button text={'play'} onClick={()=>onClick(audio)}/>
    </div>
  )
}

export default EpisodeDetails
