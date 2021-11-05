import { vkApi } from "./vk_api.js";

export async function sendMessage(id, text){
    await vkApi("messages.send", {
        "user_id": id,
        "random_id": 0,
        "message": text
    }).catch(function(e){
        console.log('Ошибка при отправке сообщения: ' + e)
    })
}