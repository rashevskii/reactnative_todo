import React, { useEffect, useState } from "react";
import { StyleSheet, View, FlatList, Image, Dimensions } from "react-native";
import { AddTodo } from "../components/AddTodo";
import { Todo } from "../components/Todo";
import { THEME } from "../theme";

export const MainScreen = ({ todos, addTodo, removeTodo, openedTodo }) => {
    const [deviceWidth, setDeviceWidth] = useState(Dimensions.get('window').width - THEME.PADDING_HORIZONTAL * 2)

    useEffect(() => {
        const update = () => {
            const width = Dimensions.get('window').width - THEME.PADDING_HORIZONTAL * 2
            setDeviceWidth(width)
        }

        const subscription = Dimensions.addEventListener('change', update)

        return () => {
            subscription ? subscription.remove() : null
            // subscription?.remove()
        }
    })

    let content = (
        <View style={{ width: deviceWidth }}>
            <FlatList
                data={todos}
                renderItem={({ item }) => <Todo todo={item} onRemove={removeTodo} onOpen={openedTodo} />}
                keyExtractor={item => item.id.toString()}
            />
        </View>
    )

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