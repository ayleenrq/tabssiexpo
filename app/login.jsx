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
import { router, Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Radius, Spacing } from '../constants/theme';

export default function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [emailError, setEmailError] = useState(null);
    const [passwordError, setPasswordError] = useState(null);

    const onContinue = () => {
        setEmailError(null);
        setPasswordError(null);

        let hasError = false;
        if (email === 'HelloAI@gmil.omo') {
            setEmailError('Wrong phone or email');
            hasError = true;
        } else if (!email) {
            setEmailError('Please enter your email');
            hasError = true;
        }
        if (!password) {
            setPasswordError('Wrong Password');
            hasError = true;
        }
        if (!hasError) {
            router.replace('/(tabs)');
        }
    };

    return (
        <SafeAreaView style={styles.safe}>
            <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
                <Text style={styles.heading}>Login</Text>
                <Text style={styles.sub}>Welcome back! Please log in to continue.</Text>

                {/* Email */}
                <Text style={styles.label}>Email / Phone</Text>
                <TextInput
                    style={[styles.input, emailError && styles.inputError]}
                    placeholder="Enter your email"
                    placeholderTextColor={Colors.textLight}
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
                {emailError && <Text style={styles.errorText}>*{emailError}</Text>}

                {/* Password */}
                <View style={styles.labelRow}>
                    <Text style={styles.label}>Password</Text>
                    <TouchableOpacity onPress={() => router.push('/forgot-password')}>
                        <Text style={styles.forgotText}>Forgot Password?</Text>
                    </TouchableOpacity>
                </View>
                <View style={[styles.inputWrapper, passwordError && styles.inputError]}>
                    <TextInput
                        style={styles.inputInner}
                        placeholder="Enter Password"
                        placeholderTextColor={Colors.textLight}
                        secureTextEntry={!showPassword}
                        value={password}
                        onChangeText={setPassword}
                    />
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                        <Ionicons
                            name={showPassword ? 'eye' : 'eye-outline'}
                            size={20}
                            color={Colors.textGray}
                        />
                    </TouchableOpacity>
                </View>
                {passwordError && <Text style={styles.errorText}>*{passwordError}</Text>}

                {/* Continue Button */}
                <TouchableOpacity style={styles.primaryBtn} onPress={onContinue}>
                    <Text style={styles.primaryBtnText}>Continue</Text>
                </TouchableOpacity>

                {/* Divider */}
                <View style={styles.dividerRow}>
                    <View style={styles.divider} />
                    <Text style={styles.dividerText}>Or</Text>
                    <View style={styles.divider} />
                </View>

                {/* Social */}
                <View style={styles.socialRow}>
                    <TouchableOpacity style={styles.socialBtn}>
                        <Ionicons name="logo-google" size={22} color="#4285F4" />
                        <Text style={styles.socialText}>Google</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.socialBtn}>
                        <Ionicons name="logo-apple" size={22} color="#000" />
                        <Text style={styles.socialText}>Apple</Text>
                    </TouchableOpacity>
                </View>

                {/* Sign Up */}
                <View style={styles.signupRow}>
                    <Text style={styles.signupText}>Don't have an account? </Text>
                    <TouchableOpacity onPress={() => router.push('/register')}>
                        <Text style={styles.signupLink}>Sign Up</Text>
                    </TouchableOpacity>
                </View>

                {/* Footer */}
                <View style={styles.footer}>
                    <Text style={styles.footerText}>By continuing, you agree to our</Text>
                    <View style={styles.footerLinks}>
                        <Text style={styles.footerLink}>Terms</Text>
                        <Text style={styles.footerText}> & </Text>
                        <Text style={styles.footerLink}>Privacy Policy</Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safe: { flex: 1, backgroundColor: Colors.white },
    container: { paddingHorizontal: Spacing.xxl, paddingTop: 40, paddingBottom: 40 },
    heading: { fontSize: 32, fontWeight: 'bold', letterSpacing: -0.5, marginBottom: 12 },
    sub: { fontSize: 16, color: Colors.textGray, marginBottom: Spacing.huge },
    label: { fontWeight: '600', fontSize: 16, marginBottom: Spacing.sm },
    labelRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: Spacing.sm,
    },
    forgotText: { color: Colors.textGray, fontSize: 14 },
    input: {
        borderWidth: 1,
        borderColor: '#E5E7EB',
        borderRadius: Radius.md,
        paddingHorizontal: 16,
        paddingVertical: 16,
        fontSize: 16,
        marginBottom: Spacing.xxl,
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E5E7EB',
        borderRadius: Radius.md,
        paddingHorizontal: 16,
        marginBottom: Spacing.xxl,
    },
    inputInner: { flex: 1, paddingVertical: 16, fontSize: 16 },
    inputError: { borderColor: Colors.red },
    errorText: { color: Colors.red, fontSize: 12, marginTop: -16, marginBottom: Spacing.lg },
    primaryBtn: {
        backgroundColor: Colors.almostBlack,
        borderRadius: Radius.md,
        paddingVertical: 16,
        alignItems: 'center',
        marginTop: Spacing.sm,
        marginBottom: Spacing.huge,
    },
    primaryBtnText: { color: Colors.white, fontSize: 16, fontWeight: 'bold' },
    dividerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Spacing.lg,
        marginBottom: 40,
    },
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
    signupRow: { flexDirection: 'row', justifyContent: 'center', marginBottom: 80 },
    signupText: { color: Colors.textGray, fontSize: 14 },
    signupLink: { color: Colors.primary, fontWeight: 'bold', fontSize: 14 },
    footer: { alignItems: 'center' },
    footerText: { color: Colors.textGray, fontSize: 12 },
    footerLinks: { flexDirection: 'row', marginTop: 4 },
    footerLink: { color: Colors.textGray, fontSize: 12, textDecorationLine: 'underline' },
});
