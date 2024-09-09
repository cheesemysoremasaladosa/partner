import { TouchableOpacity, View, StyleSheet, Text, StyleProp, ViewStyle } from "react-native";
export default function Veggie({ name, pressCallback, style={}}: { name: string,pressCallback: (name: string) => void, style?: StyleProp<ViewStyle>}) {
    return (
        <View style={styles.veggieItem}>
            <TouchableOpacity onPress={() => pressCallback(name)}>
                <View style={[styles.veggieImage, {backgroundColor: "grey"}, style]}></View>
            </TouchableOpacity>
            <View style={{ flex: 1, flexDirection: "row" }} >
                <Text style={{ fontWeight: "bold" }}>{name}</Text>
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
        backgroundColor: "grey",
        marginBottom: 5
    },
});