import { del, get, post, put } from "./api.js";

const endpoints = {
    'item' : '/data/albums',//create item
    'allItems': '/data/albums?sortBy=_createdOn%20desc&distinct=name',//get all items
    'deleteById':'/data/albums/',//delete by id
    'edit': '/data/albums/',//edit by id
    'search': '/data/albums?where='
}
export async function getAll(){
    return get(endpoints.allItems);
}
export async function getById(id){
    return get(endpoints.item + '/' + id);
}
export async function deleteById(id){
    return del(endpoints.deleteById + id)
}
export async function createItem(itemData){
    return post(endpoints.item, itemData);
}
export async function editItem(id, itemData){
    return put(endpoints.edit + id, itemData)
}

// /data/albums?where=name%20LIKE%20%22${query}%22
export async function searchItem(query){

    return get(endpoints.search + `name%20LIKE%20%22${query}%22`)
}