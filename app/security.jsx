import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Switch,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Colors, Radius, Spacing } from '../constants/theme';

function SecurityItem({ icon, iconNode, label, isLast, rightElement, onPress }) {
    return (
        <TouchableOpacity 
            style={[s.itemRow, isLast && s.noBorder]} 
            activeOpacity={0.7} 
            onPress={onPress}
            disabled={!onPress}
        >
            <View style={s.itemLeft}>
                <View style={s.iconBox}>
                    {iconNode ? iconNode : (icon && <Ionicons name={icon} size={20} color="#666" />)}
                </View>
                <Text style={s.itemLabel}>{label}</Text>
            </View>
            <View style={s.itemRight}>
                {rightElement ? rightElement : (
                    <Ionicons name="chevron-forward" size={18} color="#C4C4C4" />
                )}
            </View>
        </TouchableOpacity>
    );
}

export default function SecurityScreen() {
    const [useFaceId, setUseFaceId] = useState(false);
    const [appLock, setAppLock] = useState(true);

    return (
        <SafeAreaView style={s.safe}>
            {/* Header */}
            <View style={s.header}>
                <TouchableOpacity style={s.iconBtn} onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={22} color="#111" />
                </TouchableOpacity>
                <Text style={s.headerTitle}>Security</Text>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={s.scroll}>
                
                {/* Security Menu Group */}
                <View style={s.cardGroup}>
                    
                    {/* 2-Factor Authentication */}
                    <SecurityItem 
                        icon="phone-portrait-outline" 
                        label="2-Factor Authentication"
                        onPress={() => router.push('/two-factor')}
                    />

                    {/* Reset Password */}
                    <SecurityItem 
                        iconNode={
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={{ fontSize: 16, fontWeight: '300', color: '#666', lineHeight: 18 }}>|</Text>
                                <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#666', lineHeight: 22, marginTop: 4 }}>**</Text>
                            </View>
                        }
                        label="Reset Password"
                        onPress={() => router.push('/security-reset')}
                    />

                    {/* Use Face ID */}
                    <SecurityItem 
                        icon="scan-outline" 
                        label="Use Face ID to login" 
                        rightElement={
                            <Switch 
                                value={useFaceId} 
                                onValueChange={setUseFaceId}
                                trackColor={{ false: '#E5E7EB', true: '#C4B5FD' }}
                                thumbColor={useFaceId ? '#7C3AED' : '#fff'}
                            />
                        }
                    />

                    {/* App Lock */}
                    <SecurityItem 
                        icon="lock-closed-outline" 
                        label="App Lock" 
                        isLast={true}
                        rightElement={
                            <Switch 
                                value={appLock} 
                                onValueChange={setAppLock}
                                trackColor={{ false: '#E5E7EB', true: '#C4B5FD' }}
                                thumbColor={appLock ? '#7C3AED' : '#fff'}
                            />
                        }
                    />
                    
                </View>

            </ScrollView>
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
        borderWidth: 1,
        borderColor: '#E5E7EB',
    },
    headerTitle: { fontSize: 16, fontWeight: 'bold', color: '#111' },
    
    scroll: { paddingHorizontal: Spacing.xl, paddingBottom: 40, paddingTop: 10 },

    cardGroup: {
        backgroundColor: Colors.white,
        borderRadius: Radius.lg,
        paddingHorizontal: Spacing.lg,
    },
    itemRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: Spacing.xl,
        borderBottomWidth: 1,
        borderBottomColor: '#F3F4F6',
    },
    noBorder: {
        borderBottomWidth: 0,
    },
    itemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    iconBox: {
        width: 24,
        height: 24,
        justifyContent: 'center',
        alignItems: 'center',
    },
    itemLabel: {
        fontSize: 15,
        fontWeight: '500',
        color: '#111',
    },
    itemRight: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});
