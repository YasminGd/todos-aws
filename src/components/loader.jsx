import { View } from '@aws-amplify/ui-react'
import loader from '../assets/img/loader.svg'

export const Loader = () => {
  return (
    <View className="loader">
      <img src={loader} alt="loader" />
    </View>
  )
}
