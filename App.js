import React, { useEffect, useState } from "react";
import { View, ActivityIndicator, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import PaywallScreen from "./screens/PaywallScreen";
import RoulettePredictor from "./screens/RoulettePredictor";
import Qonversion, { QLaunchMode } from "react-native-qonversion";

const Stack = createStackNavigator();

const APP_KEY = "BxQZimX3ikLnlKPz1dS2MTtm7hdlmGJb"; // 📌 Buraya kendi Qonversion API anahtarını yaz

const App = () => {
    const [isSubscribed, setIsSubscribed] = useState(null);

    useEffect(() => {
        // ✅ Qonversion SDK başlatma
        Qonversion.initialize(APP_KEY, QLaunchMode.SubscriptionManagement);

        // ✅ Abonelik durumunu kontrol et
        const checkSubscriptionStatus = async () => {
            try {
                console.log("🔍 Abonelik durumu kontrol ediliyor...");
                const entitlements = await Qonversion.checkPermissions();
                console.log("📌 Qonversion Yanıtı:", entitlements);

                // 📌 Kullanıcının aktif bir aboneliği var mı kontrol et
                const isActive = Object.values(entitlements).some((perm) => perm.isActive);
                setIsSubscribed(isActive);
            } catch (error) {
                console.error("❌ Abonelik kontrolü başarısız:", error);
                setIsSubscribed(false);
            }
        };

        checkSubscriptionStatus();
    }, []);

    // ✅ **Status Bar Güncellemesi**
    useEffect(() => {
        StatusBar.setTranslucent(false);
        StatusBar.setBackgroundColor("#000000");
        StatusBar.setBarStyle("light-content");
    }, []);

    // **Eğer abonelik durumu yüklenmemişse, bekleme ekranı göster**
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
