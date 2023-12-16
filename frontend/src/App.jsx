import React from "react";
import PageNotFound from "./pages/page-not-found";
import Signin from "./pages/signin";
import Users from "./pages/users";
import HOC from "./components/global/HOC";
import Layout from "./components/global/Layout";
import { Route, Routes } from "react-router-dom";
import Add from "./pages/users/Add";
import Detail from "./pages/users/Detail";
import Edit from "./pages/users/Edit";

const App = () => {
  return (
    <Routes>
      <Route
        element={
          <HOC>
            <Layout />
          </HOC>
        }
      >
        <Route path="/" element={<Users />} />
        <Route path="/add" element={<Add />} />
        <Route path="/:id" element={<Detail />} />
        <Route path="/edit/:id" element={<Edit />} />
      </Route>
      <Route path="/signin" element={<Signin />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default App;
