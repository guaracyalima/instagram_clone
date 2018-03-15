import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Image,
    TouchableOpacity,
    TextInput
} from 'react-native';

const eu = require('../../assets/img/01.png')
const img = require('../../assets/img/02.png')
export default class InputComentario extends Component {

    constructor() {
        super()
        this.state = {
            valorComentario: ''
        }
    }
    
    render() {
        return (
            <View style={css.container}>
                <TextInput
                    style={css.input}
                    placeholder="Adicione um comentário..."
                    ref={input => this.inputComentario = input}
                    onChangeText={texto => this.setState({ valorComentario: texto })}
                    underlineColoerAndroid="transparent" />

                <TouchableOpacity onPress={
                        () =>{
                            this.props.comentarioCallback(
                                this.props.idFoto,
                                this.state.valorComentario, 
                                this.inputComentario);
                                this.setState({valorComentario:''})
                        }}>
                    <Image
                        style={css.icone}
                        source={require('../../assets/img/send.png')} />
                </TouchableOpacity>
            </View>
        );
    }
}
const css = StyleSheet.create({
    input: {
        flex: 1,
        height: 40,
    },
    icone: {
        width: 30,
        height: 30
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    }
})