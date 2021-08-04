import React from 'react';
import {UsersType} from "../redux/UsersReducer";

export function updateObjectArray (users: Array<UsersType>, itemId: string, id: string, newObjProps: {}) {
  return users.map(user => {
    if (user.id === itemId) {
      return {...user, ...newObjProps}
    }
    return user
  })
}
