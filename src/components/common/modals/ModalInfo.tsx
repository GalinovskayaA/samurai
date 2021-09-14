import React from 'react';
import s from './ModalInfo.module.css'

type ModalType = {
    title: string;
    active: boolean;
    setActive: (value: boolean) => void
}

export const ModalInfo = ({title, active, setActive}: ModalType) => {
    const activeClassGround = active ? `${s.modal} ${s.modal_active}` : `${s.modal}`
    const activeClassModal = active ? `${s.modal_content} ${s.modal_content_active}` : `${s.modal_content}`
    return (
        <div className={activeClassGround} onClick={() => setActive(false)}>
            <div className={activeClassModal} onClick={e => e.stopPropagation()}>
                {title}
            </div>
        </div>
    )
}

