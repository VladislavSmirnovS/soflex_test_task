import React from "react";

import Header from "../Header/Header";
import Login from "../Login/Login";
import ListTasks from "../ListTasks/ListTasks";
import AddTask from "../AddTask/AddTask";
import EditTask from "../EditTask/EditTask";
import Sort from "../Sort/Sort";
import Footer from "../Footer/Footer";
import api from "../../utils/Api";

function App() {
  const [loggedIn, setLoggedIn] = React.useState(
    JSON.parse(localStorage.getItem("loggedIn"))
  );
  const [isLoginPopupOpen, setIsLoginPopupOpen] = React.useState(false);
  const [isAddPopupOpen, setIsAddPopupOpen] = React.useState(false);
  const [isEditPopupOpen, setIsEditPopupOpen] = React.useState(false);
  const [sortField, serSortField] = React.useState("id");
  const [sortDirection, serSortDirection] = React.useState("asc");

  const [tasks, setTasks] = React.useState([]);
  const [taskEdit, setTaskEdit] = React.useState({});
  const [page, setPage] = React.useState(1);
  const [totalPage, setTotalPage] = React.useState(0);

  function changePage(page) {
    setPage(page);
    console.log(page);
  }

  function openLogin() {
    setIsLoginPopupOpen(true);
  }

  function openAddTask() {
    setIsAddPopupOpen(true);
  }

  function openEditTask(id) {
    setTaskEdit(tasks.find((task) => task.id === Number(id)));
    setIsEditPopupOpen(true);
  }

  function handlePopupClick(event) {
    if (event.target.classList.contains("popup")) {
      setIsLoginPopupOpen(false);
      setIsAddPopupOpen(false);
      setIsEditPopupOpen(false);
    }
  }
  function closePopup() {
    setIsLoginPopupOpen(false);
    setIsAddPopupOpen(false);
    setIsEditPopupOpen(false);
  }

  async function loginUser(form) {
    const response = await api.login(form);
    if (response.status === 'ok') {
      console.log(response)
      localStorage.setItem("loggedIn", "true");
      localStorage.setItem("token", response.message.token);
      setLoggedIn(true);
      setIsLoginPopupOpen(false);
    }
  }

  function signOut() {
    setLoggedIn(false);
    localStorage.setItem("loggedIn", "false");
    setLoggedIn(JSON.parse(localStorage.getItem("loggedIn")));
  }

  async function getTasks() {
    const response = await api.getTasks(page, sortField, sortDirection);
    setTotalPage(Math.ceil(response.total_task_count / 3));
    setTasks(response.tasks);
  }

  async function addCard(form) {
    const formData = new FormData();
    formData.append("username", "form.username");
    formData.append("email", form.email);
    formData.append("text", form.text);
    await api.createTask(formData);
    setIsAddPopupOpen(false);
    getTasks();
  }

  async function editedTask(form, checkbox) {
    let task = new FormData();
    task.append("username", form.username);
    task.append("token", localStorage.getItem("token"));
    task.append("email", form.email);
    task.append("text", form.text);
    let status = 0;
    if (form.text === taskEdit.text) {
      if (checkbox) {
        status = 10;
      }
    } else {
      if (checkbox) {
        status = 11;
      } else {
        status = 1;
      }
    }
    task.append("status", status);
    await api.editTask(task, taskEdit.id);
    setIsEditPopupOpen(false);
    getTasks();
  }

  React.useEffect(() => {
    getTasks();
  }, [sortField, sortDirection, page]);

  return (
    <div className="page">
      <Header loggedIn={loggedIn} signOut={signOut} openLogin={openLogin} />
      <Sort
        serSortField={serSortField}
        serSortDirection={serSortDirection}
        openAddTask={openAddTask}
        getTasks={getTasks}
      />

      <ListTasks
        loggedIn={loggedIn}
        tasks={tasks}
        openEditTask={openEditTask}
        page={page}
        totalPage={totalPage}
        changePage={changePage}
      />

      <Login
        isOpen={isLoginPopupOpen}
        onClose={closePopup}
        onPopupClick={handlePopupClick}
        loginUser={loginUser}
      />
      <AddTask
        isOpen={isAddPopupOpen}
        onClose={closePopup}
        onPopupClick={handlePopupClick}
        addCard={addCard}
      />
      <EditTask
        isOpen={isEditPopupOpen}
        onClose={closePopup}
        onPopupClick={handlePopupClick}
        editedTask={editedTask}
        task={taskEdit}
      />
      <Footer />
    </div>
  );
}

export default App;
