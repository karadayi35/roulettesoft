import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking } from 'react-native';

const PaywallScreen = ({ navigation }) => {
    const onSubscribe = () => {
        // Abonelik işlemi tamamlandığında RoulettePredictor sayfasına yönlendir
        navigation.replace("Roulette");
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
                
                <View style={styles.featureContainer}>
                    <Text style={styles.feature}>✔ Constant Updates</Text>
                    <Text style={styles.featureDescription}>
                    Regular updates ensure the app runs at peak performance with the latest features and improvements. 
                    Stay ahead of the game with cutting-edge technology and elevate your gaming experience to the next level!
                    </Text>
                </View>
                
                <Text style={styles.termsText}>
                    By subscribing, you agree to our 
                    <Text style={styles.link} onPress={() => Linking.openURL('https://play.google.com/about/play-terms/ ')}> EULA </Text>
                    and 
                    <Text style={styles.link} onPress={() => Linking.openURL('https://www.freeprivacypolicy.com/live/0f30a182-7554-4482-bd58-af362323c083')}> Privacy Policy</Text>.
                </Text>
            </View>
            
            <TouchableOpacity style={styles.subscribeButton} onPress={onSubscribe}>
                <Text style={styles.subscribeText}>Subscribe</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',  // Mor arka plan
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        color: 'yellow',
        marginBottom: 20,
    },
    card: {
        backgroundColor: '#16202b', // Açık mor kart
        padding: 20,
        borderRadius: 15,
        width: '90%',
        alignItems: 'flex-start',
    },
    price: {
        fontSize: 28,
        fontWeight: 'bold',
        color: 'yellow',
        textAlign: 'left',
    },
    perMonth: {
        fontSize: 18,
        color: 'white',
    },
    featureContainer: {
        marginTop: 15,
        width: '100%',
    },
    feature: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'yellow',
    },
    featureDescription: {
        fontSize: 14,
        color: 'white',
        textAlign: 'left',
        marginLeft: 25,  // Check işaretinden sonra hizalama için
    },
    termsText: {
        fontSize: 14,
        color: 'white',
        textAlign: 'center',
        marginTop: 20,
        width: '100%',
    },
    link: {
        color: 'yellow',
        fontWeight: 'bold',
    },
    subscribeButton: {
        backgroundColor: '#FFCC00', // Sarı buton
        paddingVertical: 15,
        paddingHorizontal: 50,
        borderRadius: 10,
        marginTop: 20,
    },
    subscribeText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
    },
});

export default PaywallScreen;
