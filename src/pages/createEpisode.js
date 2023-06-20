import React,{useState,useEffect} from 'react';
import { useDispatch} from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import FileInput from '../components/commonComponents/input/FileInput';
import InputComponent from '../components/commonComponents/input';
import Button from '../components/commonComponents/button';
import { auth, db } from '../firebase';
import { getDownloadURL, getStorage,ref,uploadBytes } from 'firebase/storage';
import { addDoc, collection } from 'firebase/firestore';

function CreateEpisode() {
  let [title,setTitle] = useState('');
  let [desc,setDesc] = useState('');
  let [audio,setAudio] = useState('');
  let [loading,setLoading] = useState(false);
  let dispatch = useDispatch();
  let navigate = useNavigate();
  let {id} = useParams();

 // console.log(id);

  async function handleCreateEpisode(){
    setLoading(true);
    if(audio && desc && title && id){

      try{
        console.log('got audio');
        const storage = getStorage();
        const audioRef = ref(storage, `podcast-episodes/${auth.currentUser.uid}/${Date.now()}`);
        await uploadBytes(audioRef, audio);

        const audioURL = await getDownloadURL(audioRef);
        const episodeData = {
          title,
          description:desc,
          audioFile:audioURL
        }

        await addDoc(
          collection(db,'podcasts',id,'episodes'),
          episodeData
        )
      }
      catch(error){
        toast.error(error);
      }
      setLoading(false);
      setTitle('');
      setDesc('');
      setAudio(null);
      navigate(`/podcast/${id}`)
    }
    else{
      toast.error('All inputs should be there');
      setLoading(false);
    }
  }

  
  function audioHandle(file){
    setAudio(file);
  }

  return (
    <div className='input-wrapper'>
      <h1>create an Episode</h1>
      <InputComponent type='text' 
                state={title} 
                setState={setTitle}
                placeholder={'enter the title'}
                required={true}
      />
      <InputComponent type='text' 
                state={desc} 
                setState={setDesc}
                placeholder={'enter the description'}
                required={true}
      />
      <FileInput 
        accept={'audio/*'} 
        id={'audio-file'} 
        text={'Upload Audio File'} 
        handleFunc={audioHandle}/>
      <Button 
        text={loading?'loading...':'Create An Episode'} 
        onClick={handleCreateEpisode} 
        disabled={loading}/>
    </div>
  )
}

export default CreateEpisode;
