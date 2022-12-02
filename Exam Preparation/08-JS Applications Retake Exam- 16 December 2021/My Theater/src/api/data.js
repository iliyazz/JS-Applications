import { del, get, post, put } from "./api.js";




const endpoints = {
    'allItems' : '/data/theaters?sortBy=_createdOn%20desc&distinct=title',
    'create': `/data/theaters`,
    'deleteById':'/data/theaters/',
    'details': '/data/theaters/',
    'addLike': '/data/likes',
    'edit': '/data/theaters/',
}

export async function getAll(){
    return get(endpoints.allItems);
}
export async function createItem(itemData){
    return post(endpoints.create, itemData);
}
export async function getById(id){
    return get(endpoints.details + id);
}
export async function deleteById(id){
    return del(endpoints.deleteById + id)
}
export async function addLike(data) {
    return post(endpoints.addLike, data);
}
export async function totalLikes(theaterId) {
    return get(`/data/likes?where=theaterId%3D%22${theaterId}%22&distinct=_ownerId&count`);
}
export async function userLikes(theaterId, userId) {
    return get(`/data/likes?where=theaterId%3D%22${theaterId}%22%20and%20_ownerId%3D%22${userId}%22&count`);
}
export async function getMyItems(userId) {
    return get(`/data/theaters?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`);
}
export async function editItem(id, itemData){
    return put(endpoints.edit + id, itemData)
}