import React, { Fragment, useState } from "react";
import {
  Image,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  TextInput,
  Alert
} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { ItemWrapper } from "./ItemWrapper";
import trashIcon from "../assets/icons/trash/trash.png";
import { Task } from './TasksList';

interface TaskProps {
  task: Task;
  index: number,
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  handleEditTask: (id: number, newTitle: string) => void;
}


export default function TasksItem({ task, index, toggleTaskDone, removeTask, handleEditTask }: TaskProps) {
  const [editTask, setEditTask] = useState(false);
  const [newTitle, setNewTitle] = useState(task.title);

  const handleCancelChanges = () => {
    setEditTask(false);
    setNewTitle(task.title);
  }

  const handleSubmitChanges = () => {
    handleEditTask(task.id, newTitle);
    setEditTask(false);
  }

  const renderAlert = () => {
    Alert.alert(
      "Remover item",
      "Tem certeza que deseja remover esse item?",
      [
        { text: "Não" },
        { text: "Sim", onPress: () => removeTask(task.id) }
      ]
    );
  }

  /*



  
    nn achei os icones que deveria usar ;( 




  */
  return (
    <ItemWrapper index={index}>
      <TouchableOpacity
        testID={`button-${index}`}
        activeOpacity={0.7}
        style={styles.taskButton}
        onPress={() => toggleTaskDone(task.id)}
      >
        <View
          testID={`marker-${index}`}
          style={task.done ? styles.taskMarkerDone : styles.taskMarker}
        >
          {task.done && <Icon name="check" size={12} color="#FFF" />}
        </View>
        {editTask ?
          <TextInput
            value={newTitle}
            onChangeText={setNewTitle}
            style={[styles.textInput, task.done ? styles.taskTextDone : styles.taskText]}
            autoFocus
            onSubmitEditing={handleSubmitChanges}
          />
          :
          <Text
            style={task.done ? styles.taskTextDone : styles.taskText}
          >
            {task.title}
          </Text>
        }
      </TouchableOpacity>

      <View style={styles.actions}>
        {!editTask ?
          <Fragment>
            <TouchableOpacity
              testID={`trash-${index}`}
              style={{ paddingRight: 24 }}
              onPress={() => setEditTask(true)}
            >
              <Text>Edit</Text>
            </TouchableOpacity>

            <TouchableOpacity
              testID={`trash-${index}`}
              style={{ paddingRight: 24 }}
              onPress={renderAlert}
            >
              <Image source={trashIcon} />
            </TouchableOpacity>
          </Fragment>
          :
          <TouchableOpacity
            testID={`trash-${index}`}
            style={{ paddingRight: 24 }}
            onPress={() => handleCancelChanges()}
          >
            <Text>Cancel</Text>
          </TouchableOpacity>
        }
      </View>
    </ItemWrapper >
  );
}
const styles = StyleSheet.create({
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 15,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: "row",
    alignItems: "center",
    height: 50
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#B2B2B2",
    marginRight: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  taskText: {
    color: "#666",
    fontFamily: "Inter-Medium",
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: "#1DB863",
    marginRight: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  taskTextDone: {
    color: "#1DB863",
    textDecorationLine: "line-through",
    fontFamily: "Inter-Medium",
  },
  actions: {
    flexDirection: "row"
  },
  textInput: {
    flex: 1,
    height: 50
  }
});
''