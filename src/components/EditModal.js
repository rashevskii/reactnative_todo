import React, { useState } from "react"
import { StyleSheet, Modal, TextInput, View, Alert } from 'react-native'
import { THEME } from "../theme"
import { AppButton } from "../components/ui/AppButton"

export const EditModal = ({ visible, onCancel, todo, onSave }) => {
    const [title, setTitle] = useState(todo)
    const saveHandler = () => {
        if (title.trim().length < 3) {
            Alert.alert(
                'Error!',
                `Minimal length must be 3 symbols. Now is ${title.trim().length} simbols`
            )
        } else {
            onSave(title)
        }
    }

    const cancelHandler = () => {
        setTitle(todo)
        onCancel()
    }

    return (
        <Modal visible={visible} animationType='slide' >
            <View style={styles.wrap}>
                <TextInput 
                    value={title}
                    style={styles.input} 
                    placeholder='Enter title'   
                    autoCapitalize='none' 
                    autoCorrect={false} 
                    maxLength={64} 
                    onChangeText={setTitle}
                />
                <View style={styles.buttons} >
                    <AppButton onPress={cancelHandler} color={THEME.DANGER_COLOR}>Cancel</AppButton>
                    <AppButton onPress={saveHandler}>Save</AppButton>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    wrap: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    input: {
        padding: 10,
        borderBottomColor: THEME.MAIN_COLOR,
        borderBottomWidth: 2,
        width: '80%',
    },
    buttons: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10,
    },
})