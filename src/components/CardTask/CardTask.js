import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setModalVisible } from "../../redux/actions/action";
import "./CardTask.css";

function CardTask({ task }) {
  function status(status) {
    let taskStatus = "Задача не выполнена";
    if (status === 1) {
      taskStatus = "Задача не выполнена, отредактирована администратором";
    } else if (status === 10) {
      taskStatus = "Задача выполнена";
    } else if (status === 11) {
      taskStatus = "Задача отредактирована администратором и выполнена";
    }
    return taskStatus;
  }
  const dispatch = useDispatch();
  const isAdmin = useSelector((state) => state.todo.isAdmin);

  const openEditTask = () => {
    dispatch(
      setModalVisible({
        isVisible: true,
        type: "taskEdit",
        username: task.username,
        email: task.email,
        id: task.id,
        text: task.text,
      })
    );
  };

  return (
    <article className="card">
      <button
        className={`card__button-edit ${
          isAdmin ? "card__button-edit_visible" : ""
        }`}
        onClick={openEditTask}
      >
        Редактировать
      </button>
      <div className="card__block">
        <p className="card__element card__name">Имя: {task.username}</p>
        <p className="card__element card__email">&#128386; {task.email} </p>
        <p className="card__element card__task-text">
          Текст задачи: {task.text}
        </p>
        <p className="card__element card__status">{status(task.status)}</p>
      </div>
    </article>
  );
}

export default CardTask;
