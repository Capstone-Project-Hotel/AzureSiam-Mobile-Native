import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LandingPage from "@/screens/Landing";
import ContactUsPage from "@/screens/ContactUs";
import SearchResultPage from "@/screens/SearchResult";
import ReservationAndGuestDetailPage from "@/screens/ReservationAndGuestDetail";
import SummaryBookingDetailPage from "@/screens/SummaryBookingDetail";
import BookingConfirmationPage from "@/screens/BookingConfirmation";
import { AppRegistry } from "react-native";
import * as eva from "@eva-design/eva";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";

const Stack = createStackNavigator();
export default function App() {
  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.light}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Landing"
              component={LandingPage}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ContactUs"
              component={ContactUsPage}
              // options={{ headerShown: false }}
            />
            <Stack.Screen
              name="SearchResult"
              component={SearchResultPage}
              // options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Reservation And Guest Detail"
              component={ReservationAndGuestDetailPage}
              // options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Summary Booking Detail"
              component={SummaryBookingDetailPage}
              // options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Booking Confirmation"
              component={BookingConfirmationPage}
              // options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </ApplicationProvider>
    </>
  );
}
