import { Vegetable } from "@/types/types";
import { TouchableOpacity, View, Image, StyleSheet, Text, StyleProp, ViewStyle } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';
const BASE_IMG_URL = `http://192.168.1.6:8000/static/`;
export default function Veggie({ vegetable, pressCallback, style={}}: { vegetable: Vegetable,pressCallback: (vegetable: Vegetable) => void, style?: StyleProp<ViewStyle>}) {
    return (
        <View style={styles.veggieItem}>
            <TouchableOpacity onPress={() => pressCallback(vegetable)}>
                <View style={[styles.imageContainer, {backgroundColor: "silver"}, style]}>
                    <Image source={{uri:BASE_IMG_URL+vegetable.name+".jpeg"}} style={styles.veggieImage}/>
                    <View style={{position: "absolute", bottom: 10, right: 10}}>
                        <AntDesign name="pluscircle" size={15} color="#38b000" />
                    </View>
                </View>
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
    imageContainer: {
        height: 65,
        width: 65,
        borderRadius: 10,
        backgroundColor: "silver",
        marginBottom: 5,
        shadowColor: "grey",
        shadowOpacity: 0.4
    },
    veggieImage: {
        height: '100%',
        width: '100%',
        borderRadius: 10,
        backgroundColor: "silver",
    },
});