import React,{useState} from 'react'
import { useSelector } from 'react-redux'
import Button from '../components/commonComponents/button';
import InputComponent from '../components/commonComponents/input';
import FileInput from '../components/commonComponents/input/FileInput';
import { getDownloadURL, getStorage, ref, uploadBytes  } from 'firebase/storage';
import { db,auth } from '../firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { getAuth} from 'firebase/auth';

function EditProfile() {
    let user = useSelector(state=>state.user.user);
    console.log('edit profile',user);

    let [name,setName] = useState(user.name);
    let [profilepic,setProfilePic] = useState(user.photoURL);
    let navigate = useNavigate();

    let handleImage = async (file) => {

      const profileImageRef = ref(getStorage(),`users/${user.uid}`);
      uploadBytes(profileImageRef, file).then((snapshot) => {
        console.log('Uploaded a profile photo');
      });
      const profileImageURL = await getDownloadURL(profileImageRef);
      setProfilePic(profileImageURL);
      console.log(profileImageURL);
    }


    let handleEditProfile = async() => {

      const edituser = getAuth().currentUser;
      console.log(edituser);

    /*  updateEmail(edituser,
        //photoURL:profilepic,
        `${newEmail}`
      );*/
     // console.log(edituser.photoURL,edituser.email);
        let userRef = doc(db,'users',user.uid);

        if(profilepic){
          await updateDoc(userRef,{
            name,
            photoURL:profilepic
          })
          toast.success('profile edited successfully');
        }

        setName('');
        setProfilePic(null);
        
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
      <FileInput 
            accept={'image/*'} 
            id={'photo-file'} 
            text={'Upload Profile Photo'} 
            handleFunc={file=>handleImage(file)}/>
      <Button text={'Edit Profile'} 
            onClick={handleEditProfile} 
            disabled={false}/>
    </div>
  )
}

export default EditProfile
