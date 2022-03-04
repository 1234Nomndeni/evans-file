import { createSlice } from '@reduxjs/toolkit';


export const blogSlice = createSlice({
    name: "blog",

    initialState: {
        selectedBlog: null,
        postComment: null,
    },

    reducers: {
        selectOneBlog: (state, action) => {
            state.selectedBlog = action.payload
        },
        commentPost: (state, action) => {
            state.postComment = action.payload
        }
    }
})


export const { selectOneBlog, commentPost } = blogSlice.actions;

export const selectOpenBlog = state => state.blog.selectedBlog;
export const selectPostComment = state => state.blog.postComment;

export default blogSlice.reducer;