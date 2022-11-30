import { del, get, post, put } from "./api.js";

const endpoints = {
    'allItems': '/data/games?sortBy=_createdOn%20desc',// getAllData
    'create': '/data/games',// create
    'details': '/data/games/',// details
    'deleteById': '/data/games/',// delete
    'edit': '/data/games/',// edit
    'recent': '/data/games?sortBy=_createdOn%20desc&distinct=category',
    'addComment': '/data/comments',
    'getGameComments': `/data/comments?where=`
}

export async function getAll() {
    return get(endpoints.allItems);
}
export async function createItem(itemData) {
    return post(endpoints.create, itemData);
}
export async function getById(id) {
    return get(endpoints.details + id);
}
export async function deleteById(id) {
    return del(endpoints.deleteById + id)
}
export async function editItem(id, itemData) {
    return put(endpoints.edit + id, itemData)
}
// //  /data/posts?where=_ownerId%3D%22{userId}%22&sortBy=_createdOn%20desc
// export async function getMyProfile(userId){
//     return get(`/data/memes?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`);
// }
export async function getSorted() {
    return get(endpoints.recent);
}
export async function getComments(gameId) {
    return await get(endpoints.getGameComments + `gameId%3D%22${gameId}%22`);
}

export async function addComment(data) {
    return await post(endpoints.addComment, data);
}