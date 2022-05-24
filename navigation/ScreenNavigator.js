import { createNativeStackNavigator } from '@react-navigation/native-stack'
import AnimatableComponentsScreen from '../screens/AnimatableComponentsScreen'
import AnimatedConfiguringScreen from '../screens/AnimatedConfiguringScreen'
import CombiningAnimatedScreen from '../screens/CombiningAnimatedScreen'
import ComposingAnimationsScreen from '../screens/ComposingAnimationsScreen'
import HomeScreen from '../screens/HomeScreen'
import ReanimatedScreen from '../screens/ReanimatedScreen'

const RootStack = createNativeStackNavigator()

export const RootNavigator = () => {
  return (
    <RootStack.Navigator initialRouteName='HomeScreen'>
      <RootStack.Screen name='HomeScreen' component={HomeScreen} options={{ headerLargeTitle: true, headerLargeTitleShadowVisible: false, title: 'Sharing Session' }} />
      <RootStack.Screen name='AnimatedConfiguringScreen' component={AnimatedConfiguringScreen} options={{ title: 'Configuring Animations' }} />
      <RootStack.Screen name='AnimatableComponentsScreen' component={AnimatableComponentsScreen} options={{ title: 'Animatable Components' }} />
      <RootStack.Screen name='ComposingAnimationsScreen' component={ComposingAnimationsScreen} options={{ title: 'Composing Animations' }} />
      <RootStack.Screen name='CombiningAnimatedScreen' component={CombiningAnimatedScreen} options={{ title: 'Combining Animated' }} />
      <RootStack.Screen name='ReanimatedScreen' component={ReanimatedScreen} options={{ title: 'Reanimated' }} />
    </RootStack.Navigator>
  )
}
