import { CatalogData } from "@/types/types";
import { Stack } from "expo-router";
import { createContext, useState } from "react";

interface CatalogState{
  catalog: CatalogData,
  setCatalog: React.Dispatch<React.SetStateAction<CatalogData>>
}

export const CatalogContext = createContext<CatalogState>({} as CatalogState);

export default function RootLayout() {
  const [catalog, setCatalog] = useState<CatalogData>({} as CatalogData);
  return (
    <CatalogContext.Provider value={{catalog: catalog, setCatalog: setCatalog} as CatalogState}>
      <Stack>
        <Stack.Screen name="index" />
      </Stack>
    </CatalogContext.Provider>
  );
}
