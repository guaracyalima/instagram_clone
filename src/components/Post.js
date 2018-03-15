import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions,
    ScrollView,
    FlatList,
    TouchableOpacity,
    TextInput
} from 'react-native';
import InputComentario from './InputComentario'
import Likes from './Likes'
const width = Dimensions.get('screen').width

const eu = require('../../assets/img/01.png')
const img = require('../../assets/img/02.png')
export default class Post extends Component {
   
    exibeLegenda(foto) {
        if (foto.comentario === '') {
            return;
        }
        return (
            <View style={css.comentario}>
                <Text style={css.tituloComentario}>{foto.loginUsuario}</Text>
                <Text>{foto.comentario}</Text>
            </View>
        )
    }

    render() {
        const { foto, likeCallback, comentarioCallback } = this.props
        return (
            <View key={foto.id}>
                <View style={css.header}>
                    <Image source={{ uri: foto.urlPerfil }} style={css.avatar} />
                    <Text>{foto.loginUsuario}</Text>
                </View>
                <Image
                    source={{ uri: foto.urlFoto }}
                    style={css.postImage} />

               <Likes likeCallback={likeCallback} foto={foto}/>
                {this.exibeLegenda(foto)}

                {foto.comentarios.map(comentario => {
                    <View style={css.comentario} key={comentario.id}>
                        <Text style={css.tituloComentario}>{comentario.login}</Text>
                        <Text>{comentario.texo}</Text>
                    </View>
                })}

                <InputComentario comentarioCallback={comentarioCallback} idFoto={foto.id}/>
            </View>
        );
    }
}

const css = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 10,
    },
    avatar: {
        width: 40,
        height: 40,
        marginRight: 10,
        borderRadius: 20,
    },
    postImage: {
        width: width,
        height: width
    },
    likes: {
        fontWeight: 'bold',
    },
    comentario: {
        flexDirection: 'row',
    },
    tituloComentario: {
        fontWeight: 'bold',
        marginRight: 5,
    },
})