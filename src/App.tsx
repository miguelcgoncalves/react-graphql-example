import React from "react";
import { Provider } from "react-redux";
import store from "./store";
import ErrorBoundary from "./ErrorBoundary";
import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import PostsList from "@/features/posts/PostsList";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ToastContainer
        position="top-right"
        hideProgressBar
        newestOnTop
        autoClose={1000}
        pauseOnHover
      />
      <ErrorBoundary>
        <BrowserRouter>
          <Routes>
            <Route path="*" element={<PostsList />} />
          </Routes>
        </BrowserRouter>
      </ErrorBoundary>
    </Provider>
  );
};

export default App;
