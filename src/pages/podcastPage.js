import { collection, onSnapshot , query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { db } from '../firebase';
import { setPodcasts } from '../slices/podcastSlice';
import PodcastCard from '../components/podcasts/podcastCard';
import InputComponent from '../components/commonComponents/input';
import { useNavigate } from 'react-router-dom';

function PodcastPage() {
  let dispatch = useDispatch();
  let podcast = useSelector(state=>state.podcast.podcast);
  //console.log(podcast.length);
  let [search,setSearch] = useState('');
  let navigate = useNavigate();

  let filterPodcast = podcast.filter(item => item.title.trim().toLowerCase().includes(search.trim().toLowerCase()));
  //console.log(filterPodcast);

  useEffect(()=>{

    const unsubscribe = onSnapshot( //realtime retreival of data from firebase
      query(collection(db,'podcasts')),
      (querySnapShot) =>{ 
        const podcastData = [];
    querySnapShot.forEach(doc => {
      podcastData.push({id:doc.id,...doc.data()});
    });

    dispatch(setPodcasts(podcastData));
    //navigate('./podcast:id')
    },(error)=> console.log('error in podcast page',error)
    )

    return () => unsubscribe();
  },[dispatch])

  return (
    <div className='input-wrapper' style={{marginTop:'1.5rem'}}>
      <h1>Discover Podcast</h1>
      <InputComponent type='text' 
                state={search} 
                setState={setSearch}
                placeholder={'search for podcasts'}
      />
      {
      filterPodcast.length>0?
      <div className='podcast-flex'>
        {filterPodcast.map(item =>
          <PodcastCard key={Date.now()} id={item.id} title={item.title} displayImage={item.displayImage}/>
        )}
      </div>
      :<p>No podcast</p>
      }
    </div>
  )
}

export default PodcastPage;
