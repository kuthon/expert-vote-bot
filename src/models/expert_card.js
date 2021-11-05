export class ExpertCard {
    constructor(rating, title, subtitle){
        this.rating = rating
        this.title = title
        this.subtitle = subtitle
    }

    static fromJSON(data){
        return new ExpertCard(
            data.expert_card.rating.value,
            data.expert_card.title,
            data.expert_card.subtitle
        )
    }
}