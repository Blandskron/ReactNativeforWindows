import React from 'react';
import { Text, StyleSheet } from 'react-native';

const CustomText = ({ style, ...props }) => {
    return <Text style={[styles.textoEspecial, style]} {...props} />;
};

const styles = StyleSheet.create({
    textoEspecial: {
        fontFamily: 'Poppins-Regular',
    },
});

export default CustomText;
