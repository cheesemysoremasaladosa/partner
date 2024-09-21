import { useNavigation } from 'expo-router';
import { FlatList, View, Text, StyleSheet } from "react-native";
import { getPartnerCart } from "@/api/cart";
import { useContext, useEffect, useState } from "react";
import { Cart, Item, Vegetable } from "@/types/types";
import { CatalogContext } from "./_layout";
import Ionicons from '@expo/vector-icons/Ionicons';

function CartItem({ item, vegetable }: { item: Item; vegetable: Vegetable }) {
  return (
    <View style={style.cartItem}>
      <View style={{height: 100, width: 100, backgroundColor: "silver", borderRadius: 5}}></View>
      <View style={{flex: 2, alignItems: "center"}}>
        <Text style={{fontWeight: 500}}>{vegetable.name}</Text>
      </View>
      <View style={{flex: 1, alignItems: "center"}}>
        <Ionicons name="remove-circle-outline" size={24} color="black" />
      </View>
    </View>
  );
}

export default function CurrentCart() {
  const [cartData, setCartData] = useState<Cart>({} as Cart);
  const [cartDataLoading, setCartDataLoading] = useState<boolean>(true);
  const { catalog } = useContext(CatalogContext);
  const navigation = useNavigation();

  function getVegetableById(vegetableId: number): Vegetable {
    //FIXME: handle invalid vegetableId
    return catalog.get(vegetableId) ?? ({} as Vegetable);
  }

  useEffect(()=>{navigation.setOptions({title: "My Cart"});}, [navigation]);
  useEffect(() => {
    getPartnerCart()
      .then((data: Cart) => {
        setCartData(data);
        setCartDataLoading(false);
      })
      .catch((e) => console.log(e));
  }, []);
  //TODO: handle cart loading
  return (
    <View>
      <FlatList
        data={cartData}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <CartItem
            item={item}
            vegetable={getVegetableById(item.vegetableId)}
          />
        )}
      />
    </View>
  );
}

const style = StyleSheet.create({
  cartItem: {
    flex: 1,
    flexDirection: "row",
    padding: 10,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: "silver",
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
});
