import React, { useState } from "react";
import { StyleSheet, View, Alert } from "react-native";

import { Header } from "../components/Header";
import { Task, TasksList } from "../components/TasksList";
import { TodoInput } from "../components/TodoInput";

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const taskExists = tasks.find(task => task.title === newTaskTitle);

    if (taskExists) {
      return Alert.alert(
        "Task já cadastrada",
        "Tem certeza que deseja remover esse item?",
        [{ text: "Ok" }]
      );
    }

    const newTask = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false
    };

    setTasks((prevState) => [...prevState, newTask]);
  }

  function handleToggleTaskDone(id: number) {
    const newTasks = tasks.map((currentTask) =>
      currentTask.id === id
        ? {
          ...currentTask,
          done: !currentTask.done,
        }
        :
        currentTask
    );

    setTasks(newTasks);
    //TODO - toggle task done if exists
  }

  function handleRemoveTask(id: number) {
    const newTasks = tasks.filter((currentTask) => currentTask.id !== id);

    setTasks(newTasks);
  }

  function handleEditTask(id: number, newTitle: string) {
    const newTasks = tasks.map((currentTask) =>
      currentTask.id === id
        ? {
          ...currentTask,
          title: newTitle,
        }
        :
        currentTask
    );

    setTasks(newTasks);
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        handleEditTask={handleEditTask}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EBEBEB",
  },
});
