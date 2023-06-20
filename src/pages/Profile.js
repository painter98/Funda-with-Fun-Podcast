import React from 'react'
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Button from '../components/commonComponents/button';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';

function Profile() {
    let user = useSelector(state=>state.user.user);
    console.log('myuser profile',user);

    if(!user) return <p>Loading...</p>

    let handleLogOut = () => {
      signOut(auth).then(()=>{
        toast.success('Successfully logged out');
      })
      .catch((error)=>
      toast.error('Error:' ,error));
    }

  return (
    <div className='input-wrapper'>
      <h1>Profile</h1>
      <p>Email Id: {user.email}</p>
      <p>UserName: {user.name}</p>
      <Button text={'Log out'} onClick={handleLogOut} disabled={false}/>
    </div>
  )
}

export default Profile;
