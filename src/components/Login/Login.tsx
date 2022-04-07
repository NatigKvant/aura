// @ts-ignore
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import './Login.scss'
// @ts-ignore
import { auth } from '../Firebase/firebase.ts'
import { useDispatch } from 'react-redux'
import { login } from '../../features/userSlice'
// @ts-ignore
import { fireBase } from '../Firebase/firebase.ts'
import ForumIcon from '@mui/icons-material/Forum'
import IconButton from '@mui/material/IconButton'
import { NavLink } from 'react-router-dom'

export const Login: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  let history = useHistory()

  const delay = (wait = 1000) => {
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        resolve()
      }, wait)
    })
  }

  const signData = async () => {
    await auth.signInWithEmailAndPassword(email, password).then(
      ({
         user: {
           email,
           uid,
           displayName,
           photoURL,
         },
       }) => {
        dispatch(login({
          email,
          uid,
          displayName,
          profileUrl: photoURL,
        }))
        fireBase.firestore()
          .collection('users')
          .doc(fireBase.auth().currentUser.uid)
          .update({
            status: 'Online',
          })
      }).catch(error => alert(error))
  }

  const loginToApp = async (e) => {
    e.preventDefault()
    try {
      await delay(3000)
      await signData()
      history.push('/homepage')
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div className='login'>
      <img
        src='https://ak.picdn.net/shutterstock/videos/24102940/thumb/1.jpg'
        alt=''
      />
      <form className='form'>
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
        <IconButton
          size='small'
          className='item'
          onClick={loginToApp}
          sx={{
            ml: 1,
            mb: 0.5,
            '&.MuiButtonBase-root:hover': {
              bgcolor: 'transparent',
            },
          }}
        >
          Sign In
        </IconButton>
      </form>
      <p>
        Not a member?{' '}
        <IconButton
          size='small'
          className='item'
          to={'/register'}
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
          Register Now
        </IconButton>
      </p>
    </div>
  )
}