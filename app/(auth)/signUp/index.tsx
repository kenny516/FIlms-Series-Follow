import React, { useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform, Dimensions } from 'react-native';
import { Button, TextInput, useTheme, Text } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../firebaseConfig';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const customColors = {
    light: {
        primary: '#2563EB',
        secondary: '#64748B',
        background: ['#FFFFFF', '#F8FAFC'],
        text: '#0F172A',
        border: '#E2E8F0',
        error: '#EF4444',
    },
    dark: {
        primary: '#3B82F6',
        secondary: '#94A3B8',
        background: ['#0F172A', '#1E293B'],
        text: '#F8FAFC',
        border: '#334155',
        error: '#DC2626',
    }
};

export default function SignupScreen() {
    const router = useRouter();
    const theme = useTheme();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const colors = theme.dark ? customColors.dark : customColors.light;

    const handleSignup = async () => {
        setLoading(true);
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            router.replace('/(tabs)');
        } catch (error) {
            alert(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <StatusBar style={theme.dark ? 'light' : 'dark'} />
            <LinearGradient
                colors={colors.background}
                style={styles.gradient}
            >
                <View style={styles.contentContainer}>
                    <View style={styles.headerContainer}>
                        <Text
                            variant="displaySmall"
                            style={[styles.title, { color: colors.text }]}
                        >
                            Create Account
                        </Text>
                        <Text
                            variant="titleMedium"
                            style={[styles.subtitle, { color: colors.secondary }]}
                        >
                            Join us today
                        </Text>
                    </View>

                    <View style={styles.formContainer}>
                        <TextInput
                            label="Email"
                            value={email}
                            onChangeText={setEmail}
                            style={[styles.input, { backgroundColor: 'transparent' }]}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            mode="outlined"
                            left={<TextInput.Icon icon="email-outline" color={colors.secondary} />}
                            outlineColor={colors.border}
                            activeOutlineColor={colors.primary}
                            textColor={colors.text}
                            theme={{
                                colors: {
                                    primary: colors.primary,
                                    text: colors.text,
                                    placeholder: colors.secondary,
                                }
                            }}
                        />
                        <TextInput
                            label="Password"
                            value={password}
                            onChangeText={setPassword}
                            style={[styles.input, { backgroundColor: 'transparent' }]}
                            secureTextEntry={!showPassword}
                            mode="outlined"
                            left={<TextInput.Icon icon="lock-outline" color={colors.secondary} />}
                            right={
                                <TextInput.Icon
                                    icon={showPassword ? "eye-off" : "eye"}
                                    onPress={() => setShowPassword(!showPassword)}
                                    color={colors.secondary}
                                />
                            }
                            outlineColor={colors.border}
                            activeOutlineColor={colors.primary}
                            textColor={colors.text}
                            theme={{
                                colors: {
                                    primary: colors.primary,
                                    text: colors.text,
                                    placeholder: colors.secondary,
                                }
                            }}
                        />

                        <Button
                            mode="contained"
                            onPress={handleSignup}
                            loading={loading}
                            style={[styles.button, { backgroundColor: colors.primary }]}
                            contentStyle={styles.buttonContent}
                            labelStyle={{ color: '#FFFFFF' }}
                        >
                            Create Account
                        </Button>

                        <Text style={[styles.divider, { color: colors.secondary }]}>or</Text>

                        <Button
                            mode="outlined"
                            onPress={() => router.push('/(auth)/login')}
                            style={[styles.loginButton, { borderColor: colors.border }]}
                            textColor={colors.primary}
                        >
                            Already have an account? Login
                        </Button>
                    </View>
                </View>
            </LinearGradient>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    gradient: {
        flex: 1,
    },
    contentContainer: {
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: 60,
        justifyContent: 'center',
    },
    headerContainer: {
        marginBottom: 48,
    },
    title: {
        textAlign: 'center',
        fontWeight: '700',
        marginBottom: 8,
        letterSpacing: 0.5,
    },
    subtitle: {
        textAlign: 'center',
        letterSpacing: 0.25,
    },
    formContainer: {
        width: '100%',
        maxWidth: Math.min(400, width - 48),
        alignSelf: 'center',
    },
    input: {
        marginBottom: 16,
    },
    button: {
        marginTop: 24,
        borderRadius: 12,
        elevation: 0,
    },
    buttonContent: {
        paddingVertical: 8,
        height: 56,
    },
    divider: {
        textAlign: 'center',
        marginVertical: 24,
        opacity: 0.7,
    },
    loginButton: {
        borderRadius: 12,
        borderWidth: 1.5,
    }
});