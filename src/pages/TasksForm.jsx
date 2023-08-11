import { useForm } from "react-hook-form";
import { useTasks } from "../context/TasksContext";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

function TasksForm() {
  const { register, handleSubmit, setValue } = useForm();
  const { createTask, getTask, updateTask } = useTasks();
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    async function loadTask() {
      if (params.id) {
        const task = await getTask(params.id);
        console.log(task);
        setValue("titulo", task.titulo);
        setValue("descripcion", task.descripcion);
        setValue("foto", task.foto);
        setValue("coordenadas", task.coordenadas.coordinates);
      }
    }
    loadTask();
  }, []);

  const onSubmit = handleSubmit(async (data) => {
    const { titulo, descripcion, foto, coordenadas } = data;
    const [latitud, longitud] = coordenadas.split(",");

    const taskData = {
      titulo,
      descripcion,
      foto,
      coordenadas: {
        type: "Point",
        coordinates: [parseFloat(longitud), parseFloat(latitud)],
      },
    };

    try {
      if (params.id) {
        updateTask(params.id, data)
      } else {
        createTask(taskData);
      }
      navigate("/tasks");
    } catch (error) {
      console.error("Error creating task:", error);
    }
  });

  return (
    <div className="bg-zinc-800 max-w-md p-10 rounded-md">
      <form onSubmit={onSubmit}>
        <input
          className="W-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
          type="text"
          placeholder="Titulo"
          {...register("titulo")}
          autoFocus
        />
        <textarea
          rows="3"
          placeholder="Descripcion"
          {...register("descripcion")}
          className="W-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
        />
        <input
          type="text"
          placeholder="foto"
          {...register("foto")}
          className="W-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
        />
        <input
          type="text"
          placeholder="coordenadas"
          {...register("coordenadas")}
          className="W-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
        />
        <button>Save</button>
      </form>
    </div>
  );
}

export default TasksForm;
