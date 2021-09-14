import React from "react";
import { TouchableOpacity, View, StyleSheet, TouchableNativeFeedback, Platform } from 'react-native';
import { THEME } from "../../theme";
import { AppTextBold } from './AppTextBold';

export const AppButton = ({ children, onPress, color=THEME.MAIN_COLOR }) => {
    const Wrapper = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity

    return (
        <Wrapper onPress={onPress} activeOpacity={0.7}>
            <View style={{...styles.buttons, backgroundColor: color}}>
                <AppTextBold style={styles.text}>{children}</AppTextBold>
            </View>
        </Wrapper>
    )
}

const styles = StyleSheet.create({
    buttons: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: '#fff',
        
    }
})