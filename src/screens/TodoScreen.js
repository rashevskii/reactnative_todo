import React from "react";
import { StyleSheet, View, Text, Button } from "react-native";

export const TodoScreen = ({goBack}) => {
    return (
        <View>
            <Text>Todo Screen</Text>
            <Button title="Back" onPress={goBack} />
        </View>
    )
};

const styles = StyleSheet.create({});