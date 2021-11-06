import dotenv from "dotenv";
import { ExpertCard } from "./src/models/expert_card.js";
import { getInfoAboutUser } from "./src/utils/get_info_about_user.js";
import { getNewsfeed } from "./src/utils/get_newsfeed.js";
import { getTopicId } from "./src/utils/get_topic_id.js";
import { ratePost } from "./src/utils/rate_post.js";
import { sendMessage } from "./src/utils/send_message.js";
import { setVote } from "./src/utils/set_vote.js";
import { sleep } from "./src/utils/sleep.js";

dotenv.config();

const main = async () => {
    // Получение данных о пользователе
    let user = await getInfoAboutUser()
    // Получение тематики пользователя
    let topicId = await getTopicId(user.id);
    // Получение ленты
    let posts = await getNewsfeed(topicId, 50)
    // Первая запись в ленте - карточка эксперта
    if ((posts[0] instanceof ExpertCard) == false) {
        return console.log(`Здравствуйте, ${user.first_name}!\nК сожалению вы не эксперт, либо же произошла непредвиденная ошибка`)
    }
    // Приветствие
    let helloMessage = `Здравствуйте, ${user.first_name}!\n${posts[0].title} ${posts[0].subtitle}!\nВаш рейтинг: ${posts[0].rating}`
    console.log(helloMessage)
    sendMessage(user.id, helloMessage)

    // Старт цикла
    while (true){
        for (let post of posts){
            let vote = ratePost(post)
            if (vote != 0){
                await setVote(vote, post).catch(function(e){
                    let errorMessage = 'Произошла ошибка при оценке записи:\n' + e
                    console.log(errorMessage)
                    sendMessage(user.id, errorMessage)
                })
                await sleep(process.env.SLEEP_TIME)
            }
        }
        posts = await getNewsfeed(topicId, 50)
    }
}

main()