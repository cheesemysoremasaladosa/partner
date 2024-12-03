import { useNavigation } from 'expo-router';
import { Image, FlatList, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { getPartnerCart, removeVegetableFromCart } from "@/api/cart";
import { useContext, useEffect, useState } from "react";
import { Cart, Item, Vegetable } from "@/types/types";
import { CatalogContext } from "./_layout";
import Ionicons from '@expo/vector-icons/Ionicons';

const BASE_URL= process.env.EXPO_PUBLIC_API_URL;
const BASE_IMG_URL = `${BASE_URL}/static/`;

function CartItem({ item, vegetable, deleteCallback }: { item: Item; vegetable: Vegetable, deleteCallback: (vegetable: Vegetable)=>void}) {
  return (
    <View style={style.cartItem}>
      <Image source={{uri:BASE_IMG_URL+vegetable.name+".jpeg"}} style={{aspectRatio: "1/1", width: "100%", borderRadius: 5, flex: 1}}/>
      <View style={{flex: 2, alignItems: "center"}}>
        <Text style={{fontWeight: 500}}>{vegetable.name}</Text>
      </View>
      <View style={{flex: 1, alignItems: "center"}}>
        <TouchableOpacity onPress={()=>deleteCallback(vegetable)}>
          <Ionicons name="remove-circle-outline" size={24} color="black" />
        </TouchableOpacity>
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

  function deleteItemFromCart(vegetable: Vegetable){
    removeVegetableFromCart(vegetable);
    setCartData(cartData.filter((item)=>item.vegetableId !== vegetable.id));
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
            deleteCallback={deleteItemFromCart}
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
