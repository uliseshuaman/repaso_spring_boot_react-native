// app/create.tsx
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import api from '../src/api';
import { UserDto } from '../src/types';

export default function CreateUser() {
  const [name, setName] = useState<string>('');
  const [age, setAge] = useState<string>('0');
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  async function handleCreate() {
    if (!name.trim()) {//Si es vacío
      Alert.alert('Validación', 'El nombre es obligatorio');
      return;
    }
    const parsedAge = parseInt(age, 10);
    if (Number.isNaN(parsedAge) || parsedAge < 0) {
      Alert.alert('Validación', 'Edad inválida');
      return;
    }

    const payload: UserDto = { name: name.trim(), age: parsedAge };

    try {
      setLoading(true);
      const res = await api.post<UserDto>('/inicio/users', payload);
      Alert.alert('Creado', `Usuario creado con id ${res.data.id}`);
      router.replace('/'); // volver a la lista que en este caso es index
    } catch (err: unknown) {
      if (err instanceof Error) {
        Alert.alert('Error', 'No se pudo crear: ' + err.message);
      } else {
        Alert.alert('Error', 'No se pudo crear el usuario');
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crear Usuario</Text>
      <TextInput style={styles.input} placeholder="Nombre" value={name} onChangeText={setName} />
      <TextInput
        style={styles.input}
        placeholder="Edad"
        value={age}
        onChangeText={setAge}
        keyboardType="numeric"
      />
      {loading ? <ActivityIndicator /> : <Button title="Crear" onPress={handleCreate} />}
      <View style={{ marginTop: 12 }}>
        <Button title="Cancelar" onPress={() => router.back()} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, justifyContent: 'center' },
  title: { fontSize: 22, fontWeight: '700', marginBottom: 12 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, borderRadius: 6, marginBottom: 10 },
});