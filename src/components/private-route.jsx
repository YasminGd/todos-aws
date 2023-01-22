import { useDispatch, useSelector } from "react-redux"
import { Navigate } from "react-router-dom"
import { logout } from "../store/actions/user.action"
export const PrivateRoute = ({ element, todoMa }) => {
  const user = useSelector((state) => state.userModule.user)
  const dispatch = useDispatch()

  if (user && !user.isConfirmed) {
    dispatch(logout())
    return <Navigate to='/user/login' replace />
  } else if (!user) return <Navigate to='/user/login' replace />
  else return element
}
