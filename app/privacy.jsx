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

function SubSection({ letter, title }) {
    return (
        <Text style={s.subHeading}>{letter}. {title}</Text>
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

export default function PrivacyScreen() {
    return (
        <SafeAreaView style={s.safe}>
            {/* Header */}
            <View style={s.header}>
                <TouchableOpacity style={s.iconBtn} onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={22} color="#111" />
                </TouchableOpacity>
                <Text style={s.headerTitle}>Privacy & Policy</Text>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={s.scroll}>
                
                {/* Banner Card */}
                <View style={s.bannerCard}>
                    {/* Clouds (simulated with CSS shapes) */}
                    <View style={s.cloud1} />
                    <View style={s.cloud2} />
                    <View style={s.cloud3} />

                    <Text style={s.bannerTitle}>Tabssi <Text style={s.textPurple}>Privacy & Policy</Text></Text>
                    <Text style={s.lastUpdated}>Last Updated: May 15, 2025</Text>
                </View>

                {/* Content */}
                <Text style={s.paragraphBlock}>
                    Welcome to Tabssi. Your privacy is important to us. This Privacy Policy explains how we collect, use, share, and protect your personal information when you use our app and services.
                </Text>

                {/* 1. Information We Collect */}
                <SectionHeading num="1" title="Information We Collect" />
                <Text style={s.paragraphBlock}>
                    We collect the following types of information:
                </Text>

                <SubSection letter="a" title="Personal Information" />
                <BulletPoint text="Full name" />
                <BulletPoint text="Phone number" />
                <BulletPoint text="Email address" />
                <BulletPoint text="Government-issued national ID" />
                <BulletPoint text="Date of birth" />
                <BulletPoint text="Home address" />
                <View style={s.spacing} />

                <SubSection letter="b" title="Financial Information" />
                <BulletPoint text="Bank account details" />
                <BulletPoint text="Debit/credit card info" />
                <BulletPoint text="Transaction history" />
                <BulletPoint text="Employment or income details (for credit assessment)" />
                <View style={s.spacing} />

                <SubSection letter="c" title="Device & App Usage Data" />
                <BulletPoint text="IP address" />
                <BulletPoint text="Device type and OS" />
                <BulletPoint text="App usage logs" />
                <BulletPoint text="Location (if permitted)" />
                <View style={s.spacing} />

                <SubSection letter="d" title="Behavioral Data" />
                <BulletPoint text="Purchase behavior" />
                <BulletPoint text="Payment history" />
                <BulletPoint text="Communication with support or chatbot" />
                <View style={s.spacingLg} />

                {/* 2. How We Use Your Information */}
                <SectionHeading num="2" title="How We Use Your Information" />
                <Text style={s.paragraphBlock}>
                    We use your information to:
                </Text>
                <BulletPoint text="Verify your identity and assess eligibility" />
                <BulletPoint text="Process and manage your BNPL transactions" />
                <BulletPoint text="Communicate updates, alerts, or promotions" />
                <BulletPoint text="Detect and prevent fraud or suspicious activities" />
                <BulletPoint text="Improve app features, UI/UX, and customer experience" />
                <BulletPoint text="Comply with legal and regulatory obligations" />
                <View style={s.spacingLg} />

                {/* 3. Sharing of Information */}
                <SectionHeading num="3" title="Sharing of Information" />
                <Text style={s.paragraphBlock}>
                    We may share your data with:
                </Text>
                <BulletPoint text="Partner merchants: To process your orders and confirm transactions." />
                <BulletPoint text="Payment providers: For payment processing and account linking." />
                <BulletPoint text="Credit bureaus: For credit assessment (if applicable in your country)." />
                <BulletPoint text="Government or law enforcement: If required by legal obligation." />
                <BulletPoint text="Service providers: Who help us with hosting, analytics, customer support, or fraud detection." />

                {/* Highlight text block */}
                <View style={s.highlightBox}>
                    <Text style={s.highlightText}>
                        We never sell your personal data to third parties.
                    </Text>
                </View>
                <View style={s.spacingLg} />

                {/* 4. Data Security */}
                <SectionHeading num="4" title="Data Security" />
                <Text style={s.paragraphBlock}>
                    We protect your data using:
                </Text>
                <BulletPoint text="End-to-end encryption" />
                <BulletPoint text="Secure servers and firewalls" />
                <BulletPoint text="Access controls and two-factor authentication" />
                <BulletPoint text="Regular security audits" />
                <Text style={s.paragraphBlock}>
                    Despite our efforts, no system is 100% secure. Please use strong passwords and protect your device.
                </Text>
                <View style={s.spacingLg} />

                {/* 5. Data Retention */}
                <SectionHeading num="5" title="Data Retention" />
                <Text style={s.paragraphBlock}>
                    We keep your data:
                </Text>
                <BulletPoint text="As long as you have an active account" />
                <BulletPoint text="As required for legal, regulatory, or dispute resolution purposes." />
                <Text style={s.paragraphBlock}>
                    When no longer needed, your data will be securely deleted or anonymized.
                </Text>
                <View style={s.spacingLg} />

                {/* 6. Your Rights */}
                <SectionHeading num="6" title="Your Rights" />
                <Text style={s.paragraphBlock}>
                    Depending on your local laws, you may have the right to:
                </Text>
                <BulletPoint text="Access the personal data we hold" />
                <BulletPoint text="Correct inaccurate information" />
                <BulletPoint text="Delete your data (with some exceptions)" />
                <BulletPoint text="Withdraw consent" />
                <BulletPoint text="Object to data processing for marketing" />
                <Text style={s.paragraphBlock}>
                    To make a request, contact us at <Text style={s.textPurpleLink}>privacy@tabssi.com</Text>.
                </Text>
                <View style={s.spacingLg} />

                {/* 7. Cookies & Tracking */}
                <SectionHeading num="7" title="Cookies & Tracking" />
                <Text style={s.paragraphBlock}>
                    We may use cookies or similar technologies to:
                </Text>
                <BulletPoint text="Understand how you use the app" />
                <BulletPoint text="Improve app performance" />
                <BulletPoint text="Provide a personalized experience" />
                <Text style={s.paragraphBlock}>
                    You can manage cookie preferences in your device settings.
                </Text>
                <View style={s.spacingLg} />

                 {/* 8. Children's Privacy */}
                 <SectionHeading num="8" title="Children's Privacy" />
                <Text style={s.paragraphBlock}>
                    Tabssi is not intended for users under 18 years old. We do not knowingly collect data from children. If we find out we have, we will delete it.
                </Text>
                <View style={s.spacingLg} />

                {/* 9. Changes to This Policy */}
                <SectionHeading num="9" title="Changes to This Policy" />
                <Text style={s.paragraphBlock}>
                    We may update this Privacy Policy from time to time. When we do, we will notify you in-app or via email. Continued use of Tabssi means you accept the changes.
                </Text>
                <View style={s.spacingLg} />

                {/* 10. Contact Us */}
                <SectionHeading num="10" title="Contact Us" />
                <Text style={s.paragraphBlock}>
                    If you have questions or concerns about your privacy, contact us at:
                </Text>
                <View style={s.contactRow}>
                    <Text style={s.contactIcon}>📧</Text>
                    <Text style={s.paragraph}>Email: <Text style={s.textPurpleLink}>privacy@tabssi.com</Text></Text>
                </View>
                <View style={s.contactRow}>
                    <Text style={s.contactIcon}>📞</Text>
                    <Text style={s.paragraph}>Phone: +123456789</Text>
                </View>
                <View style={s.contactRow}>
                    <Text style={s.contactIcon}>📍</Text>
                    <Text style={s.paragraph}>Address: Tabssi Technologies FZ-LLC In5 Tech, Dubai Internet City, Dubai, United Arab Emirates</Text>
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
    paragraphBlock: {
        fontSize: 14,
        color: '#444',
        lineHeight: 22,
        marginBottom: Spacing.md,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#111',
        marginBottom: Spacing.sm,
    },
    subHeading: {
        fontSize: 14,
        color: '#555',
        marginBottom: 4,
    },
    bulletRow: {
        flexDirection: 'row',
        marginBottom: 2,
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
        color: '#555',
        lineHeight: 22,
    },
    spacing: { height: 12 },
    spacingLg: { height: 24 },

    highlightBox: {
        backgroundColor: '#F5F3FF',
        padding: Spacing.md,
        borderRadius: Radius.sm,
        marginTop: Spacing.md,
    },
    highlightText: {
        fontSize: 13,
        color: '#111',
        fontWeight: '500',
    },
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
