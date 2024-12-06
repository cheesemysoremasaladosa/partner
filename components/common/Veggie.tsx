import { Vegetable } from "@/types/types";
import { TouchableOpacity, View, Image, StyleSheet, Text, StyleProp, ViewStyle } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';
const BASE_URL = process.env.EXPO_PUBLIC_API_URL;
const BASE_IMG_URL = `${BASE_URL}/static/`;
export default function Veggie({ vegetable, pressCallback }: { vegetable: Vegetable, pressCallback: (vegetable: Vegetable) => void }) {
    return (
        <View style={styles.veggieItem}>
            <View style={styles.imageContainer}>
                <TouchableOpacity onPress={() => pressCallback(vegetable)}>
                    <Image source={{ uri: BASE_IMG_URL + vegetable.name + ".jpeg" }} style={styles.veggieImage} />
                    <View style={{ position: "absolute", bottom: "5%", right: "5%" }}>
                        <AntDesign name="pluscircle" size={15} color="#38b000" />
                    </View>
                </TouchableOpacity>
            </View>
            <View style={{ flex: 1, flexDirection: "row" }}>
                <Text style={{ fontSize: 12 }}>{vegetable.name}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    veggieItem: {
        flex: 1,
        marginHorizontal: "1.2%",
        alignItems: "center",
    },
    imageContainer: {
        aspectRatio: "1/1",
        borderRadius: 10,
        marginBottom: 5,
        flex: 3,
    },
    veggieImage: {
        height: '100%',
        width: '100%',
        borderRadius: 10,
    },
});