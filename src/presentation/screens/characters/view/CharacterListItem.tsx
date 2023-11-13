import {DomainCharacter} from '../../../../data/remote/character/DomainModel/DomainCharacterModel';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import * as React from 'react';
import {memo, useEffect, useState} from 'react';
import {Images} from '../../../../assets/images/Images';
import {
  disLikeCharacter,
  getCharacterStatus,
  likeCharacter,
} from '../../../../data/local/character/CharacterLocalService';

interface CharacterListItemProps {
  data: DomainCharacter;
}

function CharacterListItem(props: CharacterListItemProps) {
  const data = props.data;
  const [isFavorite, setFavorite] = useState(false);

  useEffect(() => {
    getCharacterStatus(data.id).then((status: boolean) => setFavorite(status));
  }, []);

  const statusColor = () => {
    let textColor: string;

    switch (data.status) {
      case 'Dead':
        textColor = 'red';
        break;
      case 'unknown':
        textColor = 'grey';
        break;
      default:
        textColor = 'green';
    }

    return textColor;
  };

  const processLike = async () => {
    if (!isFavorite) {
      likeCharacter(data.id).then(() => setFavorite(true));
    } else {
      disLikeCharacter(data.id).then(() => setFavorite(false));
    }
  };

  return (
    <View style={styles.progress}>
      <View style={styles.contentContainer}>
        <FastImage
          testID={'character_image'}
          style={styles.image}
          resizeMode={'contain'}
          source={{uri: data.image}}
        />
        <View style={styles.textContainer}>
          <Text style={styles.title}>{data.name}</Text>
          <Text
            style={StyleSheet.compose(styles.subtitle, {color: statusColor()})}>
            {data.status}
          </Text>
          <Text style={styles.subtitle}>{data.location.name}</Text>
        </View>
      </View>

      <Pressable
        style={styles.likeContainer}
        testID={'like-button'}
        onPress={processLike}>
        <FastImage
          style={styles.likeIcon}
          resizeMode={'contain'}
          tintColor={'green'}
          source={isFavorite ? Images.favorite : Images.not_favorite}
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  progress: {
    flex: 1,
    marginVertical: 4,
    padding: 8,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'green',
    borderRadius: 8,
  },
  title: {color: 'white', fontSize: 18},
  subtitle: {color: 'lightgrey', fontSize: 14},
  textContainer: {flex: 1, flexDirection: 'column', marginHorizontal: 8},
  likeIcon: {width: 24, height: 24},
  image: {width: 56, height: 56, borderRadius: 8, overflow: 'hidden'},
  contentContainer: {flexDirection: 'row', flex: 1, alignItems: 'center'},
  likeContainer: {position: 'absolute', bottom: 8, end: 8},
});

function arePropsEqual(
  prevProps: CharacterListItemProps,
  nextProps: CharacterListItemProps,
) {
  return nextProps.data === prevProps.data;
}

export default memo(CharacterListItem, arePropsEqual);
