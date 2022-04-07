// @ts-ignore
import React, { useState } from 'react'
import './Login.scss'
// @ts-ignore
import { auth } from '../Firebase/firebase.ts'
import { useDispatch } from 'react-redux'
import { login } from '../../features/userSlice'
// @ts-ignore
import { fireBase } from '../Firebase/firebase.ts'
import IconButton from '@mui/material/IconButton'
import { NavLink } from 'react-router-dom'

export const Register: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [profilePic, setProfilePic] = useState('')

  const dispatch = useDispatch()

  const delay = (wait = 1000) => {
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        resolve()
      }, wait)
    })
  }

  const createData = () => {
    auth.createUserWithEmailAndPassword(email, password)
      .then((userAuth) => {
        if (userAuth != null) {
          fireBase.firestore()
            .collection('users')
            .doc(fireBase.auth().currentUser.uid)
            .set({
              name,
              email,
              status: 'Online',
              userId: userAuth.user.uid,
              photoUrl: profilePic,
            })
        }
        userAuth.user
          .updateProfile({
            displayName: name,
            photoURL: profilePic,
          })
          .then(() => {
            dispatch(
              login({
                email: userAuth.user.email,
                uid: userAuth.user.uid,
                displayName: name,
                photoUrl: profilePic,
              }))
          })
      }).catch((error) => alert(error))
  }

  const register = async () => {
    if (!name) {
      return alert('Please enter a full name')
    }
    await delay(3000)
    await createData()
  }
  return (
    <div className='login'>
      <img
        src='https://ak.picdn.net/shutterstock/videos/24102940/thumb/1.jpg'
        alt=''
      />
      <form className='form'>
        <input placeholder='Full Name'
               type='text'
               value={name}
               onChange={(e) => setName(e.target.value)}
        />

        <input placeholder='Profile Url Image'
               type='text'
               onChange={(e) => setProfilePic(e.target.value)}
        />

        <input value={email}
               onChange={(e) => setEmail(e.target.value)}
               placeholder='Email'
               type='email'
        />
        <input placeholder='Password'
               type='password'
               value={password}
               onChange={(e) => setPassword(e.target.value)}
        />
        <button type='submit' onClick={register}>Register Now</button>
      </form>
      <p>
        Are you member?{' '}
        <IconButton
          size='small'
          className='item'
          to={'/login'}
          component={NavLink}
          color='primary'
          sx={{
            ml: 1,
            mb: 0.5,
            '&.MuiButtonBase-root:hover': {
              bgcolor: 'transparent',
            },
          }}
        >
          Login
        </IconButton>
      </p>
    </div>
  )
}