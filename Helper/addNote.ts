import { Dispatch, SetStateAction } from "react";
import { insertLink, insertNotes } from "../GraphQl/Mutations";

interface Props {
    noteVal: string,
    page: string,
    updateList: Dispatch<SetStateAction<any[]>>
}
export default async function addNotes({ noteVal, page, updateList }: Props) {
    let isLink = noteVal.toString().match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?\/\/&=]*)/gm)

    if (isLink || page === '/linklist') {
        let theLink = ''
        if (noteVal.toString().trim() !== '') {
            if (noteVal.toString().toLocaleLowerCase().split('https://').length === 1) { theLink = (`https://${noteVal}`) } 
            if (noteVal.toString().toLocaleLowerCase().split('www').length === 1) { theLink = (`https://www.${noteVal}`) } 
            if (noteVal.toString().toLocaleLowerCase().split(/.com|.net|.us|.site|.me/gm).length === 1) {
                theLink = (`https://www.${noteVal}.com`);
            } 
            if (isLink) {
                theLink = (`${noteVal}`)
            }  

            try {
                await insertLink({ note: noteVal.toString(), type: "link", link: theLink.toString() })
            } catch (error) {
                console.log(error);
            }
        }
        updateList(curList => [...curList, { note: noteVal.toString(), completed: false, link: theLink }])
    } else {
        if (noteVal.toString().trim() !== '') {
            try {
                await insertNotes({ note: noteVal.toString(), type: "todo" })
            } catch (error) {
                console.log(error);
            }
        }
        updateList(curList => [...curList, { note: noteVal.toString(), completed: false }])

    }

}