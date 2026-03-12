import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Colors, Radius, Spacing } from '../constants/theme';

const BANKS = [
    { id: 'bca', name: 'BCA Bank', text: 'BCA', color: '#005CAB' },
    { id: 'mandiri', name: 'Mandiri Bank', text: 'mandiri', color: '#E5A024' },
    { id: 'bni', name: 'BNI Bank', text: 'BNI', color: '#F05529' },
];

function BankLogo({ text, color }) {
    return (
        <View style={s.logoWrapper}>
            <Text style={[s.logoText, { color }]}>{text}</Text>
        </View>
    );
}

export default function AddBankScreen() {
    const [selectedBank, setSelectedBank] = useState(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    
    const [accountName, setAccountName] = useState('');
    const [accountNumber, setAccountNumber] = useState('');
    
    const [isPrimary, setIsPrimary] = useState(false);
    const [hasAgreed, setHasAgreed] = useState(false);

    // Simple validation per image states: when Bank is set, Name is set, Number is set -> Button is active
    const isValid = selectedBank !== null && accountName.trim().length > 0 && accountNumber.trim().length > 0;

    const handleSave = () => {
        if (!isValid) return;
        router.back();
    };

    return (
        <SafeAreaView style={s.safe}>
            <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
                
                {/* Header */}
                <View style={s.header}>
                    <TouchableOpacity style={s.iconBtn} onPress={() => router.back()}>
                        <Ionicons name="arrow-back" size={22} color="#111" />
                    </TouchableOpacity>
                    <Text style={s.headerTitle}>Add Bank Account</Text>
                    <View style={{ width: 40 }} />
                </View>

                <ScrollView 
                    showsVerticalScrollIndicator={false} 
                    contentContainerStyle={s.scroll}
                    // For dismiss dropdown if tapping outside, though standard scroll view won't block it
                    keyboardShouldPersistTaps="handled"
                >
                    
                    {/* Form Card */}
                    <View style={[s.card, { zIndex: 10 }]}>
                        
                        {/* Bank Name */}
                        <View style={[s.inputGroup, { zIndex: 10 }]}>
                            <Text style={s.label}>Bank Name <Text style={s.asterisk}>*</Text></Text>
                            
                            {!selectedBank ? (
                                <TouchableOpacity 
                                    style={s.inputBox} 
                                    onPress={() => setIsDropdownOpen(!isDropdownOpen)}
                                    activeOpacity={0.7}
                                >
                                    <Text style={s.placeholderText}>Select your bank</Text>
                                    <Ionicons name="chevron-down" size={20} color={Colors.textGray} />
                                </TouchableOpacity>
                            ) : (
                                <TouchableOpacity 
                                    style={s.selectedBankBox} 
                                    onPress={() => setIsDropdownOpen(!isDropdownOpen)}
                                    activeOpacity={0.7}
                                >
                                    <View style={s.rowBasic}>
                                        <BankLogo text={selectedBank.text} color={selectedBank.color} />
                                        <Text style={s.selectedBankName}>{selectedBank.name}</Text>
                                    </View>
                                    <Ionicons name="checkmark-circle" size={20} color="#10B981" />
                                </TouchableOpacity>
                            )}

                            {/* Dropdown Menu */}
                            {isDropdownOpen && (
                                <View style={s.dropdownContainer}>
                                    {BANKS.map((bank) => {
                                        const isSelected = selectedBank?.id === bank.id;
                                        return (
                                            <TouchableOpacity 
                                                key={bank.id} 
                                                style={[s.dropdownItem, isSelected && s.dropdownItemSelected]}
                                                onPress={() => {
                                                    setSelectedBank(bank);
                                                    setIsDropdownOpen(false);
                                                }}
                                            >
                                                <View style={s.rowBasic}>
                                                    <BankLogo text={bank.text} color={bank.color} />
                                                    <Text style={s.dropdownItemText}>{bank.name}</Text>
                                                </View>
                                                {isSelected && (
                                                    <Ionicons name="checkmark-circle" size={20} color="#10B981" />
                                                )}
                                            </TouchableOpacity>
                                        )
                                    })}
                                </View>
                            )}
                        </View>

                        {/* Account Name */}
                        <View style={[s.inputGroup, { zIndex: 1 }]}>
                            <Text style={s.label}>Account Name <Text style={s.asterisk}>*</Text></Text>
                            <TextInput
                                style={s.input}
                                placeholder="Enter account number"
                                placeholderTextColor={Colors.textLight}
                                value={accountName}
                                onChangeText={setAccountName}
                            />
                        </View>

                        {/* Account Number */}
                        <View style={[s.inputGroup, { zIndex: 1 }]}>
                            <Text style={s.label}>Account Number <Text style={s.asterisk}>*</Text></Text>
                            <TextInput
                                style={s.input}
                                placeholder="Enter account number"
                                placeholderTextColor={Colors.textLight}
                                keyboardType="number-pad"
                                value={accountNumber}
                                onChangeText={setAccountNumber}
                            />
                        </View>

                        {/* Set as Primary Checkbox */}
                        <View style={[s.checkboxRow, { marginBottom: 0 }]}>
                            <TouchableOpacity style={s.checkboxBtn} onPress={() => setIsPrimary(!isPrimary)} activeOpacity={0.8}>
                                <View style={[s.checkbox, isPrimary && s.checkboxChecked]}>
                                    {isPrimary && <Ionicons name="checkmark" size={14} color="#fff" />}
                                </View>
                                <Text style={s.checkboxText}>Set as primary account</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Agreement Card */}
                    <View style={s.card}>
                        <TouchableOpacity style={s.checkboxBtnTop} onPress={() => setHasAgreed(!hasAgreed)} activeOpacity={0.8}>
                            <View style={[s.checkbox, hasAgreed && s.checkboxChecked, { marginTop: 2 }]}>
                                {hasAgreed && <Ionicons name="checkmark" size={14} color="#fff" />}
                            </View>
                            <Text style={s.agreementText}>
                                By adding your bank account, you agree to our terms and conditions regarding account linking and automatic payments.
                            </Text>
                        </TouchableOpacity>
                    </View>

                    {/* Button */}
                    <TouchableOpacity 
                        style={[s.saveBtn, isValid && s.saveBtnActive]} 
                        onPress={handleSave}
                        disabled={!isValid}
                        activeOpacity={0.8}
                    >
                        <Text style={[s.saveBtnText, isValid && s.saveBtnTextActive]}>Add Bank Account</Text>
                    </TouchableOpacity>

                </ScrollView>
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
        borderRadius: Radius.full,
        backgroundColor: Colors.white,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#111' },
    
    scroll: { paddingHorizontal: Spacing.xl, paddingBottom: 40, paddingTop: 10 },

    card: {
        backgroundColor: Colors.white,
        borderRadius: Radius.lg,
        padding: Spacing.xl,
        marginBottom: Spacing.lg,
    },

    inputGroup: { marginBottom: Spacing.lg },
    label: { fontSize: 14, fontWeight: 'bold', color: '#111', marginBottom: 8 },
    asterisk: { color: Colors.red },
    
    inputBox: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: Colors.white,
        borderRadius: Radius.md,
        paddingHorizontal: 16,
        paddingVertical: 14,
        borderWidth: 1,
        borderColor: '#F3F4F6',
    },
    placeholderText: {
        fontSize: 14,
        color: Colors.textLight,
    },
    
    selectedBankBox: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#F9FAFB', // Light gray 
        borderRadius: Radius.md,
        paddingHorizontal: 16,
        paddingVertical: 10,
    },
    selectedBankName: {
        fontSize: 15,
        fontWeight: '500',
        color: '#111',
    },

    rowBasic: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    
    // Dropdown
    dropdownContainer: {
        position: 'absolute',
        top: 80, // Space below Bank Name title + input box
        left: 0,
        right: 0,
        backgroundColor: Colors.white,
        borderRadius: Radius.md,
        padding: 8,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 10,
        elevation: 6,
    },
    dropdownItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
        borderRadius: Radius.sm,
        marginBottom: 2,
    },
    dropdownItemSelected: {
        backgroundColor: '#F9FAFB',
    },
    dropdownItemText: {
        fontSize: 15,
        fontWeight: '500',
        color: '#111',
    },

    logoWrapper: {
        width: 36,
        height: 36,
        borderRadius: Radius.sm,
        borderWidth: 1,
        borderColor: '#F3F4F6',
        backgroundColor: Colors.white,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    logoText: {
        fontSize: 10,
        fontWeight: 'bold',
        fontStyle: 'italic',
    },

    input: {
        backgroundColor: Colors.white,
        borderRadius: Radius.md,
        paddingHorizontal: 16,
        paddingVertical: 14,
        fontSize: 14,
        color: '#111',
        borderWidth: 1,
        borderColor: '#F3F4F6',
    },

    // Checkbox
    checkboxRow: { marginBottom: Spacing.lg },
    checkboxBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    checkboxBtnTop: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 12,
    },
    checkbox: {
        width: 20,
        height: 20,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#D1D5DB',
        alignItems: 'center',
        justifyContent: 'center',
    },
    checkboxChecked: {
        backgroundColor: '#111',
        borderColor: '#111',
    },
    checkboxText: {
        fontSize: 14,
        color: '#111',
        fontWeight: '500',
    },
    agreementText: {
        flex: 1,
        fontSize: 13,
        color: Colors.textGray,
        lineHeight: 20,
    },

    // Button
    saveBtn: {
        backgroundColor: '#F3F4F6',
        paddingVertical: 18,
        borderRadius: Radius.md,
        alignItems: 'center',
        marginTop: Spacing.sm,
    },
    saveBtnActive: {
        backgroundColor: '#111',
    },
    saveBtnText: { 
        color: '#D1D5DB', 
        fontSize: 16, 
        fontWeight: 'bold' 
    },
    saveBtnTextActive: {
        color: Colors.white,
    },
});
