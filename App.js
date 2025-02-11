import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import PaywallScreen from './screens/PaywallScreen';
import RoulettePredictor from './screens/RoulettePredictor';
import Purchases from "react-native-purchases";
import { REVENUECAT_API_KEY } from ".screens/config.js";


const Stack = createStackNavigator();

const App = () => {
    const [isSubscribed, setIsSubscribed] = useState(null);

    useEffect(() => {
        const checkSubscriptionStatus = async () => {
            try {
                await Purchases.configure({ apiKey: REVENUECAT_API_KEY });
                const customerInfo = await Purchases.getCustomerInfo();
                if (customerInfo.entitlements?.active?.["premium"]) {
                    setIsSubscribed(true);
                } else {
                    setIsSubscribed(false);
                }
            } catch (error) {
                console.error("Subscription check failed:", error);
                setIsSubscribed(false);
            }
        };
        checkSubscriptionStatus();
    }, []);

    if (isSubscribed === null) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator size="large" color="yellow" />
            </View>
        );
    }

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                {isSubscribed ? (
                    <Stack.Screen name="Roulette" component={RoulettePredictor} />
                ) : (
                    <Stack.Screen name="Paywall" component={PaywallScreen} />
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;
