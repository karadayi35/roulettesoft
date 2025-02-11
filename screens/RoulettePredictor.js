import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Modal } from 'react-native';

const RoulettePredictor = () => {
    const [lastNumber, setLastNumber] = useState('');
    const [predictions, setPredictions] = useState([]);
    const [lastNumbersList, setLastNumbersList] = useState([]); // Girilen sayıları tutan state
    const [initialEntries, setInitialEntries] = useState(0);
    const [showHowToPlay, setShowHowToPlay] = useState(false);

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

        setLastNumbersList([number, ...lastNumbersList]); // Girilen sayıyı listeye ekle
        setLastNumber(''); // Input'u temizle
        setInitialEntries(prev => prev + 1);
        if (initialEntries >= 4) { // 5. girişten sonra tahminleri göster
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

            {/* How to Play Button */}
            <TouchableOpacity style={styles.infoIcon} onPress={() => setShowHowToPlay(true)}>
                <Text style={styles.infoText}>ℹ️</Text>
            </TouchableOpacity>

            {/* Modal */}
            <Modal visible={showHowToPlay} transparent={true} animationType="slide">
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitle}>How to Play?</Text>
                        <Text style={styles.modalText}>✅ Enter the last number and press the <Text style={styles.boldText}>"Add"</Text> button.</Text>
                        <Text style={styles.modalText}>✅ Yellow circles indicate predicted numbers.</Text>
                        <Text style={styles.modalText}>✅ Press <Text style={styles.boldText}>"Clear"</Text> to remove all entries.</Text>
                        <Text style={styles.modalText}>✅ Tap <Text style={styles.boldText}>"Delete"</Text> to remove the last entered number.</Text>

                        {/* Close Button */}
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
    const positions = {
        0: { top: 34, left: 165 },
        1: { top: 70, left: 125 },
        2: { top: 70, left: 167 },
        3: { top: 70, left: 210 },
        4: { top: 115, left: 125 },
        5: { top: 115, left: 167 },
        6: { top: 115, left: 210 },
        7: { top: 160, left: 125 },
        8: { top: 160, left: 167 },
        9: { top: 167, left: 210 },
        10: { top: 200, left: 125 },
        11: { top: 200, left: 167 },
        12: { top: 200, left: 210 },
        13: { top: 245, left: 125 },
        14: { top: 245, left: 167 },
        15: { top: 245, left: 210 },
        16: { top: 285, left: 125 },
        17: { top: 285, left: 167 },
        18: { top: 285, left: 210 },
        19: { top: 330, left: 125 },
        20: { top: 330, left: 167 },
        21: { top: 330, left: 210},
        22: { top: 375, left: 125 },
        23: { top: 375, left: 167 },
        24: { top: 375, left: 210 },
        25: { top: 415, left: 125 },
        26: { top: 415, left: 167 },
        27: { top: 415, left: 210 },
        28: { top: 460, left: 125 },
        29: { top: 460, left: 167 },
        30: { top: 460, left: 210 },
        31: { top: 500, left: 125 },
        32: { top: 500, left: 167 },
        33: { top: 500, left: 210 },
        34: { top: 545, left: 125 },
        35: { top: 545, left: 167 },
        36: { top: 545, left: 210 },
    };
    return positions[number] || { top: 0, left: 0 };
};



const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#24272c', alignItems: 'center', paddingTop: 20 },
  infoIcon: { position: 'absolute', bottom: 30, right: 20, backgroundColor: '#FFCC00', padding: 12, borderRadius: 50, elevation: 5 },
  infoText: { fontSize: 24, color: 'black', fontWeight: 'bold' },  imageContainer: {top: 70, flexDirection: 'row', alignItems: 'center',marginLeft: -80 },
  tableImage: { width: 400, height: 600, resizeMode: 'contain' },
  predictionContainer: { position: 'absolute', top: 73, left: 15 },
  greenCircle: { width: 9, height: 9, borderRadius: 10, backgroundColor: 'yellow', position: 'absolute', zIndex: 2 },
  lastNumbersBox: { backgroundColor: '#141414', padding: 10,top:10, borderRadius: 5, marginLeft: -80, width: 60, height:550, alignItems: 'center' },
  lastNumberText: { fontSize: 20, color: 'yellow', textAlign: 'center',fontWeight:'bold' },
  input: { fontWeight:'bold',top: -600,width: 100, height: 40, backgroundColor: 'white', textAlign: 'center', fontSize: 19, marginTop: 20 },
  buttonContainer: { top: 80,flexDirection: 'row', marginTop: 10 },
  button: { backgroundColor: '#141414', padding: 10, margin: 5 },
  buttonText: { color: 'yellow', fontWeight: 'bold' },
  modalContainer: { backgroundColor: 'white', padding: 25, borderRadius: 15, width: '85%', alignItems: 'center' },  modalContent: {  backgroundColor: 'white', padding: 20, borderRadius: 10, width: '80%', alignItems: 'center' },
  modalTitle: { fontSize: 22, fontWeight: 'bold', marginBottom: 15, color: 'black' },
  modalText: { fontSize: 16, fontWeight: '400', textAlign: 'center', marginBottom: 10 },
  closeButton: { backgroundColor: 'black', padding: 10, borderRadius: 5, marginTop: 10 }
});

export default RoulettePredictor;
