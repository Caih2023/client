import { useTasks } from "../context/TasksContext";
import { Link } from "react-router-dom";

function TaskCard({ task }) {
  const { deleteTask } = useTasks();

  return (
    <div>
      <h1>{task.titulo}</h1>
      <div>
        <button
          onClick={() => {
            deleteTask(task._id);
          }}
        >
          delete
        </button>
        <Link to={`/tasks/${task._id}`}>edit</Link>
      </div>
      <p>{task.descripcion}</p>
      <p>{new Date(task.createdAt).toLocaleDateString()}</p>
    </div>
  );
}

export default TaskCard;
