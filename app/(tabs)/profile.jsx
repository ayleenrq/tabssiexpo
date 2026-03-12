import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    ScrollView,
    Switch,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Colors, Radius, Spacing } from '../../constants/theme';
import { useLanguage } from '../../context/LanguageContext';

const ALL_LANGUAGES = [
    { id: 'ar', label: 'Arabian' },
    { id: 'en-us', label: 'English (US)' },
    { id: 'pt', label: 'Portugese' },
    { id: 'en-uk', label: 'English (UK)' },
    { id: 'zh', label: 'Chinese' },
    { id: 'tl', label: 'Filipino' },
    { id: 'th', label: 'Thailand' },
    { id: 'cs', label: 'Czech' },
    { id: 'id', label: 'Indonesia' },
    { id: 'ms', label: 'Melayu' },
];

function SectionHeader({ title }) {
    return (
        <Text style={s.sectionHeader}>{title}</Text>
    );
}

function MenuItem({ icon, label, rightElement, onPress, isLogout }) {
    return (
        <TouchableOpacity 
            style={s.menuItem} 
            activeOpacity={0.7} 
            onPress={onPress}
            disabled={!onPress}
        >
            <View style={s.menuLeft}>
                {icon && (
                    <Ionicons 
                        name={icon} 
                        size={20} 
                        color={isLogout ? Colors.red : Colors.textGray} 
                    />
                )}
                <Text style={[s.menuLabel, isLogout && { color: Colors.red }]}>{label}</Text>
            </View>
            {rightElement ? rightElement : (
                <Ionicons name="chevron-forward" size={18} color="#C4C4C4" />
            )}
        </TouchableOpacity>
    );
}

