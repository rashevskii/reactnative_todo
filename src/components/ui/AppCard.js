import React from "react";
import { StyleSheet, View } from "react-native";

export const AppCard = (props) => (
    <View style={styles.default}>
        {props.children}
    </View>
);

const styles = StyleSheet.create({
    default: {
        padding: 20,
        elevation: 2,
        borderRadius: 2,
        alignItems: 'center',
    }
});