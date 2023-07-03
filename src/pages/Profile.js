import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Button from '../components/commonComponents/button';
import { auth, db} from '../firebase';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';

 function Profile() {
    let user = useSelector(state=>state.user.user);
    let navigate = useNavigate();
    console.log('myuser profile',user);
    let [userData,setUserData] = useState([]);
    let noPhoto = 'https://1.bp.blogspot.com/-V1_Oi4qEmww/WQ9HKV3_1yI/AAAAAAAADIU/04gae9jiTwcZNPeEc_TgDQ1jZhWdp9JOgCLcB/s1600/offsec.jpg';

    useEffect(()=>{

     let getData = async()=>{

      try{
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setUserData(docSnap.data());
          console.log("Document data:", userData,userData.photoURL);
        } else {
          console.log("No such document!");
        }
  
      }
      catch(error){
        toast.error(error);
      }
     }
     return ()=>getData();
    },[user])

    if(!user) return <p>Loading...</p>

    let handleLogOut = () => {
      signOut(auth).then(()=>{
        toast.success('Successfully logged out');
      })
      .catch((error)=>
      toast.error('Error:' ,error));
    }

    let handleEdit = () => {
      navigate('/edit-profile')
    }
    //console.log(user.photoURL);

    let handleChangePassword = () => {
      navigate('/forgotPassword');
    }

  return (
    <div className='input-wrapper'>
      <h1>Profile</h1>
      <img src={userData.photoURL?`${userData.photoURL}.jpg`:noPhoto} className='profile-picture' alt={'profile photo'}/>
      <p>User Name: {user.name}</p>
      <Button text={'Edit profile'} onClick={handleEdit} disabled={false}/>
      <Button text={'Change Passowrd'} 
        onClick={handleChangePassword} 
        disabled={false}/>
      <Button text={'Log out'} onClick={handleLogOut} disabled={false}/>
    </div>
  )
}

export default Profile;
