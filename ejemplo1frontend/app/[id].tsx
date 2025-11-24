// app/[id].tsx
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import api from '../src/api';
import { UserDto } from '../src/types';

export default function UserDetail() {
  const params = useLocalSearchParams<{ id: string }>();
  const id = params.id;
  const [user, setUser] = useState<UserDto | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [editing, setEditing] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [age, setAge] = useState<string>('0');
  const router = useRouter();

  useEffect(() => {
    if (id) fetchUser();
  }, [id]);

  async function fetchUser() {
    try {
      setLoading(true);
      const res = await api.get<UserDto>(`/inicio/users/${id}`);
      setUser(res.data);
      setName(res.data.name);
      setAge(String(res.data.age));
    } catch (err: unknown) {
      if (err instanceof Error) {
        Alert.alert('Error', 'No se pudo obtener usuario: ' + err.message, [{ text: 'OK', onPress: () => router.back() }]);
      } else {
        Alert.alert('Error', 'No se pudo obtener usuario', [{ text: 'OK', onPress: () => router.back() }]);
      }
    } finally {
      setLoading(false);
    }
  }

  async function handleUpdate() {
    if (!user) return;
    if (!name.trim()) {
      Alert.alert('Validación', 'El nombre es obligatorio');
      return;
    }
    const parsedAge = parseInt(age, 10);
    if (Number.isNaN(parsedAge) || parsedAge < 0) {
      Alert.alert('Validación', 'Edad inválida');
      return;
    }

    const payload: UserDto = { id: user.id ?? undefined, name: name.trim(), age: parsedAge };

    try {
      setLoading(true);
      const res = await api.put<UserDto>(`/inicio/users/${id}`, payload);
      setUser(res.data);
      setEditing(false);
      Alert.alert('Actualizado', 'Usuario actualizado correctamente');
    } catch (err: unknown) {
      if (err instanceof Error) {
        Alert.alert('Error', 'No se pudo actualizar: ' + err.message);
      } else {
        Alert.alert('Error', 'No se pudo actualizar el usuario');
      }
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete() {
    Alert.alert('Confirmar', '¿Eliminar este usuario?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Eliminar',
        style: 'destructive',
        onPress: async () => {
          try {
            setLoading(true);
            await api.delete(`/inicio/users/${id}`);
            Alert.alert('Eliminado', 'Usuario eliminado');
            router.replace('/');
          } catch (err: unknown) {
            if (err instanceof Error) {
              Alert.alert('Error', 'No se pudo eliminar: ' + err.message);
            } else {
              Alert.alert('Error', 'No se pudo eliminar el usuario');
            }
          } finally {
            setLoading(false);
          }
        },
      },
    ]);
  }

  if (loading) return <View style={styles.center}><ActivityIndicator size="large" /></View>;

  if (!user) return <View style={styles.center}><Text>Cargando usuario...</Text></View>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Usuario #{user.id}</Text>

      {editing ? (
        <>
          <TextInput style={styles.input} value={name} onChangeText={setName} />
          <TextInput style={styles.input} value={age} onChangeText={setAge} keyboardType="numeric" />
          <Button title="Guardar" onPress={handleUpdate} />
          <View style={{ marginTop: 8 }}>
            <Button title="Cancelar" onPress={() => { setEditing(false); setName(user.name); setAge(String(user.age)); }} />
          </View>
        </>
      ) : (
        <>
          <Text style={styles.label}>Nombre</Text>
          <Text style={styles.value}>{user.name}</Text>
          <Text style={styles.label}>Edad</Text>
          <Text style={styles.value}>{user.age}</Text>

          <View style={styles.row}>
            <Button title="Editar" onPress={() => setEditing(true)} />
            <Button title="Eliminar" color="#d9534f" onPress={handleDelete} />
          </View>
          <View style={{ marginTop: 8 }}>
            <Button title="Volver" onPress={() => router.back()} />
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 22, fontWeight: '700', marginBottom: 12 },
  label: { fontSize: 14, color: '#666', marginTop: 8 },
  value: { fontSize: 18, marginBottom: 6 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, borderRadius: 6, marginBottom: 10 },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 12 },
});