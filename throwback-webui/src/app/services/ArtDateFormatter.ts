export function formatArtDate(dateInput:string){
    const dashSplit = dateInput.split("-")
    const year = dashSplit[0];
    const month = dashSplit[1];
    const dayAndTime = dashSplit[2]
    const dayAndTimeSplit = dayAndTime.split("T")
    const day = dayAndTimeSplit[0]
    const timeSplit = dayAndTimeSplit[1].split(":")
    const timeString = `${timeSplit[0]}:${timeSplit[1]}`
    return `${month}/${day}/${year} - ${timeString}`
}
