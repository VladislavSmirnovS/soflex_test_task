import React from "react";
import "./CardTask.css";

function CardTask({ task, loggedIn, openEditTask }) {
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

  return (
    <article className="card" data-id={task.id}>
      <button
        className={`card__button-edit ${
          loggedIn ? "card__button-edit_visible" : ""
        }`}
        onClick={(e) => openEditTask(e.target.closest("article").dataset.id)}
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
