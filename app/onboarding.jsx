import React, { useRef, useState } from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Radius, Spacing } from '../constants/theme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const pages = [
    {
        title: 'Shop Now, Pay Later',
        subtitle: 'Split your purchases into easy monthly\npayments with zero interest.',
    },
    {
        title: 'Instant Approvals',
        subtitle: 'Get approved within seconds—no\npaperwork, no waiting.',
    },
    {
        title: 'Safe & Secure Payments',
        subtitle: 'Your transactions are encrypted and\nprotected every step of the way.',
    },
];

function Page1Illustration() {
    return (
        <Image
            source={require('../assets/onboarding-1.png')}
            style={ill.image}
        />
    );
}

function Page2Illustration() {
    return (
        <Image
            source={require('../assets/onboarding-2.png')}
            style={ill.image}
        />
    );
}

function Page3Illustration() {
    return (
        <Image
            source={require('../assets/onboarding-3.png')}
            style={ill.image}
        />
    );
}

const illustrations = [<Page1Illustration />, <Page2Illustration />, <Page3Illustration />];

export default function OnboardingScreen() {
    const scrollRef = useRef(null);
    const [currentPage, setCurrentPage] = useState(0);

    const onNext = () => {
        if (currentPage < 2) {
            const next = currentPage + 1;
            scrollRef.current?.scrollTo({ x: next * SCREEN_WIDTH, animated: true });
            setCurrentPage(next);
        } else {
            router.replace('/login');
        }
    };

    const onSkipOrRegister = () => {
        if (currentPage === 2) {
            router.replace('/register');
        } else {
            router.replace('/login');
        }
    };

    const onScroll = (e) => {
        const page = Math.round(e.nativeEvent.contentOffset.x / SCREEN_WIDTH);
        setCurrentPage(page);
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* Logo */}
            <View style={styles.logoRow}>
                <Image 
                    source={require('../assets/logo.png')} 
                    style={{ width: 28, height: 28, tintColor: Colors.primary, resizeMode: 'contain' }} 
                />
                <Text style={styles.logoText}>Tabssi</Text>
            </View>

            {/* Pages */}
            <ScrollView
                ref={scrollRef}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onMomentumScrollEnd={onScroll}
                style={styles.pager}
            >
                {illustrations.map((el, i) => (
                    <View key={i} style={[styles.page, { width: SCREEN_WIDTH }]}>
                        {el}
                    </View>
                ))}
            </ScrollView>

            {/* Bottom */}
            <View style={styles.bottom}>
                {/* Dots */}
                <View style={styles.dots}>
                    {[0, 1, 2].map((i) => (
                        <View
                            key={i}
                            style={[styles.dot, currentPage === i && styles.dotActive]}
                        />
                    ))}
                </View>

                <Text style={styles.title}>{pages[currentPage].title}</Text>
                <Text style={styles.subtitle}>{pages[currentPage].subtitle}</Text>

                <TouchableOpacity style={styles.primaryBtn} onPress={onNext}>
                    <Text style={styles.primaryBtnText}>
                        {currentPage === 2 ? 'Login' : 'Next'}
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.outlineBtn} onPress={onSkipOrRegister}>
                    <Text style={styles.outlineBtnText}>
                        {currentPage === 2 ? 'Register' : 'Skip'}
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Colors.white },
    logoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: Spacing.xxl,
        gap: Spacing.sm,
    },
    logoText: { fontSize: 24, fontWeight: 'bold', letterSpacing: -0.5 },
    pager: { flex: 1 },
    page: { alignItems: 'center', justifyContent: 'center', paddingHorizontal: 20 },
    bottom: { paddingHorizontal: Spacing.xxl, paddingBottom: Spacing.lg },
    dots: { flexDirection: 'row', justifyContent: 'center', gap: 8, marginBottom: Spacing.xxxl },
    dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#D1D5DB' },
    dotActive: { backgroundColor: Colors.primary },
    title: { fontSize: 24, fontWeight: 'bold', color: '#1A1A1A', textAlign: 'center', marginBottom: 12 },
    subtitle: { fontSize: 14, color: Colors.textGray, textAlign: 'center', lineHeight: 21, marginBottom: Spacing.huge },
    primaryBtn: {
        backgroundColor: Colors.almostBlack,
        borderRadius: Radius.md,
        paddingVertical: 16,
        alignItems: 'center',
        marginBottom: 12,
    },
    primaryBtnText: { color: Colors.white, fontSize: 16, fontWeight: 'bold' },
    outlineBtn: {
        borderRadius: Radius.md,
        paddingVertical: 16,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#D1D5DB',
        marginBottom: Spacing.lg,
    },
    outlineBtnText: { color: '#1A1A1A', fontSize: 16, fontWeight: 'bold' },
});

const ill = StyleSheet.create({
    image: {
        width: 335,
        height: 366,
        resizeMode: 'contain',
    },
});
