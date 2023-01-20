import { useSelector } from "react-redux"
import { Route, Navigate } from "react-router-dom"
export const PrivateRoute = ({ element }) => {
  const user = useSelector((state) => state.userModule.user)

  if (!user) return <Navigate to='/user/login' replace />
  return element
}
