import {
  FlatList,
  Pressable,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import * as React from 'react';
import {useEffect, useRef} from 'react';
import {getCharacters} from '../../../data/remote/character/CharacterService';
import {
  DomainCharacter,
  DomainResponseInfo,
} from '../../../data/remote/character/DomainModel/DomainCharacterModel';
import {NavigationBar} from '../../view/NavigationBar';
import CharacterListItem from './view/CharacterListItem';
import {Images} from '../../../assets/images/Images';
import {ProgressView} from '../../view/ProgressView';

export default function CharactersListScreen() {
  const loadMoreInfoRef = useRef<DomainResponseInfo | null>();

  const [results, setResults] = React.useState<Array<DomainCharacter>>([]);
  const [isLoading, setLoading] = React.useState(false);
  const [fetchingNext, setFetchingNext] = React.useState(false);
  const [showError, setShowError] = React.useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    if (results.length !== 0) {
      loadMoreInfoRef.current = null;
      setResults([]);
    }

    setShowError(false);

    setLoading(true);
    getCharacters()
      .then(response => {
        loadMoreInfoRef.current = response.info;

        setResults(response.results);
      })
      .catch(_ => {
        setShowError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const loadMore = () => {
    console.log(loadMoreInfoRef.current?.next);

    setShowError(false);
    if (loadMoreInfoRef.current?.next !== 'null') {
      setFetchingNext(true);
      getCharacters(loadMoreInfoRef.current?.next)
        .then(response => {
          //TODO Filter if old results not contain new results (case of load error)
          setResults(oldResults => [...oldResults, ...response.results]);

          loadMoreInfoRef.current = response.info;
        })
        .catch(_ => {
          setShowError(true);
        })
        .finally(() => {
          setFetchingNext(false);
        });
    }
  };

  const renderItem = (item: DomainCharacter) => {
    return <CharacterListItem data={item} />;
  };

  const renderError = () => {
    return (
      <Pressable
        onPress={() => {
          if (results.length === 0) {
            loadData();
          } else {
            loadMore();
          }
        }}>
        {/*TODO should use locale file*/}
        <Text style={styles.reloadText}>Try Reload</Text>
      </Pressable>
    );
  };

  const renderFooter = () => {
    return (
      <View>
        {fetchingNext && <ProgressView />}
        {showError && renderError()}
      </View>
    );
  };

  return (
    <View style={styles.progress}>
      <NavigationBar image={Images.logo} />

      <FlatList
        style={styles.list}
        data={results}
        contentContainerStyle={styles.listContainer}
        keyExtractor={(_, pos) => pos.toString()}
        renderItem={item => renderItem(item.item as DomainCharacter)}
        refreshing={fetchingNext}
        ListFooterComponent={renderFooter}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={loadData} />
        }
        onEndReached={() => {
          if (!showError) {
            loadMore();
          }
        }}
        onEndReachedThreshold={0.1}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  progress: {
    flex: 1,
  },
  listContainer: {paddingVertical: 16, paddingHorizontal: 8},
  reloadText: {
    color: 'white',
    textDecorationLine: 'underline',
    alignSelf: 'center',
    paddingVertical: 8,
  },
  list: {height: '100%'},
});
