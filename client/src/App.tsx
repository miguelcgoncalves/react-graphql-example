import React from "react";
import ErrorBoundary from "./ErrorBoundary";
import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import PostsList from "@/features/posts/PostsList";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import { store } from "@/store";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ToastContainer
        position="top-right"
        hideProgressBar
        newestOnTop
        autoClose={1000}
        pauseOnFocusLoss={false}
        closeButton={false}
        closeOnClick
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
