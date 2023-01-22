import { View } from "@aws-amplify/ui-react"
import loader from "../assets/img/loader.svg"

export const Loader = () => {
  return (
    <View className='loader' width='100%' height='100%'>
      <img src={loader} alt='loader' height='100%' />
    </View>
  )
}
