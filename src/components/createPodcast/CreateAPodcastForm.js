import React,{ useState }  from 'react';
import InputComponent from '../commonComponents/input';
import Button from '../commonComponents/button';
import FileInput from '../commonComponents/input/FileInput';
import { toast } from 'react-toastify';
import { getDownloadURL, getStorage,ref, uploadBytes } from 'firebase/storage';
import { auth, db } from '../../firebase';
import { addDoc, collection} from 'firebase/firestore';

function CreateAPodcastForm() {
    let [title,setTitle] = useState('');
    let [desc,setDesc] = useState('');
    let [loading,setLoading] = useState(false);
    let [displayImg,setDisplayImg] = useState('');
    let [bannerImg,setBannerImg] = useState('');

    let handleCreatePodcast = async () => {
      console.log('creating podcast')
      let storage = getStorage();
      setLoading(true);

      if(title && desc && displayImg && bannerImg){

        try{

          //store in firebase storage 
          const bannerImgRef = ref(storage,`podcasts/${auth.currentUser.uid}/${Date.now()}`);

          await uploadBytes(bannerImgRef,bannerImg).then((snapshot)=>{
             toast.success('file uploaded');
           })
   
           const bannerImgURL = await getDownloadURL(bannerImgRef);
           console.log(bannerImgURL);

           const displayImgRef = ref(storage,`podcasts/${auth.currentUser.uid}/${Date.now()}`);

           await uploadBytes(displayImgRef,bannerImg).then((snapshot)=>{
              toast.success('file uploaded');
            })
    
            const displayImgURL = await getDownloadURL(displayImgRef);
            console.log(displayImgURL);

            //set document in the storage

            await addDoc(collection(db,'podcasts'),{
              title,
              description:desc,
              bannerImage:bannerImgURL,
              displayImage:displayImgURL,
              createdBy:auth.currentUser.uid
            })

            setTitle('');
            setDesc('');
            setBannerImg(null);
            setDisplayImg(null);
            setLoading(false);
        }
        catch(error){
          console.log(error);
          toast.error('Error:', error);
          setLoading(false);
        }

      }
      else{
        toast.error('Enter all the inputs');
        setLoading(false);
      }
    }

    let bannerImgHandle = (file) => {
      setBannerImg(file);
    }

    let displayImgHandle = (file) => {
      setDisplayImg(file);
    }


  return (
    <>
      <InputComponent type='text' 
                  state={title} 
                  setState={setTitle}
                  placeholder={'Enter the title'}
                  required={true}
        />
        <InputComponent type='text' 
                  state={desc} 
                  setState={setDesc}
                  placeholder={'Enter the description'}
                  required={true}
        />
        <FileInput accept={'/image/*'} id={'banner-image-file'} text={'Upload Banner Image'} handleFunc={bannerImgHandle}/>
        <FileInput accept={'/image/*'} id={'display-image-file'} text={'Upload Display Image'} handleFunc={displayImgHandle}/>
        <Button text={loading?'loading...':'Create A Podcast'} onClick={handleCreatePodcast} disabled={loading}/>
    </>
  )
}

export default CreateAPodcastForm;
