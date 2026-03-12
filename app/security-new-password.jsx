import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Radius, Spacing } from '../constants/theme';

function Requirement({ met, text }) {
    return (
        <View style={s.reqRow}>
            <Ionicons
                name="checkmark-circle"
                size={14}
                color={met ? Colors.green : '#D1D5DB'} // the green is used from Colors when met, else grey
            />
            <Text style={s.reqText}>{text}</Text>
        </View>
    );
}

export default function SecurityNewPasswordScreen() {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPass, setShowPass] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [confirmError, setConfirmError] = useState(null);

    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecial = /[!@#$%^&*_>?/~]/.test(password);
    const hasMinLength = password.length >= 8;

    const onChangePassword = () => {
        setConfirmError(null);
        if (password !== confirmPassword && confirmPassword.length > 0) {
            setConfirmError("Entered password isn't match");
            return;
        }
        
        // normally we would proceed if matching:
        if (password === confirmPassword && hasUppercase && hasLowercase && hasNumber && hasSpecial && hasMinLength) {
            // Success password change, go back to security settings
            router.back();
            router.back();
        }
    };

    return (
        <SafeAreaView style={s.safe}>
            <View style={s.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={24} color="#111" />
                </TouchableOpacity>
                <Text style={s.headerTitle}>Reset Password</Text>
                <View style={{ width: 24 }} />
            </View>

            <ScrollView contentContainerStyle={s.container} keyboardShouldPersistTaps="handled">
                <Text style={s.label}>New Password</Text>
                <View style={s.inputWrapper}>
                    <TextInput
                        style={s.inputInner}
                        placeholder="Enter New Password"
                        placeholderTextColor={Colors.textLight}
                        secureTextEntry={!showPass}
                        value={password}
                        onChangeText={(txt) => {
                            setPassword(txt);
                            if(confirmError) setConfirmError(null);
                        }}
                    />
                    <TouchableOpacity onPress={() => setShowPass(!showPass)}>
                        <Ionicons name={showPass ? 'eye' : 'eye-outline'} size={20} color={Colors.textGray} />
                    </TouchableOpacity>
                </View>

                <Text style={s.label}>Confirm Password</Text>
                <View style={[s.inputWrapper, confirmError && s.inputError, { marginBottom: Spacing.sm }]}>
                    <TextInput
                        style={s.inputInner}
                        placeholder="Confirm New Password"
                        placeholderTextColor={Colors.textLight}
                        secureTextEntry={!showConfirm}
                        value={confirmPassword}
                        onChangeText={(txt) => {
                            setConfirmPassword(txt);
                            setConfirmError(null);
                        }}
                    />
                    <TouchableOpacity onPress={() => setShowConfirm(!showConfirm)}>
                        <Ionicons name={showConfirm ? 'eye' : 'eye-outline'} size={20} color={Colors.textGray} />
                    </TouchableOpacity>
                </View>
                {confirmError ? (
                    <Text style={s.errorText}>{confirmError}</Text>
                ) : (
                    <View style={{ height: 16 }} />
                )}

                <TouchableOpacity style={s.btn} onPress={onChangePassword}>
                    <Text style={s.btnText}>Change Password</Text>
                </TouchableOpacity>

                <Text style={s.reqTitle}>Password must be at least 8 character and should include:</Text>
                <Requirement met={hasUppercase} text="1 uppercase Letter (A-Z)" />
                <Requirement met={hasLowercase} text="1 lowecase letter (a-z)" />
                <Requirement met={hasNumber} text="1 number (1-9)" />
                <Requirement met={hasSpecial} text="1 special character (!@#$%^&*_>?/~)" />

                <View style={s.footer}>
                    <Text style={s.footerText}>By continuing, you agree to our</Text>
                    <View style={s.footerLinks}>
                        <Text style={s.footerLink}>Terms</Text>
                        <Text style={s.footerText}> & </Text>
                        <Text style={s.footerLink}>Privacy Policy</Text>
                    </View>
                </View>
            </ScrollView>
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
    container: { paddingHorizontal: Spacing.xxl, paddingTop: Spacing.xl, paddingBottom: 40 },
    label: { fontWeight: '600', fontSize: 15, marginBottom: Spacing.sm },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E5E7EB',
        borderRadius: Radius.md,
        paddingHorizontal: 16,
        marginBottom: Spacing.lg,
    },
    inputError: { borderColor: Colors.red },
    inputInner: { flex: 1, paddingVertical: 14, fontSize: 15 },
    errorText: { color: Colors.red, fontSize: 12, marginBottom: Spacing.lg },
    btn: {
        backgroundColor: Colors.almostBlack,
        borderRadius: Radius.md,
        paddingVertical: 16,
        alignItems: 'center',
        marginBottom: Spacing.xxxl,
    },
    btnText: { color: Colors.white, fontSize: 16, fontWeight: 'bold' },
    reqTitle: { color: Colors.textGray, fontSize: 13, marginBottom: 16 },
    reqRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 10 },
    reqText: { color: Colors.textGray, fontSize: 13 },
    footer: { alignItems: 'center', marginTop: 80 },
    footerText: { color: Colors.textGray, fontSize: 12 },
    footerLinks: { flexDirection: 'row', marginTop: 4 },
    footerLink: { color: Colors.textGray, fontSize: 12, textDecorationLine: 'underline' },
});
