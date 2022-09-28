export const dateFormatter = (dateStr: string) : string => {
    const date = new Date(dateStr)
    return date.toDateString() + ', ' + date.toLocaleTimeString()
}
