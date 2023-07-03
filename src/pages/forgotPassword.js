import { updatePassword } from 'firebase/auth';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Button from '../components/commonComponents/button';
import InputComponent from '../components/commonComponents/input';
import { auth } from '../firebase';

function ForgotPassword() {
  let [email,setEmail] = useState('');
  let [currUser,setCurrUser] = useState(false);
  let [newPass,setNewPass] = useState('');
  let [conNewPass,setConNewPass] = useState('');
  let navigate = useNavigate();

  let handlePassword = () => {
    if(auth.currentUser.email === email){
        console.log('yes');
        setCurrUser(true)
    }
  }

  let handleChangePassword = () => {
    try{
        if(conNewPass !== newPass && newPass !== ''){
            toast.error('New Password entered is not same as Confirm Password')
        }
        else{
            updatePassword(auth.currentUser,newPass)
            .then(()=>toast.success('Password has been updated'))
            navigate('/profile')
            setCurrUser(false)
        }
    }
    catch(error){
        toast.error(error);
        setCurrUser(false)
    }
  }

  return (
    <div>
    {!currUser?
    (
      <>
        <InputComponent 
          type='text' 
          state={email} 
          setState={setEmail}
          placeholder={'Enter the registered Email'}/>
        <Button text={'continue to change password'} 
          onClick={handlePassword} 
          disabled={false}/>
        </>
    ):(
        <>
          <InputComponent 
            type='text' 
            state={newPass} 
            setState={setNewPass}
            placeholder={'Enter the New Password'}/>
          <InputComponent 
            type='password' 
            state={conNewPass} 
            setState={setConNewPass}
            placeholder={'Confirm New Password'}/>
          <Button text={'Change Password'} 
            onClick={handleChangePassword} 
            disabled={false}/>
        </>
    )}
    </div>
  )
}

export default ForgotPassword;
