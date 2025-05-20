import { useState } from "react";
import "./App.css";

type taskType = {
  title: string;
  finished: boolean;
};

function App() {
  const [taskTitle, setTaskName] = useState("");
  const [taskList, setTaskList] = useState<taskType[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTaskName(e.target.value);
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (taskTitle.trim() === "") return;
    const title = taskTitle;
    const newTask: taskType = {
      title: title,
      finished: false,
    };
    setTaskList([...taskList, newTask]);
  };

  const handleDelete = (index: number) => {
    const newList = [...taskList];
    newList.splice(index, 1);
    setTaskList(newList);
  };

  const handleToggleFinished = (index: number) => {
    const newList = [...taskList];
    newList[index].finished = !newList[index].finished;
    setTaskList(newList);
  };

  const handleEdit = (index: number) => {
    setEditIndex(index);
    setEditTitle(taskList[index].title);
  };

  const handleUpdate = (index: number) => {
    const updatedList = [...taskList];
    updatedList[index].title = editTitle;
    setTaskList(updatedList);
    setEditIndex(null);
    setEditTitle("");
  };

  return (
    <>
      <h1>TaskList</h1>
      {taskList.map((task, index) => (
        <div key={index}>
          {editIndex === index ? (
            <>
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
              />
              <button type="button" onClick={() => handleUpdate(index)}>
                保存
              </button>
            </>
          ) : (
            <>
              <span
                style={{
                  textDecoration: task.finished ? "line-through" : "none",
                }}
              >
                {task.title}
              </span>
              <input
                type="checkbox"
                checked={task.finished}
                onChange={() => handleToggleFinished(index)}
              />
              {task.finished && (
                <button type="button" onClick={() => handleDelete(index)}>
                  削除
                </button>
              )}
              <button type="button" onClick={() => handleEdit(index)}>
                編集
              </button>
            </>
          )}
        </div>
      ))}

      <form action="">
        <input
          type="text"
          value={taskTitle}
          onChange={(e) => handleChange(e)}
        />
        <button onClick={(e) => handleClick(e)}>追加</button>
      </form>
    </>
  );
}

export default App;
