import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking, ActivityIndicator } from 'react-native';
import Purchases from "react-native-purchases";
import { REVENUECAT_API_KEY } from "./config.js"; // RevenueCat API anahtarlarını buraya ekledik

const PaywallScreen = ({ navigation }) => {
    const [loading, setLoading] = useState(true);
    const [isSubscribed, setIsSubscribed] = useState(true);

    // ✅ **Kullanıcının abonelik durumunu kontrol et**
    const checkSubscriptionStatus = async () => {
        try {
           // await Purchases.configure({ apiKey: REVENUECAT_API_KEY });
          //  const customerInfo = await Purchases.getCustomerInfo();
            if (customerInfo.entitlements?.active?.["premium"]) {
                console.log("✅ User is already subscribed!");
                setIsSubscribed(true);
                navigation.replace("Roulette"); // **Direkt yönlendirme**
            } else {
                setIsSubscribed(false);
            }
        } catch (error) {
            console.error("❌ Subscription check failed:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        checkSubscriptionStatus();
    }, []);

    // **Eğer abonelik kontrolü devam ediyorsa loading göster**
    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="yellow" />
            </View>
        );
    }

    // ✅ **Satın alma işlemi**
    const onSubscribe = async () => {
        try {
            setLoading(true);
            const offerings = await Purchases.getOfferings();

            if (offerings.current !== null) {
                console.log("📌 Available Packages:", offerings.current.availablePackages);

                const packageToBuy = offerings.current.availablePackages[0]; // İlk paketi al
                if (packageToBuy) {
                    const { customerInfo } = await Purchases.purchasePackage(packageToBuy);

                    if (customerInfo.entitlements.active["premium"]) {
                        console.log("✅ Subscription successful!");
                        setIsSubscribed(true);
                        navigation.replace("Roulette");  // **Başarıyla abone olunca yönlendir**
                    } else {
                        alert("⚠️ Subscription not activated.");
                    }
                } else {
                    alert("⚠️ No valid subscription package found.");
                }
            } else {
                alert("⚠️ Unable to retrieve subscription information.");
            }
        } catch (error) {
            console.error("❌ Purchase error:", error);
            alert("⚠️ The purchase was unsuccessful. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Roulette Private Predictor</Text>
            <View style={styles.card}>
                <Text style={styles.price}>$17.00<Text style={styles.perMonth}> /Month</Text></Text>

                <View style={styles.featureContainer}>
                    <Text style={styles.feature}>✔ Unlimited Predictions</Text>
                    <Text style={styles.featureDescription}>
                        Make as many predictions as you want with no limitations, allowing you to refine your strategy and enhance your gameplay.
                    </Text>
                </View>

                <View style={styles.featureContainer}>
                    <Text style={styles.feature}>✔ 90% Success Rate</Text>
                    <Text style={styles.featureDescription}>
                        Our advanced algorithms boost your chances of winning with up to 90% accuracy. With a constantly evolving system, 
                        you’ll always receive the most precise predictions, keeping you one step ahead of the competition.
                    </Text>
                </View>

                <Text style={styles.termsText}>
                    By subscribing, you agree to our 
                    <Text style={styles.link} onPress={() => Linking.openURL('https://play.google.com/about/play-terms/')}> EULA </Text>
                    and 
                    <Text style={styles.link} onPress={() => Linking.openURL('https://www.freeprivacypolicy.com/live/0f30a182-7554-4482-bd58-af362323c083')}> Privacy Policy</Text>.
                </Text>
            </View>

            {loading ? (
                <ActivityIndicator size="large" color="yellow" />
            ) : (
                <TouchableOpacity style={styles.subscribeButton} onPress={onSubscribe}>
                    <Text style={styles.subscribeText}>Subscribe</Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: 'black', alignItems: 'center', justifyContent: 'center', padding: 20 },
    title: { fontSize: 25, fontWeight: 'bold', color: 'yellow', marginBottom: 20 },
    card: { backgroundColor: '#16202b', padding: 20, borderRadius: 15, width: '90%', alignItems: 'flex-start' },
    price: { fontSize: 28, fontWeight: 'bold', color: 'yellow', textAlign: 'left' },
    perMonth: { fontSize: 18, color: 'white' },
    featureContainer: { marginTop: 15, width: '100%' },
    feature: { fontSize: 18, fontWeight: 'bold', color: 'yellow' },
    featureDescription: { fontSize: 14, color: 'white', textAlign: 'left', marginLeft: 25 },
    termsText: { fontSize: 14, color: 'white', textAlign: 'center', marginTop: 20, width: '100%' },
    link: { color: 'yellow', fontWeight: 'bold' },
    subscribeButton: { backgroundColor: '#FFCC00', paddingVertical: 15, paddingHorizontal: 50, borderRadius: 10, marginTop: 20 },
    subscribeText: { fontSize: 20, fontWeight: 'bold', color: 'black' },
});

export default PaywallScreen;
