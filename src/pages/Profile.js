import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Button from '../components/commonComponents/button';
import { auth} from '../firebase';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

 function Profile() {
    let user = useSelector(state=>state.user.user);
    let navigate = useNavigate();
    console.log('myuser profile',user);

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
    let noPhoto = 'https://1.bp.blogspot.com/-V1_Oi4qEmww/WQ9HKV3_1yI/AAAAAAAADIU/04gae9jiTwcZNPeEc_TgDQ1jZhWdp9JOgCLcB/s1600/offsec.jpg';
    console.log(user.photoURL);

  return (
    <div className='input-wrapper'>
      <h1>Profile</h1>
      <img src={user.photoURL?user.photoURL:noPhoto} className='profile-picture' alt={'profile photo'}/>
      <p>Email Id: {user.email}</p>
      <p>UserName: {user.name}</p>
      <Button text={'Edit profile'} onClick={handleEdit} disabled={false}/>
      <Button text={'Log out'} onClick={handleLogOut} disabled={false}/>
    </div>
  )
}

export default Profile;
