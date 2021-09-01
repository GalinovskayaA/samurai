import React, {KeyboardEvent, useState} from 'react';
import s from './ModalInfo.module.css'

type ModalType = {
    title: string;
    active: boolean;
    setActive: (value: boolean) => void
    onButtonModal: () => void
}

export const ModalQuestion = ({title, active, setActive, onButtonModal}: ModalType) => {
    const activeClassGround = active ? `${s.modal} ${s.modal_active}` : `${s.modal}`
    const activeClassModal = active ? `${s.modal_content} ${s.modal_content_active}` : `${s.modal_content}`

    const [, setAnswer] = useState(false);

    const setTrue = () => {
        onButtonModal()
        setActive(false);
    };
    const setFalse = () => {
        setAnswer(false);
        setActive(false);
    };
    const onKeyPressHandler = (e: KeyboardEvent<HTMLDivElement>) => {
        if (e.key === "Enter") { // TODO: не слушается
            onButtonModal();
            setActive(false);
        }
        if (e.key === "Backspace" || "Escape") {
            setAnswer(false);
            setActive(false);
        }
    }

    return (
        <div className={activeClassGround} onClick={() => setActive(false)}>
            <div className={activeClassModal} onClick={e => e.stopPropagation()}>
                <div>{title}</div>
                <div className={s.buttonsQuestion}>
                    <input type='button' value='Yes' autoFocus
                           onKeyPress={onKeyPressHandler} onClick={setTrue} className={s.buttonQuestion}/>
                    <input type='button' value='No' autoFocus
                           onKeyDown={onKeyPressHandler} onClick={setFalse} className={s.buttonQuestion}/>
                </div>
            </div>
        </div>
    )
}

