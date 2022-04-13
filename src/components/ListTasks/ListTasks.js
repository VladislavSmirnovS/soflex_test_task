import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import { getSortedTasks } from "../../redux/actions/action";
import { v4 as uuidv4 } from 'uuid';

import "./ListTasks.css";
import Pagination from "../Pagination/Pagination";
import CardTask from "../CardTask/CardTask";

function ListTasks() {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.todo.tasks);
  const sortCriteria = useSelector((state) => state.todo.sortCriteria);
  const sortDirection = useSelector((state) => state.todo.sortDirection);

  useEffect(() => {
    dispatch(getSortedTasks(sortCriteria, sortDirection));
  }, []);

  return (
    <section className="tasks">
      <p className="tasks__title">Список задач:</p>
      <div>
        {tasks.map((item) => (
          <CardTask key={uuidv4()} task={item}  />
        ))}
      </div>
      <Pagination />
    </section>
  );
}

export default ListTasks;
