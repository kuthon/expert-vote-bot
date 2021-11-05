import { vkApi } from "./vk_api.js";

export async function getInfoAboutUser(){
    let response = vkApi("account.getProfileInfo")
    return response;
}