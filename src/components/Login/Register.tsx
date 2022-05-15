// @ts-nocheck
import React from 'react'
import './Login.scss'
import { auth } from '../Firebase/firebase'
import { useDispatch } from 'react-redux'
import { throttle } from 'lodash'
import firebase from 'firebase/compat/app'
import IconButton from '@mui/material/IconButton'
import { NavLink } from 'react-router-dom'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useActions } from '../../hooks/useActions'

export interface RegisterInputs {
  name: string
  photoUrl: string
  email: string
  password: string | number
}

interface RegisterPropsType {
  isLoading: boolean
  setIsLoading: (value: boolean) => void
}

export const Register: React.FC<RegisterPropsType> = ({ isLoading, setIsLoading }) => {

  const dispatch = useDispatch()
  const { login } = useActions()

  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm<RegisterInputs>({
    mode: 'onChange',
  })

  const onSubmit: SubmitHandler<RegisterInputs> = (throttle(async ({
                                                                     email,
                                                                     password,
                                                                     name,
                                                                     profilePic,
                                                                   }: any): Promise<any> => {
    setIsLoading(false)
    await auth.createUserWithEmailAndPassword(email, password)
      .then((userAuth) => {
        if (userAuth != null) {
          firebase.firestore()
            .collection('users')
            .doc(firebase.auth().currentUser.uid)
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
    reset()
    setIsLoading(true)
  }, 3000, { 'trailing': false }))


  return (
    <div className='login'>
      <img
        src='https://ak.picdn.net/shutterstock/videos/24102940/thumb/1.jpg'
        alt=''
      />
      <form className='form' onSubmit={handleSubmit(onSubmit)}>
        <input placeholder='Full Name'
               type='text'
               onChange={name => setValue('name', name)}
               {...register('name', {
                 required: 'name is required',
               })}
        />
        {errors.name && <div style={{ color: 'red' }}>{errors.name.message}</div>}

        <input placeholder='Profile Url Image'
               type='text'
               onChange={profilePic => setValue('profilePic', profilePic)}
               {...register('profilePic', {
                 required: 'profilePic is required',
               })}
        />
        {errors.profilePic && <div style={{ color: 'red' }}>{errors.profilePic.message}</div>}

        <input onChange={email => setValue('email', email)}
               placeholder='Email'
               type='email'
               {...register('email', {
                 required: 'email is required',
                 pattern: {
                   value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                   message: 'Please enter valid email',
                 },
               })}
        />
        {errors.email && <div style={{ color: 'red' }}>{errors.email.message}</div>}

        <input placeholder='Password'
               type='password'
               onChange={password => setValue('email', password)}
               {...register('password', { required: 'password is required' })}
        />
        {errors.password && <div style={{ color: 'red' }}>{errors.password.message}</div>}

        <IconButton
          onClick={handleSubmit(onSubmit)}
          size='small'
          className='item'
          sx={{
            ml: 1,
            mb: 0.5,
            '&.MuiButtonBase-root:hover': {
              bgcolor: 'transparent',
            },
          }}
        >Register Now</IconButton>
      </form>
      <p>
        Are you member?{' '}
        <IconButton
          size='small'
          className='item'
          to={'/'}
          component={NavLink}
          color='primary'
          sx={{
            ml: 1,
            mb: 0.5,
            '&.MuiButtonBase-root:hover': {
              bgcolor: 'transparent',
              color: 'red',
            },
          }}
        >
          Login
        </IconButton>
      </p>
    </div>
  )
}