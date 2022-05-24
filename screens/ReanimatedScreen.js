import React from 'react'
import { View, StyleSheet, Dimensions, TouchableOpacity, Text } from 'react-native'
import { PanGestureHandler } from 'react-native-gesture-handler'
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring
} from 'react-native-reanimated'
import { snapPoint } from 'react-native-redash'

const { width, height } = Dimensions.get('screen')

const SIZE = 70

const TouchableOpacityAnimated = Animated.createAnimatedComponent(TouchableOpacity)

const ReanimatedScreen = (props) => {
  const translateX = useSharedValue(width / 3)
  const translateY = useSharedValue(height / 2.5)

  React.useRef(() => {
    'worklet'
    console.log('translateX: ', translateX)
  })

  const panGestureEvent = useAnimatedGestureHandler({
    onStart: (event, ctx) => {
      ctx.translateX = translateX.value
      ctx.translateY = translateY.value
    },
    onActive: (event, ctx) => {
      translateX.value = event.translationX + ctx.translateX
      translateY.value = event.translationY + ctx.translateY
    },
    onEnd: (event, ctx) => {
      const pointSnap =
        snapPoint(translateX.value, event.velocityX, [0, width / 2]) ===
        width / 2

      if (pointSnap) {
        translateX.value = withSpring(width / 3, { velocity: event.velocityX })
        translateY.value = withSpring(event.translationY + ctx.translateY)
      } else {
        translateX.value = withSpring(-width / 3, {
          velocity: event.velocityX
        })
        translateY.value = withSpring(event.translationY + ctx.translateY)
      }
    }
  })

  const circleStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value }
      ]
    }
  })

  return (
    <View style={styles.container}>
      <TouchableOpacityAnimated>
        <Text>Kiri</Text>
      </TouchableOpacityAnimated>
      <TouchableOpacityAnimated>
        <Text>Kanan</Text>
      </TouchableOpacityAnimated>
      <View style={styles.borderCircle}>
        <PanGestureHandler onGestureEvent={panGestureEvent}>
          <Animated.View style={[styles.circle, circleStyle]} />
        </PanGestureHandler>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  circle: {
    height: SIZE,
    width: SIZE,
    borderRadius: 40,
    backgroundColor: 'blue'
  },
  borderCircle: {
    alignItems: 'center',
    justifyContent: 'center'
    // position: "absolute",
    // right: 20,
    // bottom: 20,
  }
})

export default ReanimatedScreen
