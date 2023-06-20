import React from 'react'
import { auth } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Outlet,Navigate } from 'react-router-dom';

function PrivateRoutes() {
    let [user,loading,error] = useAuthState(auth);
        if(loading){
                return <h1>Loading...</h1>
        }
        else if (!user || error){
            return <Navigate to='/' replace/>
        }
        else{
            return <Outlet/>
        }
      
}

export default PrivateRoutes
