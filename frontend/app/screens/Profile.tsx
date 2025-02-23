import { View, Button } from 'react-native'
import React from 'react'
import { useAuth } from '../context/AuthContext'

const Profile = () => {

  const { onLogout } = useAuth();

  return (
    <View>
      <Button title="Sign out" onPress={onLogout} />
    </View>
  )
}

export default Profile
