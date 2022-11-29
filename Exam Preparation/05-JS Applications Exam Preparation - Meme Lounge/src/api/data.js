import { del, get, post, put } from "./api.js";

const endpoints = {
    'allItems' : '/data/memes?sortBy=_createdOn%20desc',// getAllData
    'create': '/data/memes',// create
    'details': '/data/memes/',// details
    'deleteById': '/data/memes/',// delete
    'edit': '/data/memes/'// edit
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
export async function getMyProfile(userId){
    return get(`/data/memes?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`);
}
