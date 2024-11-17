import { FontAwesome } from "@expo/vector-icons";
import { View, TextInput } from "react-native";

export default function LocationBar({address}:{address: string}){
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#e9ecef",
        borderRadius: 10,
        marginHorizontal: 10,
        flex: 1
      }}
    >
      <View style={{ flex: 1, alignItems: "center" }}>
        <FontAwesome name="circle" size={14} color="green" />
      </View>
      <View style={{ flex: 7 }}>
        <TextInput
          style={{
            height: 40,
            width: "100%",
          }}
          placeholder={address}
          placeholderTextColor={"grey"}
        />
      </View>
    </View>
  );
}