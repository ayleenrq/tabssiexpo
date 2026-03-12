import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Radius, Spacing } from '../constants/theme';

function InputField({ label, placeholder, value, onChangeText, secureTextEntry, keyboardType, showToggle, onToggle, showEye }) {
    return (
        <View style={s.fieldWrap}>
            <Text style={s.label}>{label}</Text>
            <View style={s.inputWrapper}>
                <TextInput
                    style={s.inputInner}
                    placeholder={placeholder}
                    placeholderTextColor={Colors.textLight}
                    value={value}
                    onChangeText={onChangeText}
                    secureTextEntry={secureTextEntry}
                    keyboardType={keyboardType || 'default'}
                    autoCapitalize="none"
                />
                {showToggle && (
                    <TouchableOpacity onPress={onToggle}>
                        <Ionicons name={showEye ? 'eye' : 'eye-outline'} size={20} color={Colors.textGray} />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
}

export default function RegisterScreen() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPass, setShowPass] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [agreeTerms, setAgreeTerms] = useState(false);

    const onCreateAccount = () => {
        router.push('/verify-identity');
    };

    return (
        <SafeAreaView style={s.safe}>
            <ScrollView contentContainerStyle={s.container} keyboardShouldPersistTaps="handled">
                <Text style={s.heading}>Register</Text>
                <Text style={s.sub}>Join us! Fill in your details to create an account!</Text>

                <InputField label="Username*" placeholder="Enter Username" value={username} onChangeText={setUsername} />
                <InputField label="Email Address*" placeholder="Enter your email address" value={email} onChangeText={setEmail} keyboardType="email-address" />
                <InputField label="Phone Number*" placeholder="Enter your phone number" value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
                <InputField
                    label="Password*"
                    placeholder="Enter your password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPass}
                    showToggle
                    showEye={showPass}
                    onToggle={() => setShowPass(!showPass)}
                />
                <InputField
                    label="Confirm Password*"
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    secureTextEntry={!showConfirm}
                    showToggle
                    showEye={showConfirm}
                    onToggle={() => setShowConfirm(!showConfirm)}
                />

                {/* Terms */}
                <TouchableOpacity style={s.termsRow} onPress={() => setAgreeTerms(!agreeTerms)}>
                    <View style={[s.checkbox, agreeTerms && s.checkboxChecked]}>
                        {agreeTerms && <Ionicons name="checkmark" size={14} color={Colors.white} />}
                    </View>
                    <Text style={s.termsText}>I Agree to the term condition & Privacy Policy</Text>
                </TouchableOpacity>

                {/* Create Account */}
                <TouchableOpacity
                    style={[s.primaryBtn, !agreeTerms && s.primaryBtnDisabled]}
                    onPress={agreeTerms ? onCreateAccount : null}
                >
                    <Text style={[s.primaryBtnText, !agreeTerms && s.primaryBtnTextDisabled]}>
                        Create Account
                    </Text>
                </TouchableOpacity>

                {/* Divider */}
                <View style={s.dividerRow}>
                    <View style={s.divider} />
                    <Text style={s.dividerText}>Or</Text>
                    <View style={s.divider} />
                </View>

                {/* Social */}
                <View style={s.socialRow}>
                    <TouchableOpacity style={s.socialBtn}>
                        <Ionicons name="logo-google" size={22} color="#4285F4" />
                        <Text style={s.socialText}>Google</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={s.socialBtn}>
                        <Ionicons name="logo-apple" size={22} color="#000" />
                        <Text style={s.socialText}>Apple</Text>
                    </TouchableOpacity>
                </View>

                {/* Sign In */}
                <View style={s.signinRow}>
                    <Text style={s.signinText}>Already Have Account? </Text>
                    <TouchableOpacity onPress={() => router.replace('/login')}>
                        <Text style={s.signinLink}>Sign In</Text>
                    </TouchableOpacity>
                </View>

                {/* Footer */}
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
    container: { paddingHorizontal: Spacing.xxl, paddingTop: 40, paddingBottom: 40 },
    heading: { fontSize: 32, fontWeight: 'bold', letterSpacing: -0.5, marginBottom: 12 },
    sub: { fontSize: 16, color: Colors.textGray, marginBottom: 40 },
    fieldWrap: { marginBottom: Spacing.xxl },
    label: { fontWeight: '600', fontSize: 16, marginBottom: Spacing.sm },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E5E7EB',
        borderRadius: Radius.md,
        paddingHorizontal: 16,
    },
    inputInner: { flex: 1, paddingVertical: 16, fontSize: 16 },
    termsRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: Spacing.xxxl },
    checkbox: {
        width: 20,
        height: 20,
        borderRadius: 4,
        borderWidth: 2,
        borderColor: '#D1D5DB',
        alignItems: 'center',
        justifyContent: 'center',
    },
    checkboxChecked: { backgroundColor: Colors.almostBlack, borderColor: Colors.almostBlack },
    termsText: { flex: 1, color: Colors.textGray, fontSize: 14 },
    primaryBtn: {
        backgroundColor: Colors.almostBlack,
        borderRadius: Radius.md,
        paddingVertical: 16,
        alignItems: 'center',
        marginBottom: Spacing.huge,
    },
    primaryBtnDisabled: { backgroundColor: '#E5E7EB' },
    primaryBtnText: { color: Colors.white, fontSize: 16, fontWeight: 'bold' },
    primaryBtnTextDisabled: { color: '#9CA3AF' },
    dividerRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.lg, marginBottom: 40 },
    divider: { flex: 1, height: 1, backgroundColor: '#E5E7EB' },
    dividerText: { color: Colors.textGray },
    socialRow: { flexDirection: 'row', gap: Spacing.lg, marginBottom: Spacing.xxxl },
    socialBtn: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: Spacing.sm,
        borderWidth: 1,
        borderColor: '#E5E7EB',
        borderRadius: Radius.md,
        paddingVertical: 12,
    },
    socialText: { color: '#111', fontWeight: '500' },
    signinRow: { flexDirection: 'row', justifyContent: 'center', marginBottom: 60 },
    signinText: { color: Colors.textGray, fontSize: 14 },
    signinLink: { color: Colors.primary, fontWeight: 'bold', fontSize: 14 },
    footer: { alignItems: 'center' },
    footerText: { color: Colors.textGray, fontSize: 12 },
    footerLinks: { flexDirection: 'row', marginTop: 4 },
    footerLink: { color: Colors.textGray, fontSize: 12, textDecorationLine: 'underline' },
});
