import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import { Navbar } from './src/components/Navbar';
import { MainScreen } from './src/screens/MainScreen';
import { TodoScreen } from './src/screens/TodoScreen';

export default function App() {
  const [todoId, setTodoId] = useState('2');
  const [todos, setTodos] = useState([
    { id: '1', title: 'Изучить react-native' },
    { id: '2', title: 'Написать приложение' },
  ]);

  const addTodo = (title) => {
    setTodos(prev => [...prev, {
      id: Date.now().toString(),
      title
    }])
  }

  const removeTodo = id => {
    const todo = todos.find(todo => id === todo.id)
    Alert.alert(
      "Remove todo",
      `Are you sure to remove "${todo.title}"`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Remove",
          onPress: () => {
            setTodoId(null)
            setTodos(prevState => prevState.filter(todo => todo.id !== id))
          },
        },
      ],
      { cancelable: false },
    )
  }

  const updateTodo = (id, title) => {
    setTodos(old => 
      old.map(todo => {
        if (todo.id === id) {
          todo.title = title
        }
        return todo
      })
    )
  }

  let content = (
    <MainScreen
      todos={todos}
      addTodo={addTodo}
      removeTodo={removeTodo}
      openedTodo={setTodoId} />
  )

  if (todoId) {
    const currentTodo = todos.find(todo => todo.id === todoId);
    content = <TodoScreen
      onRemove={removeTodo}
      goBack={() => { setTodoId(null) }}
      todo={currentTodo}
      onSave={updateTodo}
    />
  }
  return (
    <View>
      <Navbar title="Todo App" />
      <View style={styles.container}>{content}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
});
