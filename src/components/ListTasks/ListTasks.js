import "./ListTasks.css";
import Pagination from "../Pagination/Pagination";
import CardTask from "../CardTask/CardTask";

function ListTasks({
  tasks,
  loggedIn,
  openEditTask,
  totalPage,
  page,
  changePage,
}) {
  return (
    <section className="tasks">
      <p className="tasks__title">Список задач:</p>
      <div>
        {tasks.map((item) => (
          <CardTask
            key={item.id}
            task={item}
            loggedIn={loggedIn}
            openEditTask={openEditTask}
          />
        ))}
      </div>
      <Pagination page={page} totalPage={totalPage} changePage={changePage} />
    </section>
  );
}

export default ListTasks;
