import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    MyVideoLibrary : [],
    videosCount: 0
}
const likeSlice = createSlice({
    name : 'MyLibrary',
    initialState,
    reducers: {
        addToLibrary(state, action){
            state.MyVideoLibrary.push(action.payload);
            state.videosCount = state.MyVideoLibrary.length;
        },
          removeFromLibrary(state, action) {
      state.MyVideoLibrary = state.MyVideoLibrary.filter(video => video.VideoId !== action.payload);
      state.videosCount = state.MyVideoLibrary.length;
    }
    }
})
export const { addToLibrary ,removeFromLibrary} = likeSlice.actions;
export default likeSlice.reducer;