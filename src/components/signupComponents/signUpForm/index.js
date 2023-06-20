import React,{useState} from 'react';
import InputComponent from '../../commonComponents/input';
import { auth,db} from '../../../firebase';
import {createUserWithEmailAndPassword,} from 'firebase/auth';
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {setDoc,doc} from 'firebase/firestore';
import Button from '../../commonComponents/button';
import { setUser } from '../../../slices/userSlice';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function SignupForm() {
    let [fullName,setFullName] = useState('');
    let [email,setEmail] = useState('');
    let [password,setPassword] = useState('');
    let [conpass,setConPass] = useState('');
    let [loading,setLoading] = useState(false);
    let dispatch = useDispatch();
    let navigate = useNavigate();

    let handleSignup = async () => {
      console.log('handling sign up now....')
      setLoading(true);

      if(password === conpass && password.length>=6 && fullName && email){
        try{
          const userCrendential = await createUserWithEmailAndPassword( //creating user data in fireBase
            auth,
            email,
            password
          )
          const user = userCrendential.user;
          console.log('user',user)

          toast.success('SignUp successful');
          //save user data in firestore
          await setDoc(doc(db,'users',user.uid),{ //setting the document in the google authentication
            name:fullName,
            email:user.email,
            uid:user.uid,
          });

          //call the redux function
          dispatch(setUser({
            name:fullName,
            email:user.email,
            uid:user.uid,
          }));
          setLoading(false);
          
          navigate('/profile');
        }
        catch(e){
          console.log('error',e);
          setLoading(false);
        }
      }
      else{
          if(fullName === '' || email === '' || password === '') 
            toast.error('All the inputs are required');
          else if(password !== conpass) 
            toast.error('Password and confirm password doesnot match');
          else if(password.length < 6)
            toast.error('The password length is less than 6')
      }
  
      }
  return (
    <>
      <InputComponent type='text' 
                state={fullName} 
                setState={setFullName}
                placeholder={'enter the name'}
                required={true}
      />
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
      <InputComponent type='text' 
                state={conpass} 
                setState={setConPass}
                placeholder={'enter the consirm password'}
                required={true}
      />
      <Button text={loading?'loading...':'Sign Up'} onClick={handleSignup} disabled={loading}/>
    </>
  )
}
