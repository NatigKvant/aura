// @ts-nocheck
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import './Login.scss'
import { auth } from '../Firebase/firebase'
import { useDispatch } from 'react-redux'
import { login } from '../../features/userSlice'
import { fireBase } from '../Firebase/firebase'
import IconButton from '@mui/material/IconButton'
import { NavLink } from 'react-router-dom'
import { throttle } from 'lodash'

export interface LoginPropsType {
  isLoading: boolean
  setIsLoading: (value: boolean) => void
}

export const Login: React.FC<LoginPropsType> = ({ isLoading, setIsLoading }) => {
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

  const signData = (throttle(async () => {
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
  }, 3000, { 'trailing': false }))

  const loginToApp = async (e) => {
    e.preventDefault()
    try {
      setIsLoading(false)
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

          sx={{
            ml: 1,
            mb: 0.5,
            color: '#ff6200',
            '&.MuiButtonBase-root:hover': {
              bgcolor: 'transparent',
              color: 'red',
            },
          }}
        >
          Register Now
        </IconButton>
      </p>
    </div>
  )
}