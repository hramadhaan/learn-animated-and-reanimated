import { View, Text, SectionList, StyleSheet, TouchableOpacity } from 'react-native'

const HomeScreen = props => {
  const DATA = [
    {
      id: 'A',
      title: 'Animated',
      data: [
        {
          id: 'A1',
          title: 'Configuring Animations',
          route: 'AnimatedConfiguringScreen'
        },
        {
          id: 'A2',
          title: 'Animatable Components',
          route: 'AnimatableComponentsScreen'
        },
        {
          id: 'A3',
          title: 'Composing Animations',
          route: 'ComposingAnimationsScreen'
        },
        {
          id: 'A4',
          title: 'Combining Animated Values',
          route: 'CombiningAnimatedScreen'
        }
      ]
    },
    {
      id: 'B',
      title: 'Reanimated',
      data: [
        {
          id: 'B1',
          title: 'Reanimated',
          route: 'ReanimatedScreen'
        }
      ]
    }
  ]

  const RenderSectionHeader = ({ item }) => {
    return (
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>{item.title}</Text>
      </View>
    )
  }

  const RenderSectionListItem = ({ item }) => {
    return (
      <TouchableOpacity style={styles.listContainer} onPress={() => props.navigation.navigate(item.route)}>
        <Text style={styles.listTitle}>{item.title}</Text>
        <Text>👉</Text>
      </TouchableOpacity>
    )
  }

  return (
    <View style={styles.container}>
      <SectionList
        contentInsetAdjustmentBehavior='automatic'
        sections={DATA}
        contentContainerStyle={{
          paddingHorizontal: 12,
          paddingVertical: 9
        }}
        SectionSeparatorComponent={() => <View style={{ height: 22 }} />}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        keyExtractor={(item, _) => item.id}
        renderSectionHeader={({ section: item }) => <RenderSectionHeader item={item} />}
        renderItem={({ item, _ }) => <RenderSectionListItem item={item} />}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  headerContainer: {
    paddingVertical: 5,
    backgroundColor: 'white'
  },
  headerTitle: {
    fontWeight: 'bold',
    fontSize: 26,
    color: 'black'
  },
  listContainer: {
    paddingHorizontal: 12,
    paddingVertical: 3,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  listTitle: {
    fontSize: 18,
    color: 'black'
  }
})

export default HomeScreen
