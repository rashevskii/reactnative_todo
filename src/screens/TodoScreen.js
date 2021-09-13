import React, { useState } from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import { EditModal } from "../components/EditModal";
import { AppCard } from "../components/ui/AppCard";
import { THEME } from "../theme";

export const TodoScreen = ({ goBack, todo, onRemove, onSave }) => {
    const [modal, setModal] = useState(false)

    const saveHandler = title => {
        onSave(todo.id, title)
        setModal(false)
    }

    return (
        <View>
            <EditModal 
                visible={modal} 
                onCancel={() => setModal(false)} 
                todo={todo.title} 
                onSave={saveHandler} 
            />
            <AppCard>
                <Text style={styles.title} >{todo.title}</Text>
                <View style={styles.editButton}>
                    <Button title="Edit" onPress={() => setModal(true)} />
                </View>
            </AppCard>
            <View style={styles.buttons}>
                <View style={styles.button}>
                    <Button
                        color={THEME.GREY_COLOR}
                        title="Back"
                        onPress={goBack}
                    />
                </View>
                <View style={styles.button}>
                    <Button
                        color={THEME.DANGER_COLOR}
                        title="Delete"
                        onPress={() => { onRemove(todo.id) }}
                    />
                </View>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    button: {
        width: '40%'
    },
    title: {
        fontSize: 22,
        marginBottom: 20,
    },
    editButton: {
        width: '80%',
    },
});