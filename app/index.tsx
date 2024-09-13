import { useEffect, useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { CatalogSkeleton, Catalog } from "@/components/Catalog";
import { Vegetable, CatalogData} from "@/types/types";


async function getVegetableCatalog(): Promise<CatalogData> {
  //TODO: GET the vegetable catalog using the /catalog endpoint
  const response = await fetch("http://192.168.255.3:8000/catalog");
  const catalog_json = await response.json();
  const catalog_data = Object.entries(catalog_json.catalog);
  const catalog = new Map(catalog_data.map(([id, vegetable])=>[parseInt(id), vegetable]));
  return catalog as CatalogData;
}
async function addVegetableToCart(vegetable: Vegetable) {
  //TODO: PUT the vegetable to partner's cart using the /cart/<partner_id> endpoint
}
async function removeVegetableFromCart(vegetable: Vegetable) {
  //TODO: DELETE the vegetable to partner's cart using the /cart/<partner_id> endpoint
}

export default function Index() {
  const [cart, setCart] = useState<Set<Vegetable>>(new Set());

  function handleVeggie(vegetable: Vegetable) {
    setCart(new Set(cart.add(vegetable)));
    addVegetableToCart(vegetable);
  }

  let [catalog, setCatalog] = useState<CatalogData>(new Map() as CatalogData);
  let [catalogLoading, setCatalogLoading] = useState<boolean>(true);
  let [catalogError, setCatalogError] = useState<boolean>(false);
  useEffect(() => {
    getVegetableCatalog().then((data) => {
      //TODO: cache catalog data in the AsyncStorage for a period of time i.e associcate a TTL with CatalogData
      
      //currently simulating time taken to fetch catalog data
        setCatalog(data);
        setCatalogLoading(false);

    }).catch(() => setCatalogError(true));
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
        <TouchableOpacity style={styles.menuBar}>
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