import { View, StyleSheet, FlatList, Dimensions, Text, TouchableOpacity } from "react-native";
import Veggie from "../common/Veggie";
import { CatalogData, Vegetable } from "@/types/types";

export function CatalogSkeleton() {
    //TODO: return a skeleton while loading data
    return (
        <View>
            <Text>Loading...</Text>
        </View>
    );
}

export function CatalogError({ errorMsg, refreshCallback }: { errorMsg: string, refreshCallback: () => void }) {
    return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <Text >Catalog Error: {errorMsg}</Text>
            <TouchableOpacity onPress={refreshCallback}>
                <View style={{ backgroundColor: "black", alignItems: "center", justifyContent: "center", borderRadius: 5, minWidth: 100, minHeight: 50, margin: 10 }}>
                    <Text style={{ color: "white" }}>Refresh</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
}

function CatalogItem({ item, callback }: { item: Vegetable, callback: (vegetable: Vegetable) => void }) {
    return (<View style={{ alignItems: "center" }}>
        <Veggie vegetable={item} pressCallback={callback} />
    </View>);
}

export function Catalog({ catalog, VeggiePressCallback }: { catalog: CatalogData, VeggiePressCallback: (vegetable: Vegetable) => void }) {
    return (
        <View style={{flex:1}}>
            <FlatList data={(() => [...catalog.values()] as ArrayLike<Vegetable>)()} horizontal={true} showsHorizontalScrollIndicator={false}
                renderItem={({ item }: { item: Vegetable }) => {
                    return <CatalogItem item={item} callback={VeggiePressCallback} />
                }}
                style={style.veggieRow} />
        </View>
    );
}

const style = StyleSheet.create({
    veggieRow: {
        flex: 1,
    }
});