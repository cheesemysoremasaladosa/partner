import { FlatList, View, Text } from "react-native";
import { getPartnerCart } from "@/api/cart";
import { useContext, useEffect, useState } from "react";
import { Cart, Item, Vegetable } from "@/types/types";
import { CatalogContext } from "./_layout";

function CartItem({ item, vegetable }: { item: Item, vegetable: Vegetable }) {
    return (
        <View style={{ padding: 15, margin: 5, borderRadius: 10, backgroundColor: "silver", minHeight: 100 }}>
            <Text>{vegetable.name}</Text>
        </View>);
}

export default function CurrentCart() {
    const [cartData, setCartData] = useState<Cart>({} as Cart);
    const [cartDataLoading, setCartDataLoading] = useState<boolean>(true);
    const { catalog } = useContext(CatalogContext);

    function getVegetableById(vegetableId: number): Vegetable {
        //FIXME: handle invalid vegetableId
        return catalog.get(vegetableId) ?? {} as Vegetable;
    }

    useEffect(() => {
        getPartnerCart().then((data: Cart) => {
            setCartData(data);
            setCartDataLoading(false);
        }).catch((e) => console.log(e));
    }, []);

    return (
        <View>
            <FlatList data={cartData} showsVerticalScrollIndicator={false} renderItem={({ item }) => (
                <CartItem item={item} vegetable={getVegetableById(item.vegetableId)} />
            )} />
        </View>);
}