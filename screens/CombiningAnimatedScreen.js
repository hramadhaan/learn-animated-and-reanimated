import React from 'react'
import { View, StyleSheet, Animated, Button } from 'react-native'

const CombiningAnimatedScreen = props => {
  const animation = React.useRef(new Animated.Value(0)).current

  const handlePress = () => {
    Animated.parallel([
      Animated.timing(animation, {
        toValue: 12,
        duration: 3500
      })
    ]).start()
  }

  const RANDOM_VALUE = React.useRef(new Animated.Value(3)).current

  const newAnimation = Animated.add(animation, RANDOM_VALUE)

  const interpolate = newAnimation.interpolate({
    inputRange: [0, 3],
    outputRange: ['0deg', '270deg']
  })

  const animatedStyle = {
    transform: [
      { rotate: interpolate }
    ]
  }

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.box, animatedStyle]} />
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
  box: {
    width: 120,
    height: 120,
    backgroundColor: 'tomato'
  }
})

export default CombiningAnimatedScreen
