import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native'
import React from 'react'

export default function LandingBigCard({style,children}:{style?:StyleProp<ViewStyle>,children:React.ReactNode}) {
  return (
    <View style={[styles.card,style]}>
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#E7EFF6",
    height: 160,
    alignItems: "center"
  }
})