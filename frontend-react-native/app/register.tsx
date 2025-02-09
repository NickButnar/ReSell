import { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import axios from '../api/axios';
import { useRouter } from 'expo-router';

export default function RegisterScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      const response = await axios.post('/register', { email, password });

      if (response.status === 201) {
        Alert.alert('Success:', 'You have successfully registered');
        router.push('/(tabs)/home');
      }
    } catch (error) {
      const errorMessage = (error.response?.data?.errors?.join(', ') || 'Something went wrong');
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
      <Button title="Register" onPress={handleRegister} />
    </View>
  );
}
