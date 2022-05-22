import { useSelector } from 'react-redux'
import { selectUser } from '../features/authSlice'

export const useAuth = () => {
  return useSelector(selectUser)
}