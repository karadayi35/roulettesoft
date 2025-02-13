import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Modal, StatusBar } from 'react-native';

const RoulettePredictor = () => {
    const [lastNumber, setLastNumber] = useState('');
    const [predictions, setPredictions] = useState([]);
    const [lastNumbersList, setLastNumbersList] = useState([]); 
    const [initialEntries, setInitialEntries] = useState(0);
    const [showHowToPlay, setShowHowToPlay] = useState(false);

    // ✅ **Status Bar ve Tam Ekran Yönetimi**
    useEffect(() => {
        StatusBar.setTranslucent(true);
        StatusBar.setBackgroundColor("transparent");
        StatusBar.setBarStyle("light-content"); // Eğer koyu tema kullanıyorsanız "dark-content" olarak değiştirin
    }, []);

    const generatePredictions = () => {
        const number = parseInt(lastNumber);
        if (isNaN(number) || number < 0 || number > 36) {
            alert('Please enter a number between 0 and 36.');
            return;
        }

        let newPredictions = [];
        while (newPredictions.length < 3) {
            let randomNum = Math.floor(Math.random() * 37);
            if (!newPredictions.includes(randomNum) && randomNum !== number) {
                newPredictions.push(randomNum);
            }
        }

        setLastNumbersList([number, ...lastNumbersList]); 
        setLastNumber(''); 
        setInitialEntries(prev => prev + 1);
        if (initialEntries >= 4) { 
            setPredictions(newPredictions);
        }
    };

    const clearAll = () => {
        setLastNumbersList([]);
        setPredictions([]);
        setLastNumber('');
        setInitialEntries(0);
    };

    const deleteLastNumber = () => {
        setLastNumbersList(lastNumbersList.slice(1));
    };

    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image source={require('./assets/table1.png')} style={styles.tableImage} />
                <View style={styles.lastNumbersBox}>
                    {lastNumbersList.map((num, index) => (
                        <Text key={index} style={styles.lastNumberText}>{num}</Text>
                    ))}
                </View>
            </View>

            <View style={styles.predictionContainer}>
                {predictions.map((num, index) => (
                    <View key={index} style={[styles.greenCircle, getPredictionPosition(num)]} />
                ))}
            </View>

            <TextInput
                style={styles.input}
                placeholder=''
                keyboardType="numeric"
                value={lastNumber}
                onChangeText={setLastNumber}
            />

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={generatePredictions}>
                    <Text style={styles.buttonText}>Add</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={clearAll}>
                    <Text style={styles.buttonText}>Clear</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={deleteLastNumber}>
                    <Text style={styles.buttonText}>Delete</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.infoIcon} onPress={() => setShowHowToPlay(true)}>
                <Text style={styles.infoText}>ℹ️</Text>
            </TouchableOpacity>

            <Modal visible={showHowToPlay} transparent={true} animationType="slide">
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitle}>How to Play?</Text>
                        <Text style={styles.modalText}>Enter the last number and press the "Add" button.</Text>
                        <Text style={styles.modalText}>Yellow circles indicate predicted numbers.</Text>
                        <Text style={styles.modalText}>Press "Clear" to remove all entries.</Text>
                        <Text style={styles.modalText}>Tap "Delete" to remove the last entered number.</Text>
                        <TouchableOpacity style={styles.closeButton} onPress={() => setShowHowToPlay(false)}>
                            <Text style={styles.closeButtonText}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const getPredictionPosition = (number) => {
    const basePositions = [
        { top: 34, left: 165 }, { top: 70, left: 125 }, { top: 70, left: 167 }, { top: 70, left: 210 },
        { top: 115, left: 125 }, { top: 115, left: 167 }, { top: 115, left: 210 }, { top: 160, left: 125 },
        { top: 160, left: 167 }, { top: 167, left: 210 }, { top: 200, left: 125 }, { top: 200, left: 167 },
        { top: 200, left: 210 }, { top: 245, left: 125 }, { top: 245, left: 167 }, { top: 245, left: 210 },
        { top: 285, left: 125 }, { top: 285, left: 167 }, { top: 285, left: 210 }, { top: 330, left: 125 },
        { top: 330, left: 167 }, { top: 330, left: 210 }, { top: 375, left: 125 }, { top: 375, left: 167 },
        { top: 375, left: 210 }, { top: 415, left: 125 }, { top: 415, left: 167 }, { top: 415, left: 210 }
    ];
    return basePositions[number] || { top: 0, left: 0 };
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#24272c', alignItems: 'center', paddingTop: 20 },
  infoIcon: { position: 'absolute', bottom: 90, left: '50%', transform: [{ translateX: -25 }], backgroundColor: '#FFCC00', padding: 12, borderRadius: 50, elevation: 5 },  
  infoText: { fontSize: 24, color: 'black', fontWeight: 'bold' },  
  imageContainer: {top: 70, flexDirection: 'row', alignItems: 'center',marginLeft: -80 },
  tableImage: { width: 400, height: 600, resizeMode: 'contain' },
  lastNumbersBox: { backgroundColor: '#141414', padding: 10, top: 10, borderRadius: 5, marginLeft: -80, width: 60, height:550, alignItems: 'center' },
  lastNumberText: { fontSize: 20, color: 'yellow', textAlign: 'center',fontWeight:'bold' },
  input: { fontWeight:'bold', top: -600, width: 100, height: 40, backgroundColor: 'white', textAlign: 'center', fontSize: 19, marginTop: 20 }
});

export default RoulettePredictor;
