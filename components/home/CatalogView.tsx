import { CatalogContext } from "@/app/_layout";
import { Vegetable } from "@/types/types";
import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";
import { TouchableOpacity, View } from "react-native";
import SearchBar from "../home/SearchBar";
import { CatalogError, Catalog } from "./Catalog";
import {Text} from "react-native";
import { getVegetableCatalog, addVegetableToCart } from "@/api/cart";
import { useState, useContext, useEffect } from "react";

function CartDetailButton() {
  return (
    <TouchableOpacity
      onPress={() => router.push("/MyCart")}
      style={{
        borderColor: "#f8f9fa",
        borderBottomColor: "#d8f3dc",
        backgroundColor:"#630a6a",
        borderWidth: 2,
        width: "100%",
        alignItems: "center",
        borderRadius: 10,
        justifyContent: "center",
        flex: 0.5,
        flexDirection: "row",
      }}
    >
      <Text style={{ color:"white", fontWeight: "bold", marginLeft: "2%", marginRight: "2%"}}>
        Cart Details
      </Text>
      <AntDesign name="shoppingcart" size={20} color="white" />
    </TouchableOpacity>
  );
}
export default function CatalogView() {
  function handleCatalogRefresh() {
    setCatalogRefresh(catalogRefresh + 1);
  }
  //let [catalog, setCatalog] = useState<CatalogData>(new Map() as CatalogData);
  let [catalogLoading, setCatalogLoading] = useState<boolean>(true);
  let [catalogError, setCatalogError] = useState<string>("");
  const [catalogRefresh, setCatalogRefresh] = useState<number>(0);
  const { catalog, setCatalog } = useContext(CatalogContext);
  useEffect(() => {
    if (Object.keys(catalog).length === 0) {
      getVegetableCatalog()
        .then((data) => {
          //TODO: cache catalog data in the AsyncStorage for a period of time i.e associcate a TTL with CatalogData
          setCatalog(data);
          setCatalogLoading(false);
          setCatalogError("");
        })
        .catch((error) => {
          console.log(error);
          setCatalogError(error.message);
        });
    }
  }, [catalogRefresh]);
  async function handleVeggie(vegetable: Vegetable) {
    await addVegetableToCart(vegetable);
  }
  if (catalogError.length !== 0) {
    return (
      <CatalogError
        errorMsg={catalogError}
        refreshCallback={handleCatalogRefresh}
      />
    );
  }
  if (catalogLoading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }
  return (
    <View
      style={{
        alignItems: "center",
        rowGap: 10,
        flex: 1,
        padding: 5,
        width: "100%",
      }}
    >
      <SearchBar />
      <View style={{flex: 1, width:"100%", flexDirection: "row", justifyContent: "flex-start"}}>
        <CartDetailButton />
      </View>
      <View style={{ alignItems: "center", rowGap: 20, flex: 3 }}>
        <View style={{ rowGap: 5, flex: 1 }}>
          <View style={{ flexDirection: "row", justifyContent: "flex-start" }}>
            <Text style={{ fontWeight: "bold", marginLeft: 10 }}>
              Vegetables
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-end",
                flex: 1,
              }}
            >
              <Text
                style={{
                  fontWeight: "condensedBold",
                  marginLeft: 10,
                  textDecorationLine: "underline",
                  color: "#ff4d6d",
                }}
              >
                See all {">"}{" "}
              </Text>
            </View>
          </View>
          <Catalog catalog={catalog} VeggiePressCallback={handleVeggie} />
        </View>
      </View>
      <View style={{ alignItems: "center", rowGap: 20, flex: 3 }}>
        <View style={{ rowGap: 5, flex: 1 }}>
          <View style={{ flexDirection: "row", justifyContent: "flex-start" }}>
            <Text style={{ fontWeight: "bold", marginLeft: 10 }}>Fruits</Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-end",
                flex: 1,
              }}
            >
              <Text
                style={{
                  fontWeight: "condensedBold",
                  marginLeft: 10,
                  textDecorationLine: "underline",
                  color: "#ff4d6d",
                }}
              >
                See all {">"}{" "}
              </Text>
            </View>
          </View>
          <Catalog catalog={catalog} VeggiePressCallback={handleVeggie} />
        </View>
      </View>
    </View>
  );
}