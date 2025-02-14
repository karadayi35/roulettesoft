import React, { useEffect, useState } from "react";
import { View, ActivityIndicator, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import PaywallScreen from "./screens/PaywallScreen";
import RoulettePredictor from "./screens/RoulettePredictor";
import Qonversion from "com.qonversion.android.sdk.Qonversion";
import { QonversionConfig, QLaunchMode } from "com.qonversion.android.sdk.QonversionConfig";

const Stack = createStackNavigator();

const App = () => {
    const [isSubscribed, setIsSubscribed] = useState(null);

    useEffect(() => {
        // ✅ Qonversion SDK'yı başlat
        const qonversionConfig = new QonversionConfig.Builder(
            "BxQZimX3ikLnlKPz1dS2MTtm7hdlmGJb",  // **Kendi API anahtarını kullan**
            QLaunchMode.Analytics
        ).build();
        
        Qonversion.initialize(qonversionConfig);

        // ✅ Abonelik durumunu kontrol et
        const checkSubscriptionStatus = async () => {
            try {
                console.log("🔍 Kullanıcı abonelik durumu kontrol ediliyor...");
                const entitlements = await Qonversion.getSharedInstance().checkEntitlements();
                
                if (entitlements["premium"] && entitlements["premium"].isActive()) {
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

        checkSubscriptionStatus();
    }, []);

    // ✅ **Status Bar ve Fullscreen Yönetimi**
    useEffect(() => {
        StatusBar.setTranslucent(false);
        StatusBar.setBackgroundColor("#000000");
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
