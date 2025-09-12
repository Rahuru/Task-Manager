// components/TaskItem.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function TaskItem({ item, onToggle, onEdit, onDelete }) {
  const formatDate = (dateString) => {
    if (!dateString) return null;
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString();
    } catch {
      return null;
    }
  };

  const isOverdue = item.dueDate && !item.completed && new Date(item.dueDate) < new Date();

  return (
    <View style={[styles.container, item.completed && styles.completed, isOverdue && styles.overdue]}>
      <View style={{ flex: 1 }}>
        <Text style={[styles.title, item.completed && styles.titleCompleted]}>{item.title}</Text>
        {item.description ? <Text style={styles.desc}>{item.description}</Text> : null}
        {item.dueDate && (
          <Text style={[styles.dueDate, isOverdue && styles.overdueBadge]}>Due: {formatDate(item.dueDate)}</Text>
        )}
      </View>

      <View style={styles.actions}>
        <TouchableOpacity onPress={() => onToggle(item)} style={styles.actionBtn}>
          <Text>{item.completed ? 'Undo' : 'Done'}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onEdit(item)} style={styles.actionBtn}>
          <Text>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onDelete(item)} style={styles.actionBtn}>
          <Text style={{ color: 'red' }}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row', padding: 12, borderRadius: 8, backgroundColor: '#fff', marginBottom: 10, alignItems: 'center', elevation: 1 },
  completed: { opacity: 0.7 },
  overdue: { borderLeftWidth: 4, borderLeftColor: '#f44336' },
  title: { fontSize: 16, fontWeight: '600' },
  titleCompleted: { textDecorationLine: 'line-through', color: '#4caf50' },
  desc: { color: '#444', marginTop: 4 },
  dueDate: { color: '#666', fontSize: 12, marginTop: 4 },
  overdueBadge: { color: '#f44336', fontWeight: '600' },
  actions: { flexDirection: 'row', marginLeft: 8 },
  actionBtn: { marginLeft: 8, padding: 6 }
});
