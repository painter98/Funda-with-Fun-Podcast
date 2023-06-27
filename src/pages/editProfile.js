import React,{useState} from 'react'
import { useSelector } from 'react-redux'
import Button from '../components/commonComponents/button';
import InputComponent from '../components/commonComponents/input';
import FileInput from '../components/commonComponents/input/FileInput';
import { getDownloadURL, getStorage, ref, uploadBytes  } from 'firebase/storage';
import { db } from '../firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function EditProfile() {
    let user = useSelector(state=>state.user.user);
    console.log('edit profile',user);
    let [name,setName] = useState(user.name);
    let [email,setEmail] = useState(user.email);
    let [profilepic,setProfilePic] = useState(user.photoURL);
    let navigate = useNavigate();

    let handleImage = async () => {
        const profileImageRef = ref(getStorage(),`users/`);
      uploadBytes(profileImageRef, profilepic).then((snapshot) => {
        console.log('Uploaded a profile photo');
      });
      const profileImageURL = await getDownloadURL(profileImageRef);
      console.log('url',profileImageURL)
      setProfilePic(profileImageURL);
      console.log(profilepic);
    }


    let handleEditProfile = async() => {
        const userRef = doc(db, "users",user.uid);
        console.log('user ref',userRef);

            await updateDoc(userRef, {
                name,
                email,
                photoURL:profilepic
              });
              console.log('updated');

        toast.success('profile edited successfully');
        navigate('/profile')
    }

  return (
    <div className='input-wrapper'>
      <h1>Edit Profile</h1>
      <InputComponent 
            type='text' 
            state={name} 
            setState={setName}
            placeholder={'Enter the New Name'}/>
      <InputComponent 
            type='text' 
            state={email} 
            setState={setEmail}
            placeholder={'Enter the New Email'}/>
      <FileInput 
            accept={'image/*'} 
            id={'audio-file'} 
            text={'Upload Profile Photo'} 
            handleFunc={handleImage}/>
        <img src={profilepic}/>
      <Button text={'Edit Profile'} 
        onClick={handleEditProfile} 
        disabled={false}/>
    </div>
  )
}

export default EditProfile
