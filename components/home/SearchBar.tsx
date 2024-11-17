import { AntDesign } from "@expo/vector-icons";
import { View, TextInput } from "react-native";

export default function SearchBar() {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#e9ecef",
        borderRadius: 10,
        marginBottom: 10,
        flex: 1,
      }}
    >
      <View style={{ flex: 1, alignItems: "center" }}>
        <AntDesign name="search1" size={20} color="grey" />
      </View>
      <View style={{ flex: 6 }}>
        <TextInput
          style={{
            height: 40,
            width: "100%",
          }}
          placeholder="Search Produce"
          placeholderTextColor={"grey"}
        />
      </View>
    </View>
  );
}