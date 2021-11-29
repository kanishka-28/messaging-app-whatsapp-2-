import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollection } from 'react-firebase-hooks/firestore';
import { auth, db } from '../firebase'

const getRecipientEmail = (user, users) => {
    return users.filter(user2 => user2 !== user.email)
}

export default getRecipientEmail

