import { del, get, post, put } from "./api.js";

const endpoints = {
    'allItems' : '/data/posts?sortBy=_createdOn%20desc',
    'create': '/data/posts',
    'details': '/data/posts/',
    'deleteById': '/data/posts/',
    'edit': '/data/posts/',
    'myPosts': '/data/posts?where=_ownerId%3D%22{userId}%22&sortBy=_createdOn%20desc'
    
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
export async function editItem(id, itemData){
    return put(endpoints.edit + id, itemData)
}
//  /data/posts?where=_ownerId%3D%22{userId}%22&sortBy=_createdOn%20desc
export async function getMyPosts(userId){
    return get(`/data/posts?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`);
}
