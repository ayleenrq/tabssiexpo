import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    ScrollView,
    TextInput,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Colors, Radius, Spacing } from '../constants/theme';

export default function EditProfileScreen() {
    const [gender, setGender] = useState('Male');

    return (
        <SafeAreaView style={s.safe}>
            <KeyboardAvoidingView 
                style={{ flex: 1 }} 
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            >
                {/* Header */}
                <View style={s.header}>
                    <TouchableOpacity style={s.iconBtn} onPress={() => router.back()}>
                        <Ionicons name="arrow-back" size={22} color="#111" />
                    </TouchableOpacity>
                    <Text style={s.headerTitle}>Edit Profile</Text>
                    <View style={{ width: 40 }} />
                </View>

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={s.scroll}>
                    
                    {/* Avatar Upload */}
                    <View style={s.avatarContainer}>
                        <View style={s.avatarWrapper}>
                            <Image source={{ uri: 'https://i.pravatar.cc/150?img=11' }} style={s.avatar} />
                            <TouchableOpacity style={s.cameraBadge}>
                                <Ionicons name="camera" size={14} color={Colors.white} />
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Form Fields */}
                    
                    {/* Full Name */}
                    <View style={s.inputGroup}>
                        <Text style={s.label}>Full name</Text>
                        <TextInput
                            style={s.input}
                            value="Ali Muhajirin"
                            placeholderTextColor={Colors.textLight}
                        />
                    </View>

                    {/* Phone/Email */}
                    <View style={s.inputGroup}>
                        <Text style={s.label}>Phone Number / Email</Text>
                        <TextInput
                            style={s.input}
                            placeholder="Enter phone or email"
                            placeholderTextColor={Colors.textLight}
                        />
                    </View>

                    {/* Gender */}
                    <View style={s.inputGroup}>
                        <Text style={s.label}>Gender</Text>
                        <View style={s.genderRow}>
                            <TouchableOpacity 
                                style={[s.genderBtn, gender === 'Male' && s.genderBtnActive]} 
                                onPress={() => setGender('Male')}
                            >
                                <Text style={[s.genderText, gender === 'Male' && s.genderTextActive]}>Male</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                style={[s.genderBtn, gender === 'Female' && s.genderBtnActive]} 
                                onPress={() => setGender('Female')}
                            >
                                <Text style={[s.genderText, gender === 'Female' && s.genderTextActive]}>Female</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Email */}
                    <View style={s.inputGroup}>
                        <Text style={s.label}>Email</Text>
                        <TextInput
                            style={s.input}
                            value="HelloAli@gmail.com"
                            placeholderTextColor={Colors.textLight}
                            keyboardType="email-address"
                        />
                    </View>

                    {/* Phone */}
                    <View style={s.inputGroup}>
                        <Text style={s.label}>Phone</Text>
                        <TextInput
                            style={s.input}
                            value="+1 (555) 123-4567"
                            placeholderTextColor={Colors.textLight}
                            keyboardType="phone-pad"
                        />
                    </View>

                    {/* Address */}
                    <View style={s.inputGroup}>
                        <Text style={s.label}>Address</Text>
                        <TextInput
                            style={[s.input, { minHeight: 80, textAlignVertical: 'top', paddingTop: 14 }]}
                            value="123 Main Street, Apt 4B&#10;New York, NY 10001"
                            multiline
                            numberOfLines={3}
                        />
                    </View>

                    {/* Government ID Upload */}
                    <View style={s.inputGroup}>
                        <Text style={s.label}>Government ID</Text>
                        <TouchableOpacity style={s.uploadBox} activeOpacity={0.7}>
                            <Ionicons name="arrow-up-circle-outline" size={32} color="#666" style={{ marginBottom: 8 }} />
                            <Text style={s.uploadTitle}>Upload your ID document</Text>
                            <Text style={s.uploadSub}>Supported formats: JPG, PNG, PDF</Text>
                        </TouchableOpacity>
                    </View>

                    {/* ID Number */}
                    <View style={s.inputGroup}>
                        <Text style={s.label}>ID Number <Text style={s.asterisk}>*</Text></Text>
                        <TextInput
                            style={s.input}
                            value="3578012345678910"
                            placeholderTextColor={Colors.textLight}
                            keyboardType="number-pad"
                        />
                    </View>

                    <View style={{ height: 20 }} />
                </ScrollView>

                {/* Bottom Bar */}
                <View style={s.bottomContainer}>
                    <TouchableOpacity style={s.saveBtn} onPress={() => router.back()}>
                        <Text style={s.saveBtnText}>Save Changes</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
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
        borderRadius: Radius.full,
        backgroundColor: Colors.white,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerTitle: { fontSize: 16, fontWeight: 'bold', color: '#111' },
    
    scroll: { paddingHorizontal: Spacing.xl, paddingBottom: 20, paddingTop: 10 },

    // Avatar
    avatarContainer: {
        alignItems: 'center',
        marginBottom: Spacing.xxl,
    },
    avatarWrapper: {
        position: 'relative',
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#E8D4FF',
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatar: {
        width: 90,
        height: 90,
        borderRadius: 45,
    },
    cameraBadge: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: '#8B5CF6',
        width: 28,
        height: 28,
        borderRadius: 14,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: Colors.backgroundGray,
    },

    // Form
    inputGroup: { marginBottom: Spacing.lg },
    label: { fontSize: 13, fontWeight: 'bold', color: '#111', marginBottom: 8 },
    asterisk: { color: Colors.red },
    input: {
        backgroundColor: Colors.white,
        borderRadius: Radius.md,
        paddingHorizontal: 16,
        paddingVertical: 14,
        fontSize: 14,
        color: '#111',
        borderWidth: 1,
        borderColor: '#F3F4F6',
    },

    // Gender
    genderRow: {
        flexDirection: 'row',
        backgroundColor: Colors.white,
        borderRadius: Radius.md,
        padding: 4,
        borderWidth: 1,
        borderColor: '#F3F4F6',
    },
    genderBtn: {
        flex: 1,
        paddingVertical: 10,
        alignItems: 'center',
        borderRadius: Radius.sm,
    },
    genderBtnActive: {
        backgroundColor: '#F3F4F6',
    },
    genderText: { fontSize: 14, color: Colors.textGray, fontWeight: '500' },
    genderTextActive: { color: '#111', fontWeight: 'bold' },

    // Upload Box
    uploadBox: {
        borderWidth: 1,
        borderStyle: 'dashed',
        borderColor: '#D1D5DB',
        borderRadius: Radius.md,
        padding: Spacing.xl,
        alignItems: 'center',
        backgroundColor: Colors.white,
    },
    uploadTitle: { fontSize: 14, fontWeight: '500', color: '#111', marginBottom: 4 },
    uploadSub: { fontSize: 12, color: Colors.textGray },

    // Bottom
    bottomContainer: {
        padding: Spacing.xl,
    },
    saveBtn: {
        backgroundColor: Colors.almostBlack,
        paddingVertical: 16,
        borderRadius: Radius.md,
        alignItems: 'center',
    },
    saveBtnText: { color: Colors.white, fontSize: 16, fontWeight: 'bold' },
});
