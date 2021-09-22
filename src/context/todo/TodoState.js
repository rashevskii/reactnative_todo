import React, { useContext, useReducer } from "react";
import { Alert } from "react-native";
import { ScreenContext } from "../screen/screenContext";
import { ADD_TODO, CLERA_ERROR, FETCH_TODOS, HIDE_LOADER, REMOVE_TODO, SHOW_ERROR, SHOW_LOADER, UPDATE_TODO } from "../types";
import { TodoContext } from "./todoContext";
import { todoReducer } from './todoReducer'
import {Http} from '../../http'

export const TodoState = ({ children }) => {
  const initialState = {
    todos: [],
    loading: false,
    error: null,
  }
  const { changeScreen } = useContext(ScreenContext)
  const [state, dispatch] = useReducer(todoReducer, initialState)

  const addTodo = async title => {
    clearError()
    try {
      const data = await Http.post('https://todo-app-ef678-default-rtdb.firebaseio.com/todos.json', { title })
      dispatch({ type: ADD_TODO, title, id: data.name })
    } catch (e) {
      showError('Something went wrong...')
    }
    
  }
  const removeTodo = id => {
    const todo = state.todos.find(t => t.id === id)
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
          onPress: async () => {
            changeScreen(null)
            try {
              await Http.delete(`https://todo-app-ef678-default-rtdb.firebaseio.com/todos/${id}.json`)
              dispatch({ type: REMOVE_TODO, id })
            } catch (e) {
              showError('Something went wrong...')
              console.log('Error in removeTodos: ', e);
            }
          },
        },
      ],
      { cancelable: false },
    )
  }
  const fetchTodos = async () => {
    showLoader()
    clearError()
    try {
      const data = await Http.get('https://todo-app-ef678-default-rtdb.firebaseio.com/todos.json')
      const todos = Object.keys(data).map(key => ({ ...data[key], id: key }))
      dispatch({ type: FETCH_TODOS, todos })
    } catch (e) {
      showError('Something went wrong...')
      console.log('Error in fetchTodos: ', e);
    } finally {
      hideLoader()
    }
  }
  const updateTodo = async (id, title) => {
    try {
      await Http.patch(`https://todo-app-ef678-default-rtdb.firebaseio.com/todos/${id}.json`, {title})
      dispatch({ type: UPDATE_TODO, id, title })
    } catch (e) {
      showError('Something went wrong...')
      console.log('Error in updateTodos: ', e);
    }

  }
  const showLoader = () => dispatch({ type: SHOW_LOADER })
  const hideLoader = () => dispatch({ type: HIDE_LOADER })
  const showError = error => dispatch({ type: SHOW_ERROR, error })
  const clearError = () => dispatch({ type: CLERA_ERROR })

  return (
    <TodoContext.Provider
      value={{
        todos: state.todos,
        loading: state.loading,
        error: state.error,
        addTodo,
        removeTodo,
        updateTodo,
        fetchTodos,
      }}
    >
      {children}
    </TodoContext.Provider>)
}