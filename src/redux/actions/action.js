import {
  SET_SORT_CRITERIA,
  SET_MODAL_VISIBLE,
  SET_TASKS,
  SET_TOTAL_TASKS_NUM,
  SET_ERROR,
  SET_SORT_DIRECTION,
  SET_ADMIN,
  SET_TOKEN,
  SET_CURRENT_PAGE,
} from "./types";

const setSortCriteria = (sortCriteria) => ({
  type: SET_SORT_CRITERIA,
  sortCriteria,
});
const setSortDirection = (sortDirection) => ({
  type: SET_SORT_DIRECTION,
  sortDirection,
});
const setModalVisible = (isModalVisible) => ({
  type: SET_MODAL_VISIBLE,
  isModalVisible,
});
const setTasks = (tasks) => ({ type: SET_TASKS, tasks });
const setCurrentPage = (currentPage) => ({
  type: SET_CURRENT_PAGE,
  currentPage,
});
const setTotalTasksNumber = (totalNumber) => ({
  type: SET_TOTAL_TASKS_NUM,
  totalNumber,
});
const setAdmin = (isAdmin) => ({ type: SET_ADMIN, isAdmin });
const setToken = (token) => ({ type: SET_TOKEN, token });

const getSortedTasks =
  (sortField = "id", sortDirection = "asc", page = 1) =>
  async (dispatch) => {
    const response = await fetch(
      `${"https://uxcandy.com/~shapoval/test-task-backend/v2/?developer=VladSmirnov"}&sort_field=${sortField}&sort_direction=${sortDirection}&page=${page}`
    );
    const data = await response.json();

    if (response.status === 200) {
      dispatch(setTasks(data.message.tasks));
      dispatch(setTotalTasksNumber(data.message.total_task_count));
    }
  };

const addNewTask = (task) => async (dispatch) => {
  const requestOptions = {
    method: "POST",
    body: task,
  };

  const response = await fetch(
    "https://uxcandy.com/~shapoval/test-task-backend/v2/create?developer=VladSmirnov",
    requestOptions
  );
  const data = await response.json();

  if (!data.status === "ok") {
    console.log("error");
  }
};

const login = (formData) => async (dispatch) => {
  const requestOptions = {
    method: "POST",
    body: formData,
  };

  const response = await fetch(
    "https://uxcandy.com/~shapoval/test-task-backend/v2/login?developer=VladSmirnov",
    requestOptions
  );
  const data = await response.json();

  if (data.status === "ok") {
    dispatch(setToken(data.message.token));
    dispatch(setAdmin(true));
    localStorage.setItem("token", data.message.token);
  } else {
    console.log("error");
  }
};

const updateTask = (task, id, token) => async (dispatch) => {
  const requestOptions = {
    method: "POST",
    body: task,
  };

  const response = await fetch(
    `https://uxcandy.com/~shapoval/test-task-backend/v2/edit/${id}?developer=VladSmirnov`,
    requestOptions
  );
  const data = await response.json();

  if (!data.status === "ok") {
    console.log("error");
  }
};

export {
  setSortCriteria,
  setModalVisible,
  addNewTask,
  getSortedTasks,
  setSortDirection,
  login,
  setAdmin,
  setToken,
  updateTask,
  setCurrentPage,
};
