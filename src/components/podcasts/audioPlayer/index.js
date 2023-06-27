import React, { useEffect, useState } from 'react';
import './style.css';
import { useRef } from 'react';
import { FaPlay,FaPause,FaVolumeUp,FaVolumeMute } from "react-icons/fa";

function AudioPlayer({audioFile,Image}) {
    const audioRef = useRef();
    let [isplaying,setIsPlaying] = useState(false);
    let [isMute,setIsMute] = useState(true);
    let [duration,setDuration] = useState(0);
    let [volume,setVolume] = useState(0);
    let [currentTime,setCurrentTime] = useState(0);


    useEffect(()=>{
        isplaying?audioRef.current.play():audioRef.current.pause();
        setDuration(audioRef.current.duration)
    },[isplaying])


    useEffect(()=>{
        !isMute?
        audioRef.current.volume = 0: 
        audioRef.current.volume = volume
    },[isMute])

    useEffect(()=>{
        let audio = audioRef.current;
        audio.addEventListener('ended',handleEnded);
        audio.addEventListener('loadedMetadata',handleMetadata);
        audio.addEventListener('timeupdate',handleTimeUpdate);

        return () => {
            audio.removeEventListener('ended',handleEnded);
            audio.removeEventListener('loadedMetadata',handleMetadata);
            audio.removeEventListener('timeupdate',handleTimeUpdate);
        }
    },[])

   

    let handleDuration = (e) => {
        setCurrentTime(e.target.value)
        audioRef.current.currentTime = e.target.value;
    }
    
    let handleMetadata = () => {
        setDuration(parseFloat(audioRef.current.duration));
    }

    let handleVolume = (e) => {
        setVolume(e.target.value);
        audioRef.current.volume = e.target.value;
    }

    let handleEnded = () => {
        setIsPlaying(false);
        setCurrentTime(0);
    }

    let handleTimeUpdate = () => {
        setCurrentTime(parseFloat(audioRef.current.currentTime));
    }


  return (
    <div className='custom-audio-player'>
      <img src={Image} className='audio-file-image'/>
      <audio ref={audioRef} src={audioFile}/>
      <div className='toggle'>
        <p onClick={()=>setIsPlaying(!isplaying)}>{isplaying?<FaPause/>:<FaPlay/>}</p>
        <input
            onChange={handleDuration}
            type='range'
            className='toggle-range'
            max={duration}
            step={0.001}
            value={currentTime}
            />
        <p>{(duration-currentTime).toFixed(2)}</p>
      </div>
      <div className='toggle'>
        <p onClick={()=>setIsMute(!isMute)}>{isMute?<FaVolumeUp/>:<FaVolumeMute/>}</p>
        <input
            onChange={handleVolume}
            type='range'
            className='toggle-range'
            value={volume}
            min={0}
            step={0.01}
            max={1}/>
            <p>{parseInt(volume*100)}</p>
      </div>
    </div>
  )
}

export default AudioPlayer;

