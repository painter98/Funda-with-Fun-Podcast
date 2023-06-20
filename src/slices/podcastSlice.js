import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    podcast:[]
};

const podcastSlice = createSlice({
    name:'podcast',
    initialState,
    reducers:{
        setPodcasts:(state,action) => {
            state.podcast = action.payload;
        }
    }
});

export const {setPodcasts} = podcastSlice.actions;
export default podcastSlice.reducer;