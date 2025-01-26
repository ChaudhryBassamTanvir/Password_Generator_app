import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';

//Form Validation
import * as Yup from 'yup';

const PasswordSchema = Yup.object().shape({
  passwordLength: Yup.number()
    .min(4, 'Should be minimum 4')
    .max(16, 'Should no more longer than 16')
    .required('This is required'),
});
const App = () => {
  const [password, setPassword] = useState('');

  return (
    <View>
      <Text>App</Text>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({});