export default function ProfileScreen() {
    const [notifEnabled, setNotifEnabled] = useState(true);
    const { languageId, t } = useLanguage();

    const currentLanguageLabel = ALL_LANGUAGES.find(l => l.id === languageId)?.label ?? 'English';

    return (
        <SafeAreaView style={s.safe} edges={['top']}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={s.scroll}>
                
                {/* Header (Profile Info) */}
                <View style={s.headerCard}>
                    <View style={s.headerRow}>
                        <Image source={{ uri: 'https://i.pravatar.cc/100?img=11' }} style={s.avatar} />
                        <View style={s.headerTextCol}>
                            <Text style={s.name}>Ali Muhajirin</Text>
                            <Text style={s.phone}>+1 (555) 123-4567</Text>
                        </View>
                        <TouchableOpacity style={s.editBtn} onPress={() => router.push('/edit-profile')}>
                            <Ionicons name="pencil-outline" size={16} color="#444" />
                            <Text style={s.editBtnText}>{t('edit')}</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Available to Spent Card */}
                <View style={s.spentCard}>
                    {/* Decorative Background */}
                    <View style={s.spentBg1} />
                    <View style={s.spentBg2} />

                    <Text style={s.spentTitle}>{t('available_to_spent')}</Text>
                    
                    <View style={s.spentRow}>
                        <Text style={s.spentUsed}>$512.23 used</Text>
                        <Text style={s.spentAvailable}>$5,000 available</Text>
                    </View>
                    
                    {/* Progress Bar */}
                    <View style={s.progressContainer}>
                        <View style={s.progressBar} />
                    </View>
                    
                    <View style={s.repayRow}>
                        <View>
                            <Text style={s.repayDate}>{t('repay_before')}</Text>
                            <Text style={s.repayAmount}>$678.33</Text>
                        </View>
                        <TouchableOpacity style={s.repayBtn}>
                            <Text style={s.repayBtnText}>{t('repay')}</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Personal Information */}
                <SectionHeader title={t('personal_info')} />
                <View style={s.cardGroup}>
                    <View style={s.infoRow}>
                        <Text style={s.infoLabel}>{t('full_name')}</Text>
                        <Text style={s.infoValue}>Ali Muhajirin</Text>
                    </View>
                    <View style={s.infoRow}>
                        <Text style={s.infoLabel}>{t('email')}</Text>
                        <Text style={s.infoValue}>HelloAli@gmail.com</Text>
                    </View>
                    <View style={[s.infoRow, { borderBottomWidth: 0 }]}>
                        <Text style={s.infoLabel}>{t('phone')}</Text>
                        <Text style={s.infoValue}>+1 (555) 123-4567</Text>
                    </View>
                </View>

                {/* Linked Bank Accounts */}
                <SectionHeader title={t('linked_bank')} />
                <View style={s.bankCard}>
                    <View style={s.bankRow}>
                        <View style={s.bankIconBox}>
                            <Ionicons name="business-outline" size={24} color="#888" />
                        </View>
                        <View style={s.bankInfo}>
                            <Text style={s.bankName}>Mandiri</Text>
                            <Text style={s.bankNumber}>****4567</Text>
                        </View>
                        <View style={s.primaryBadge}>
                            <Text style={s.primaryBadgeText}>{t('primary')}</Text>
                        </View>
                    </View>
                </View>
                
                {/* Note: The design shows BCA with a text "Choose Bank" in one and "BCA" in another view. I'll make one for BCA or Choose Bank based on screenshot */}
                <View style={[s.bankCard, { marginBottom: Spacing.lg }]}>
                    <View style={s.bankRow}>
                        <View style={s.bankIconBox}>
                            <Ionicons name="business-outline" size={24} color="#888" />
                        </View>
                        <View style={s.bankInfo}>
                            <Text style={s.bankName}>Choose Bank</Text>
                            <Text style={s.bankNumber}>****4567</Text>
                        </View>
                        <View style={s.primaryBadge}>
                            <Text style={s.primaryBadgeText}>{t('primary')}</Text>
                        </View>
                    </View>
                </View>

                <TouchableOpacity style={s.addBankBtn} onPress={() => router.push('/add-bank')} activeOpacity={0.7}>
                    <Ionicons name="add-outline" size={20} color="#111" />
                    <Text style={s.addBankText}>{t('add_bank')}</Text>
                </TouchableOpacity>

                <SectionHeader title={t('app_settings')} />
                <View style={s.cardGroup}>
                    <MenuItem 
                        icon="notifications-outline" 
                        label={t('notification')} 
                        rightElement={
                            <Switch 
                                value={notifEnabled} 
                                onValueChange={setNotifEnabled}
                                trackColor={{ false: '#E5E7EB', true: '#C4B5FD' }}
                                thumbColor={notifEnabled ? '#7C3AED' : '#f4f3f4'}
                            />
                        } 
                    />
                    <MenuItem icon="lock-closed-outline" label={t('security')} onPress={() => router.push('/security')} />
                    <MenuItem 
                        icon="globe-outline" 
                        label={t('language')} 
                        onPress={() => router.push('/language')}
                        rightElement={
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={s.languageText}>{currentLanguageLabel}</Text>
                                <Ionicons name="chevron-forward" size={18} color="#C4C4C4" />
                            </View>
                        }
                    />
                </View>

                {/* Help & Legal */}
                <SectionHeader title={t('help_legal')} />
                <View style={s.cardGroup}>
                    <MenuItem icon="help-circle-outline" label={t('faq')} onPress={() => router.push('/faq')} />
                    <MenuItem icon="document-text-outline" label={t('terms')} onPress={() => router.push('/terms')} />
                    <MenuItem icon="shield-checkmark-outline" label={t('privacy')} onPress={() => router.push('/privacy')} />
                    <MenuItem icon="log-out-outline" label={t('logout')} isLogout={true} onPress={() => router.replace('/login')} />
                </View>
                
            </ScrollView>
        </SafeAreaView>
    );
}

