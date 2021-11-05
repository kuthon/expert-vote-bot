import got from "got"

export async function vkApi(method, options) {

    if (options == null) {
        options = {}
    }

    options.v = '5.130'
    options.access_token = process.env.TOKEN
    options.lang = '0'

    let resJson = await got(`https://api.vk.com/method/${method}`, {
        searchParams: options
    }).json()


    if (resJson.error)
        throw new Error(`${JSON.stringify(resJson)}`)

    return resJson.response

}