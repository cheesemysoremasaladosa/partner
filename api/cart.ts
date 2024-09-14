import { PartnerID, PartnerSessionID, Vegetable, CatalogData } from "@/types/types";
const baseUrl = process.env.EXPO_PUBLIC_API_URL;

export async function getCurrentPartnerSession(): Promise<PartnerSessionID> {
    if (__DEV__) {
        return new Promise(() => process.env.EXPO_PARTNER_SESSION_ID as PartnerSessionID);
    } else {
        //TODO: fetch the PartnerSessionID from Async
        return new Promise(() => "" as PartnerSessionID);
    }
}

export async function getCurrentPartnerID(): Promise<PartnerID> {
    if (__DEV__) {
        return new Promise(() => process.env.EXPO_PARTNER_ID)
    } else {
        //TODO: fetch the PartnerSessionID from Async
        return new Promise(() => 0 as PartnerID);
    }
}

export async function getVegetableCatalog(): Promise<CatalogData> {
    //GET the vegetable catalog using the /catalog endpoint
    const response = await fetch(baseUrl + "/catalog");
    const catalog_json = await response.json();
    const catalog_entries = Object.entries(catalog_json.catalog);
    const catalog_map = new Map(catalog_entries.map(([id, vegetable]) => [parseInt(id), vegetable]));
    return catalog_map as CatalogData;
}

export async function addVegetableToCart(vegetable: Vegetable) {
    //TODO: PUT the vegetable to partner's cart using the /cart/<partner_id> endpoint
    const partnerID = await getCurrentPartnerID();
    const sessionID = await getCurrentPartnerSession();
    const response = await fetch(`${baseUrl}/cart/${partnerID}`, { method: 'PUT', headers: new Headers({ "SessionID": sessionID }) });
    if (response.status != 200) {
        console.log("error adding vegetable to cart");
    }
}

export async function removeVegetableFromCart(vegetable: Vegetable) {
    //TODO: DELETE the vegetable to partner's cart using the /cart/<partner_id> endpoint
}