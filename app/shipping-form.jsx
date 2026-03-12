import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    TextInput,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Colors, Radius, Spacing } from '../constants/theme';

export default function ShippingFormScreen() {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [address1, setAddress1] = useState('');
    const [address2, setAddress2] = useState('');
    const [city, setCity] = useState('');
    const [zipcode, setZipcode] = useState('');
    const [notes, setNotes] = useState('');

    const handleSave = () => {
        // In a real app we'd save to state or backend.
        // For UI slicing, we simply go back.
        router.push('/shipping-addresses');
    };

    return (
        <SafeAreaView style={s.safe}>
            <KeyboardAvoidingView 
                style={{ flex: 1 }} 
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            >
                {/* Header */}
                <View style={s.header}>
                    <TouchableOpacity style={s.iconBtn} onPress={() => router.back()}>
                        <Ionicons name="arrow-back" size={22} color="#111" />
                    </TouchableOpacity>
                    <Text style={s.headerTitle}>Shipping Information</Text>
                    <View style={{ width: 40 }} />
                </View>

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={s.scroll}>
                    
                    {/* Full Name */}
                    <View style={s.inputGroup}>
                        <Text style={s.label}>Full Name<Text style={s.asterisk}>*</Text></Text>
                        <TextInput
                            style={s.input}
                            placeholder="Enter your full name"
                            placeholderTextColor={Colors.textLight}
                            value={name}
                            onChangeText={setName}
                        />
                    </View>

                    {/* Phone Number */}
                    <View style={s.inputGroup}>
                        <Text style={s.label}>Phone Number<Text style={s.asterisk}>*</Text></Text>
                        <TextInput
                            style={s.input}
                            placeholder="Enter your phone number"
                            placeholderTextColor={Colors.textLight}
                            keyboardType="phone-pad"
                            value={phone}
                            onChangeText={setPhone}
                        />
                    </View>

                    {/* Detail Address */}
                    <View style={s.inputGroup}>
                        <Text style={s.label}>Detail Address<Text style={s.asteriskLight}>*</Text></Text>
                        <TextInput
                            style={[s.input, { marginBottom: 12 }]}
                            placeholder="Address Line"
                            placeholderTextColor={Colors.textLight}
                            value={address1}
                            onChangeText={setAddress1}
                        />
                        <TextInput
                            style={[s.input, { marginBottom: 12 }]}
                            placeholder="Address Line"
                            placeholderTextColor={Colors.textLight}
                            value={address2}
                            onChangeText={setAddress2}
                        />
                        <View style={s.row}>
                            <View style={s.flex1}>
                                <TextInput
                                    style={s.input}
                                    placeholder="City"
                                    placeholderTextColor={Colors.textLight}
                                    value={city}
                                    onChangeText={setCity}
                                />
                            </View>
                            <View style={s.flex1}>
                                <TextInput
                                    style={s.input}
                                    placeholder="ZIP"
                                    placeholderTextColor={Colors.textLight}
                                    value={zipcode}
                                    onChangeText={setZipcode}
                                    keyboardType="number-pad"
                                />
                            </View>
                        </View>
                    </View>

                    {/* Delivery Notes */}
                    <View style={s.inputGroup}>
                        <Text style={s.label}>Delivery Notes (Optional)</Text>
                        {/* Note: Matching the placeholder typo from design exactly "Enter Your Noter" or fixing it depends on instructions, fixing to "Notes" for clarity, or leave "Noter" if strictly slicing. I'll fix the typo but structure identically */}
                        <TextInput
                            style={[s.input, { minHeight: 80, textAlignVertical: 'top', paddingTop: 14 }]}
                            placeholder="Enter Your Notes"
                            placeholderTextColor={Colors.textLight}
                            multiline
                            numberOfLines={4}
                            value={notes}
                            onChangeText={setNotes}
                        />
                    </View>
                    
                    <View style={{ height: 20 }} />
                </ScrollView>

                {/* Bottom Bar */}
                <View style={s.bottomContainer}>
                    <TouchableOpacity style={s.saveBtn} onPress={handleSave}>
                        <Text style={s.saveBtnText}>Save</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const s = StyleSheet.create({
    safe: { flex: 1, backgroundColor: Colors.backgroundGray },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: Spacing.xl,
        paddingVertical: Spacing.md,
    },
    iconBtn: {
        width: 40,
        height: 40,
        borderRadius: Radius.sm,
        backgroundColor: Colors.white,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerTitle: { fontSize: 16, fontWeight: 'bold', color: '#111' },
    
    scroll: { paddingHorizontal: Spacing.xl, paddingBottom: 20, paddingTop: 10 },
    
    inputGroup: { marginBottom: Spacing.lg },
    label: { fontSize: 14, fontWeight: '600', color: '#222', marginBottom: 8 },
    asterisk: { color: '#000' }, // Bold dark asterisk for "Full Name" & "Phone Number" in the design
    asteriskLight: { color: Colors.red }, // Red asterisk for "Detail Address" in design
    
    input: {
        backgroundColor: Colors.white,
        borderRadius: Radius.md,
        paddingHorizontal: 16,
        paddingVertical: 14,
        fontSize: 14,
        color: '#111',
        borderWidth: 1,
        borderColor: '#E5E7EB', // Faint border found in typical forms
    },
    
    row: { flexDirection: 'row', gap: 12 },
    flex1: { flex: 1 },

    // Bottom
    bottomContainer: {
        backgroundColor: Colors.white,
        padding: Spacing.xl,
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 5,
    },
    saveBtn: {
        backgroundColor: Colors.almostBlack,
        paddingVertical: 16,
        borderRadius: Radius.md,
        alignItems: 'center',
    },
    saveBtnText: { color: Colors.white, fontSize: 16, fontWeight: 'bold' },
});
