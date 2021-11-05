import { vkApi } from "./vk_api.js";

export async function setVote(vote, post){
    let response = await vkApi("newsfeed.setPostVote", {
        "owner_id": post.sourceId,
        "post_id": post.postId,
        "new_vote": vote,
    })
    console.log(`На пост vk.com/wall${post.sourceId}_${post.postId} выставлена отметка: ${vote}`)
    return response;
}