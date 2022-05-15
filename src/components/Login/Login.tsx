//@ts-nocheck
import React from 'react'
import { useHistory } from 'react-router-dom'
import './Login.scss'
import IconButton from '@mui/material/IconButton'
import { NavLink } from 'react-router-dom'
import { throttle } from 'lodash'
import { SubmitHandler, useForm } from 'react-hook-form'
import { auth, fireBase } from '../Firebase/firebase'
import { useDispatch } from 'react-redux'
import { useActions } from '../../hooks/useActions'

export interface LoginPropsType {
  isLoading: boolean
  setIsLoading: (value: boolean) => void
}

export interface LoginInputs {
  email: string
  password: string | number
}

export const Login: React.FC<LoginPropsType> = ({ isLoading, setIsLoading }) => {

  let history = useHistory()
  const dispatch = useDispatch()
  const { login } = useActions()

  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm<LoginInputs>({
    mode: 'onChange',
  })

  const onSubmit: SubmitHandler<LoginInputs> = (throttle(async ({ email, password }: any): Promise<any> => {
    try {
      setIsLoading(false)
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
        })/*.catch(error => alert(error))*/
      reset()
      setIsLoading(true)
      history.push('/homepage')
    } catch {
      alert('Login or Password is incorrect')
      setIsLoading(true)
    }
  }, 3000, { 'trailing': false }))

  return (
    <div className='login'>
      <img
        src='https://ak.picdn.net/shutterstock/videos/24102940/thumb/1.jpg'
        alt=''
      />
      <form className='form' onSubmit={handleSubmit(onSubmit)}>
        <input
          onChange={email => setValue('email', email)}
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
          size='small'
          className='item'
          onClick={handleSubmit(onSubmit)}
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