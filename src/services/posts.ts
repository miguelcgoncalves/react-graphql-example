import api from "./api";
import { Post } from "@/types/Posts";
import { gql } from "graphql-request";
import { FullTagDescription } from "@reduxjs/toolkit/dist/query/endpointDefinitions";

const getPostQuery = gql`
  query Post($id: ID!) {
    data: post(id: $id) {
      message
    }
  }
`;

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

const PartialListTag: FullTagDescription<"Posts"> = {
  type: "Posts",
  id: "PARTIAL-LIST",
};

const makePostTag = (post: Post | undefined): FullTagDescription<"Post"> => ({
  type: "Post" as const,
  id: post?.id,
});

export const postsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query<{ items: Post[] }, void>({
      query: (variables) => ({ query: getPostsQuery, variables }),
      providesTags: (result) =>
        result
          ? [...result.items.map(makePostTag), PartialListTag]
          : [PartialListTag],
    }),
    getPost: builder.query<Post, string>({
      query: (variables) => ({ query: getPostQuery, variables }),
      providesTags: (result) => [makePostTag(result)],
    }),
    createPost: builder.mutation<void, { input: Omit<Post, "id"> }>({
      query: (variables) => ({ query: createPostQuery, variables }),
      invalidatesTags: () => [PartialListTag],
    }),
    deletePost: builder.mutation({
      query: (variables) => ({ query: deletePostQuery, variables }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Post", id },
        PartialListTag,
      ],
    }),
  }),
});

export const {
  useGetPostsQuery,
  useGetPostQuery,
  useCreatePostMutation,
  useDeletePostMutation,
} = postsApi;
