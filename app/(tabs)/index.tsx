import { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Toast from "react-native-toast-message";
import { supabase } from "../../lib/supabase";

import AddTaskModal from "../../components/AddTaskModal";
import TaskItem from "../../components/TaskItem";

type Task = {
  id: string;
  title: string;
  completed: boolean;
};

export default function Index() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [modalVisible, setModalVisible] = useState(false);

  // READ
  async function loadTasks() {
    const { data, error } = await supabase
      .from("tasks")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.log("LOAD ERROR:", error.message);
      return;
    }

    setTasks(data ?? []);
  }

  // CREATE
  async function addTask(title: string) {
    const { error } = await supabase
      .from("tasks")
      .insert([{ title, completed: false }]);

    if (error) {
      Toast.show({
        type: "error",
        text1: "Error adding task",
        text2: error.message,
      });
      return;
    }

    loadTasks();

    Toast.show({
      type: "success",
      text1: "Task added",
    });
  }

  // UPDATE
  async function toggleTask(item: Task) {
    const { error } = await supabase
      .from("tasks")
      .update({ completed: !item.completed })
      .eq("id", item.id);

    if (error) {
      Toast.show({
        type: "error",
        text1: "Error updating task",
      });
      return;
    }

    loadTasks();
  }

  // DELETE
  async function deleteTask(id: string) {
    const { error } = await supabase.from("tasks").delete().eq("id", id);

    if (error) {
      Toast.show({
        type: "error",
        text1: "Error deleting task",
      });
      return;
    }

    loadTasks();

    Toast.show({
      type: "success",
      text1: "Task deleted",
    });
  }

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <Text style={styles.title}>TaskFlow</Text>

      {/* ADD BUTTON */}
      <TouchableOpacity
        style={styles.addBtn}
        onPress={() => setModalVisible(true)}
      >
        <Text style={{ color: "#fff", textAlign: "center" }}>+ Add Task</Text>
      </TouchableOpacity>

      {/* LIST */}
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TaskItem item={item} onToggle={toggleTask} onDelete={deleteTask} />
        )}
      />

      {/* MODAL */}
      <AddTaskModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit={(title: string) => {
          addTask(title);
          setModalVisible(false);
        }}
      />

      {/* TOAST */}
      <Toast />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginTop: 50,
    marginBottom: 10,
  },
  addBtn: {
    backgroundColor: "#2E5BBA",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
});
