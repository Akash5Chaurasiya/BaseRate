import { api } from "../api";
import { SearchBarInstance } from "../instance";

interface SearchBarData {
    category: SearchAssists[],
    item: SearchAssists[],
    product: SearchAssists[]
}

interface SearchAssists {
    _id: string;
    name: string;
    type: 'category' | 'item' | 'product';
}

export default async function fetchSearchData(query: string) {
    return await SearchBarInstance.get<SearchBarData>(api.searchBarData(query));
}