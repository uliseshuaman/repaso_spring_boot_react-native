// app/index.tsx
/*import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Button, StyleSheet, Text, View } from 'react-native';
import api from '../src/api';

export default function Home() {
  const [mensaje, setMensaje] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    fetchInicio();
  }, []);

  async function fetchInicio() {
    try {
      setLoading(true);
      const res = await api.get<string>('/inicio');
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
      <Text style={styles.title}>Inicio</Text>
      {loading ? <ActivityIndicator size="large" /> : <Text style={styles.msg}>{mensaje}</Text>}
      <View style={styles.row}>
        <Button title="Ir a /primero" onPress={() => router.push('/primero')} />
        <Button title="Ir a /segundo" onPress={() => router.push('/segundo')} />
      </View>
      <View style={{ marginTop: 12 }}>
        <Button title="Refrescar" onPress={fetchInicio} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: '700', marginBottom: 12 },
  msg: { fontSize: 16, marginBottom: 20 },
  row: { flexDirection: 'row', justifyContent: 'space-between', gap: 8 },
}); */

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
  
  function renderItem({ item }: { item: UserDto }) {
    return (
      <TouchableOpacity style={styles.item} onPress={() => router.push(`/${item.id}`)}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.age}>Edad: {item.age}</Text>
      </TouchableOpacity>
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
});