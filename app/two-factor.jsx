import React, { useState, useRef } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Radius, Spacing } from '../constants/theme';

const CURRENT_EMAIL = 'HelloAli@gmail.com';

export default function TwoFactorScreen() {
    const [email, setEmail] = useState(CURRENT_EMAIL);

    // Toast state
    const [toastVisible, setToastVisible] = useState(false);
    const toastOpacity = useRef(new Animated.Value(0)).current;
    const toastTranslate = useRef(new Animated.Value(-20)).current;

    const isChanged = email.trim() !== CURRENT_EMAIL && email.trim().length > 0;

    const showToast = () => {
        setToastVisible(true);
        Animated.parallel([
            Animated.timing(toastOpacity, {
                toValue: 1,
                duration: 200,
                useNativeDriver: true,
            }),
            Animated.timing(toastTranslate, {
                toValue: 0,
                duration: 200,
                useNativeDriver: true,
            }),
        ]).start();

        setTimeout(() => {
            Animated.parallel([
                Animated.timing(toastOpacity, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: true,
                }),
                Animated.timing(toastTranslate, {
                    toValue: -20,
                    duration: 300,
                    useNativeDriver: true,
                }),
            ]).start(() => setToastVisible(false));
        }, 2200);
    };

    const handleChangeEmail = () => {
        if (!isChanged) return;
        showToast();
    };

    return (
        <SafeAreaView style={s.safe}>
            {/* Toast notification */}
            {toastVisible && (
                <Animated.View
                    style={[
                        s.toast,
                        {
                            opacity: toastOpacity,
                            transform: [{ translateY: toastTranslate }],
                        },
                    ]}
                >
                    <Ionicons name="information-circle-outline" size={16} color="#fff" />
                    <Text style={s.toastText}>Email Updated</Text>
                </Animated.View>
            )}

            {/* Header */}
            <View style={s.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={24} color="#111" />
                </TouchableOpacity>
                <Text style={s.headerTitle}>2-Factor Authentication</Text>
                <View style={{ width: 24 }} />
            </View>

            <View style={s.body}>
                <TextInput
                    style={s.input}
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                />
                <TouchableOpacity
                    style={[s.btn, !isChanged && s.btnDisabled]}
                    onPress={handleChangeEmail}
                    activeOpacity={isChanged ? 0.8 : 1}
                >
                    <Text style={[s.btnText, !isChanged && s.btnTextDisabled]}>Change Email</Text>
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
        </SafeAreaView>
    );
}

const s = StyleSheet.create({
    safe: { flex: 1, backgroundColor: Colors.white },

    // Toast
    toast: {
        position: 'absolute',
        top: 60,
        alignSelf: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        backgroundColor: '#1C1C1E',
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 20,
        zIndex: 100,
    },
    toastText: {
        color: '#fff',
        fontSize: 13,
        fontWeight: '500',
    },

    // Header
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: Spacing.xxl,
        paddingVertical: Spacing.lg,
    },
    headerTitle: { fontSize: 18, fontWeight: 'bold' },

    // Body
    body: { flex: 1, paddingHorizontal: Spacing.xxl, paddingTop: Spacing.xxl },
    input: {
        borderWidth: 1,
        borderColor: '#E5E7EB',
        borderRadius: Radius.md,
        paddingHorizontal: 16,
        paddingVertical: 16,
        fontSize: 16,
        marginBottom: Spacing.xxl,
        color: '#111',
    },
    btn: {
        backgroundColor: Colors.almostBlack,
        borderRadius: Radius.md,
        paddingVertical: 16,
        alignItems: 'center',
    },
    btnDisabled: {
        backgroundColor: '#E5E7EB',
    },
    btnText: {
        color: Colors.white,
        fontSize: 16,
        fontWeight: 'bold',
    },
    btnTextDisabled: {
        color: '#9CA3AF',
    },

    // Footer
    footer: { alignItems: 'center', paddingBottom: 40 },
    footerText: { color: Colors.textGray, fontSize: 12 },
    footerLinks: { flexDirection: 'row', marginTop: 4 },
    footerLink: { color: Colors.textGray, fontSize: 12, textDecorationLine: 'underline' },
});
