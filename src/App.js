import { useState } from "react";
import { nanoid } from "nanoid";
import Todo from "./components/Todo";
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";

function App({ tasks }) {
  const [_tasks, setTasks] = useState(tasks);

  const taskList = _tasks.map(({ id, name, completed }) => (
    <Todo id={id} name={name} completed={completed} key={id}></Todo>
  ));

  function addTask(name) {
    const newTask = { id: `todo-${nanoid()}`, name: name, completed: false };
    setTasks([..._tasks, newTask]);
  }

  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>
      <Form addTask={addTask}></Form>
      <div className="filters btn-group stack-exception">
        <FilterButton text="all"></FilterButton>
        <FilterButton text="incomplete"></FilterButton>
        <FilterButton text="completed"></FilterButton>
      </div>
      <h2 id="list-heading">3 tasks remaining</h2>
      <ul className="todo-list stack-large stack-exception" aria-labelledby="list-heading">
        {taskList}
      </ul>
    </div>
  );
}

export default App;
