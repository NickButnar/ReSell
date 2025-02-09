import { StyleSheet, Text, View } from 'react-native'
import { Link } from 'expo-router'
export default function index() {
  return (
    <View style={styles.container}>
      <Text>index</Text>
      <Link href="/login" style={styles.button}>login</Link>
      <Link href="/register" style={styles.button}>register</Link>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },

  button: {
    backgroundColor: "blue",
    color: "white",
    padding: 10,
    borderRadius: 5,
    margin: 10,
  }
})
