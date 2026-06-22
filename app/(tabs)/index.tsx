import { MaterialIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { supabase } from "../../lib/supabase";

export default function Index() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState<any[]>([]);

  // LOAD TASKS
  async function loadTasks() {
    const { data, error } = await supabase
      .from("tasks")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.log("LOAD ERROR:", error);
      return;
    }

    setTasks(data || []);
  }

  // ADD TASK
  async function addTask() {
    if (task.trim() === "") return;

    const { error } = await supabase
      .from("tasks")
      .insert([{ title: task, completed: false }]);

    if (error) {
      console.log("ADD ERROR:", error);
      return;
    }

    setTask("");
    loadTasks();
  }

  // TOGGLE TASK
  async function toggleTask(item: any) {
    const { error } = await supabase
      .from("tasks")
      .update({ completed: !item.completed })
      .eq("id", item.id);

    if (error) {
      console.log("UPDATE ERROR:", error);
      return;
    }

    loadTasks();
  }

  // DELETE TASK (LONG PRESS)
  async function deleteTask(id: string) {
    const { error } = await supabase.from("tasks").delete().eq("id", id);

    if (error) {
      console.log("DELETE ERROR:", error);
      return;
    }

    loadTasks();
  }

  // RUN ON START
  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={headerStyles.header}>
        <Text style={headerStyles.title}>TaskFlow</Text>
      </View>

      {/* INPUT */}
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Enter Task"
          value={task}
          onChangeText={setTask}
        />

        <TouchableOpacity style={styles.addButton} onPress={addTask}>
          <MaterialIcons name="add" size={22} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* TASK LIST */}
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => toggleTask(item)}
            onLongPress={() => deleteTask(item.id)}
          >
            <View style={styles.taskRow}>
              <MaterialIcons
                name={item.completed ? "check-box" : "check-box-outline-blank"}
                size={20}
                color={item.completed ? "#2E5BBA" : "#5A6472"}
              />
              <Text style={styles.taskText}>{item.title}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

/* HEADER STYLES */
const headerStyles = StyleSheet.create({
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

/* MAIN STYLES */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
  inputRow: {
    flexDirection: "row",
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginRight: 10,
  },
  addButton: {
    backgroundColor: "#2E5BBA",
    borderRadius: 8,
    paddingHorizontal: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  taskRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  taskText: {
    fontSize: 15,
  },
});
