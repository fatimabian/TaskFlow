import { MaterialIcons } from "@expo/vector-icons";
import { TextInput, TouchableOpacity, View } from "react-native";

type Props = {
  task: string;
  setTask: (text: string) => void;
  onAdd: () => void;
};

export default function TaskForm({ task, setTask, onAdd }: Props) {
  return (
    <View style={{ flexDirection: "row", marginBottom: 20 }}>
      <TextInput
        style={{
          flex: 1,
          borderWidth: 1,
          borderColor: "#ccc",
          borderRadius: 8,
          padding: 10,
          marginRight: 10,
        }}
        placeholder="Enter Task"
        value={task}
        onChangeText={setTask}
      />

      <TouchableOpacity
        onPress={onAdd}
        style={{
          backgroundColor: "#2E5BBA",
          borderRadius: 8,
          paddingHorizontal: 16,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <MaterialIcons name="add" size={22} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}
