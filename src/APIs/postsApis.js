import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "https://jsonplaceholder.typicode.com/posts";

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await axios.get(BASE_URL);
  return response.data;
});

export const addPost = createAsyncThunk("posts/addPost", async (post) => {
  const response = await axios.post(BASE_URL, post);
  return response.data;
});

export const updatePost = createAsyncThunk(
  "posts/updatePost",
  async ({ id, updatedData }) => {
    const response = await axios.patch(`${BASE_URL}/${id}`, updatedData);
    return response.data;
  }
);



export const deletePost = createAsyncThunk("posts/deletePost", async (id) => {
  await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);
  return id; // Return the id so it can be used to update the state
});
