
import { configureStore } from "@reduxjs/toolkit";
import likesSlicer from "../slicers/like-slicer";

export default configureStore({
    reducer : {
        store: likesSlicer
    },
      devTools: true

})