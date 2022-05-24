import React from 'react'
import { View, Animated, StyleSheet, Button } from 'react-native'

const ComposingAnimationsScreen = props => {
  const scaleValue = React.useRef(new Animated.Value(1)).current
  const colorValue = React.useRef(new Animated.Value(0)).current

  const handlePress = () => {
    Animated.sequence([
      Animated.timing(colorValue, {
        toValue: 1,
        duration: 500
      }),
      Animated.timing(scaleValue, {
        toValue: 2,
        duration: 300
      }),
      Animated.delay(1500),
      Animated.timing(colorValue, {
        toValue: 0,
        duration: 500
      }),
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 300
      })
    ]).start()
  }

  const interpolateColor = colorValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['tomato', 'green'],
    extrapolate: 'clamp'
  })

  const interpolateScale = scaleValue.interpolate({
    inputRange: [1, 2],
    outputRange: [1, 1.1]
  })

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.boxContainer, { backgroundColor: interpolateColor, transform: [{ scale: interpolateScale }] }]} />
      <Button title='Press' onPress={handlePress} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center'
  },
  boxContainer: {
    width: 200,
    height: 200
  }
})

export default ComposingAnimationsScreen
