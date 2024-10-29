import { useNavigation } from "expo-router";
import { useEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  KeyboardType,
} from "react-native";

function InputField({
  labelName,
  keyboardType,
  placeholder,
}: {
  labelName: string;
  keyboardType: KeyboardType;
  placeholder?: string | undefined;
}) {
  return (
    <View style={{ rowGap: 7 }}>
      <Text style={{ fontWeight: "500" }}>{labelName}</Text>
      <TextInput
        style={{
          borderWidth: 1,
          borderRadius: 5,
          width: 300,
          height: 50,
          borderColor: "silver",
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
export default function Login() {
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);
  return (
    <View style={{ flex: 1, alignItems: "center", rowGap: 50, marginVertical: 50 }}>
      <View>
        <Text style={{fontWeight: "bold", fontSize: 30}}>Login</Text>
      </View>
      <View
        style={{
          backgroundColor: "silver",
          borderRadius: 5,
          height: 150,
          width: 150,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text>Logo</Text>
      </View>
      <View style={{ flex: 1, rowGap: 35, alignItems: "center" }}>
        <InputField labelName="Phone Number(+91)" keyboardType="number-pad" />
        <InputField labelName="Password" keyboardType="default" />
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 10,
            backgroundColor: "black",
            width: 300,
            height: 50,
            marginTop: 20
          }}
        >
          <Text style={{ color: "white" }}>Login</Text>
        </View>
      </View>
    </View>
  );
}
