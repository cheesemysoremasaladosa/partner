import { useContext, useEffect, useState } from "react";
import { useNavigation } from 'expo-router';
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { CatalogSkeleton, Catalog, CatalogError } from "@/components/Catalog";
import { Vegetable} from "@/types/types";
import { getVegetableCatalog, addVegetableToCart} from "@/api/cart";
import { CatalogContext } from "./_layout";
import { router } from "expo-router";

export default function Index() {
  const navigation = useNavigation();
  useEffect(()=>{navigation.setOptions({title: "Catalog"});}, [navigation]);

  async function handleVeggie(vegetable: Vegetable) {
    setCart(new Set(cart.add(vegetable)));
    await addVegetableToCart(vegetable);
  }

  function handleCatalogRefresh(){setCatalogRefresh(catalogRefresh+1);}
  //let [catalog, setCatalog] = useState<CatalogData>(new Map() as CatalogData);
  const [cart, setCart] = useState<Set<Vegetable>>(new Set());
  let [catalogLoading, setCatalogLoading] = useState<boolean>(true);
  let [catalogError, setCatalogError] = useState<string>("");
  const [catalogRefresh, setCatalogRefresh] = useState<number>(0);
  const { catalog, setCatalog } = useContext(CatalogContext);
  useEffect(() => {
    if (Object.keys(catalog).length === 0) {
      getVegetableCatalog().then((data) => {
        //TODO: cache catalog data in the AsyncStorage for a period of time i.e associcate a TTL with CatalogData
        setCatalog(data);
        setCatalogLoading(false);
        setCatalogError("");
      }).catch((error) => {setCatalogError(error.message)});
    }
  }, [catalogRefresh]);
  if (catalogError.length !== 0) { return <CatalogError errorMsg={catalogError} refreshCallback={handleCatalogRefresh}/>;}
  if (catalogLoading) { return (<View><CatalogSkeleton /></View>); }

  return (
    <View style={{ flexDirection: "column", flex: 1 }}>
      <View style={{ flex: 10 }}>
        <Catalog catalog={catalog} VeggiePressCallback={handleVeggie} />
      </View>

      {/*only show the "Manage Cart" button if the cart isn't empty*/}
      {cart.size > 0 &&
        <TouchableOpacity style={styles.menuBar} onPress={()=>router.push('/MyCart')}>
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