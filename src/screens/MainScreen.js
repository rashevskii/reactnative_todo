import React from "react";
import { StyleSheet, View, FlatList } from "react-native";
import { AddTodo } from "../components/AddTodo";
import { Todo } from "../components/Todo";

export const MainScreen = ({todos, addTodo, removeTodo, openedTodo}) => {
    return (
        <View>
            <AddTodo onSubmit={addTodo} />
            <FlatList
            data={todos}
            renderItem={({ item }) => <Todo todo={item} onRemove={removeTodo} onOpen={openedTodo} />}
            keyExtractor={item => item.id.toString()}
            />
        </View>
    )
};

const styles = StyleSheet.create({});