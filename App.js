import React, { useEffect, useState } from "react";
import { View, ActivityIndicator, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import PaywallScreen from "./screens/PaywallScreen";
import RoulettePredictor from "./screens/RoulettePredictor";
import Purchases from "react-native-purchases";
import { REVENUECAT_API_KEY } from "./screens/config.js";

const Stack = createStackNavigator();

const App = () => {
    const [isSubscribed, setIsSubscribed] = useState(null);

    useEffect(() => {
        const initPurchases = async () => {
            try {
                console.log("🛠 RevenueCat yapılandırılıyor...");
                Purchases.configure({ apiKey: REVENUECAT_API_KEY }); // ✅ Doğru format

                console.log("🔍 Kullanıcı abonelik durumu kontrol ediliyor...");
                const customerInfo = await Purchases.getCustomerInfo();
                console.log("📌 RevenueCat Yanıtı:", customerInfo);

                if (customerInfo?.entitlements?.active?.["vip_access_1month"]) {
                    console.log("✅ Kullanıcı zaten abone!");
                    setIsSubscribed(true);
                } else {
                    console.log("🚫 Kullanıcı abone değil.");
                    setIsSubscribed(false);
                }
            } catch (error) {
                console.error("❌ Abonelik kontrolü başarısız:", error);
                setIsSubscribed(false);
            }
        };

        initPurchases();
    }, []);

    // ✅ **Status Bar ve Fullscreen Yönetimi (Android 15 için güncellendi)**
    useEffect(() => {
        StatusBar.setTranslucent(true);
        StatusBar.setBackgroundColor("transparent");
        StatusBar.setBarStyle("light-content");
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
