import { get, post } from "../src/api/api.js";

export async function donateAction(id){
    return post('/data/donations',{
        postId: id
    });
}

export async function getDonates(postId){
    return get(`/data/donations?where=postId%3D%22${postId}%22&distinct=_ownerId&count`);
}

export async function getOwnDonate(postId, userId){
    return get(`/data/donations?where=postId%3D%22${postId}%22%20and%20_ownerId%3D%22${userId}%22&count`);
}
