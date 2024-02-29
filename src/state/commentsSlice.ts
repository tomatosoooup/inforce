import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "./store";

interface Comment {
  id: string;
  productId: string;
  description: string;
}

interface CommentsState {
  comments: Comment[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: CommentsState = {
  comments: [],
  status: "idle",
  error: null,
};

const API_URL = "http://localhost:3000";

export const fetchComments = createAsyncThunk(
  "comments/fetchComments",
  async (productId: string) => {
    const response = await axios.get<Comment[]>(
      `${API_URL}/products/${productId}/comments`
    );
    return response.data;
  }
);

export const addComment = createAsyncThunk(
  "comments/addComment",
  async ({
    productId,
    description,
  }: {
    productId: string;
    description: string;
  }) => {
    const response = await axios.post<Comment>(`${API_URL}/comments`, {
      productId,
      description,
    });
    return response.data;
  }
);

export const deleteComment = createAsyncThunk(
  "comments/deleteComment",
  async (commentId: string) => {
    await axios.delete(`${API_URL}/comments/${commentId}`);
    return commentId;
  }
);

const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        fetchComments.fulfilled,
        (state, action: PayloadAction<Comment[]>) => {
          state.status = "succeeded";
          state.comments = action.payload;
        }
      )
      .addCase(
        addComment.fulfilled,
        (state, action: PayloadAction<Comment>) => {
          state.comments.push(action.payload);
        }
      )
      .addCase(
        deleteComment.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.comments = state.comments.filter(
            (comment) => comment.id !== action.payload
          );
        }
      );
  },
});

export const selectComments = (state: RootState) => state.comments.comments;
export const selectCommentsStatus = (state: RootState) => state.comments.status;
export const selectCommentsError = (state: RootState) => state.comments.error;

export default commentsSlice.reducer;
