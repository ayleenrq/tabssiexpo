import React, { useState, useRef } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Image,
    StyleSheet,
    Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Radius, Spacing } from '../constants/theme';

const BANKS = [
    { name: 'BCA Bank', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Bank_Central_Asia.svg/1200px-Bank_Central_Asia.svg.png' },
    { name: 'Mandiri Bank', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Bank_Mandiri_logo_2016.svg/1200px-Bank_Mandiri_logo_2016.svg.png' },
    { name: 'BNI Bank', logo: 'https://upload.wikimedia.org/wikipedia/id/thumb/5/55/BNI_logo.svg/1200px-BNI_logo.svg.png' },
];

function FieldLabel({ label }) {
    return <Text style={s.fieldLabel}>{label}</Text>;
}

function FieldInput({ placeholder, value, onChangeText, keyboardType, multiline, rows, suffix }) {
    return (
        <View style={[s.inputWrapper, multiline && { height: rows ? rows * 44 : 100, alignItems: 'flex-start' }]}>
            <TextInput
                style={[s.input, multiline && { textAlignVertical: 'top', paddingTop: 12 }]}
                placeholder={placeholder}
                placeholderTextColor={Colors.textLight}
                value={value}
                onChangeText={onChangeText}
                keyboardType={keyboardType || 'default'}
                multiline={multiline}
                numberOfLines={rows}
            />
            {suffix}
        </View>
    );
}

function ProgressBar({ step }) {
    const labels = ['Profile Information', 'ID Verification', 'Bank Account'];
    const stepLabels = ['Step 1/3', 'Step 2 of 3', 'Step 3 of 3'];
    return (
        <View style={s.progressWrap}>
            <View style={s.progressLabelRow}>
                <Text style={s.progressLabel}>{stepLabels[step]}</Text>
                <Text style={s.progressLabel}>{labels[step]}</Text>
            </View>
            <View style={s.progressBarRow}>
                {[0, 1, 2].map((i) => (
                    <View key={i} style={[s.progressSegment, { backgroundColor: i <= step ? Colors.primary : 'rgba(124,58,237,0.2)' }]} />
                ))}
            </View>
        </View>
    );
}

function Step1({ data, setData }) {
    const [gender, setGender] = useState('Male');
    return (
        <ScrollView contentContainerStyle={s.step} keyboardShouldPersistTaps="handled">
            <FieldLabel label="Full Name" />
            <FieldInput placeholder="Enter your full name" value={data.fullName} onChangeText={(v) => setData({ ...data, fullName: v })} />
            <FieldLabel label="Date of Birth" />
            <FieldInput placeholder="dd/mm/yyyy" value={data.dob} onChangeText={(v) => setData({ ...data, dob: v })}
                suffix={<Ionicons name="calendar-outline" size={20} color={Colors.primary} />} />
            <FieldLabel label="Gender" />
            <View style={s.genderRow}>
                {['Male', 'Female'].map((g) => (
                    <TouchableOpacity
                        key={g}
                        style={[s.genderBtn, data.gender === g && s.genderBtnActive]}
                        onPress={() => setData({ ...data, gender: g })}
                    >
                        <Text style={[s.genderText, data.gender === g && s.genderTextActive]}>{g}</Text>
                    </TouchableOpacity>
                ))}
            </View>
            <FieldLabel label="Phone Number" />
            <FieldInput placeholder="+1 (555) 000 - 0000" value={data.phone} onChangeText={(v) => setData({ ...data, phone: v })} keyboardType="phone-pad" />
            <FieldLabel label="Home Address" />
            <FieldInput placeholder="Enter Your address" value={data.address} onChangeText={(v) => setData({ ...data, address: v })} multiline rows={3} />
            <View style={{ height: 40 }} />
        </ScrollView>
    );
}

function Step2({ data, setData }) {
    return (
        <ScrollView contentContainerStyle={s.step} keyboardShouldPersistTaps="handled">
            <View style={s.card}>
                <Text style={s.cardTitle}>Upload Id Card<Text style={{ color: 'red' }}>*</Text></Text>
                <Text style={s.cardSub}>We need to verify your identity to activate your BNPL account</Text>

                {data.idUploaded ? (
                    <Image
                        source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/KTP_Indonesia.jpg/640px-KTP_Indonesia.jpg' }}
                        style={s.idPreview}
                    />
                ) : (
                    <View style={s.uploadPlaceholder}>
                        <View style={s.uploadIcon}>
                            <Ionicons name="cloud-upload-outline" size={24} color={Colors.textGray} />
                        </View>
                        <Text style={s.uploadTitle}>Upload your ID card</Text>
                        <Text style={s.uploadSub}>Supported formats: <Text style={{ fontWeight: 'bold', color: '#111' }}>PNG, JPG, PDF</Text></Text>
                        <Text style={s.uploadSub}>(Max <Text style={{ fontWeight: 'bold', color: '#111' }}>5MB</Text>)</Text>
                    </View>
                )}

                <View style={s.uploadBtnRow}>
                    {data.idUploaded && (
                        <TouchableOpacity style={s.deleteBtn} onPress={() => setData({ ...data, idUploaded: false })}>
                            <Ionicons name="trash-outline" size={20} color={Colors.red} />
                        </TouchableOpacity>
                    )}
                    {data.idUploaded ? (
                        <TouchableOpacity style={[s.uploadActionBtn, s.uploadActionBtnFilled]}>
                            <Text style={s.uploadActionBtnTextFilled}>Change Photo</Text>
                        </TouchableOpacity>
                    ) : (
                        <>
                            <TouchableOpacity style={[s.uploadActionBtn, s.uploadActionBtnOutline]}>
                                <Text style={s.uploadActionBtnText}>Take Photo</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[s.uploadActionBtn, s.uploadActionBtnFilled]} onPress={() => setData({ ...data, idUploaded: true })}>
                                <Text style={s.uploadActionBtnTextFilled}>Upload</Text>
                            </TouchableOpacity>
                        </>
                    )}
                </View>
            </View>

            <FieldLabel label="ID Number *" />
            <FieldInput placeholder="1234567890" value={data.idNumber} onChangeText={(v) => setData({ ...data, idNumber: v })} keyboardType="number-pad" />

            <Text style={s.tipLabel}>Important Tips:</Text>
            {['Make sure your ID is clear and readable', 'No glare or blur', 'Front side only', 'Accepted IDs: KTP, SIM, Passport'].map((tip) => (
                <View key={tip} style={s.tipRow}>
                    <Ionicons name={data.idUploaded ? 'checkmark-circle' : 'ellipse-outline'} size={16} color={data.idUploaded ? Colors.green : '#D1D5DB'} />
                    <Text style={s.tipText}>{tip}</Text>
                </View>
            ))}
            <View style={{ height: 40 }} />
        </ScrollView>
    );
}

function Step3({ data, setData }) {
    return (
        <ScrollView contentContainerStyle={s.step} keyboardShouldPersistTaps="handled">
            <View style={s.inputWrapper}>
                <Ionicons name="search" size={18} color={Colors.textGray} />
                <TextInput style={s.input} placeholder="Search your bank" placeholderTextColor={Colors.textLight} />
            </View>

            <View style={s.card}>
                <Text style={s.cardTitle}>Popular Banks</Text>
                {BANKS.map((bank) => (
                    <TouchableOpacity
                        key={bank.name}
                        style={[s.bankItem, data.selectedBank === bank.name && s.bankItemSelected]}
                        onPress={() => setData({ ...data, selectedBank: bank.name })}
                    >
                        <View style={s.bankLogoWrap}>
                            <Image source={{ uri: bank.logo }} style={s.bankLogo} resizeMode="contain" />
                        </View>
                        <Text style={s.bankName}>{bank.name}</Text>
                        {data.selectedBank === bank.name && (
                            <Ionicons name="checkmark-circle" size={20} color={Colors.green} />
                        )}
                    </TouchableOpacity>
                ))}
            </View>

            <View style={[s.card, { marginTop: 16 }]}>
                <Text style={s.cardSub}>Or enter details manually</Text>
                <FieldLabel label="Account Name *" />
                <FieldInput placeholder="Johnathan Smith" value={data.accountName} onChangeText={(v) => setData({ ...data, accountName: v })} />
                <FieldLabel label="Bank Account Number *" />
                <FieldInput placeholder="1234567890" value={data.accountNumber} onChangeText={(v) => setData({ ...data, accountNumber: v })} keyboardType="number-pad" />
            </View>

            <TouchableOpacity style={s.termsRow} onPress={() => setData({ ...data, confirm: !data.confirm })}>
                <View style={[s.checkbox, data.confirm && s.checkboxChecked]}>
                    {data.confirm && <Ionicons name="checkmark" size={14} color={Colors.white} />}
                </View>
                <Text style={s.termsText}>I confirm that this is my personal bank account</Text>
            </TouchableOpacity>
            <View style={{ height: 40 }} />
        </ScrollView>
    );
}

export default function VerifyIdentityScreen() {
    const [step, setStep] = useState(0);
    const [step1, setStep1] = useState({ fullName: '', dob: '', gender: 'Male', phone: '', address: '' });
    const [step2, setStep2] = useState({ idUploaded: false, idNumber: '' });
    const [step3, setStep3] = useState({ selectedBank: 'BCA Bank', accountName: '', accountNumber: '', confirm: false });

    const canContinue = [true, step2.idUploaded, step3.confirm][step];

    const onBack = () => {
        if (step > 0) setStep(step - 1);
        else router.back();
    };

    const onContinue = () => {
        if (step < 2) setStep(step + 1);
        else router.replace('/(tabs)');
    };

    const stepViews = [
        <Step1 data={step1} setData={setStep1} />,
        <Step2 data={step2} setData={setStep2} />,
        <Step3 data={step3} setData={setStep3} />,
    ];

    return (
        <SafeAreaView style={s.safe}>
            <View style={s.header}>
                <TouchableOpacity onPress={onBack}>
                    <Ionicons name="arrow-back" size={24} color="#111" />
                </TouchableOpacity>
            </View>
            <View style={s.topSection}>
                <Text style={s.heading}>Verify Your Identity</Text>
                <ProgressBar step={step} />
            </View>
            <View style={{ flex: 1 }}>
                {stepViews[step]}
            </View>
            <View style={s.bottomRow}>
                <TouchableOpacity style={s.backBtn} onPress={onBack}>
                    <Text style={s.backBtnText}>Back</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[s.continueBtn, !canContinue && s.continueBtnDisabled]}
                    onPress={canContinue ? onContinue : null}
                >
                    <Text style={[s.continueBtnText, !canContinue && s.continueBtnTextDisabled]}>
                        {step === 2 ? 'Finished' : 'Continue'}
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const s = StyleSheet.create({
    safe: { flex: 1, backgroundColor: Colors.white },
    header: { paddingHorizontal: Spacing.xxl, paddingTop: Spacing.lg },
    topSection: { paddingHorizontal: Spacing.xxl, paddingTop: Spacing.lg, paddingBottom: Spacing.lg },
    heading: { fontSize: 28, fontWeight: 'bold', letterSpacing: -0.5, marginBottom: Spacing.xxxl },
    progressWrap: { gap: 12 },
    progressLabelRow: { flexDirection: 'row', justifyContent: 'space-between' },
    progressLabel: { color: Colors.textGray, fontWeight: '600', fontSize: 16 },
    progressBarRow: { flexDirection: 'row', gap: 8 },
    progressSegment: { flex: 1, height: 6, borderRadius: 3 },
    step: { paddingHorizontal: Spacing.xxl },
    fieldLabel: { fontWeight: '600', fontSize: 16, marginBottom: Spacing.sm, marginTop: Spacing.xxl },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E5E7EB',
        borderRadius: Radius.md,
        paddingHorizontal: 16,
        marginBottom: Spacing.xs,
        gap: 8,
    },
    input: { flex: 1, paddingVertical: 16, fontSize: 16 },
    genderRow: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#E5E7EB',
        borderRadius: Radius.md,
        overflow: 'hidden',
        marginBottom: Spacing.xs,
    },
    genderBtn: { flex: 1, paddingVertical: 16, alignItems: 'center' },
    genderBtnActive: { backgroundColor: Colors.almostBlack },
    genderText: { fontWeight: '600', color: Colors.textGray },
    genderTextActive: { color: Colors.white },
    card: {
        backgroundColor: Colors.white,
        borderRadius: Radius.lg,
        borderWidth: 1,
        borderColor: '#F3F4F6',
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.02,
        shadowRadius: 8,
        elevation: 1,
    },
    cardTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 8 },
    cardSub: { color: Colors.textGray, fontSize: 13, marginBottom: Spacing.xxl },
    uploadPlaceholder: {
        height: 180,
        backgroundColor: '#F9FAFB',
        borderRadius: Radius.md,
        borderWidth: 1,
        borderColor: '#E5E7EB',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        marginBottom: Spacing.xxl,
    },
    uploadIcon: {
        backgroundColor: Colors.white,
        borderRadius: 8,
        padding: 8,
    },
    uploadTitle: { fontWeight: 'bold', fontSize: 16 },
    uploadSub: { color: Colors.textGray, fontSize: 13 },
    idPreview: { width: '100%', height: 180, borderRadius: Radius.md, marginBottom: Spacing.xxl },
    uploadBtnRow: { flexDirection: 'row', gap: 12 },
    deleteBtn: {
        borderWidth: 1,
        borderColor: '#FEE2E2',
        borderRadius: Radius.md,
        width: 44,
        alignItems: 'center',
        justifyContent: 'center',
    },
    uploadActionBtn: { flex: 1, paddingVertical: 14, borderRadius: Radius.md, alignItems: 'center' },
    uploadActionBtnOutline: { borderWidth: 1, borderColor: '#E5E7EB' },
    uploadActionBtnFilled: { backgroundColor: Colors.almostBlack },
    uploadActionBtnText: { color: '#111', fontWeight: 'bold' },
    uploadActionBtnTextFilled: { color: Colors.white, fontWeight: 'bold' },
    tipLabel: { color: Colors.textGray, fontSize: 14, marginBottom: 12 },
    tipRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 8 },
    tipText: { color: Colors.textGray, fontSize: 14 },
    bankItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        borderRadius: Radius.md,
        borderWidth: 1,
        borderColor: '#F3F4F6',
        padding: 12,
        marginBottom: 12,
    },
    bankItemSelected: { borderColor: 'rgba(124,58,237,0.5)' },
    bankLogoWrap: { width: 48, height: 32, backgroundColor: '#F9FAFB', borderRadius: 4, alignItems: 'center', justifyContent: 'center', padding: 4 },
    bankLogo: { width: 40, height: 24 },
    bankName: { flex: 1, fontWeight: '600' },
    termsRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: Spacing.xxl },
    checkbox: { width: 20, height: 20, borderRadius: 4, borderWidth: 2, borderColor: '#D1D5DB', alignItems: 'center', justifyContent: 'center' },
    checkboxChecked: { backgroundColor: Colors.almostBlack, borderColor: Colors.almostBlack },
    termsText: { flex: 1, fontSize: 13, color: '#111' },
    bottomRow: {
        flexDirection: 'row',
        paddingHorizontal: Spacing.xxl,
        paddingVertical: Spacing.lg,
        gap: 16,
        borderTopWidth: 1,
        borderTopColor: '#F3F4F6',
    },
    backBtn: { flex: 1, borderWidth: 1, borderColor: '#E5E7EB', borderRadius: Radius.md, paddingVertical: 16, alignItems: 'center' },
    backBtnText: { fontWeight: 'bold', color: '#111' },
    continueBtn: { flex: 1, backgroundColor: Colors.almostBlack, borderRadius: Radius.md, paddingVertical: 16, alignItems: 'center' },
    continueBtnDisabled: { backgroundColor: '#F3F4F6' },
    continueBtnText: { fontWeight: 'bold', color: Colors.white },
    continueBtnTextDisabled: { color: '#D1D5DB' },
});
