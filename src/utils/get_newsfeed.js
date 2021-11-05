import { ExpertCard } from "../models/expert_card.js";
import { Post } from "../models/post.js";
import { vkApi } from "./vk_api.js";

let _startFrom = null;

export async function getNewsfeed(topicId, count) {
    let response = await vkApi("newsfeed.getCustom", {
        'feed_id': `discover_category/${topicId}`,
        'count': count,
        'start_from': _startFrom,
    })
    let posts = []
    for (let item of response.items) {
        if (item.type == 'expert_card')
            posts.push(ExpertCard.fromJSON(item))
        else
            posts.push(Post.fromJSON(item))
    }
    if (posts.length < count){
        _startFrom = null;
    }
    else{
        _startFrom = response.next_from
    }
    return posts
}