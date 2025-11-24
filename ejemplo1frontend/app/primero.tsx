// app/primero.tsx
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Button, StyleSheet, Text, View } from 'react-native';
import api from '../src/api';

export default function Primero() {
  const [mensaje, setMensaje] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    fetchPrimero();
  }, []);

  async function fetchPrimero() {
    try {
      setLoading(true);
      const res = await api.get<string>('/inicio/primero');
      setMensaje(res.data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setMensaje('Error al conectar: ' + err.message);
      } else {
        setMensaje('Error al conectar: ' + String(err));
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Primero</Text>
      {loading ? <ActivityIndicator /> : <Text style={styles.msg}>{mensaje}</Text>}
      <Button title="Volver" onPress={() => router.back()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: '700', marginBottom: 12 },
  msg: { fontSize: 16, marginBottom: 20 },
});