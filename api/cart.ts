import { Item, Cart, PartnerID, PartnerSessionID, Vegetable, CatalogData } from "@/types/types";
const baseUrl = process.env.EXPO_PUBLIC_API_URL;

export async function getCurrentPartnerSession(): Promise<PartnerSessionID> {
    if (__DEV__) {
        return Promise.resolve(process.env.EXPO_PUBLIC_PARTNER_SESSION_ID as PartnerSessionID);
    } else {
        //TODO: fetch the PartnerSessionID from Async
        return Promise.resolve("" as PartnerSessionID);
    }
}

export async function getCurrentPartnerID(): Promise<PartnerID> {
    if (__DEV__) {
        return Promise.resolve(parseInt(process.env.EXPO_PUBLIC_PARTNER_ID ?? "1") as PartnerID);
    } else {
        //TODO: fetch the PartnerSessionID from Async
        return Promise.resolve(0 as PartnerID);
    }
}

export async function getVegetableCatalog(): Promise<CatalogData> {
    //GET the vegetable catalog using the /catalog endpoint
    const response = await fetch(baseUrl + "/catalog");
    const catalog_json = await response.json();
    const catalog_entries: Array<[string, Vegetable]> = Object.entries(catalog_json.catalog);
    const catalog_map = new Map(catalog_entries.map(([id, vegetable]) => [parseInt(id), vegetable]));
    return catalog_map as CatalogData;
}

export async function addVegetableToCart(vegetable: Vegetable) {
    //TODO: PUT the vegetable to partner's cart using the /cart/<partner_id> endpoint
    const partnerID = await getCurrentPartnerID();
    const sessionID = await getCurrentPartnerSession();
    const item = { vegetableId: vegetable.id, price: 0.0 } as Item;
    const response = await fetch(`${baseUrl}/cart/${partnerID}`, { method: 'PUT', 
        headers: { "SessionID": sessionID, "Content-Type": "application/json", }, 
        body: JSON.stringify(item) });

    if (response.status != 200) {
        console.log("error adding vegetable to cart");
    }
}

export async function removeVegetableFromCart(vegetable: Vegetable) {
    //TODO: DELETE the vegetable to partner's cart using the /cart/<partner_id> endpoint
    const partnerID = await getCurrentPartnerID();
    const sessionID = await getCurrentPartnerSession();
    const response = await fetch(`${baseUrl}/cart/${partnerID}`, {method: 'DELETE',
        headers: {"SessionID": sessionID, "Content-Type": "application/json",},
        body: JSON.stringify({vegetableId: vegetable.id})
    });

    if (response.status != 200){
        console.log("error removing vegetable from cart");
    }
}

export async function getPartnerCart(): Promise<Cart> {
    //GET the partner's cart using the /cart/<partner_id> endpoint
    const partnerID = await getCurrentPartnerID();
    const response = await fetch(`${baseUrl}/cart/${partnerID}`);
    if (response.status != 200) {
        console.log("error fetching partner's cart");
    }
    const cart_json = await response.json();
    const cart = cart_json.items as Cart;
    return cart;
}