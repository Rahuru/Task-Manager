// screens/TaskListScreen.js
import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity, Text, Alert } from 'react-native';
import api from '../utils/api';
import TaskItem from '../components/TaskItem';
import { removeToken, getToken } from '../utils/auth';

export default function TaskListScreen({ navigation }) {
  const [tasks, setTasks] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [filter, setFilter] = useState('all'); // 'all', 'pending', 'completed'

  const loadTasks = async () => {
    setRefreshing(true);
    try {
      const res = await api.get('/tasks');
      setTasks(res.data);
    } catch (err) {
      console.error(err);
      const status = err?.response?.status;
      if (status === 401) {
        Alert.alert('Session expired', 'Please login again.');
        await removeToken();
        navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
        return;
      }
      Alert.alert('Error', 'Could not load tasks');
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    const onFocus = navigation.addListener('focus', async () => {
      const token = await getToken();
      if (!token) {
        navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
        return;
      }
      loadTasks();
    });
    // Initial check
    (async () => {
      const token = await getToken();
      if (!token) {
        navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
        return;
      }
      loadTasks();
    })();
    return onFocus;
  }, [navigation]);

  const onToggle = async (task) => {
    try {
      await api.put(`/tasks/${task._id}`, { completed: !task.completed });
      loadTasks();
    } catch (err) {
      console.error(err);
      Alert.alert('Error', 'Could not update task');
    }
  };

  const onEdit = (task) => {
    navigation.navigate('AddTask', { task });
  };

  const onDelete = (task) => {
    Alert.alert('Confirm', 'Delete this task?', [
      { text: 'Cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          try {
            await api.delete(`/tasks/${task._id}`);
            loadTasks();
          } catch (err) {
            console.error(err);
            Alert.alert('Error', 'Could not delete task');
          }
        }
      }
    ]);
  };

  const onAdd = () => navigation.navigate('AddTask');

  const onLogout = async () => {
    await removeToken();
    navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'pending') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true; // 'all'
  });

  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <TouchableOpacity style={styles.btn} onPress={onAdd}><Text style={styles.btnText}>+ Add</Text></TouchableOpacity>
        <TouchableOpacity style={[styles.btn, { backgroundColor: '#ef5350' }]} onPress={onLogout}><Text style={styles.btnText}>Logout</Text></TouchableOpacity>
      </View>

      <View style={styles.filterRow}>
        <TouchableOpacity 
          style={[styles.filterBtn, filter === 'all' && styles.filterBtnActive]} 
          onPress={() => setFilter('all')}
        >
          <Text style={[styles.filterText, filter === 'all' && styles.filterTextActive]}>All ({tasks.length})</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.filterBtn, filter === 'pending' && styles.filterBtnActive]} 
          onPress={() => setFilter('pending')}
        >
          <Text style={[styles.filterText, filter === 'pending' && styles.filterTextActive]}>Pending ({tasks.filter(t => !t.completed).length})</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.filterBtn, filter === 'completed' && styles.filterBtnActive]} 
          onPress={() => setFilter('completed')}
        >
          <Text style={[styles.filterText, filter === 'completed' && styles.filterTextActive]}>Completed ({tasks.filter(t => t.completed).length})</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredTasks}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => <TaskItem item={item} onToggle={onToggle} onEdit={onEdit} onDelete={onDelete} />}
        contentContainerStyle={{ padding: 12 }}
        refreshing={refreshing}
        onRefresh={loadTasks}
        ListEmptyComponent={<Text style={{ textAlign: 'center', marginTop: 20 }}>No tasks yet</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  topRow: { flexDirection: 'row', justifyContent: 'space-between', padding: 12 },
  btn: { backgroundColor: '#2e78b7', padding: 10, borderRadius: 8 },
  btnText: { color: '#fff', fontWeight: '600' },
  filterRow: { flexDirection: 'row', paddingHorizontal: 12, paddingBottom: 8 },
  filterBtn: { flex: 1, padding: 8, marginHorizontal: 2, borderRadius: 6, backgroundColor: '#f0f0f0', alignItems: 'center' },
  filterBtnActive: { backgroundColor: '#2e78b7' },
  filterText: { fontSize: 12, color: '#666' },
  filterTextActive: { color: '#fff', fontWeight: '600' }
});
