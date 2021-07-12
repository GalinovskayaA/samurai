import s from "./ProfileInfo.module.css";
import React from "react";

type ContactsType = {
  contactTitle: string
  contactValue: string
}

export const Contacts = ({contactTitle, contactValue}: ContactsType) => {
  return <div className={s.contact}>
    <b>{contactTitle}:</b> {contactValue}
  </div>
}