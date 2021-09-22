import React, { useEffect, useState, useContext, useCallback } from "react";
import { StyleSheet, View, FlatList, Image, Dimensions } from "react-native";
import { AddTodo } from "../components/AddTodo";
import { Todo } from "../components/Todo";
import { AppLoader } from "../components/ui/AppLoader";
import { AppText } from "../components/ui/AppText";
import { AppButton } from "../components/ui/AppButton";
import { ScreenContext } from "../context/screen/screenContext";
import { TodoContext } from "../context/todo/todoContext";
import { THEME } from "../theme";

export const MainScreen = () => {
    const { todos, addTodo, removeTodo, fetchTodos, loading, error } = useContext(TodoContext)
    const {changeScreen} = useContext(ScreenContext)
    const [deviceWidth, setDeviceWidth] = useState(Dimensions.get('window').width - THEME.PADDING_HORIZONTAL * 2)

    const loadTodos = useCallback(async () => await fetchTodos(), [fetchTodos])

    useEffect(() => {
        loadTodos()
    }, [])

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
                renderItem={({ item }) => <Todo todo={item} onRemove={removeTodo} onOpen={changeScreen} />}
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

    if (loading) {
        return <AppLoader />
    }

    if (error) {
        return (
            <View style={styles.center}>
                <AppText style={styles.error}>{error}</AppText>
                <AppButton onPress={loadTodos}>Повторить</AppButton>
            </View>
        )
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
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    error: {
        fontSize: 20,
        color: THEME.DANGER_COLOR,
        marginBottom: 15,
    },
});