// app/index.tsx
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Button, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import api from '../src/api';
import { UserDto } from '../src/types';

export default function UsersList() {
  const [users, setUsers] = useState<UserDto[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    fetchUsers();
  }, []);

  //ACTUALIZACIÓN
  async function fetchUsers() {//Para refrescar
    try {
      setLoading(true);
      //Aquí va hacer consulta al controlador
      const res = await api.get<UserDto[]>('/inicio/users');
      setUsers(res.data ?? []);
    } catch (err: unknown) {
      if (err instanceof Error) {
        Alert.alert('Error', 'No se pudo obtener usuarios: ' + err.message);
      } else {
        Alert.alert('Error', 'No se pudo obtener usuarios');
      }
    } finally {
      setLoading(false);
    }
  }
 async function handleDelete(id: number) {
    Alert.alert('Confirmar', '¿Eliminar este usuario?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Eliminar',
        style: 'destructive',
        onPress: async () => {
          try {
            await api.delete(`/inicio/users/${id}`);
            Alert.alert('Eliminado', 'Usuario eliminado');
            fetchUsers(); // refrescar lista
          } catch (err: unknown) {
            Alert.alert('Error', 'No se pudo eliminar el usuario');
          }
        },
      },
    ]);
  }  
  //Item para cada elemento de la lista
  function renderItem({ item }: { item: UserDto }) {
    return (
      <View style={styles.item}>
        <TouchableOpacity style={styles.item} onPress={() => router.push(`/${item.id}`)}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.age}>Edad: {item.age}</Text>
        </TouchableOpacity>
        <View style={styles.actions}>
          <Button title='Editar' onPress={() => router.push(`/${item.id}`)}/>
          <Button title='Elimar' color="#d9534f"
          onPress={() => handleDelete(item.id!)} />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Usuarios</Text>
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList
          data={users}
          keyExtractor={(item) => String(item.id)}
          renderItem={renderItem}
          ListEmptyComponent={<Text style={styles.empty}>No hay usuarios</Text>}
        />
      )}
      <View style={styles.buttons}>
        <Button title="Crear usuario" onPress={() => router.push('/create')} />
        <Button title="Refrescar" onPress={fetchUsers} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 24, fontWeight: '700', marginBottom: 12 },
  item: { padding: 12, borderRadius: 8, backgroundColor: '#f2f2f2', marginBottom: 8 },
  name: { fontSize: 18, fontWeight: '600' },
  age: { fontSize: 14, color: '#555' },
  empty: { textAlign: 'center', marginTop: 20, color: '#666' },
  buttons: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 12 },
  actions: { 
    flexDirection: 'row',
    gap: 8,
    marginLeft: 12,
  }
});