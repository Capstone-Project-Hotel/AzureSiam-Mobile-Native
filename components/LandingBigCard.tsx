import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native'
import React from 'react'
import { COLORS } from '@/constants'

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
    backgroundColor: COLORS.BACKGROUND_1,
    height: 160,
    alignItems: "center"
  }
})