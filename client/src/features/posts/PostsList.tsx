import React from "react";
import { Post } from "@/types/Posts";
import { toast } from "react-toastify";
import {
  useDeletePostMutation,
  useCreatePostMutation,
  useGetPostsQuery,
} from "@/services/posts";

const PostsList: React.FC = () => {
  const [message, setMessage] = React.useState("");
  const [createPost] = useCreatePostMutation();
  const getPostsResult = useGetPostsQuery();

  const addPost = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!message) {
      return;
    }
    await toast.promise(createPost({ input: { message } }).unwrap(), {
      success: "Post added",
    });
    setMessage("");
  };

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  React.useEffect(() => {
    if (getPostsResult.error) {
      toast.error("Error fetching posts");
    }
  }, [getPostsResult.error]);

  return (
    <div className="absolute inset-0 px-4 py-8 flex flex-col items-center justify-center">
      <div className="w-full max-w-prose">
        <div className="text-3xl font-medium mb-4 text-center text-gray-800">
          Posts
        </div>
        <div className="mb-4 text-center text-sm text-gray-600 my-4">
          This is a simple example of a React app using{" "}
          <a href="https://graphql.org/learn/" className="">
            GraphQL
          </a>
        </div>
        <div className="shadow-md rounded-md p-4 bg-white mt-10">
          <form>
            <textarea
              className="border border-gray-200 rounded-md py-2 px-4 w-full text-gray-500"
              autoFocus
              autoComplete="off"
              placeholder="Enter a new message"
              value={message}
              onChange={onChange}
            />
            <div className="w-full flex">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-3 rounded ml-auto text-xs mt-2"
                disabled={!message}
                onClick={addPost}
              >
                POST
              </button>
            </div>
          </form>
        </div>
        <div className="flex flex-col gap-4 mt-6">
          {getPostsResult.data?.items?.map(({ id, message }: Post) => (
            <PostItem key={id} id={id} message={message} />
          ))}
        </div>
      </div>
    </div>
  );
};

const PostItem: React.FC<Post> = ({ id, message }) => {
  const [deletePost] = useDeletePostMutation();
  return (
    <div
      key={id}
      className="flex items-start justify-between shadow-md rounded-md p-4 bg-white"
    >
      <div className="text-gray-600 indent-4">{message}</div>
      <button
        className="bg-red-500 hover:bg-red-700 text-white p-2 rounded"
        onClick={async (e) => {
          e.preventDefault();
          await toast.promise(deletePost({ id }).unwrap(), {
            success: "Post deleted",
          });
        }}
      >
        <DeleteIcon />
      </button>
    </div>
  );
};

const DeleteIcon: React.FC = () => (
  <svg
    className="w-3 h-3"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);

export default PostsList;
