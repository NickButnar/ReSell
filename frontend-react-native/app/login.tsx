import { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from '../api/axios';
import { useRouter } from 'expo-router';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('/login', { email, password });
      if (response.status === 200) {
        await AsyncStorage.setItem('auth_token', response.data.token);
        router.push('/(tabs)/home');
      }
    } catch (error) {
      const errorMessage = (error.response?.data?.error || 'Something went wrong');
      Alert.alert('Error:', errorMessage);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
      <Text>Email:</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        style={{ borderWidth: 1, padding: 10, marginVertical: 10 }}
      />
      <Text>Password:</Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{ borderWidth: 1, padding: 10, marginVertical: 10 }}
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
}
