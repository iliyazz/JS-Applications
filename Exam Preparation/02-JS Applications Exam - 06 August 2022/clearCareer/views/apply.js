import { get, post } from "../src/api/api.js";

export async function applyAction(id){
    return post('/data/applications',{
        offerId: id
    });
}

export async function getApplies(offerId){
    return get(`/data/applications?where=offerId%3D%22${offerId}%22&distinct=_ownerId&count`);
}

export async function getOwnApply(offerId, userId){
    return get(`/data/applications?where=offerId%3D%22${offerId}%22%20and%20_ownerId%3D%22${userId}%22&count`);
}
