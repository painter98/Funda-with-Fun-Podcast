import {configureStore} from '@reduxjs/toolkit';
import podcastReducer from './slices/podcastSlice';

import userReducer from './slices/userSlice';

export default configureStore({
    reducer: {
        user:userReducer,
        podcast:podcastReducer
    }
});