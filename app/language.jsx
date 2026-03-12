import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Colors, Radius, Spacing } from '../constants/theme';
import { useLanguage } from '../context/LanguageContext';

const SUGGESTED_LANGUAGES = [
    { id: 'ar', label: 'Arabian' },
    { id: 'en-us', label: 'English (US)' },
    { id: 'pt', label: 'Portugese' },
];

const OTHER_LANGUAGES = [
    { id: 'en-uk', label: 'English (UK)' },
    { id: 'zh', label: 'Chinese' },
    { id: 'tl', label: 'Filipino' },
    { id: 'th', label: 'Thailand' },
    { id: 'cs', label: 'Czech' },
    { id: 'id', label: 'Indonesia' },
    { id: 'ms', label: 'Melayu' },
];

function LanguageItem({ item, isSelected, onPress }) {
    return (
        <TouchableOpacity
            style={s.languageItem}
            activeOpacity={0.7}
            onPress={onPress}
        >
            <Text style={[s.languageLabel, isSelected && s.languageLabelSelected]}>
                {item.label}
            </Text>
            {isSelected && (
                <Ionicons name="checkmark" size={24} color="#8B5CF6" />
            )}
        </TouchableOpacity>
    );
}

export default function LanguageScreen() {
    const { languageId, setLanguageId, t } = useLanguage();

    const handleSelect = (id) => {
        setLanguageId(id);
        // Show a brief confirmation to the user
        Alert.alert(
            '✓',
            t('language_changed'),
            [{ text: 'OK', style: 'default' }],
            { cancelable: true }
        );
    };

    return (
        <SafeAreaView style={s.safe}>
            {/* Header */}
            <View style={s.header}>
                <TouchableOpacity style={s.iconBtn} onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={22} color="#111" />
                </TouchableOpacity>
                <Text style={s.headerTitle}>{t('language')}</Text>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={s.scroll}>

                {/* Suggested Language Card */}
                <View style={s.cardGroup}>
                    <View style={s.cardHeader}>
                        <Text style={s.cardTitle}>{t('suggested_language')}</Text>
                    </View>
                    {SUGGESTED_LANGUAGES.map((item) => (
                        <LanguageItem
                            key={item.id}
                            item={item}
                            isSelected={languageId === item.id}
                            onPress={() => handleSelect(item.id)}
                        />
                    ))}
                </View>

                {/* Other Language Card */}
                <View style={s.cardGroup}>
                    <View style={s.cardHeader}>
                        <Text style={s.cardTitle}>{t('other_language')}</Text>
                    </View>
                    {OTHER_LANGUAGES.map((item) => (
                        <LanguageItem
                            key={item.id}
                            item={item}
                            isSelected={languageId === item.id}
                            onPress={() => handleSelect(item.id)}
                        />
                    ))}
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
        marginBottom: Spacing.lg,
        overflow: 'hidden',
    },
    cardHeader: {
        paddingHorizontal: Spacing.lg,
        paddingTop: Spacing.lg,
        paddingBottom: Spacing.md,
        borderBottomWidth: 1,
        borderBottomColor: '#F3F4F6',
    },
    cardTitle: {
        fontSize: 13,
        color: '#6B7280',
        fontWeight: '500',
    },
    languageItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 18,
        paddingHorizontal: Spacing.lg,
        borderBottomWidth: 1,
        borderBottomColor: '#F9FAFB',
    },
    languageLabel: {
        fontSize: 15,
        fontWeight: '500',
        color: '#111',
    },
    languageLabelSelected: {
        color: '#8B5CF6',
        fontWeight: '700',
    },
});
