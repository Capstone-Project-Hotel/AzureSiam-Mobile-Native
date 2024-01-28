import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function LandingBigCard({children}:{children:React.ReactNode}) {
  return (
    <View style={styles.card}>
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