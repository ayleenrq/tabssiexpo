import React, { useEffect, useRef } from 'react';
import {
    View,
    Text,
    Animated,
    StyleSheet,
} from 'react-native';
import { router } from 'expo-router';
import TabssiLogo from '../components/TabssiLogo';

export default function SplashScreen() {
    const bgColor = useRef(new Animated.Value(0)).current;
    const logoOpacity = useRef(new Animated.Value(1)).current;

    const [showPurple, setShowPurple] = React.useState(false);

    useEffect(() => {
        const t1 = setTimeout(() => {
            setShowPurple(true);
        }, 1500);

        const t2 = setTimeout(() => {
            router.replace('/onboarding');
        }, 3000);

        return () => {
            clearTimeout(t1);
            clearTimeout(t2);
        };
    }, []);

    return (
        <View style={[styles.container, { backgroundColor: showPurple ? '#7C3AED' : '#FFFFFF' }]}>
            <View style={styles.center}>
                <TabssiLogo color={showPurple ? '#FFFFFF' : '#7C3AED'} size={64} />
                <Text style={[styles.logo, { color: showPurple ? '#FFFFFF' : '#000000' }]}>
                    Tabssi
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    center: {
        alignItems: 'center',
        gap: 12,
    },
    logo: {
        fontSize: 32,
        fontWeight: 'bold',
        letterSpacing: -0.5,
    },
});
