// dentro de app/index.tsx (o componente separado)
import { useRouter } from 'expo-router';
import React from 'react';
import {
    Button,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { UserDto } from '../src/types';

function renderItem({ item }: { item: UserDto & any }) {
  const router = useRouter();

  // Valores por defecto si no existen en el DTO
  const avatar = item.avatar ?? undefined; // url o require(...)
  const rating = item.rating ?? 0;
  const reviews = item.reviews ?? 0;
  const completed = item.completed ?? 0;
  const hourlyRate = item.hourlyRate ?? item.rate ?? null;
  const repeatClients = item.repeatClients ?? 0;
  const minReservation = item.minReservation ?? null;  

  return (
    <View style={styles.card}>
      <TouchableOpacity
        style={styles.left}
        onPress={() => router.push(`/${item.id}`)}
        activeOpacity={0.8}
      >
        <View style={styles.avatarWrap}>
          {avatar ? (
            <Image source={{ uri: avatar }} style={styles.avatar} />
          ) : (
            <View style={styles.avatarPlaceholder}>
              <Text style={styles.avatarInitial}>
                {item.name ? item.name.charAt(0).toUpperCase() : '?'}
              </Text>
            </View>
          )}
          {item.verified && <View style={styles.verifiedBadge}><Text style={styles.verifiedText}>✓</Text></View>}
          <TouchableOpacity style={styles.heart}>
            <Text style={styles.heartText}>♡</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.info}>
          <View style={styles.row}>
            <Text style={styles.name}>{item.name}</Text>
            {item.verified && <Text style={styles.verifiedLabel}>Verificado</Text>}
          </View>

          <View style={styles.rowSmall}>
            <Text style={styles.rating}>★ {rating.toFixed(1)}</Text>
            <Text style={styles.muted}> · {reviews} reseñas</Text>
            <Text style={styles.muted}> · {completed} servicios</Text>
          </View>

          <Text style={styles.desc} numberOfLines={2}>
            {item.description ?? 'Sin descripción.'}
          </Text>

          <View style={styles.metaRow}>
            {hourlyRate !== null && <Text style={styles.price}>{hourlyRate}€ / h</Text>}
            <Text style={styles.meta}>Repetición: {repeatClients}</Text>
            {minReservation !== null && <Text style={styles.meta}>Mín: {minReservation}€</Text>}
          </View>
        </View>
      </TouchableOpacity>

      <View style={styles.actions}>
        <Button title="Editar" onPress={() => router.push(`/${item.id}`)} />
        <View style={{ height: 8 }} />
        <Button title="Eliminar" color="#d9534f" onPress={() => handleDelete(item.id!)} />
      </View>
    </View>
  );
}

// Asegúrate de que handleDelete esté en el scope del componente padre
// o pásalo como prop al componente que renderiza el item.

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    padding: 12,
    borderRadius: 10,
    backgroundColor: '#fff',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    marginBottom: 12,
    alignItems: 'center',
  },
  left: { flex: 1, flexDirection: 'row', alignItems: 'flex-start' },
  avatarWrap: { width: 84, height: 84, marginRight: 12, position: 'relative' },
  avatar: { width: 84, height: 84, borderRadius: 10, resizeMode: 'cover' },
  avatarPlaceholder: {
    width: 84,
    height: 84,
    borderRadius: 10,
    backgroundColor: '#e6e6e6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarInitial: { fontSize: 28, fontWeight: '700', color: '#666' },
  verifiedBadge: {
    position: 'absolute',
    bottom: 4,
    left: 4,
    backgroundColor: '#0a84ff',
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  verifiedText: { color: '#fff', fontSize: 12, fontWeight: '700' },
  heart: {
    position: 'absolute',
    top: -6,
    right: -6,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 4,
    elevation: 3,
  },
  heartText: { color: '#e74c3c', fontSize: 14 },
  info: { flex: 1, paddingRight: 8 },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  rowSmall: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
  name: { fontSize: 16, fontWeight: '700', color: '#222' },
  verifiedLabel: { fontSize: 12, color: '#0a84ff', marginLeft: 8 },
  rating: { fontSize: 13, color: '#f1c40f', fontWeight: '700' },
  muted: { fontSize: 12, color: '#777', marginLeft: 6 },
  desc: { marginTop: 6, fontSize: 13, color: '#444' },
  metaRow: { flexDirection: 'row', alignItems: 'center', marginTop: 8, flexWrap: 'wrap' },
  price: { fontSize: 14, fontWeight: '700', color: '#111', marginRight: 12 },
  meta: { fontSize: 12, color: '#666', marginRight: 12 },
  actions: { width: 92, justifyContent: 'center' },
});

export default renderItem;