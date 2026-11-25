import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import TaskItem from './TaskItem';
import { Task } from '../types';

interface TaskListProps {
  tasks: Task[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

// Lista komponentti, joka renderöi tehtävät FlatListin avulla
// Käytetään SwipeListViewiä, jotta käyttäjä voi pyyhkäistä tehtävän poistaakseen sen
// pyyhkäiseminen vasemmalle paljastaa "Delete" painikkeen
const TaskList = ({ tasks, onToggle, onDelete }: TaskListProps) => (
  <SwipeListView
    data={tasks}
    keyExtractor={item => item.id}
    renderItem={({ item }) => (
      <TaskItem task={item} onToggle={onToggle} />
    )}
    renderHiddenItem={({ item }) => (
      <View style={styles.rowBack}>
        <Button
          title="Delete"
          color="#d11a2a"
          onPress={() => onDelete(item.id)}
        />
      </View>
    )}
    rightOpenValue={-75}
    disableRightSwipe
    style={styles.list}
  />
);

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
  rowBack: {
    backgroundColor: '#ddd',
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingRight: 20,
  },
});

export default TaskList;