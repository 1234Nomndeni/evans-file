import { createSlice } from '@reduxjs/toolkit';


export const blogSlice = createSlice({
    name: "blog",

    initialState: {
        selectedBlog: null,
    },

    reducers: {
        selectOneBlog: (state, action) => {
            state.selectedBlog = action.payload
        }
    }
})


export const { selectOneBlog } = blogSlice.actions;

export const selectOpenBlog = state => state.blog.selectedBlog;

export default blogSlice.reducer;