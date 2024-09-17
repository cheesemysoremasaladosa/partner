import { useContext, useEffect, useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { CatalogSkeleton, Catalog } from "@/components/Catalog";
import { Vegetable, CatalogData } from "@/types/types";
import { getVegetableCatalog, addVegetableToCart, removeVegetableFromCart } from "@/api/cart";
import { CatalogContext } from "./_layout";
import { router } from "expo-router";

export default function Index() {
  const [cart, setCart] = useState<Set<Vegetable>>(new Set());

  async function handleVeggie(vegetable: Vegetable) {
    setCart(new Set(cart.add(vegetable)));
    await addVegetableToCart(vegetable);
  }

  //let [catalog, setCatalog] = useState<CatalogData>(new Map() as CatalogData);
  let [catalogLoading, setCatalogLoading] = useState<boolean>(true);
  let [catalogError, setCatalogError] = useState<boolean>(false);
  const { catalog, setCatalog } = useContext(CatalogContext);
  useEffect(() => {
    if (Object.keys(catalog).length === 0) {
      getVegetableCatalog().then((data) => {
        //TODO: cache catalog data in the AsyncStorage for a period of time i.e associcate a TTL with CatalogData
        setCatalog(data);
        setCatalogLoading(false);
      }).catch(() => setCatalogError(true));
    }
  }, []);
  console.log(cart);
  if (catalogError) { return (<View><Text>Error</Text></View>); }
  if (catalogLoading) { return (<View><CatalogSkeleton /></View>); }

  return (
    <View style={{ flexDirection: "column", flex: 1 }}>
      <View style={{ flex: 10 }}>
        <Catalog catalog={catalog} VeggiePressCallback={handleVeggie} />
      </View>

      {/*only show the "Manage Cart" button if the cart isn't empty*/}
      {cart.size > 0 &&
        <TouchableOpacity style={styles.menuBar} onPress={()=>router.push('/cart')}>
          <Text style={{ color: "white" }}>Manage Cart</Text>
        </TouchableOpacity>}
    </View>
  );
}

const styles = StyleSheet.create({
  veggieRow: {
    justifyContent: "space-around",
  },
  menuBar: {
    flex: 1,
    backgroundColor: "black",
    bottom: 0,
    borderRadius: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});