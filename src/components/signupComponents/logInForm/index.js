import React,{useState} from 'react';
import InputComponent from '../../commonComponents/input';
import Button from '../../commonComponents/button';
import { useDispatch } from 'react-redux';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { getDoc,doc } from 'firebase/firestore';
import {auth,db} from '../../../firebase';
import { setUser } from '../../../slices/userSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function LoginForm() {
    let [email,setEmail] = useState('');
    let [password,setPassword] = useState('');
    let [loading,setLoading] = useState(false);
    let dispatch = useDispatch();
    let navigate = useNavigate();
    
    let handleLogin = async () => {
      console.log('handling login now');
      setLoading(true);
      
      if(email && password){

        try{
          const userCrendential = await signInWithEmailAndPassword(
            auth,
            email,
            password
          )
          const user = userCrendential.user;
  
          const userDoc = await getDoc(doc(db,'users',user.uid));
          console.log('userDoc',userDoc)
          const userData = userDoc.data();
  
          console.log(user);
  
          dispatch(
            setUser({
              name:userData.name,
              email:user.email,
              uid:user.uid
            })
          )
          toast.success('Log In successful');
          setLoading(false);
  
          navigate('./profile')
        }
        catch(e){
          console.log('error in login',e);
          toast.error(e.message);
          setLoading(false);
        }
      }
      else{
        setLoading(false);
        toast.error('Enter the valid Email id and Password');
      }
     
  }


  return (
    <>
    <InputComponent type='email' 
                state={email} 
                setState={setEmail}
                placeholder={'enter the email address'}
                required={true}
    />
    <InputComponent type='password' 
                state={password} 
                setState={setPassword}
                placeholder={'enter the password'}
                required={true}
    />
    <Button text={loading?'loading...':'Log In'} onClick={handleLogin} disabled={loading}/>
    </>
  )
}