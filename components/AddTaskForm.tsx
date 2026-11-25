import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

interface AddTaskFormProps {
  onAdd: (title: string) => void;
}

// Lomake komponentti, joka sisältää tekstikentän ja painikkeen uuden tehtävän lisäämiseksi
const AddTaskForm = ({ onAdd }: AddTaskFormProps) => {
  const [title, setTitle] = useState('');

  const handleAdd = () => {
    if (title.trim()) {
      onAdd(title.trim());
      setTitle('');
    }
  };

  return (
    <View style={styles.row}>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Add task"
        onSubmitEditing={handleAdd}
      />
      <Button title="Add" onPress={handleAdd} />
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    marginRight: 8,
  },
});

export default AddTaskForm;
