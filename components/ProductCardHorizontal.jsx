import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { Colors, Radius, Spacing } from '../constants/theme';

export default function ProductCardHorizontal({
    badge,
    imageUrl,
    title,
    price,
    originalPrice,
    width = 160,
}) {
    const widthStyle = width === undefined ? { flex: 1 } : { width };
    return (
        <TouchableOpacity style={[styles.container, widthStyle]} onPress={() => router.push('/product-detail')} activeOpacity={0.8}>
            <Text style={styles.badge}>{badge}</Text>
            <View style={styles.imageContainer}>
                <Image
                    source={{ uri: imageUrl }}
                    style={styles.image}
                    resizeMode="cover"
                />
            </View>
            <View style={styles.footer}>
                <Text style={styles.title} numberOfLines={1}>
                    {title}
                </Text>
                <View style={styles.priceRow}>
                    {originalPrice ? (
                        <Text style={styles.originalPrice}>{originalPrice}</Text>
                    ) : null}
                    <Text style={styles.price}>{price}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.white,
        borderRadius: Radius.lg,
        padding: Spacing.md,
    },
    badge: {
        fontWeight: 'bold',
        fontSize: 13,
        color: '#111',
        marginBottom: Spacing.md,
    },
    imageContainer: {
        alignItems: 'center',
        marginBottom: Spacing.lg,
    },
    image: {
        width: 120,
        height: 80,
        borderRadius: Radius.sm,
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    title: {
        fontWeight: '600',
        fontSize: 14,
        color: '#111',
        flex: 1,
        marginRight: Spacing.xs,
    },
    priceRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    originalPrice: {
        fontSize: 12,
        color: Colors.textGray,
        textDecorationLine: 'line-through',
    },
    price: {
        fontWeight: 'bold',
        fontSize: 14,
        color: '#111',
    },
});
