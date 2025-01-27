import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {Formik} from 'formik';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

//Form Validation
import * as Yup from 'yup';

const PasswordSchema = Yup.object().shape({
  passwordLength: Yup.number()
    .min(4, 'Should be minimum 4')
    .max(16, 'Should no more longer than 16')
    .required('This is required, Define Length'),
});
const App = () => {
  const [password, setPassword] = useState('');
  const [lowerCaseChars, setlowerCaseChars] = useState(true);
  const [upperCaseChars, setupperCaseChars] = useState(false);
  const [numbers, setnumbers] = useState(false);
  const [symbols, setsymbols] = useState(false);
  const [isPasswordGenerated, setIsPasswordGenerated] = useState(false);

  const generatePasswordString = (passwordLength: number) => {
    let characterList = '';
    const upperCaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowerCaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const digiChars = '0123456789';
    const specialChars = '!@#$%^&*()_+';

    if (upperCaseChars) {
      characterList += upperCaseChars;
    }
    if (lowerCaseChars) {
      characterList += lowerCaseChars;
    }
    if (numbers) {
      characterList += numbers;
    }
    if (symbols) {
      characterList += symbols;
    }

    const passwordResult: any = createPassword(characterList, passwordLength);
    setPassword(passwordResult);
    setIsPasswordGenerated(true);
  };
  const createPassword = (characters: string, passwordLength: number) => {
    let result = '';
    for (let index = 0; index < passwordLength; index++) {
      const characterIndex = Math.round(Math.random() * characters.length);

      result += characters.charAt(characterIndex);
    }
    //
  };
  const resetPasswordState = () => {
    setIsPasswordGenerated(false);
    setPassword('');
    setlowerCaseChars(false);
    setupperCaseChars(false);
    setnumbers(false);
    setsymbols(false);
  };

  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      <SafeAreaView style={styles.appContainer}>
        <View style={styles.formContainer}>
          <Text style={styles.title}>Password Generator</Text>

          <Formik
            initialValues={{passwordLength: ''}}
            validationSchema={PasswordSchema}
            onSubmit={values => {
              console.log('Values are', values);

              //both are same down have same meaning
              // generatePasswordString(Number(values.passwordLength));
              generatePasswordString(+values.passwordLength);
            }}>
            {({
              values,
              errors,
              touched,
              isValid,
              handleChange,
              handleReset,

              handleSubmit,
              isSubmitting,
              /* and other goodies */
            }) => (
              <>
                <View style={styles.inputWrapper}>
                  <View style={styles.inputColumn}>
                    <Text style={styles.heading}>Password Length</Text>
                    {touched.passwordLength && errors.passwordLength && (
                      <Text style={styles.errorText}>
                        {errors.passwordLength}
                      </Text>
                    )}
                    <TextInput
                      style={styles.inputStyle}
                      value={values.passwordLength}
                      onChangeText={handleChange('passwordLength')}
                      placeholder="Ex. 8"
                      keyboardType="numeric"
                    />
                  </View>
                </View>
                <View style={styles.inputWrapper}>
                  <Text style={styles.heading}>Include LowerCase </Text>

                  <BouncyCheckbox
                    isChecked={lowerCaseChars}
                    onPress={() => setlowerCaseChars(!lowerCaseChars)}
                    fillColor="#29AB87"
                  />
                </View>
                <View style={styles.inputWrapper}>
                  <BouncyCheckbox
                    isChecked={upperCaseChars}
                    onPress={() => setupperCaseChars(!upperCaseChars)}
                    fillColor="#FF0000"
                  />
                </View>
                <View style={styles.inputWrapper}>
                  <BouncyCheckbox
                    isChecked={upperCaseChars}
                    onPress={() => setupperCaseChars(!upperCaseChars)}
                    fillColor="#FF0000"
                  />
                </View>
                <View style={styles.inputWrapper}></View>

                <View style={styles.formAction}></View>
              </>
            )}
          </Formik>
        </View>

        <TouchableOpacity>
          <Text>Generate Password</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text>Reset</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </ScrollView>
  );
};

export default App;

const styles = StyleSheet.create({
  appContainer: {},
  formContainer: {},

  title: {},
  inputWrapper: {},
  formAction: {},
  inputColumn: {},
  inputStyle: {},
});
