import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { supabase } from "../../lib/supabase";

import TaskForm from "../../components/TaskForm";
import TaskItem from "../../components/TaskItem";

type Task = {
  id: string;
  title: string;
  completed: boolean;
  created_at?: string;
};

export default function Index() {
  const [task, setTask] = useState<string>("");
  const [tasks, setTasks] = useState<Task[]>([]);

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
  async function addTask() {
    if (task.trim() === "") return;

    const { error } = await supabase
      .from("tasks")
      .insert([{ title: task, completed: false }]);

    if (error) {
      console.log("INSERT ERROR:", error.message);
      return;
    }

    setTask("");
    loadTasks();
  }

  // UPDATE
  async function toggleTask(item: Task) {
    const { error } = await supabase
      .from("tasks")
      .update({ completed: !item.completed })
      .eq("id", item.id);

    if (error) {
      console.log("UPDATE ERROR:", error.message);
      return;
    }

    loadTasks();
  }

  // DELETE
  async function deleteTask(id: string) {
    const { error } = await supabase.from("tasks").delete().eq("id", id);

    if (error) {
      console.log("DELETE ERROR:", error.message);
      return;
    }

    loadTasks();
  }

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>TaskFlow</Text>
      </View>

      <TaskForm task={task} setTask={setTask} onAdd={addTask} />

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TaskItem item={item} onToggle={toggleTask} onDelete={deleteTask} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
  header: {
    paddingTop: 50,
    paddingBottom: 16,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1F2A44",
  },
});
