import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import RoulettePredictor from './screens/RoulettePredictor';

const Stack = createStackNavigator();

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Redirect" component={RedirectScreen} />
                <Stack.Screen name="Roulette" component={RoulettePredictor} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

// ✅ **Geçici yönlendirme ekranı**
const RedirectScreen = ({ navigation }) => {
    useEffect(() => {
        setTimeout(() => {
            navigation.replace("Roulette");  // **Otomatik yönlendir**
        }, 1000); // **1 saniye bekleyip yönlendirme yap**
    }, []);

    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "black" }}>
            <Text style={{ color: "yellow", fontSize: 20 }}>Loading...</Text>
        </View>
    );
};

export default App;
