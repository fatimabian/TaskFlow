import { MaterialIcons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";

type Task = {
  id: string;
  title: string;
  completed: boolean;
};

type Props = {
  item: Task;
  onToggle: (item: Task) => void;
  onDelete: (id: string) => void;
};

export default function TaskItem({ item, onToggle, onDelete }: Props) {
  return (
    <TouchableOpacity
      onPress={() => onToggle(item)}
      onLongPress={() => onDelete(item.id)}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
          paddingVertical: 8,
          borderBottomWidth: 1,
          borderBottomColor: "#eee",
        }}
      >
        <MaterialIcons
          name={item.completed ? "check-box" : "check-box-outline-blank"}
          size={22}
          color={item.completed ? "#2E5BBA" : "#5A6472"}
        />

        <Text style={{ fontSize: 15 }}>{item.title}</Text>
      </View>
    </TouchableOpacity>
  );
}
