import React from "react";
import { StyleSheet, View, FlatList, Image } from "react-native";
import { AddTodo } from "../components/AddTodo";
import { Todo } from "../components/Todo";

export const MainScreen = ({ todos, addTodo, removeTodo, openedTodo }) => {
    let content = (<FlatList
        data={todos}
        renderItem={({ item }) => <Todo todo={item} onRemove={removeTodo} onOpen={openedTodo} />}
        keyExtractor={item => item.id.toString()}
    />)

    if (!todos.length) {
        content = <View style={styles.imgWrap} >
            <Image
                source={require('../../assets/no-items.png')}
                style={styles.image}
                resizeMode='contain'
            />
        </View>
    }

    return (
        <View>
            <AddTodo onSubmit={addTodo} />
            {content}
        </View>
    )
};

const styles = StyleSheet.create({
    imgWrap: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        height: 300,
    },
    image: {
        width: '100%',
        height: '100%',
    }
});