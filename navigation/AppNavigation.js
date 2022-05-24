import { NavigationContainer } from '@react-navigation/native'
import { RootNavigator } from './ScreenNavigator'

const AppNavigation = props => {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  )
}

export default AppNavigation
