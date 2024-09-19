import { Vegetable } from "@/types/types";
import { TouchableOpacity, View, StyleSheet, Text, StyleProp, ViewStyle } from "react-native";
export default function Veggie({ vegetable, pressCallback, style={}}: { vegetable: Vegetable,pressCallback: (vegetable: Vegetable) => void, style?: StyleProp<ViewStyle>}) {
    return (
        <View style={styles.veggieItem}>
            <TouchableOpacity onPress={() => pressCallback(vegetable)}>
                <View style={[styles.veggieImage, {backgroundColor: "silver"}, style]}></View>
            </TouchableOpacity>
            <View style={{ flex: 1, flexDirection: "row" }} >
                <Text style={{ fontWeight: "bold" }}>{vegetable.name}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    veggieItem: {
        flex: 1,
        margin: 10,
    },
    veggieImage: {
        minHeight: 150,
        minWidth: 150,
        borderRadius: 10,
        backgroundColor: "silver",
        marginBottom: 5
    },
});