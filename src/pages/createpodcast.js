import React from 'react';
import CreateAPodcastForm from '../components/createPodcast/CreateAPodcastForm';


function CreatePodcast() {

  return (
    <div>
      <div className='input-wrapper'>
        <h1>Create A Podcast</h1>
        <CreateAPodcastForm/>
      </div>
    </div>
  )
}

export default CreatePodcast;
