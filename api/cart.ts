import { Vegetable, CatalogData} from "@/types/types";

const baseUrl = process.env.PUBLIC_API_URL;

export async function getVegetableCatalog(): Promise<CatalogData> {
  //GET the vegetable catalog using the /catalog endpoint
  const response = await fetch(baseUrl+"/catalog");
  const catalog_json = await response.json();
  const catalog_entries = Object.entries(catalog_json.catalog);
  const catalog_map = new Map(catalog_entries.map(([id, vegetable])=>[parseInt(id), vegetable]));
  return catalog_map as CatalogData;
}

export async function addVegetableToCart(vegetable: Vegetable) {
  //TODO: PUT the vegetable to partner's cart using the /cart/<partner_id> endpoint
}

export async function removeVegetableFromCart(vegetable: Vegetable) {
  //TODO: DELETE the vegetable to partner's cart using the /cart/<partner_id> endpoint
}