import got from "got"

export async function getTopicId(userId){

    let [ resJson ] = await got(`http://expert.kuthon.ru/api/getExperts?ids=${userId}&type=current_day`).json()
    if (resJson.is_expert == false){
        throw new Error("User is not expert")
    }
    return _convertTopicNameToId(resJson.topic_name)
}

const _convertTopicNameToId = (topicName) => {
    if (topicName == 'Арт') return 1;
    if (topicName == 'IT') return 7;
    if (topicName == 'Игры') return 12;
    if (topicName == 'Музыка') return 16;
    if (topicName == 'Новости') return 18;
    if (topicName == 'Фото') return 19;
    if (topicName == 'Наука') return 21;
    if (topicName == 'Спорт') return 23;
    if (topicName == 'Туризм') return 25;
    if (topicName == 'Кино') return 26;
    if (topicName == 'Юмор') return 32;
    if (topicName == 'Стиль') return 43;
}