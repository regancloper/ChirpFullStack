


// checks for whether a chirp includes a mention, and returns either mentionname or undefined
export const checkForMentions = (text: string) => {
    let mentionName: string;
    let index = text.indexOf('@');
    if (index != -1) {
        let nextIndex = text.indexOf(' ', index);
        if (nextIndex === -1) {
            mentionName = text.substring((index + 1));
        } else {
            mentionName = text.substring((index + 1), (nextIndex + 1));
        }
    }
    return mentionName;
}