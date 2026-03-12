import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Colors, Radius, Spacing } from '../constants/theme';

const REVIEWS = [
    {
        id: '1',
        name: 'John Doe',
        avatar: 'https://i.pravatar.cc/100?img=12',
        rating: 5,
        date: '2 days ago',
        comment: 'Absolutely love this product! The quality is amazing and it arrived right on time. Highly recommended for anyone looking for a premium device.',
    },
    {
        id: '2',
        name: 'Sarah Smith',
        avatar: 'https://i.pravatar.cc/100?img=5',
        rating: 4,
        date: '1 week ago',
        comment: 'Great product overall. The display is stunning and the battery life is pretty good. Just wish the color was slightly darker.',
    },
    {
        id: '3',
        name: 'Mike Johnson',
        avatar: 'https://i.pravatar.cc/100?img=68',
        rating: 5,
        date: '2 weeks ago',
        comment: 'Best purchase Ive made this year. Easy to use, feels amazing in hand, and the camera quality is top tier.',
    },
    {
        id: '4',
        name: 'Emily Chen',
        avatar: 'https://i.pravatar.cc/100?img=20',
        rating: 4,
        date: '1 month ago',
        comment: 'Good value for money. Tabssi installment plan made it very affordable for me to buy this.',
    },
];

function StarRating({ rating }) {
    return (
        <View style={s.starRow}>
            {[1, 2, 3, 4, 5].map((star) => (
                <Ionicons
                    key={star}
                    name={star <= rating ? 'star' : 'star-outline'}
                    size={16}
                    color={star <= rating ? '#F59E0B' : '#E5E7EB'} // Yellow for active
                />
            ))}
        </View>
    );
}

export default function ReviewsScreen() {
    return (
        <SafeAreaView style={s.safe}>
            {/* Header */}
            <View style={s.header}>
                <TouchableOpacity style={s.iconBtn} onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={22} color="#111" />
                </TouchableOpacity>
                <Text style={s.headerTitle}>Ratings & Reviews</Text>
                <View style={[s.iconBtn, { opacity: 0 }]} />
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={s.scroll}>
                {/* Summary Section */}
                <View style={s.summaryCard}>
                    <View style={s.summaryLeft}>
                        <Text style={s.summaryScore}>4.8</Text>
                        <StarRating rating={5} />
                        <Text style={s.summaryCount}>Based on 124 reviews</Text>
                    </View>
                    <View style={s.summaryRight}>
                        <View style={s.barRow}>
                            <Text style={s.barText}>5</Text>
                            <Ionicons name="star" size={10} color="#F59E0B" />
                            <View style={s.barBg}><View style={[s.barFill, { width: '85%' }]} /></View>
                        </View>
                        <View style={s.barRow}>
                            <Text style={s.barText}>4</Text>
                            <Ionicons name="star" size={10} color="#F59E0B" />
                            <View style={s.barBg}><View style={[s.barFill, { width: '10%' }]} /></View>
                        </View>
                        <View style={s.barRow}>
                            <Text style={s.barText}>3</Text>
                            <Ionicons name="star" size={10} color="#F59E0B" />
                            <View style={s.barBg}><View style={[s.barFill, { width: '3%' }]} /></View>
                        </View>
                        <View style={s.barRow}>
                            <Text style={s.barText}>2</Text>
                            <Ionicons name="star" size={10} color="#F59E0B" />
                            <View style={s.barBg}><View style={[s.barFill, { width: '1%' }]} /></View>
                        </View>
                        <View style={s.barRow}>
                            <Text style={s.barText}>1</Text>
                            <Ionicons name="star" size={10} color="#F59E0B" />
                            <View style={s.barBg}><View style={[s.barFill, { width: '1%' }]} /></View>
                        </View>
                    </View>
                </View>

                {/* Review List */}
                <View style={s.reviewList}>
                    {REVIEWS.map((review) => (
                        <View key={review.id} style={s.reviewCard}>
                            <View style={s.reviewHeader}>
                                <Image source={{ uri: review.avatar }} style={s.avatar} />
                                <View style={s.reviewerInfo}>
                                    <Text style={s.reviewerName}>{review.name}</Text>
                                    <StarRating rating={review.rating} />
                                </View>
                                <Text style={s.reviewDate}>{review.date}</Text>
                            </View>
                            <Text style={s.commentText}>{review.comment}</Text>
                        </View>
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
        backgroundColor: Colors.backgroundGray,
    },
    headerTitle: { fontSize: 16, fontWeight: 'bold', color: '#111' },
    iconBtn: {
        width: 40,
        height: 40,
        borderRadius: Radius.sm,
        backgroundColor: Colors.white,
        borderWidth: 1,
        borderColor: '#E5E7EB',
        alignItems: 'center',
        justifyContent: 'center',
    },
    scroll: {
        paddingBottom: Spacing.xxl,
    },
    summaryCard: {
        backgroundColor: Colors.white,
        marginHorizontal: Spacing.xl,
        borderRadius: Radius.lg,
        padding: Spacing.lg,
        flexDirection: 'row',
        marginBottom: Spacing.xl,
        borderWidth: 1,
        borderColor: '#F3F4F6',
    },
    summaryLeft: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRightWidth: 1,
        borderRightColor: '#E5E7EB',
        paddingRight: Spacing.md,
    },
    summaryScore: {
        fontSize: 36,
        fontWeight: 'bold',
        color: '#111',
        marginBottom: 4,
    },
    summaryCount: {
        fontSize: 11,
        color: Colors.textGray,
        marginTop: 6,
    },
    starRow: {
        flexDirection: 'row',
        gap: 2,
    },
    summaryRight: {
        flex: 1.5,
        paddingLeft: Spacing.md,
        justifyContent: 'center',
        gap: 4,
    },
    barRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    barText: {
        fontSize: 11,
        fontWeight: '600',
        color: '#444',
        width: 8,
    },
    barBg: {
        flex: 1,
        height: 6,
        backgroundColor: '#F3F4F6',
        borderRadius: 3,
        overflow: 'hidden',
    },
    barFill: {
        height: '100%',
        backgroundColor: '#8B5CF6',
        borderRadius: 3,
    },
    reviewList: {
        paddingHorizontal: Spacing.xl,
        gap: Spacing.md,
    },
    reviewCard: {
        backgroundColor: Colors.white,
        borderRadius: Radius.lg,
        padding: Spacing.lg,
        borderWidth: 1,
        borderColor: '#F3F4F6',
    },
    reviewHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: Spacing.md,
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#E5E7EB',
    },
    reviewerInfo: {
        flex: 1,
        paddingLeft: 12,
    },
    reviewerName: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#111',
        marginBottom: 2,
    },
    reviewDate: {
        fontSize: 12,
        color: Colors.textGray,
    },
    commentText: {
        fontSize: 13,
        color: '#444',
        lineHeight: 20,
    },
});
