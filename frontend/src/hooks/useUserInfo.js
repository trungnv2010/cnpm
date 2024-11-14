

import { useSelector } from 'react-redux'


export default function useUserInfo() {
  const userInfo = useSelector((state) => state.user);
  return {
    userInfo: userInfo,
  }
}
