import React, { useContext, useState } from "react";
import { View, StyleSheet } from 'react-native';
import { Navbar } from './components/Navbar';
import { THEME } from './theme';
import { MainScreen } from './screens/MainScreen';
import { TodoScreen } from './screens/TodoScreen';
import { TodoContext } from "./context/todo/todoContext";

export const MainLayout = () => {
  const {todos, addTodo, removeTodo, updateTodo} = useContext(TodoContext)
  const [todoId, setTodoId] = useState(null);
  // const [todos, setTodos] = useState([]);

  // const addTodo = (title) => {
  //   setTodos(prev => [...prev, {
  //     id: Date.now().toString(),
  //     title
  //   }])
  // }

  // const removeTodo = id => {
  //   const todo = todos.find(todo => id === todo.id)
  //   Alert.alert(
  //     "Remove todo",
  //     `Are you sure to remove "${todo.title}"`,
  //     [
  //       {
  //         text: "Cancel",
  //         style: "cancel",
  //       },
  //       {
  //         text: "Remove",
  //         onPress: () => {
  //           setTodoId(null)
  //           setTodos(prevState => prevState.filter(todo => todo.id !== id))
  //         },
  //       },
  //     ],
  //     { cancelable: false },
  //   )
  // }

  // const updateTodo = (id, title) => {
  //   setTodos(old =>
  //     old.map(todo => {
  //       if (todo.id === id) {
  //         todo.title = title
  //       }
  //       return todo
  //     })
  //   )
  // }

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
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: THEME.PADDING_HORIZONTAL,
    paddingVertical: 20,
  },
});