/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, FlatList, Text, StyleSheet} from 'react-native';
import {Appbar, TextInput} from 'react-native-paper';
import {data} from './fetch';

const Header = () => {
  const [filteredData, setfilteredData] = useState([]);
  const [search, setSearch] = useState('');
  const [number, setNumber] = useState(0);

  const generateNewRow = () => {
    setfilteredData(prev => [...prev, data[number]]);
    if (number < 29) {
      setNumber(number + 1);
    } else {
      setNumber(0);
    }
  };

  const handleChangeText = value => {
    if (value) {
      const modData = filteredData.filter(ndata => {
        const itemData = ndata.name
          ? ndata.name.toUpperCase()
          : ''.toUpperCase();
        const textData = value.toUpperCase();
        console.log(itemData, textData);
        return itemData.indexOf(textData) > -1;
      });
      setfilteredData(modData);
      setSearch(value);
    } else {
      setfilteredData(filteredData);
      setSearch(value);
    }
  };

  const ItemSeparatorView = () => {
    return (
      <View style={{height: 0.5, width: '100%', backgroundColor: 'black'}} />
    );
  };

  return (
    <View>
      <Appbar.Header>
        <TextInput
          label="search"
          style={{width: '90%', height: '90%'}}
          value={search}
          onChangeText={value => handleChangeText(value)}
        />
        <Appbar.Action
          icon="plus-box"
          style={{width: '10%'}}
          onPress={generateNewRow}
        />
      </Appbar.Header>
      <FlatList
        data={filteredData}
        ItemSeparatorComponent={ItemSeparatorView}
        renderItem={({item, idx}) => (
          <Text key={item.id} style={styles.item}>
            {item.name}
          </Text>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});

export default Header;
