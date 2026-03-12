import React, { useState } from 'react';
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

const FAQ_DATA = [
    {
        id: 1,
        question: "What is Tabssi and how does it work?",
        answer: "Tabssi is a Buy Now, Pay Later (BNPL) mobile app that lets you split your purchases into smaller, manageable installments—interest-free or with transparent fees. Just choose Tabssi at checkout, and pay over time while enjoying your item now."
    },
    { id: 2, question: "Who can use Tabssi?", answer: "Users must be at least 18 years old, have a valid government-issued ID, and a valid payment method." },
    { id: 3, question: "Do I need a credit card to use Tabssi?", answer: "No, you do not necessarily need a credit card. You can use a valid debit card or bank account." },
    { id: 4, question: "Are there any hidden fees or interest?", answer: "No hidden fees. All fees are transparently shown before you confirm your purchase." },
    { id: 5, question: "How do I make payments?", answer: "Payments are automatically deducted from your linked payment method according to the schedule." },
    { id: 6, question: "What happens if I miss a payment?", answer: "Late fees may apply, and continued missing payments could lead to account suspension." },
    { id: 7, question: "Where can I use Tabssi?", answer: "You can use Tabssi at any of our partner merchants." },
    { id: 8, question: "How do I track my installment schedule?", answer: "You can view and manage all your installments in the 'History' tab of the app." },
    { id: 9, question: "Is my information safe with Tabssi?", answer: "Yes, we use industry-standard encryption to keep all your data and payments secure." },
];

function AccordionItem({ item, isActive, onPress }) {
    if (isActive) {
        return (
            <TouchableOpacity style={s.accordionActive} onPress={onPress} activeOpacity={0.9}>
                <View style={s.accordionHeader}>
                    <Text style={s.questionActive}>{item.question}</Text>
                    <View style={s.iconBoxActive}>
                        <Ionicons name="chevron-up" size={18} color="#8B5CF6" />
                    </View>
                </View>
                <Text style={s.answerText}>{item.answer}</Text>
            </TouchableOpacity>
        );
    }

    return (
        <TouchableOpacity style={s.accordionInactive} onPress={onPress} activeOpacity={0.7}>
            <Text style={s.questionInactive}>{item.question}</Text>
            <View style={s.iconBoxInactive}>
                <Ionicons name="chevron-down" size={18} color="#8B5CF6" />
            </View>
        </TouchableOpacity>
    );
}

export default function FAQScreen() {
    const [activeId, setActiveId] = useState(1);

    return (
        <SafeAreaView style={s.safe}>
            {/* Header */}
            <View style={s.header}>
                <TouchableOpacity style={s.iconBtn} onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={22} color="#111" />
                </TouchableOpacity>
                <Text style={s.headerTitle}>FAQ</Text>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={s.scroll}>
                
                {/* Banner Card */}
                <View style={s.bannerCard}>
                    {/* Clouds */}
                    <View style={s.cloud1} />
                    <View style={s.cloud2} />

                    <Text style={s.bannerTitle}>Got Questions?</Text>
                    <Text style={s.bannerSubtitle}>We've Got Answers</Text>
                    <Text style={s.bannerDesc}>
                        Everything you need to know about using Tabssi to shop now and pay later—safely, simply, and smartly.
                    </Text>
                </View>

                {/* FAQ List */}
                <View style={s.faqListContainer}>
                    {FAQ_DATA.map((item) => (
                        <AccordionItem 
                            key={item.id} 
                            item={item} 
                            isActive={activeId === item.id} 
                            onPress={() => setActiveId(activeId === item.id ? null : item.id)}
                        />
                    ))}
                </View>

            </ScrollView>

            <View style={s.bottomContainer}>
                <TouchableOpacity style={s.askBtn} activeOpacity={0.8}>
                    <Text style={s.askBtnText}>Have Questions?</Text>
                </TouchableOpacity>
            </View>
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
    
    scroll: { paddingHorizontal: Spacing.xl, paddingBottom: 20, paddingTop: 10 },

    // Banner
    bannerCard: {
        backgroundColor: '#F7F2FF',
        borderRadius: Radius.lg,
        padding: Spacing.xl,
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
    bannerTitle: { fontSize: 16, fontWeight: 'bold', color: '#111', marginBottom: 2 },
    bannerSubtitle: { fontSize: 18, fontWeight: 'bold', color: '#8B5CF6', marginBottom: Spacing.sm },
    bannerDesc: {
        fontSize: 13,
        color: '#444',
        textAlign: 'center',
        lineHeight: 20,
    },

    // Accordion
    faqListContainer: {
        paddingBottom: Spacing.lg,
    },
    accordionInactive: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: Colors.white,
        padding: 16,
        borderRadius: Radius.md,
        marginBottom: 12,
    },
    questionInactive: {
        flex: 1,
        fontSize: 14,
        fontWeight: 'bold',
        color: '#111',
        paddingRight: 16,
    },
    iconBoxInactive: {
        width: 32,
        height: 32,
        borderRadius: 8,
        backgroundColor: '#F7F2FF',
        alignItems: 'center',
        justifyContent: 'center',
    },

    accordionActive: {
        backgroundColor: '#111',
        padding: 18,
        borderRadius: Radius.lg,
        marginBottom: 12,
    },
    accordionHeader: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    questionActive: {
        flex: 1,
        fontSize: 14,
        fontWeight: 'bold',
        color: Colors.white,
        paddingRight: 16,
        lineHeight: 20,
    },
    iconBoxActive: {
        width: 32,
        height: 32,
        borderRadius: 8,
        backgroundColor: Colors.white,
        alignItems: 'center',
        justifyContent: 'center',
    },
    answerText: {
        fontSize: 13,
        color: '#E5E7EB',
        lineHeight: 20,
    },

    // Bottom container
    bottomContainer: {
        padding: Spacing.xl,
        paddingTop: 10,
    },
    askBtn: {
        backgroundColor: '#111',
        paddingVertical: 18,
        borderRadius: Radius.md,
        alignItems: 'center',
    },
    askBtnText: {
        color: Colors.white,
        fontSize: 16,
        fontWeight: 'bold',
    },
});
