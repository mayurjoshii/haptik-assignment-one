export const clone = (data) => JSON.parse(JSON.stringify(data))

export const compareName = (first, second) => {
    if (
        first.name.toLowerCase() >
        second.name.toLowerCase()
    )
        return 1
    else if (
        first.name.toLowerCase() <
        second.name.toLowerCase()
    )
        return -1

    return 0
}

export const compareByFavourite = (first, second) => {
    if(second?.isFavourite){
        if(first?.isFavourite) return 0
        if(!first?.isFavourite) return 1
    }else if(first?.isFavourite){
        if(!second?.isFavourite) return -1
    }

    return 0
}