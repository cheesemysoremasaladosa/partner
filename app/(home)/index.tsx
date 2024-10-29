import MapView from "react-native-maps";
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { FlatList, GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { Catalog, CatalogError } from "@/components/home/Catalog";
import { addVegetableToCart, getVegetableCatalog } from "@/api/cart";
import { CatalogContext } from "../_layout";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Vegetable } from "@/types/types";
import { router } from "expo-router";
function LocationBar() {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#e9ecef",
        borderRadius: 10,
        marginHorizontal: 10,
        flex: 1
      }}
    >
      <View style={{ flex: 1, alignItems: "center" }}>
        <FontAwesome name="circle" size={14} color="green" />
      </View>
      <View style={{ flex: 7 }}>
        <TextInput
          style={{
            height: 40,
            width: "100%",
          }}
          placeholder="1/4 Sai, Lane No.7, New Laxmi Nagar, Pimple Gurav"
          placeholderTextColor={"grey"}
        />
      </View>
    </View>
  );
}

function SearchBar() {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#e9ecef",
        borderRadius: 10,
        marginBottom: 10,
        flex: 1,
      }}
    >
      <View style={{ flex: 1, alignItems: "center" }}>
        <AntDesign name="search1" size={20} color="grey" />
      </View>
      <View style={{ flex: 6 }}>
        <TextInput
          style={{
            height: 40,
            width: "100%",
          }}
          placeholder="Search Produce"
          placeholderTextColor={"grey"}
        />
      </View>
    </View>
  );
}

function CartDetailButton() {
  return (
    <TouchableOpacity
      onPress={() => router.push("/MyCart")}
      style={{
        borderColor: "#f8f9fa",
        borderBottomColor: "#d8f3dc",
        borderWidth: 2,
        width: "100%",
        alignItems: "center",
        borderRadius: 5,
        justifyContent: "center",
        flex: 1,
        flexDirection: "row",
      }}
    >
      <Text style={{ fontWeight: "bold", marginLeft: "2%", marginRight: "2%" }}>
        Cart Details
      </Text>
      <AntDesign name="shoppingcart" size={20} color="black" />
    </TouchableOpacity>
  );
}
function CatalogView() {
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
      <CartDetailButton />
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
export default function Home() {
  // ref
  const bottomSheetRef = useRef<BottomSheet>(null);

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  // renders
  return (
    <GestureHandlerRootView style={styles.container}>
      <View
        style={{
          position: "absolute",
          top: "4%",
          zIndex: 1000,
          flex: 1,
          width: "100%",
          flexDirection: "row",
          paddingHorizontal: "2%",
          alignItems: "center"
        }}
      >
        <FontAwesome name="navicon" size={24} color="#e9ecef" />
        <LocationBar />
      </View>
      <MapView
        style={{ width: "100%", height: "100%" }}
        showsUserLocation={true}
      />
      <BottomSheet
        ref={bottomSheetRef}
        onChange={handleSheetChanges}
        enableDynamicSizing={false}
        snapPoints={["60%"]}
        style={{ shadowColor: "black", shadowOpacity: 0.5 }}
      >
        <BottomSheetView style={styles.contentContainer}>
          <CatalogView />
        </BottomSheetView>
      </BottomSheet>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
});