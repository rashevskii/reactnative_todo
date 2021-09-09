import React, { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View, Alert } from 'react-native';

export const AddTodo = ({ onSubmit }) => {
    const [value, setValue] = useState('')
    const pressHandler = () => {
        if (value.trim()) {
            onSubmit(value);
            setValue('');
        } else {
            Alert.alert('Task name cannot be empty!');
        }
    };

    return (
        <View style={styles.block}>
            <TextInput
                style={styles.input}
                onChangeText={text => setValue(text)}
                value={value}
                placeholder='Enter task name...'
                autoCorrect={false}
                autoCapitalize='none'
            />
            <Button onPress={pressHandler} title='Add Todo' />
        </View>
    )
}

const styles = StyleSheet.create({
    block: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    input: {
        width: '70%',
        borderStyle: 'solid',
        borderBottomWidth: 3,
        borderBottomColor: '#3949ab',
        padding: 10,
    },
});