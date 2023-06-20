import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';

function PodcastCard({id,title,displayImage}) {
  console.log(id);
  return (
    <Link to={`/podcast/${id}`}>
    <div className='podcast-card'>
        <img src={displayImage} className='podcast-page-image'/>
        <p className='podcast-page-title'>{title}</p>
    </div>
    </Link>
  )
}

export default PodcastCard;
