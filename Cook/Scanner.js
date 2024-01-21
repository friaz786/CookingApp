import { StyleSheet, Text, View, Image, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'

const Scanner = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text
        
            >Scanner</Text>

            <Text 
                onPress={
                    () => { navigation.navigate('login') }
                }
            >Logout</Text>
        </View>
    )
}

export default Scanner
const styles = StyleSheet.create({
})