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

const width = Dimensions.get('screen').width

const eu = require('../../assets/img/01.png')
const img = require('../../assets/img/02.png')
export default class Post extends Component {
    constructor(props) {
        super(props)
        this.state = {
            foto: {...this.props.foto},
            valorComentario: ''
        }
    }

    _like() {

        const { foto } = this.state
        let novaLista = []
        if(!foto.likeada){
            //novaLista = foto.likers.concat({login: 'meuUsuario'})
            novaLista = [
                ...foto.likers,
                {login: 'meuUsuario'}
            ]
        }else{
            novaLista =  foto.likers.filter(liker => {
                return liker.login !== 'meuUsuario'
            })
        }
        const fotoAtualizada = {
            ...foto,
            likeada: !foto.likeada,
            likers: novaLista
        }
        this.setState({ foto: fotoAtualizada })
    }

    _carregaIcone(likeada) {
        return likeada ? require('../../assets/img/s2-check.png') : require('../../assets/img/s2.png')
    }

    exibeLikes(likers){
        if(likers.length <= 0){
            return;
        }
        return (
                <Text style={css.likes}>
                {likers.length } 
                {likers.length > 1 ? 'curtidas' : 'curtida'}
                </Text>

        )
    }

    exibeLegenda(foto){
        if(foto.comentario === ''){
            return;
        }
        return (
            <View style={css.comentario}>
                    <Text style={css.tituloComentario}>{foto.loginUsuario}</Text>    
                    <Text>{foto.comentario}</Text>
                </View>
        )
    }

    _adicionaComentario(){
        if(this.state.valorComentario === '') return;
        const novaLista = [
            ...this.state.foto.comentarios, 
            {
            id: this.state.valorComentario,
            login: 'meuUsuario',
            texto: this.state.valorComentario
        }];

        const fotoAtualizada = {
            ...this.state.foto,
            comentarios: novaLista
        }

        this.setState({foto: fotoAtualizada, valorComentario: ''})
        this.inputComentario.clear()
    }

    render() {

        const { foto } = this.state
        return (
            <View key={foto.id}>
                <View style={css.header}>
                    <Image source={{ uri: foto.urlPerfil }} style={css.avatar} />
                    <Text>{foto.loginUsuario}</Text>
                </View>
                <Image
                    source={{ uri: foto.urlFoto }}
                    style={css.postImage} />

                <TouchableOpacity onPress={this._like.bind(this)}>
                    <View style={css.footer}>
                        <Image style={css.botaoDeLike}
                            source={this._carregaIcone(foto.likeada)} />
                    </View>
                </TouchableOpacity>
                
                {this.exibeLikes(foto.likers)}
                {this.exibeLegenda(foto)}

                {foto.comentarios.map(comentario => {
                    <View style={css.comentario} key={comentario.id}>
                        <Text style={css.tituloComentario}>{comentario.login}</Text>
                        <Text>{comentario.texo}</Text>
                    </View>
                })}
                <View style={css.novoComentario}>
                <TextInput style={css.input} placeholder="Adicione um comentário..." 
  ref={input => this.inputComentario = input}
  onChangeText={texto => this.setState({valorComentario: texto})} />
                    
                    <TouchableOpacity onPress={this._adicionaComentario.bind(this)}>
                        <Image style={css.icone} source={require('../../assets/img/send.png')} />
                    </TouchableOpacity>
                </View>
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
    botaoDeLike: {
        height: 40,
        width: 40,
        marginBottom: 10,
    },
    footer: {
        margin: 10
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
    input: {
        flex: 1,
        height: 40,
    },
    icone: {
        width:30,
        height: 30
    },
    novoComentario: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    }

})