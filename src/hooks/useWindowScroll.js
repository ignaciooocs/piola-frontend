import { useEffect } from 'react'

export const useWindowScroll = () => {
  // función para que el componente empiece siempre desde arriba
  useEffect(() => {
    window.scroll({ top: 0, behavior: 'smooth' })
  }, [])
}
