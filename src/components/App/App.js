import React from "react";

import Header from "../Header/Header";
import Login from "../Login/Login";
import ListTasks from "../ListTasks/ListTasks";
import AddTask from "../AddTask/AddTask";
import EditTask from "../EditTask/EditTask";
import Sort from "../Sort/Sort";
import Footer from "../Footer/Footer";

function App() {
  return (
    <div className="page">
      <Header />
      <Sort />
      <ListTasks />
      <Login />
      <AddTask />
      <EditTask />
      <Footer />
    </div>
  );
}

export default App;
