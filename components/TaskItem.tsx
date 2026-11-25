import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Task } from '../types';

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
}

const TaskItem = ({ task, onToggle }: TaskItemProps) => (
  <TouchableOpacity
    style={styles.row}
    onPress={() => onToggle(task.id)}
    activeOpacity={0.7}
  >
    <Text style={[styles.title, task.done && styles.done]}>
      {task.title}
    </Text>
    <Text style={task.done ? styles.statusDone : styles.statusNotDone}>
      {task.done ? 'Done ✓' : 'Not done'}
    </Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    borderBottomWidth: 1,
    borderColor: '#eee',
    padding: 16,
  },
  title: {
    fontSize: 16,
    flex: 1,
  },
  done: {
    textDecorationLine: 'line-through',
    color: '#888',
  },
  statusNotDone: {
    color: '#999',
    fontSize: 12,
  },
  statusDone: {
    color: 'green',
    fontSize: 12,
  },
});

export default TaskItem;