const s = StyleSheet.create({
    safe: { flex: 1, backgroundColor: Colors.backgroundGray },
    scroll: { paddingHorizontal: Spacing.xl, paddingBottom: 40, paddingTop: Spacing.lg },

    // Header / Profile Card
    headerCard: {
        backgroundColor: Colors.white,
        padding: Spacing.lg,
        borderRadius: Radius.lg,
        marginBottom: Spacing.lg,
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        width: 56, height: 56,
        borderRadius: 28,
        backgroundColor: '#eee',
    },
    headerTextCol: {
        flex: 1,
        paddingLeft: 12,
    },
    name: { fontSize: 16, fontWeight: 'bold', color: '#111' },
    phone: { fontSize: 13, color: Colors.textGray, marginTop: 4 },
    editBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: Radius.full,
        borderWidth: 1,
        borderColor: '#E5E7EB',
        gap: 6,
    },
    editBtnText: { fontSize: 13, fontWeight: '500', color: '#444' },

    // Spent Card
    spentCard: {
        backgroundColor: Colors.white,
        borderRadius: Radius.lg,
        padding: Spacing.lg,
        marginBottom: Spacing.xl,
        position: 'relative',
        overflow: 'hidden',
    },
    spentBg1: {
        position: 'absolute', right: -40, top: -20,
        borderWidth: 50, borderColor: 'transparent',
        borderBottomColor: '#F3F4F6', opacity: 0.8,
        transform: [{ rotate: '45deg' }]
    },
    spentBg2: {
        position: 'absolute', right: 40, bottom: -40,
        borderWidth: 50, borderColor: 'transparent',
        borderTopColor: '#F3F4F6', opacity: 0.8,
        transform: [{ rotate: '-45deg' }]
    },
    spentTitle: { fontSize: 15, fontWeight: 'bold', color: '#111', marginBottom: Spacing.md },
    spentRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
    spentUsed: { fontSize: 12, color: Colors.textGray },
    spentAvailable: { fontSize: 12, color: Colors.textGray },
    progressContainer: {
        height: 6,
        backgroundColor: '#E5E7EB',
        borderRadius: 3,
        marginBottom: Spacing.lg,
        overflow: 'hidden',
    },
    progressBar: {
        width: '15%',
        height: '100%',
        backgroundColor: '#8B5CF6', // Purple
        borderRadius: 3,
    },
    repayRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    repayDate: { fontSize: 12, color: Colors.textGray, marginBottom: 4 },
    repayAmount: { fontSize: 20, fontWeight: 'bold', color: '#111' },
    repayBtn: {
        backgroundColor: '#111',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: Radius.sm,
    },
    repayBtnText: { color: Colors.white, fontSize: 13, fontWeight: 'bold' },

    sectionHeader: { fontSize: 14, color: Colors.textGray, marginBottom: Spacing.md, marginLeft: 4, marginTop: Spacing.sm },

    cardGroup: {
        backgroundColor: Colors.white,
        borderRadius: Radius.lg,
        paddingHorizontal: Spacing.lg,
        marginBottom: Spacing.xl,
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: Spacing.lg,
        borderBottomWidth: 1,
        borderBottomColor: '#F3F4F6',
    },
    infoLabel: { fontSize: 14, fontWeight: '600', color: '#111' },
    infoValue: { fontSize: 14, color: Colors.textGray },

    // Bank Card
    bankCard: {
        backgroundColor: Colors.white,
        borderRadius: Radius.lg,
        padding: Spacing.lg,
        marginBottom: Spacing.md,
        borderWidth: 1,
        borderColor: '#F3F4F6',
    },
    bankRow: { flexDirection: 'row', alignItems: 'center' },
    bankIconBox: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center' },
    bankInfo: { flex: 1, paddingLeft: 8 },
    bankName: { fontSize: 15, fontWeight: '600', color: '#111', marginBottom: 2 },
    bankNumber: { fontSize: 13, color: Colors.textGray },
    primaryBadge: {
        backgroundColor: '#ECFDF5',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: Radius.sm,
        borderWidth: 1,
        borderColor: '#A7F3D0',
    },
    primaryBadgeText: { fontSize: 12, fontWeight: '500', color: '#10B981' },

    addBankBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        paddingVertical: Spacing.sm,
        marginBottom: Spacing.xl,
        marginLeft: 4,
    },
    addBankText: { fontSize: 14, fontWeight: '600', color: '#111' },

    menuItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: Spacing.lg,
        borderBottomWidth: 1,
        borderBottomColor: '#F3F4F6',
    },
    menuLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
    menuLabel: { fontSize: 14, fontWeight: '500', color: '#111' },
    languageText: { fontSize: 14, color: Colors.textGray, marginRight: 8 },
});
