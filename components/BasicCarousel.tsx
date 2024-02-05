// import { StyleSheet, Text, View } from 'react-native'
// import React, { useState } from 'react'
// import { Carousel } from '@ant-design/react-native'
// import { CarouselProps } from '@ant-design/react-native/lib/carousel'

// export default function BasicCarousel({children, carouselProps}:{
//   children: React.ReactNode,
//   carouselProps?: CarouselProps
// }) {
//   const [carouselDisplay, setCarouselDisplay] = useState({
//     selectedIndex: 2,
//     autoplay: true,
//   })
//   const onSelectedIndexChange = (index: number) => {
//     setCarouselDisplay({ selectedIndex: index, autoplay: true})
//   }
//   return (
//     <View style={{ marginTop: 30 }}>
//       <View style={{ paddingHorizontal: 15 }}>
//         <Text>horizontal</Text>
//         <Carousel
//           style={styles.wrapper}
//           selectedIndex={carouselDisplay.selectedIndex}
//           autoplay
//           infinite
//           afterChange={onSelectedIndexChange}
//           >
//             {children}
//         </Carousel>
//         {/* <Button onPress={() => this.carousel && this.carousel.goTo(0)}>
//           Go to 0
//         </Button> */}
//       </View>
//     </View>
//   )
// }

// const styles = StyleSheet.create({
//   wrapper: {
//     backgroundColor: '#fff',
//     width: '100%',
//     height: 150,
//   },
//   containerHorizontal: {
//     flexGrow: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     height: 150,
//   },
// })