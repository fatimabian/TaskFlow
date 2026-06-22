import { MaterialIcons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function TaskItem({ item, onToggle, onDelete }) {
  return (
    <TouchableOpacity
      onPress={() => onToggle(item)}
      onLongPress={() => onDelete(item.id)}
    >
      <View style={styles.row}>
        <MaterialIcons
          name={item.completed ? "check-box" : "check-box-outline-blank"}
          size={20}
        />
        <Text style={styles.text}>{item.title}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    gap: 10,
  },
  text: {
    fontSize: 16,
  },
});
