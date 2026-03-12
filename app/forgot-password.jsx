import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Modal,
    ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Radius, Spacing } from '../constants/theme';

function OtpBottomSheet({ visible, email, onClose }) {
    const [code, setCode] = useState('');

    const onKeyPress = (val) => {
        if (val === 'del') {
            setCode((c) => c.slice(0, -1));
        } else if (code.length < 6) {
            const next = code + val;
            setCode(next);
            if (next.length === 6) {
                setTimeout(() => {
                    onClose();
                    router.push('/reset-password');
                }, 300);
            }
        }
    };

    const numKeys = [
        ['1', ''], ['2', 'ABC'], ['3', 'DEF'],
        ['4', 'GHI'], ['5', 'JKL'], ['6', 'MNO'],
        ['7', 'PQRS'], ['8', 'TUV'], ['9', 'WXYZ'],
        ['.', ''], ['0', ''], ['del', ''],
    ];

    return (
        <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
            <View style={m.overlay}>
                <View style={m.sheet}>
                    <Text style={m.title}>Enter the 6-digit Code</Text>
                    <Text style={m.sub}>
                        Your code was sent to{' '}
                        <Text style={{ color: Colors.primary }}>{email}</Text>
                    </Text>

                    {/* Digit boxes */}
                    <View style={m.digitRow}>
                        {Array.from({ length: 6 }).map((_, i) => (
                            <View key={i} style={m.digitBox}>
                                <Text style={m.digitText}>{i < code.length ? code[i] : ''}</Text>
                            </View>
                        ))}
                    </View>

                    <TouchableOpacity>
                        <Text style={m.resend}>
                            Didn't receive a code? <Text style={{ color: Colors.primary }}>Resend</Text>
                        </Text>
                    </TouchableOpacity>

                    {/* Numpad */}
                    <View style={m.numpad}>
                        {[0, 1, 2, 3].map((row) => (
                            <View key={row} style={m.numRow}>
                                {numKeys.slice(row * 3, row * 3 + 3).map(([digit, sub]) => (
                                    <TouchableOpacity
                                        key={digit}
                                        style={m.numKey}
                                        onPress={() => onKeyPress(digit)}
                                    >
                                        {digit === 'del' ? (
                                            <Ionicons name="backspace-outline" size={22} color="#111" />
                                        ) : digit === '.' ? (
                                            <Text style={m.numDigit}>·</Text>
                                        ) : (
                                            <>
                                                <Text style={m.numDigit}>{digit}</Text>
                                                {sub ? <Text style={m.numSub}>{sub}</Text> : null}
                                            </>
                                        )}
                                    </TouchableOpacity>
                                ))}
                            </View>
                        ))}
                    </View>
                </View>
            </View>
        </Modal>
    );
}

export default function ForgotPasswordScreen() {
    const [email, setEmail] = useState('');
    const [showOtp, setShowOtp] = useState(false);

    return (
        <SafeAreaView style={s.safe}>
            <View style={s.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={24} color="#111" />
                </TouchableOpacity>
                <Text style={s.headerTitle}>Forgot Password?</Text>
                <View style={{ width: 24 }} />
            </View>

            <View style={s.body}>
                <TextInput
                    style={s.input}
                    placeholder="Enter Your Email"
                    placeholderTextColor={Colors.textLight}
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
                <TouchableOpacity
                    style={s.btn}
                    onPress={() => email && setShowOtp(true)}
                >
                    <Text style={s.btnText}>Reset Password</Text>
                </TouchableOpacity>
            </View>

            <View style={s.footer}>
                <Text style={s.footerText}>By continuing, you agree to our</Text>
                <View style={s.footerLinks}>
                    <Text style={s.footerLink}>Terms</Text>
                    <Text style={s.footerText}> & </Text>
                    <Text style={s.footerLink}>Privacy Policy</Text>
                </View>
            </View>

            <OtpBottomSheet visible={showOtp} email={email} onClose={() => setShowOtp(false)} />
        </SafeAreaView>
    );
}

const s = StyleSheet.create({
    safe: { flex: 1, backgroundColor: Colors.white },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: Spacing.xxl,
        paddingVertical: Spacing.lg,
    },
    headerTitle: { fontSize: 18, fontWeight: 'bold' },
    body: { flex: 1, paddingHorizontal: Spacing.xxl, paddingTop: Spacing.xxl },
    input: {
        borderWidth: 1,
        borderColor: '#E5E7EB',
        borderRadius: Radius.md,
        paddingHorizontal: 16,
        paddingVertical: 16,
        fontSize: 16,
        marginBottom: Spacing.xxl,
    },
    btn: {
        backgroundColor: Colors.almostBlack,
        borderRadius: Radius.md,
        paddingVertical: 16,
        alignItems: 'center',
    },
    btnText: { color: Colors.white, fontSize: 16, fontWeight: 'bold' },
    footer: { alignItems: 'center', paddingBottom: 40 },
    footerText: { color: Colors.textGray, fontSize: 12 },
    footerLinks: { flexDirection: 'row', marginTop: 4 },
    footerLink: { color: Colors.textGray, fontSize: 12, textDecorationLine: 'underline' },
});

const m = StyleSheet.create({
    overlay: { flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.3)' },
    sheet: { backgroundColor: Colors.white, borderTopLeftRadius: 24, borderTopRightRadius: 24, paddingBottom: 0 },
    title: { fontSize: 18, fontWeight: 'bold', textAlign: 'center', paddingTop: 24, marginBottom: 8 },
    sub: { fontSize: 14, color: Colors.textGray, textAlign: 'center', marginBottom: Spacing.xxxl, paddingHorizontal: Spacing.xxl },
    digitRow: { flexDirection: 'row', justifyContent: 'center', gap: 8, marginBottom: Spacing.xxxl },
    digitBox: {
        width: 45,
        height: 55,
        backgroundColor: '#F3F4F6',
        borderRadius: Radius.sm,
        alignItems: 'center',
        justifyContent: 'center',
    },
    digitText: { fontSize: 24, fontWeight: 'bold' },
    resend: { textAlign: 'center', color: Colors.textGray, fontSize: 13, marginBottom: Spacing.xxxl },
    numpad: { backgroundColor: 'rgba(209,213,219,0.5)', paddingTop: 10, paddingBottom: 40 },
    numRow: { flexDirection: 'row', justifyContent: 'space-evenly', marginBottom: 8 },
    numKey: {
        width: 110,
        height: 50,
        backgroundColor: Colors.white,
        borderRadius: Radius.sm,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 1,
        elevation: 2,
    },
    numDigit: { fontSize: 22 },
    numSub: { fontSize: 10, fontWeight: 'bold', letterSpacing: 1.5 },
});
