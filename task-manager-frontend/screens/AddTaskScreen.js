// screens/AddTaskScreen.js
import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import api from '../utils/api';

export default function AddTaskScreen({ navigation, route }) {
  const editingTask = route.params?.task;
  const [title, setTitle] = useState(editingTask?.title || '');
  const [description, setDescription] = useState(editingTask?.description || '');
  const [dueDate, setDueDate] = useState(editingTask?.dueDate ? new Date(editingTask.dueDate).toISOString().split('T')[0] : '');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editingTask) navigation.setOptions({ title: 'Edit Task' });
  }, []);

  const onSave = async () => {
    if (!title.trim()) return Alert.alert('Error', 'Title is required');
    
    setLoading(true);
    try {
      const taskData = { 
        title: title.trim(), 
        description: description.trim(),
        dueDate: dueDate ? new Date(dueDate).toISOString() : null
      };
      
      if (editingTask) {
        await api.put(`/tasks/${editingTask._id}`, taskData);
      } else {
        await api.post('/tasks', taskData);
      }
      navigation.goBack();
    } catch (err) {
      console.error(err);
      const msg = err?.response?.data?.msg || 'Could not save task';
      Alert.alert('Error', msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput placeholder="Title" value={title} onChangeText={setTitle} style={styles.input} />
      <TextInput placeholder="Description (optional)" value={description} onChangeText={setDescription} style={[styles.input, { height: 100 }]} multiline />
      <TextInput 
        placeholder="Due Date (YYYY-MM-DD) - optional" 
        value={dueDate} 
        onChangeText={setDueDate} 
        style={styles.input}
        maxLength={10}
      />
      <TouchableOpacity style={[styles.button, loading && styles.buttonDisabled]} onPress={onSave} disabled={loading}>
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Save</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, flex: 1 },
  input: { borderWidth: 1, borderColor: '#ddd', padding: 12, borderRadius: 8, marginBottom: 12 },
  button: { backgroundColor: '#2e78b7', padding: 12, borderRadius: 8, alignItems: 'center' },
  buttonDisabled: { opacity: 0.7 },
  buttonText: { color: '#fff', fontWeight: '600' }
});
