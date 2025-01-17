import { Image, StyleSheet, Platform, Text, SafeAreaView } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';


export default function UploadScreen() {
    return (
        <SafeAreaView>
            <ThemedView>
                <ThemedText>Coucou</ThemedText>
            </ThemedView>
        </SafeAreaView>
    );
}



