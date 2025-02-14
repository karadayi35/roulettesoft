import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Linking, ActivityIndicator } from "react-native";
import Qonversion from 'react-native-qonversion';


const APP_KEY = "BxQZimX3ikLnlKPz1dS2MTtm7hdlmGJb"; // 📌 Kendi Qonversion API Anahtarın
const PRODUCT_ID = "vip_access_1month"; // 📌 Qonversion’daki ürün kimliği

const PaywallScreen = ({ navigation }) => {
    const [loading, setLoading] = useState(true);
    const [isSubscribed, setIsSubscribed] = useState(false);

    useEffect(() => {
        // ✅ Qonversion SDK'yı başlat
        Qonversion.initialize(APP_KEY, QLaunchMode.SubscriptionManagement);

        // ✅ Abonelik durumunu kontrol et
        const checkSubscriptionStatus = async () => {
            try {
                console.log("🔍 Kullanıcı abonelik durumu kontrol ediliyor...");
                const entitlements = await Qonversion.checkPermissions();
                console.log("📌 Qonversion Yanıtı:", entitlements);

                const isActive = Object.values(entitlements).some((perm) => perm.isActive);
                setIsSubscribed(isActive);

                if (isActive) {
                    console.log("✅ Kullanıcı zaten abone! Yönlendiriliyor...");
                    navigation.reset({ index: 0, routes: [{ name: "RoulettePredictor" }] });
                } else {
                    console.log("🚫 Kullanıcı abone değil.");
                }
            } catch (error) {
                console.error("❌ Abonelik kontrolü başarısız:", error);
                setIsSubscribed(false);
            } finally {
                setLoading(false);
            }
        };

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
            console.log("🛒 Abonelik satın alma işlemi başlatılıyor...");
            const products = await Qonversion.products();

            if (!products || !products[PRODUCT_ID]) {
                alert("⚠️ Abonelik paketi bulunamadı. Qonversion yapılandırmasını kontrol edin.");
                return;
            }

            console.log("📌 Mevcut Ürünler:", products);
            const productToBuy = products[PRODUCT_ID];

            const purchaseResult = await Qonversion.purchase(productToBuy.qonversionId);

            if (purchaseResult.entitlements["premium"] && purchaseResult.entitlements["premium"].isActive) {
                console.log("✅ Satın alma başarılı! Hemen yönlendiriliyor...");
                setIsSubscribed(true);
                navigation.reset({ index: 0, routes: [{ name: "RoulettePredictor" }] });
            } else {
                alert("⚠️ Abonelik etkinleştirilemedi.");
            }
        } catch (error) {
            console.error("❌ Satın alma hatası:", error);
            alert(`⚠️ Satın alma başarısız. Hata: ${error.message}`);
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

            {/* ✅ Debug için isSubscribed durumunu ekrana yazdırıyorum */}
            <Text style={{ color: "yellow", marginTop: 10 }}>Abonelik Durumu: {isSubscribed ? "Aktif" : "Pasif"}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "black", alignItems: "center", justifyContent: "center", padding: 20 },
    title: { fontSize: 25, fontWeight: "bold", color: "yellow", marginBottom: 20 },
    card: { backgroundColor: "#16202b", padding: 20, borderRadius: 15, width: "90%", alignItems: "flex-start" },
    price: { fontSize: 28, fontWeight: "bold", color: "yellow", textAlign: "left" },
    perMonth: { fontSize: 18, color: "white" },
    subscribeButton: { backgroundColor: "#FFCC00", paddingVertical: 15, paddingHorizontal: 50, borderRadius: 10, marginTop: 20 },
    subscribeText: { fontSize: 20, fontWeight: "bold", color: "black" },
});

export default PaywallScreen;
