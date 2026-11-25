import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AddTaskForm from './components/AddTaskForm';
import TaskList from './components/TaskList';
import { Task } from './types';

const STORAGE_KEY = 'TODO_TASKS';

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([]);

  // Lataa tehtävät AsyncStoragesta sovelluksen käynnistyessä
  useEffect(() => {
    (async () => {
      try {
        const json = await AsyncStorage.getItem(STORAGE_KEY);
        if (json) setTasks(JSON.parse(json));
      } catch (e) {
        console.log('Could not load tasks', e);
      }
    })();
  }, []);

  // Tallentaa tehtävät AsyncStorageen aina kun ne muuttuvat
  useEffect(() => {
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  // Lisää tehtävä: säilytä olemassa olevat kohteet ja lisää uusi objekti
  const addTask = (title: string) => {
    setTasks(prev => [
      ...prev,
      { id: Date.now().toString(), title, done: false },
    ]);
  };

  // Merkkaa tehtävän tehdyksi, jos id vastaa
  const toggleTask = (id: string) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  };

  // Poistaa tehtävän, jos id vastaa
  const removeTask = (id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  return (
    <GestureHandlerRootView style={styles.flex}>
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>TODO</Text>
        <AddTaskForm onAdd={addTask} />
        <TaskList
          tasks={tasks}
          onToggle={toggleTask}
          onDelete={removeTask}
        />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
});
