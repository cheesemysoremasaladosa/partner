import MapView, { Address } from "react-native-maps";
import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import LocationBar from "@/components/home/LocationBar";
import CatalogView from "@/components/home/CatalogView";
import * as Location from "expo-location";

function formatAddress(address: Address): string{
  return `${address.name}, ${address.subLocality}, ${address.locality}, ${address.subAdministrativeArea}-${address.postalCode}`;
}
export default function Home() {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const mapRef = useRef<MapView>(null);
  const [address, setAddress] = useState("");
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      let address = (await mapRef.current?.addressForCoordinate(location.coords));
      if (address){
        setAddress(formatAddress(address));
      }
    })();
  }, []);
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
          alignItems: "center",
        }}
      >
        <FontAwesome name="navicon" size={24} color="#e9ecef" />
        <LocationBar address={address}/>
      </View>
      <MapView
        ref={mapRef}
        style={{ width: "100%", height: "100%" }}
        showsUserLocation={true}
      />
      <BottomSheet
        ref={bottomSheetRef}
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
