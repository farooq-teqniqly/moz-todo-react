import { useState } from "react";
import { nanoid } from "nanoid";
import Todo from "./components/Todo";
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";

const FILTER_MAP = {
  All: () => true,
  Active: (task) => !task.completed,
  Completed: (task) => task.completed
};

const FILTER_NAMES = Object.keys(FILTER_MAP);

function App(props) {
  const [tasks, setTasks] = useState(props.tasks);
  const [filter, setFilter] = useState("All");

  const taskList = tasks
    .filter(FILTER_MAP[filter])
    .map(({ id, name, completed }) => (
      <Todo id={id} name={name} completed={completed} key={id} toggleTaskCompleted={toggleTaskCompleted} deleteTask={deleteTask} editTask={editTask}></Todo>
    ));

  const filterList = FILTER_NAMES.map((name) => (
    <FilterButton key={name} text={name} isPressed={name === filter} setFilter={setFilter}></FilterButton>
  ))

  function addTask(name) {
    const newTask = { id: `todo-${nanoid()}`, name: name, completed: false };
    setTasks([...tasks, newTask]);
  }

  function toggleTaskCompleted(id) {
    const updatedTasks = tasks.map((task) => {
      if (task.id !== id) {
        return task;
      }

      return { ...task, completed: !task.completed };
    });

    setTasks(updatedTasks);
  }

  function deleteTask(id) {
    const remainingTasks = tasks.filter((task) => task.id !== id);
    setTasks(remainingTasks);
  }

  function editTask(id, newName) {
    const editedTasks = tasks.map((task) => {
      if (id !== task.id) {
        return task;
      }

      return { ...task, name: newName };
    });

    setTasks(editedTasks);
  }

  const taskNoun = tasks.length === 1 ? "task" : "tasks";
  const headingText = tasks.length === 0 ? "You have no tasks. Add some!" : `${tasks.length} ${taskNoun} remaining.`;

  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>
      <Form addTask={addTask}></Form>
      <div className="filters btn-group stack-exception">
        {filterList}
      </div>
      <h2 id="list-heading">{headingText}</h2>
      <ul className="todo-list stack-large stack-exception" aria-labelledby="list-heading">
        {taskList}
      </ul>
    </div>
  );
}

export default App;
