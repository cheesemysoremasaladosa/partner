import { View, StyleSheet, FlatList, Dimensions, Text, TouchableOpacity} from "react-native";
import Veggie from "../common/Veggie";
import {CatalogData, Vegetable } from "@/types/types";

export function CatalogSkeleton() {
    //TODO: return a skeleton while loading data
    return (
    <View>
        <Text>Loading...</Text>
    </View>
    );
}

export function CatalogError({errorMsg, refreshCallback}:{errorMsg: string, refreshCallback: ()=>void}){
    return (
        <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
            <Text >Catalog Error: {errorMsg}</Text>
            <TouchableOpacity onPress={refreshCallback}>
                <View style={{backgroundColor: "black", alignItems: "center", justifyContent: "center",borderRadius: 5, minWidth: 100, minHeight: 50, margin: 10}}>
                    <Text style={{color: "white"}}>Refresh</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
}
const squareDim = 150
const numColumns = Math.floor(Dimensions.get("window").width / squareDim);


function formatData(data: CatalogData, numColumns: number):Array<Vegetable>{
    const numberOfFullRows = Math.floor(data.size/ numColumns);
    let numberOfElementsLastRow = data.size - (numberOfFullRows * numColumns);
    let out: Array<Vegetable> = [...data.values()];
    while (numberOfElementsLastRow !== numColumns && numberOfElementsLastRow !== 0) {
        out.push({} as Vegetable);
        numberOfElementsLastRow++;
    }
    return out;
}

export function Catalog({ catalog, VeggiePressCallback }: { catalog: CatalogData, VeggiePressCallback: (vegetable: Vegetable) => void }) {
    return (<FlatList data={(()=>[...catalog.values()] as ArrayLike<Vegetable>)()} horizontal={true}
        renderItem={({ item }: {item: Vegetable}) => {
            if (Object.keys(item).length==0) {
                return <Veggie vegetable={{} as Vegetable} pressCallback={() => { }} style={{ backgroundColor: 'transperent' }} />
            }
            return <Veggie vegetable={item} pressCallback={VeggiePressCallback} />
        }}
        style={style.veggieRow} />
    );
}

const style = StyleSheet.create({
    veggieRow: {
        flex: 1,
    }
});