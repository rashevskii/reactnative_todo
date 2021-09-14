import React, { useState } from "react";
import { StyleSheet, View, Text, Button, Dimensions } from "react-native";
import { EditModal } from "../components/EditModal";
import { FontAwesome, AntDesign } from '@expo/vector-icons';
import { AppCard } from "../components/ui/AppCard";
import { AppTextBold } from "../components/ui/AppTextBold";
import { AppButton } from "../components/ui/AppButton";
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
                <AppTextBold style={styles.title} >{todo.title}</AppTextBold>
                <View style={styles.editButton}>
                    <AppButton onPress={() => setModal(true)}>
                        <FontAwesome name='edit' size={20} />
                    </AppButton>
                </View>
            </AppCard>
            <View style={styles.buttons}>
                <View style={styles.button}>
                    <AppButton color={THEME.GREY_COLOR} onPress={goBack}>
                        <AntDesign name='back' size={20} />
                    </AppButton>
                </View>
                <View style={styles.button}>
                    <AppButton
                        color={THEME.DANGER_COLOR}
                        onPress={() => { onRemove(todo.id) }}>
                        <FontAwesome name="remove" size={20} />
                    </AppButton>
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
        width: Dimensions.get('window').width > 400 ? 150 : 120,
    },
    title: {
        fontSize: 22,
        marginBottom: 20,
    },
    editButton: {
        width: '80%',
    },
});