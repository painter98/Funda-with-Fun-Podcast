import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import '../index.css';
import Button from '../components/commonComponents/button';
import { collection, onSnapshot , query } from 'firebase/firestore';
import EpisodeDetails from '../components/podcasts/episodeDetails';
import AudioPlayer from '../components/podcasts/audioPlayer';

function PodcastDetails() {
  const {id} = useParams();
  let navigate = useNavigate();
  //console.log(id);
  let [podcast,setPodcast] = useState({});
  let [episodes,setEpisodes] = useState([]);
  let [playingFile,setPlayingFile] = useState('');

  useEffect(()=>{
    
    if(id){
      getDetails();
    }

  },[id])

  const getDetails = async() => {
      try{
        const docRef = doc(db, "podcasts", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      //console.log("Document data:", docSnap.data());
      setPodcast({id:id,...docSnap.data()})
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
      }
      catch(e){
        toast.error(e);
      }
      console.log(podcast)
  }

  useEffect(()=>{
    const unsubscribe = onSnapshot( //realtime retreival of data from firebase
    query(collection(db,'podcasts',id,'episodes')),
    (querySnapShot) =>{ 
      const episodesData = [];
      querySnapShot.forEach(doc => {
        episodesData.push({id:doc.id,...doc.data()});
      });
      setEpisodes(episodesData);
      //navigate('./podcast:id')
      },(error)=> console.log('error in create episode',error)
      )

      return () => unsubscribe();
  },[id])

const createEpisode = () => {
  navigate(`/podcast/${id}/create-episode`);
}


  return (
    <div >
      {podcast.id && (
        <div className='input-wrapper'>
          <div style={{width:'100%',display:'flex', justifyContent:'space-between', alignItems:'center'}}>
              <h1 className='podcast-title-heading'>{podcast.title}</h1>
              <p style={{width:'20%'}}><Button text={'create Episode'} onClick={createEpisode}/></p>
          </div>
          <img src={podcast.bannerImage} className='banner-image'/>
          <p className='podcast-title-heading'>{podcast.description}</p>
          <h1 className='podcast-title-heading'>Episodes</h1>
          {episodes.length>0?episodes.map((item,index)=>{
          console.log(item);
          return <EpisodeDetails 
            key={index}
            index={index+1}
            title={item.title}
            desc={item.description} 
            audio={item.audioFile}
            onClick={(audio)=>setPlayingFile(audio)}/>
          })
          :<p>No Episodes</p>}
        </div>
        
      )}
      {playingFile && <AudioPlayer audioFile={playingFile} Image={podcast.displayImage}/>}
    </div>
  )
}

export default PodcastDetails;
