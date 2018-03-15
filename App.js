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
  constructor(){
    super();
    this.state = {
      fotos: []
    }
  }

  componentDidMount(){
    fetch('https://instalura-api.herokuapp.com/api/public/fotos/rafael/')
    .then(resposta => resposta.json())
    .then( json => this.setState({fotos: json}))
  }
  render() {
    return (

      <FlatList
        style={css.container}
        data={this.state.fotos}
        keyExtractor={item => item.id}
        renderItem={({ item }) =>
          <Post foto={item}/>
        }
      />
    );
  }
}

const css = StyleSheet.create({
  container: {
    marginTop: 20,
  },
})