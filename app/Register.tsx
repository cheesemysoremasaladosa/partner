import { Text, View, TextInput, KeyboardType } from "react-native";
import { useNavigation } from "expo-router";
import { useEffect } from "react";
import { StatusBar } from 'expo-status-bar';
import InputField from "@/components/auth/InputField";
export default function Register() {
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);
  return (
    <>
      <StatusBar style="dark" />
      <View
        style={{ flex: 1, alignItems: "center", rowGap: 30,backgroundColor: "#dad7cd" }}
      >
        <View style={{ flex: 1, maxHeight: 35, justifyContent: "flex-start",alignItems:"center", marginTop: 40}}>
          <Text style={{ color: "#004346", fontWeight: "bold", fontSize: 30 }}>Sign Up</Text>
        </View>
        <View style={{ flex: 1, rowGap: 35, alignItems: "center"}}>
          <InputField labelName="Name" keyboardType="default" />
          <InputField
            labelName="Phone Number (+91)"
            keyboardType="number-pad"
            errorMessage="Invalid Phone Number"
          />
          <InputField labelName="Password" keyboardType="default" errorMessage="chomu password"/>
          <InputField labelName="Confirm Password" keyboardType="default"/>
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 10,
              backgroundColor: "#004346",
              width: 300,
              height: 50,
            }}
          >
            <Text style={{ color: "white" }}>Register</Text>
          </View>
        </View>
      </View>
    </>
  );
}
