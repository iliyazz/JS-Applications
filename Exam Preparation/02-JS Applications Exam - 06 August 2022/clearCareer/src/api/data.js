import { del, get, post, put } from "./api.js";




const endpoints = {
    'allItems' : '/data/offers?sortBy=_createdOn%20desc',//get all items
    'create': `/data/offers`,
    'deleteById':'/data/offers/',
    'details': '/data/offers/',
    'edit': '/data/offers/'
}
// const endpoints = {
//     'allItems' : '/data/shoes?sortBy=_createdOn%20desc',//get all items
//     'create': '/data/shoes',
//     'details': '/data/shoes/',//details
//     'deleteById': '/data/shoes/',
//     'edit': '/data/shoes/',
//     'search': '/data/shoes?where='
// }

export async function getAll(){
    return get(endpoints.allItems);
}
export async function getById(id){
    return get(endpoints.details + id);
}
export async function deleteById(id){
    return del(endpoints.deleteById + id)
}
export async function createItem(itemData){
    return post(endpoints.create, itemData);
}
export async function editItem(id, itemData){
    return put(endpoints.edit + id, itemData)
}

// // /data/shoes?where=brand%20LIKE%20%22${query}%22
// export async function searchItem(query){
//     return get(endpoints.search + `brand%20LIKE%20%22${query}%22`)
// }