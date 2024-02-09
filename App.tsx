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
import { ApplicationProvider } from "@ui-kitten/components";

const Stack = createStackNavigator();
export default function App() {
  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Landing" component={LandingPage} />
          {/* <Stack.Screen name="ContactUs" component={ContactUsPage} /> */}
          <Stack.Screen name="SearchResult" component={SearchResultPage} />
          <Stack.Screen
            name="ReservationAndGuestDetail"
            component={ReservationAndGuestDetailPage}
          />
          <Stack.Screen
            name="SummaryBooking"
            component={SummaryBookingDetailPage}
          />
          <Stack.Screen
            name="BookingConfirmation"
            component={BookingConfirmationPage}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ApplicationProvider>
  );
}
