export const setValueOrEntityId = (value: any) => {
    if (Array.isArray(value)) {
        let arr = []
        arr = value.map(item => item._id)
        return arr.join(",")
    }
    return value?._id ? value._id : value
}