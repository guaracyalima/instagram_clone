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
} from 'react-native';
import Post from './src/components/Post'
const width = Dimensions.get('screen').width
export default class App extends Component {
  constructor() {
    super();
    this.state = {
      fotos: []
    }
    console.log('thssdfsdf', this.state.fotos)
  }

  componentDidMount() {
    fetch('https://instalura-api.herokuapp.com/api/public/fotos/rafael/')
      .then(resposta => resposta.json())
      .then(json => this.setState({ fotos: json }))
  }

  _like(idFoto) {
    const foto = this.state.fotos.find(foto => foto.id === idFoto )

    let novaLista = []
    if (!foto.likeada) {
      novaLista = [
        ...foto.likers,
        { login: 'meuUsuario' }
      ]
    } else {
      novaLista = foto.likers.filter(liker => {
        return liker.login !== 'meuUsuario'
      })
    }
    const fotoAtualizada = {
      ...foto,
      likeada: !foto.likeada,
      likers: novaLista
    }

    const fotos = this.state.fotos.map(foto => foto.id === fotoAtualizada.id ? fotoAtualizada : foto)
    this.setState({ fotos })
  }

  adicionaComentario(valorComentario, inputComentario, idFoto) {
    
    if (valorComentario === '') 
      return;

    const foto = this.state.fotos.find(foto => foto.id === idFoto)

    const novaLista = [...foto.comentarios, {
      id: this.state.valorComentario,
      login: 'meuUsuario',
      texto: valorComentario
    }];

    const fotoAtualizada = {
      ...foto,
      comentarios: novaLista
    }
    
    const fotos = this.state.fotos
    .map(foto => foto.id === fotoAtualizada.id ? fotoAtualizada : foto)

    this.setState({ fotos })
    inputComentario.clear();
}

  render() {
    return (

      <FlatList
        style={css.container}
        data={this.state.fotos}
        keyExtractor={item => item.id}
        renderItem={({ item }) =>
          <Post 
          foto={item} 
          likeCallback={this._like.bind(this)} 
          comentarioCallback={this.adicionaComentario.bind(this)}/>
        }
      />
    );
  }
}

// const margem = Platform.OS == 'ios' ? 20 : 0;
const css = StyleSheet.create({
  container: {
    marginTop: 20,
  },
})