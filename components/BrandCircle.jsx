import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../constants/theme';

export default function BrandCircle({ name }) {
    return (
        <View style={styles.circle}>
            <Text style={styles.text} numberOfLines={1}>
                {name}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    circle: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: Colors.white,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    text: {
        fontSize: 10,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#111',
        paddingHorizontal: 4,
    },
});
