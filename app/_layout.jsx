import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { LanguageProvider } from '../context/LanguageContext';

export default function RootLayout() {
    return (
        <LanguageProvider>
            <StatusBar style="auto" />
            <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="index" />
                <Stack.Screen name="onboarding" />
                <Stack.Screen name="login" />
                <Stack.Screen name="register" />
                <Stack.Screen name="forgot-password" />
                <Stack.Screen name="reset-password" />
                <Stack.Screen name="verify-identity" />
                <Stack.Screen name="notifications" options={{ headerShown: false }} />
                <Stack.Screen name="(tabs)" />
                <Stack.Screen
                    name="plan-details"
                    options={{
                        headerShown: true,
                        title: 'Plan Details',
                        headerTitleAlign: 'center',
                        headerStyle: { backgroundColor: '#F9FAFB' },
                        headerShadowVisible: false,
                    }}
                />
                <Stack.Screen
                    name="review-payment"
                    options={{
                        headerShown: true,
                        title: 'Review Payment',
                        headerTitleAlign: 'center',
                        headerStyle: { backgroundColor: '#F9FAFB' },
                        headerShadowVisible: false,
                    }}
                />
                <Stack.Screen
                    name="payment-success"
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="market-see-all"
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="search"
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="store"
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="product-detail"
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="checkout"
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="checkout-status"
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="shipping-addresses"
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="shipping-form"
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="edit-profile"
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="add-bank"
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="faq"
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="terms"
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="privacy"
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="security"
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="two-factor"
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="security-reset"
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="security-new-password"
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="language"
                    options={{ headerShown: false }}
                />
            </Stack>
        </LanguageProvider>
    );
}
