import { StyleSheet, TextInput, View, Keyboard } from 'react-native'
import React from 'react'
import AntDesign from '@expo/vector-icons/AntDesign';

const Search = () => {
  return (
    <View style={styles.searchSection}>
    <AntDesign style={styles.searchIcon} name="search1" size={20} />
    <TextInput
      autoFocus={false}
      style={styles.input}
      placeholder='Search'
      underlineColorAndroid="transparent"
      onSubmitEditing={() => Keyboard.dismiss()}
    />
  </View>
  )
}

export default Search

const styles = StyleSheet.create({
  searchSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'gray',
    paddingHorizontal: 10,
  },
  searchIcon: {
    padding: 10,
  },
  input: {
    width: '70%',
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
    backgroundColor: '#fff',
    color: 'black',
  },
})
