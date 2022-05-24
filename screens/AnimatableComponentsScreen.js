import React from 'react'
import { View, Text, Animated, StyleSheet, ImageBackground, Dimensions } from 'react-native'

const ImageBackgroundAnimated = Animated.createAnimatedComponent(ImageBackground)

const AnimatableComponentsScreen = props => {
  const DATA = [
    {
      title: 'Afro vibes',
      location: 'Mumbai, India',
      date: 'Nov 17th, 2020',
      poster:
            'https://www.creative-flyers.com/wp-content/uploads/2020/07/Afro-vibes-flyer-template.jpg'
    },
    {
      title: 'Jungle Party',
      location: 'Unknown',
      date: 'Sept 3rd, 2020',
      poster:
            'https://www.creative-flyers.com/wp-content/uploads/2019/11/Jungle-Party-Flyer-Template-1.jpg'
    },
    {
      title: '4th Of July',
      location: 'New York, USA',
      date: 'Oct 11th, 2020',
      poster:
            'https://www.creative-flyers.com/wp-content/uploads/2020/06/4th-Of-July-Invitation.jpg'
    },
    {
      title: 'Summer festival',
      location: 'Bucharest, Romania',
      date: 'Aug 17th, 2020',
      poster:
            'https://www.creative-flyers.com/wp-content/uploads/2020/07/Summer-Music-Festival-Poster.jpg'
    },
    {
      title: 'BBQ with friends',
      location: 'Prague, Czech Republic',
      date: 'Sept 11th, 2020',
      poster:
            'https://www.creative-flyers.com/wp-content/uploads/2020/06/BBQ-Flyer-Psd-Template.jpg'
    },
    {
      title: 'Festival music',
      location: 'Berlin, Germany',
      date: 'Apr 21th, 2021',
      poster:
            'https://www.creative-flyers.com/wp-content/uploads/2020/06/Festival-Music-PSD-Template.jpg'
    },
    {
      title: 'Beach House',
      location: 'Liboa, Portugal',
      date: 'Aug 12th, 2020',
      poster:
            'https://www.creative-flyers.com/wp-content/uploads/2020/06/Summer-Beach-House-Flyer.jpg'
    }
  ]

  //   Animation Value
  const scrollYAnimated = React.useRef(new Animated.Value(0)).current

  //   Constants Data
  const MARGIN = 22
  const WIDTH_CARD = Dimensions.get('screen').width / 2.2
  const HEIGHT_CARD = Dimensions.get('screen').height / 2
  const OVERFLOW_HEIGHT = 70

  //   Render Overflow items
  const OverflowItem = () => {
    const inputRange = [-(WIDTH_CARD + MARGIN), 0, WIDTH_CARD + MARGIN]
    const translateY = scrollYAnimated.interpolate({
      inputRange,
      outputRange: [OVERFLOW_HEIGHT, 0, -OVERFLOW_HEIGHT]
    })
    return (
      <View style={{ height: OVERFLOW_HEIGHT, backgroundColor: 'white', overflow: 'hidden' }}>
        <Animated.View style={{ transform: [{ translateY }] }}>
          {DATA.map((item, index) => {
            return (
              <View style={{ height: OVERFLOW_HEIGHT, justifyContent: 'center' }}>
                <Text style={{ fontWeight: 'bold', fontSize: 22, textAlign: 'center' }}>{item.title}</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 12, marginHorizontal: 22 }}>
                  <Text style={{ fontWeight: 'bold' }}>{item.location}</Text>
                  <Text style={{ fontWeight: 'bold' }}>{item.date}</Text>
                </View>
              </View>
            )
          }
          )}
        </Animated.View>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Animated.FlatList
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollYAnimated } } }], { useNativeDriver: true })}
        data={DATA}
        style={{ flexGrow: 0 }}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 12,
          paddingVertical: 22
        }}
        scrollEventThrottle={16}
        decelerationRate={0}
        snapToInterval={WIDTH_CARD + MARGIN}
        ItemSeparatorComponent={() => <View style={{ width: MARGIN }} />}
        keyExtractor={(item) => item.title}
        renderItem={({ item, _ }) => {
          return (
            <ImageBackgroundAnimated source={{ uri: item.poster }} style={{ width: WIDTH_CARD, height: HEIGHT_CARD }} />
          )
        }}
      />
      <OverflowItem />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  }
})

export default AnimatableComponentsScreen
