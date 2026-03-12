import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Colors, Radius, Spacing } from '../constants/theme';

function SectionHeading({ num, title }) {
    return (
        <Text style={s.sectionTitle}>{num}. {title}</Text>
    );
}

function BulletPoint({ text }) {
    return (
        <View style={s.bulletRow}>
            <Text style={s.bulletPoint}>•</Text>
            <Text style={s.paragraph}>{text}</Text>
        </View>
    );
}

export default function TermsScreen() {
    return (
        <SafeAreaView style={s.safe}>
            {/* Header */}
            <View style={s.header}>
                <TouchableOpacity style={s.iconBtn} onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={22} color="#111" />
                </TouchableOpacity>
                <Text style={s.headerTitle}>Term & Condition</Text>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={s.scroll}>
                
                {/* Banner Card */}
                <View style={s.bannerCard}>
                    {/* Clouds (simulated with CSS shapes) */}
                    <View style={s.cloud1} />
                    <View style={s.cloud2} />
                    <View style={s.cloud3} />

                    <Text style={s.bannerTitle}>Tabssi <Text style={s.textPurple}>Term & Condition</Text></Text>
                    <Text style={s.lastUpdated}>Last Updated: May 15, 2025</Text>
                </View>

                {/* Content */}
                <Text style={s.paragraphCenter}>
                    Welcome to Tabssi, a mobile application that enables users to buy products and services now and pay later through scheduled installments. By downloading, registering, or using Tabssi, you agree to the following Terms and Conditions ("Terms").
                </Text>
                <View style={s.spacingLg} />

                {/* 1. Acceptance of Terms */}
                <SectionHeading num="1" title="Acceptance of Terms" />
                <Text style={s.paragraphBlock}>
                    By accessing or using Tabssi, you agree to be bound by these Terms and our Privacy Policy. If you do not agree, please do not use the app.
                </Text>
                <View style={s.spacingLg} />

                {/* 2. Eligibility */}
                <SectionHeading num="2" title="Eligibility" />
                <Text style={s.paragraphBlock}>
                    To use Tabssi, you must:
                </Text>
                <BulletPoint text="Be at least 18 years old." />
                <BulletPoint text="Be a legal resident of [Insert Country]." />
                <BulletPoint text="Have a valid government-issued ID and verified mobile number." />
                <BulletPoint text="Have a valid payment method (bank account, debit/credit card, or e-wallet)." />
                <View style={s.spacing} />
                <Text style={s.paragraphBlock}>
                    We may refuse service if eligibility requirements are not met or if fraudulent behavior is suspected.
                </Text>
                <View style={s.spacingLg} />

                {/* 3. How Tabssi Works */}
                <SectionHeading num="3" title="How Tabssi Works" />
                <BulletPoint text="Tabssi allows you to split eligible purchases into smaller, scheduled payments." />
                <BulletPoint text="Payment schedules (e.g., 3x monthly) will be shown clearly before confirmation." />
                <BulletPoint text="The first payment may be due at the time of purchase, with the rest scheduled automatically." />
                <View style={s.spacingLg} />

                {/* 4. User Responsibilities */}
                <SectionHeading num="4" title="User Responsibilities" />
                <Text style={s.paragraphBlock}>
                    You agree to:
                </Text>
                <BulletPoint text="Provide accurate and up-to-date information." />
                <BulletPoint text="Ensure sufficient funds are available for scheduled payments." />
                <BulletPoint text="Use Tabssi for legitimate, non-fraudulent purchases only." />
                <View style={s.spacingLg} />

                 {/* 5. Payment and Fees */}
                 <SectionHeading num="5" title="Payment and Fees" />
                <BulletPoint text="Late or missed payments may incur additional fees, as shown in the app." />
                <BulletPoint text="Continued missed payments may result in:" />
                <View style={{ paddingLeft: 16 }}>
                    <BulletPoint text="Account suspension." />
                    <BulletPoint text="Negative reporting to credit agencies (if applicable)." />
                    <BulletPoint text="Referral to debt collection services." />
                </View>
                <View style={s.spacingLg} />
                
                {/* 6. Account Suspension or Termination */}
                <SectionHeading num="6" title="Account Suspension or Termination" />
                <Text style={s.paragraphBlock}>
                    Tabssi reserves the right to suspend or terminate your account for:
                </Text>
                <BulletPoint text="Breach of these Terms." />
                <BulletPoint text="Fraudulent, abusive, or illegal activity." />
                <BulletPoint text="Non-payment or excessive missed payments." />
                <View style={s.spacingLg} />

                {/* 7. Data and Privacy */}
                <SectionHeading num="7" title="Data and Privacy" />
                <Text style={s.paragraphBlock}>
                    We collect and use personal and financial data in accordance with our Privacy Policy. By using Tabssi, you consent to this data collection and use.
                </Text>
                <View style={s.spacingLg} />

                 {/* 8. Third-Party Services */}
                 <SectionHeading num="8" title="Third-Party Services" />
                <Text style={s.paragraphBlock}>
                    Some features of Tabssi may rely on third-party providers (e.g. payment gateways). We are not liable for issues caused by third-party services.
                </Text>
                <View style={s.spacingLg} />

                {/* 9. Limitation of Liability */}
                <SectionHeading num="9" title="Limitation of Liability" />
                <Text style={s.paragraphBlock}>
                    Some features of Tabssi may rely on third-party providers (e.g. payment gateways). We are not liable for issues caused by third-party services.
                </Text>
                <View style={s.spacingLg} />

                 {/* 10. Changes to Terms */}
                 <SectionHeading num="10" title="Changes to Terms" />
                <Text style={s.paragraphBlock}>
                    We may update these Terms at any time. Users will be notified via app or email. Continued use of Tabssi after changes implies acceptance.
                </Text>
                <View style={s.spacingLg} />
                
                {/* 11. Governing Law */}
                <SectionHeading num="11" title="Governing Law" />
                <Text style={s.paragraphBlock}>
                    These Terms are governed by the laws of UEA.
                </Text>
                <View style={s.spacingLg} />

                {/* 12. Contact Us */}
                <SectionHeading num="12" title="Contact Us" />
                <Text style={s.paragraphBlock}>
                    If you have questions or concerns, contact us at:
                </Text>
                <View style={s.contactRow}>
                    <Text style={s.contactIcon}>📧</Text>
                    <Text style={s.paragraph}>Email: <Text style={s.textPurpleLink}>support@tabssi.com</Text></Text>
                </View>
                <View style={s.contactRow}>
                    <Text style={s.contactIcon}>📞</Text>
                    <Text style={s.paragraph}>Phone: +123456789</Text>
                </View>

                <View style={{ height: 40 }} />
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

    // Banner
    bannerCard: {
        backgroundColor: '#F7F2FF', // very light purple background
        borderRadius: Radius.lg,
        paddingVertical: 24,
        alignItems: 'center',
        marginBottom: Spacing.xl,
        position: 'relative',
        overflow: 'hidden',
    },
    cloud1: {
        position: 'absolute', left: -20, bottom: -10,
        width: 80, height: 50, borderRadius: 25,
        backgroundColor: '#fff', opacity: 0.6,
    },
    cloud2: {
        position: 'absolute', right: -30, top: 10,
        width: 100, height: 60, borderRadius: 30,
        backgroundColor: '#fff', opacity: 0.5,
    },
    cloud3: {
        position: 'absolute', right: 20, bottom: -20,
        width: 70, height: 40, borderRadius: 20,
        backgroundColor: '#fff', opacity: 0.7,
    },
    bannerTitle: { fontSize: 18, fontWeight: 'bold', color: '#111', marginBottom: 4 },
    textPurple: { color: '#8B5CF6' },
    lastUpdated: { fontSize: 12, color: Colors.textGray },

    // Content Text
    paragraphCenter: {
        fontSize: 14,
        color: '#444',
        lineHeight: 22,
        marginBottom: Spacing.sm,
        textAlign: 'center',
    },
    paragraphBlock: {
        fontSize: 14,
        color: '#444',
        lineHeight: 22,
        marginBottom: 8,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#111',
        marginBottom: 10,
    },
    bulletRow: {
        flexDirection: 'row',
        marginBottom: 4,
        paddingLeft: 8,
    },
    bulletPoint: {
        fontSize: 14,
        color: '#444',
        marginRight: 6,
        lineHeight: 22,
    },
    paragraph: {
        flex: 1,
        fontSize: 14,
        color: '#444',
        lineHeight: 22,
    },
    spacing: { height: 8 },
    spacingLg: { height: 24 },

    textPurpleLink: { color: '#8B5CF6', fontWeight: '500' },
    
    contactRow: {
        flexDirection: 'row',
        marginBottom: 6,
    },
    contactIcon: {
        fontSize: 14,
        marginRight: 8,
        lineHeight: 22,
    },
});
