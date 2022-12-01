import { del, get, post, put } from "./api.js";




const endpoints = {
    'allItems' : '/data/books?sortBy=_createdOn%20desc',
    'create': `/data/books`,
    'deleteById':'/data/books/',
    'details': '/data/books/',
    'addLike': '/data/likes',
    'edit': '/data/books/',
    'myItems': '/data/books/'
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
export async function totalLikes(bookId) {
    return get(`/data/likes?where=bookId%3D%22${bookId}%22&distinct=_ownerId&count`);
}
export async function userLikes(bookId, userId) {
    return get(`/data/likes?where=bookId%3D%22${bookId}%22%20and%20_ownerId%3D%22${userId}%22&count`);
}
export async function getMyBook(userId) {
    return get(`/data/books?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`);
}
export async function editItem(id, itemData){
    return put(endpoints.edit + id, itemData)
}