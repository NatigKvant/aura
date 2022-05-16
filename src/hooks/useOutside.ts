import { Dispatch, useEffect, useRef, useState, SetStateAction } from 'react'

type TypeOut = {
  ref: any
  showChat: boolean
  setShowChat: Dispatch<SetStateAction<boolean>>
  showLeftMenu: boolean
  setShowLeftMenu: Dispatch<SetStateAction<boolean>>
  showNotifications: boolean
  setShowNotifications: Dispatch<SetStateAction<boolean>>
}

export const useOutside = (initialIsVisible: boolean):
  TypeOut => {
  const [showChat, setShowChat] = useState(initialIsVisible)
  const [showLeftMenu, setShowLeftMenu] = useState(initialIsVisible)
  const [showNotifications, setShowNotifications] = useState(initialIsVisible)
  const ref = useRef<HTMLElement>(null)

  const handleClickOutside = (event: any) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setShowChat(false)
      setShowLeftMenu(false)
      setShowNotifications(false)
    }
  }

  useEffect(() => {
    document.addEventListener('click',
      handleClickOutside, true)
    return () => {
      document.removeEventListener('click',
        handleClickOutside, true)
    }
  })

  return {
    ref,
    showChat,
    setShowChat,
    showLeftMenu,
    setShowLeftMenu,
    showNotifications,
    setShowNotifications,
  }
}