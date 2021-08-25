import React from 'react';
import Picker, {IEmojiData} from 'emoji-picker-react';


type EmojiType = {
    chosenEmoji: IEmojiData | undefined,
    onEmojiClick: (event: React.MouseEvent, emojiObject: IEmojiData) => void
}

export const Emoji = ({chosenEmoji, onEmojiClick}: EmojiType) => {

    return <>
        <div>
            {chosenEmoji ? (
                <span>You chose: {chosenEmoji.emoji}</span>
            ) : (
                <span>No emoji Chosen</span>
            )}
            <Picker onEmojiClick={onEmojiClick} preload={true}/>
        </div>
    </>
}