export class Post {

    static fromJSON(data){
        return new Post(
            data.source_id,
            data.post_id,
            new Date(data.date * 1000),
            data.text,
            data.likes.count,
            data.reposts.count,
            data.views.count,
            data.attachments.length,
            data.rating != null ? data.rating.can_change : false,
            data.rating != null ? data.rating.rated : false

        )
    }

    constructor(sourceId, postId, date, text, likes, reposts, views, attachmentsCount, canVote, vote){
        this.sourceId = sourceId
        this.postId = postId
        this.date = date
        this.text = text
        this.likes = likes
        this.reposts = reposts
        this.views = views
        this.attachmentsCount = attachmentsCount
        this.canVote = canVote
        this.vote = vote
    }

}
