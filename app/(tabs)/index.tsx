import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Button, Text, Card } from 'react-native-paper';
import { signOut } from 'firebase/auth';
import { collection, getDocs } from 'firebase/firestore';
import { auth, firestore } from '../../firebaseConfig';
import { useRouter } from 'expo-router';

export default function MainScreen() {
    const router = useRouter();
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const snapshot = await getDocs(collection(firestore, 'Film'));
                const items = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
                setData(items);
            } catch (error) {
                alert(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleLogout = async () => {
        await signOut(auth);
        router.replace('/(auth)/login');
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <Text>Loading...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={data}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <Card style={styles.card}>
                        <Card.Title title={item.title} />
                        <Card.Content>
                            <Text>{item.description}</Text>
                        </Card.Content>
                    </Card>
                )}
            />
            <Button mode="contained" onPress={handleLogout} style={styles.logoutButton}>
                Logout
            </Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 },
    loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    card: { marginBottom: 15 },
    logoutButton: { marginTop: 20 },
});
