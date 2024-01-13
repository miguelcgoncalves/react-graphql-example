import api from "./api";
import { Post } from "@/types/Posts";
import { gql } from "graphql-request";
import { TagDescription } from "@reduxjs/toolkit/query";

const getPostsQuery = gql`
  query Posts($offset: Int, $limit: Int) {
    data: posts(offset: $offset, limit: $limit) {
      items {
        id
        message
      }
    }
  }
`;

const createPostQuery = gql`
  mutation CreatePost($input: PostInput!) {
    data: createPost(input: $input) {
      message
    }
  }
`;

const deletePostQuery = gql`
  mutation DeletePost($id: ID!) {
    data: deletePost(id: $id)
  }
`;

const PartialListTag: TagDescription<"Posts"> = {
  type: "Posts",
  id: "PARTIAL-LIST",
};

const makePostTag = (post: Post | undefined): TagDescription<"Post"> => ({
  type: "Post" as const,
  id: post?.id,
});

export const postsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query<{ items: Post[] }, void>({
      query: () => ({ query: getPostsQuery }),
      providesTags: (result) =>
        result
          ? [...result.items.map(makePostTag), PartialListTag]
          : [PartialListTag],
    }),
    createPost: builder.mutation<void, { input: Omit<Post, "id"> }>({
      query: (variables) => ({ query: createPostQuery, variables }),
      invalidatesTags: () => [PartialListTag],
    }),
    deletePost: builder.mutation({
      query: (variables) => ({ query: deletePostQuery, variables }),
      invalidatesTags: (_0, _1, { id }) => [
        { type: "Post", id },
        PartialListTag,
      ],
    }),
  }),
});

export const {
  useGetPostsQuery,
  useCreatePostMutation,
  useDeletePostMutation,
} = postsApi;
