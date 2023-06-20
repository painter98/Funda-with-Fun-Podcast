
import './App.css';
import React, { useEffect } from 'react';
import { Routes,Route } from 'react-router-dom';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import PodcastPage from './pages/podcastPage';
import CreatePodcast from './pages/createpodcast';
import PodcastDetails from './pages/podcastDetails';
import CreateEpisode from './pages/createEpisode';
import Header from './components/commonComponents/header';
import {toast, ToastContainer} from 'react-toastify';
import { onAuthStateChanged } from 'firebase/auth';
import { onSnapshot } from 'firebase/firestore';
import { db,auth } from './firebase';
import { doc } from 'firebase/firestore';
import { setUser } from './slices/userSlice';
import { useDispatch } from 'react-redux';
import PrivateRoutes from './components/PrivateRoutes';

function App() {

  let dispatch = useDispatch();
  useEffect(()=>{
    //if user is logged in and comes back to the website again after sometime the logged in state is well maintained using useEffect
    const unsubscribeAuth = onAuthStateChanged(auth,(user)=>{
      if(user){
          const unsubscribeSnapshot = onSnapshot(
            doc(db,'users',user.uid),
            (userDoc) => {
              if(userDoc.exists()){
                const userData = userDoc.data();

                dispatch(
                  setUser({
                    name:userData.name,
                    email:userData.email,
                    uid:user.uid,
                  })
                )
              }
            },
            (error) => {
              toast.error('error in fetching the data',error);
            }
          )
          return ()=>unsubscribeSnapshot();
      }
    }
    )
    return () => unsubscribeAuth();
  })

  return (
    <div className="App">
      <ToastContainer/>
      <Header/>
      <Routes>
        <Route path='/' element={<Signup/>}/>
        <Route element={<PrivateRoutes/>}>{/*it keeps the other routes private and protected */}
          <Route path='/profile' element={<Profile/>}/>
          <Route path='/create-podcast' element={<CreatePodcast/>}/>
          <Route path='/podcast' element={<PodcastPage/>}/>
          <Route path='/podcast/:id' element={<PodcastDetails/>}/>
          <Route path='/podcast/:id/create-episode' element={<CreateEpisode/>}/>
      </Route>
        </Routes>
    </div>
  )
}

export default App;
