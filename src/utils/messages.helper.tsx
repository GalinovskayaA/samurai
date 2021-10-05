import {MessageDataType} from "../redux/DialogsReducer";

export function combineMessages(arr: MessageDataType[], arr2: MessageDataType[]): MessageDataType[] {
  if (arr.length === 0) {
    return arr.concat(...arr2)
  } else {
    // @ts-ignore
    let u = arr2.findIndex(item => item.id === arr[0].id)
    if (u !== -1) {
      arr2.splice(u, 20)
      return arr2.concat([...arr])
    } else {
      return arr2.concat([...arr])
    }
  }
}