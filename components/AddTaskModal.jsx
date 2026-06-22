import { useState } from "react";
import {
    Modal,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

export default function AddTaskModal({ visible, onClose, onSubmit }) {
  const [text, setText] = useState("");

  function handleSubmit() {
    if (text.trim() === "") return;

    onSubmit(text);
    setText("");
  }

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <Pressable style={styles.backdrop} onPress={onClose}>
        <Pressable style={styles.card} onPress={() => {}}>
          <TextInput
            placeholder="Enter task"
            value={text}
            onChangeText={setText}
            style={styles.input}
          />

          <View style={styles.row}>
            <TouchableOpacity onPress={onClose}>
              <Text style={{ color: "#555" }}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleSubmit}>
              <Text style={{ color: "#2E5BBA", fontWeight: "bold" }}>Add</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    padding: 20,
  },
  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
