import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { THEME } from '../theme';


export const Navbar = ({title, text}) => {
    return (
        <View style={styles.navbar}>
            <Text style={styles.text}>{ title }</Text>
        </View>
    )
} 

const styles = StyleSheet.create({
    navbar: {
        height: 70,
        alignItems: 'center',
        justifyContent: 'flex-end',
        backgroundColor: THEME.MAIN_COLOR,
        paddingBottom: 10,
    }, 
    text: {
        color: '#fff'
    }
});