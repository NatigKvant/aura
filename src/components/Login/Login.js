import React, {useState} from 'react'
import './Login.css'
import {auth, firebaseApp} from '../Firebase/firebase'
import {useDispatch} from 'react-redux'
import {login} from '../../features/userSlice'

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [profilePic, setProfilePic] = useState('')

    const dispatch = useDispatch()


  const onUpload = (e) => {
        const file = e.target.files[0]
        const storageRef = firebaseApp.storage().ref()
        const fileRef = storageRef.child(file.name)
      fileRef.put(file).then(() => {

        })
      //тут получаем файл и он сэтается в profilePic
      fileRef.getDownloadURL(file).then((data) => {
           setProfilePic(data)
        })
    }

    const delay = (wait = 1000) => {
        const promise = new Promise((resolve,reject) => {
            setTimeout(() => {
                resolve()
            },wait)
        })
        return promise
    }

    const signData = () => {
       auth.signInWithEmailAndPassword(email, password).then(
            (userAuth) => {
                dispatch(login({
                    email: userAuth.user.email,
                    uid: userAuth.user.uid,
                    displayName: userAuth.user.displayName,
                    profileUrl: userAuth.user.photoURL,
                }))
            }).catch(error => alert(error))
    }

    const createData = () => {

        auth.createUserWithEmailAndPassword(email, password)
            .then((userAuth) => {
                userAuth.user
                    .updateProfile({
                        displayName: name,
                        photoURL: profilePic
                    })
                    .then(() => {
                        dispatch(
                            login({
                                email: userAuth.user.email,
                                uid: userAuth.user.uid,
                                displayName: name,
                                photoUrl: profilePic
                            }))
                    })
            }).catch((error) => alert(error))
    }

    const loginToApp = async(e) => {
        e.preventDefault()
    try {
        await delay(3000)
        await signData()
    } catch(e) {
            console.log(e)
      }
    }



    const register = async() => {
        if(!name) {
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
            <form className = 'form'>
                <input placeholder='Full Name'
                       type='text'
                       value={name}
                       onChange={(e) => setName(e.target.value)}
                />

                <input type='file'
                       onChange={onUpload}
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
                <button type='submit' onClick={loginToApp}>Sign In</button>

            </form>

            <p>
                Not a member?{' '}
            <span className='login_register' onClick={register}>
                Register Now
            </span>
            </p>
        </div>
    )
}

export default Login