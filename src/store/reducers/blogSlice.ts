import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Blog } from '../../types/blog';

interface BlogState {
  blogs: Blog[];
  allBlogs: Blog[], 
}

const initialState: BlogState = {
  blogs: [],
  allBlogs: [], 
};

const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    setBlogs(state, action: PayloadAction<Blog[]>) {
      state.blogs = action.payload;
      state.allBlogs = action.payload; // Ensure full data is stored
    },
    
    likeBlog(state, action: PayloadAction<number>) {
      const blog = state.blogs.find((b) => b.id === action.payload);
      if (blog) blog.likes += 1;
    },
    addComment(state, action: PayloadAction<{ id: number; comment: string }>) {
      const blog = state.blogs.find((b) => b.id === action.payload.id);
      if (blog) blog.comments.push(action.payload.comment);
    },
    filterBlogs(state, action: PayloadAction<string>) {
      const searchText = action.payload.toLowerCase();
      if (searchText === '') {
        state.blogs = state.allBlogs;
      } else {
        state.blogs = state.allBlogs.filter(blog =>
          blog.title.toLowerCase().includes(searchText) ||
          blog.body.toLowerCase().includes(searchText)
        );
      }
    },
    
  },
});

export const { setBlogs, likeBlog, addComment,filterBlogs } = blogSlice.actions;
export default blogSlice.reducer;
