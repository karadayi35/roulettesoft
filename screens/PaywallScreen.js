import React, { useEffect } from 'react';
import { View, Text } from 'react-native';

const PaywallScreen = ({ navigation }) => {
    useEffect(() => {
        setTimeout(() => {
            navigation.replace("Roulette"); // Zorla yönlendir
        }, 1000); // 1 saniye sonra geçiş yap
    }, []);

    return (
        <View>
            <Text>Loading...</Text>
        </View>
    );
};

export default PaywallScreen;
