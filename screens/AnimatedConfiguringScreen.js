import React, { Component } from 'react'
import { View, StyleSheet, Animated, PanResponder, TouchableOpacity, Text } from 'react-native'

export default class AnimatedConfiguringScreen extends Component {
state = {
  animation: new Animated.ValueXY(0),
  springAnimation: new Animated.Value(1)
}

componentWillMount() {

  this._x = 0
  this._y = 0

  this.state.animation.addListener(value=>{
    this._x = value.x,
    this._y = value.y
  })

  this._panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderGrant: () => {
      this.state.animation.setOffset({
        x: this._x,
        y: this._y
      })
      this.state.animation.setValue({
        x: 0, y: 0
      })
    },
    onPanResponderMove: Animated.event([
      null,
      {
        dx: this.state.animation.x,
        dy: this.state.animation.y
      },
    ], { useNativeDriver: false }),
    onPanResponderRelease: (e, { vx, vy }) => {
      Animated.decay(this.state.animation, {
        velocity: {
          x: vx,
          y: vy
        },
        deceleration: 0.997,
        useNativeDriver: false
      }).start()
    }
  })
}

handlePressSpring() {
  Animated.spring(this.state.springAnimation, {
    toValue: 2,
    friction: 1,
    tension: 10
  }).start(()=>{
    Animated.timing(this.state.springAnimation, {
      toValue: 1, 
      duration: 1000
    }).start()
  })
}


render() {
  const animatedStyle = {
    transform: this.state.animation.getTranslateTransform()
  }

  const springStyle = {
    transform: [
      {
        scale: this.state.springAnimation,
      },
    ]
  }

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.box, animatedStyle]} { ...this._panResponder.panHandlers } />
      <Animated.View style={[styles.box, springStyle, { backgroundColor: 'red', marginTop: 20 }]} { ...this._panResponder.panHandlers } />
      <TouchableOpacity onPress={() => { this.handlePressSpring() }} style={styles.buttonContainer}>
        <Text style={styles.buttonText}>Press</Text>
      </TouchableOpacity>
    </View>
  )
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems:'center',
    justifyContent: 'center'
  },
  box: {
    height: 80,
    width: 80,
    backgroundColor: 'tomato',
    borderRadius: 4
  },
  buttonContainer: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    backgroundColor: 'blue',
    marginTop: 20,
    borderRadius: 8
  },
  buttonText: {
    color: 'white',
  }
})
