import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Image,
    TouchableOpacity,
    TextInput,
    Text,
} from 'react-native';

export default class Likes extends Component {
    constructor() {
        super()
    }

    _carregaIcone(likeada) {
        return likeada ? require('../../assets/img/s2-check.png') : require('../../assets/img/s2.png')
    }

    exibeLikes(likers) {
        if (likers.length <= 0) {
            return;
        }
        return (
            <Text style={css.likes}>
                {likers.length}
                {likers.length > 1 ? 'curtidas' : 'curtida'}
            </Text>

        )
    }

  
    render() {
        const { likeCallback, foto } = this.props;
        return (
            <View>
                <TouchableOpacity onPress={() => likeCallback(foto.id)}>
                    <View style={css.footer}>
                        <Image style={css.botaoDeLike}
                            source={this._carregaIcone(foto.likeada)} />
                    </View>
                </TouchableOpacity>

                {this.exibeLikes(foto.likers)}
            </View>
        );
    }
}

const css = StyleSheet.create({
    botaoDeLike: {
        height: 40,
        width: 40,
        marginBottom: 10,
    },
    footer: {
        margin: 10
    },
})