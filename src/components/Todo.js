import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

export const Todo = ({todo, onRemove, onOpen}) => {
    return (
        <TouchableOpacity 
            activeOpacity={0.5}
            onPress={() => onOpen(todo.id)}
            onLongPress={() => onRemove(todo.id)}
        >
            <View style={styles.todo}>
                <Text>{todo.title}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    todo: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderWidth: 2,
        borderColor: '#eee',
        marginBottom: 7,
    }
});