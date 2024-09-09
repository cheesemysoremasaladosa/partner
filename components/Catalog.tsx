import { View, StyleSheet, FlatList, Dimensions, Text } from "react-native";
import Veggie from "./Veggie";

const Screen = Dimensions.get("window");
export function CatalogSkeleton() {
    //TODO: return a skeleton while loading data
    return (
    <View>
        <Text>Loading...</Text>
    </View>
    );
}

const squareDim = 150
const numColumns = Math.floor(Dimensions.get("window").width / squareDim);


const formatData = (data: Array<any>, numColumns: number) => {
    const numberOfFullRows = Math.floor(data.length / numColumns);
    let numberOfElementsLastRow = data.length - (numberOfFullRows * numColumns);
    while (numberOfElementsLastRow !== numColumns && numberOfElementsLastRow !== 0) {
        data.push('');
        numberOfElementsLastRow++;
    }
    return data;
};

export function Catalog({ catalog, VeggiePressCallback }: { catalog: Array<string>, VeggiePressCallback: (name: string) => void }) {
    return (<FlatList data={formatData(catalog, numColumns)}
        renderItem={({ item }) => {
            if (item.length === 0) {
                return <Veggie name="" pressCallback={() => { }} style={{ backgroundColor: 'transperent' }} />
            }
            return <Veggie name={item} pressCallback={VeggiePressCallback} />
        }}
        numColumns={numColumns} style={style.veggieRow} />
    );
}

const style = StyleSheet.create({
    veggieRow: {
        flex: 1,
    }
});