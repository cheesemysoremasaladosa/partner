import { Text, View, TextInput, KeyboardType } from "react-native";
export default function InputField({
  labelName,
  keyboardType,
  placeholder,
  errorMessage,
}: {
  labelName: string;
  keyboardType: KeyboardType;
  placeholder?: string | undefined;
  errorMessage?: string | undefined;
}) {
  return (
    <View style={{ rowGap: 7 }}>
      <View
        style={{ flexDirection: "row", alignItems: "baseline", columnGap: 10, justifyContent: "space-between" }}
      >
        <Text style={{ fontWeight: "500", color: "#004346" }}>{labelName}</Text>
        <Text style={{ fontSize: 10, color: "#bc4749" }}>{errorMessage}</Text>
      </View>
      <TextInput
        style={{
          borderWidth: 1,
          borderRadius: 5,
          width: 300,
          height: 50,
          borderColor: "#004346",
          paddingLeft: 10,
        }}
        keyboardType={keyboardType}
        placeholder={placeholder}
        placeholderTextColor={"silver"}
        returnKeyType="done"
      />
    </View>
  );
}
