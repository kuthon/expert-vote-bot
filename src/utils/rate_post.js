import { Post } from "../models/post.js";
import fs from "fs"
import path from "path";

const rawBanWords = fs.readFileSync(path.resolve("././ban_words.json"));
const banWords = JSON.parse(rawBanWords).data;

const rawBanSources = fs.readFileSync(path.resolve("././ban_sources.json"));
const banSources = JSON.parse(rawBanSources).data;

// Эта функция оценивает пост и возвращает три значения: -1 - даунвоут, 0 - игнор, 1 - апвоут
export function ratePost(post) {
    // проверка входных данных
    if ((post instanceof Post) == false)
        return 0;
    // если пост нельзя оценить - игнор
    if (post.canVote == false)
        return 0;
    // если пост уже оценен - игнор
    if (post.vote != 0)
        return 0;
    // проверка на бан-источники
    if (banSources.includes(post.sourceId) == true) {
        return -1;
    }
    // проверка на бан-слова
    for (let word in banWords) {
        if (post.text.includes(word)) {
            return -1;
        }
    }
    // Если пост выпущен раньше чем пять дней назад - даунвоут
    let nowDate = new Date()
    if (nowDate - post.date > 432000000)
        return -1;
    // Если в посте нет вложений - даунвоут
    if (post.attachmentsCount == 0){
        return -1;
    }
    // Если лайков больше 5000 - апвоут (этот показатель рассчитан на ленту Юмора)
    if (post.likes > 5000)
        return 1;
    // Если отношение лайков к просмотрам выше 0.05 - апвоут (этот показатель рассчитан на ленту Юмора)
    if (post.likes / post.views > 0.05)
        return 1;
    // Во всех остальных случаях даунвоут
    return -1;
    
}