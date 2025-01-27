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
import * as Yup from 'yup';

// Form Validation Schema
const PasswordSchema = Yup.object().shape({
  passwordLength: Yup.number()
    .min(4, 'Should be minimum 4')
    .max(16, 'Should not be longer than 16')
    .required('This field is required'),
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
    const upperCase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowerCase = 'abcdefghijklmnopqrstuvwxyz';
    const digits = '0123456789';
    const specialChars = '!@#$%^&*()_+';

    if (upperCaseChars) {
      characterList += upperCase;
    }
    if (lowerCaseChars) {
      characterList += lowerCase;
    }
    if (numbers) {
      characterList += digits;
    }
    if (symbols) {
      characterList += specialChars;
    }

    const passwordResult: string = createPassword(
      characterList,
      passwordLength,
    );
    setPassword(passwordResult);
    setIsPasswordGenerated(true);
  };

  const createPassword = (characters: string, passwordLength: number) => {
    let result = '';
    for (let index = 0; index < passwordLength; index++) {
      const characterIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(characterIndex);
    }
    return result;
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
                  <Text style={styles.heading}>Include Lowercase Letters</Text>
                  <BouncyCheckbox
                    isChecked={lowerCaseChars}
                    onPress={() => setlowerCaseChars(!lowerCaseChars)}
                    fillColor="#29AB87"
                  />
                </View>

                <View style={styles.inputWrapper}>
                  <Text style={styles.heading}>Include Uppercase Letters</Text>
                  <BouncyCheckbox
                    isChecked={upperCaseChars}
                    onPress={() => setupperCaseChars(!upperCaseChars)}
                    fillColor="#FF0000"
                  />
                </View>

                <View style={styles.inputWrapper}>
                  <Text style={styles.heading}>Include Numbers</Text>
                  <BouncyCheckbox
                    isChecked={numbers}
                    onPress={() => setnumbers(!numbers)}
                    fillColor="#FC80A5"
                  />
                </View>

                <View style={styles.inputWrapper}>
                  <Text style={styles.heading}>Include Symbols</Text>
                  <BouncyCheckbox
                    isChecked={symbols}
                    onPress={() => setsymbols(!symbols)}
                    fillColor="#FF8000"
                  />
                </View>

                <View style={styles.formAction}>
                  <TouchableOpacity
                    style={[styles.primaryBtn, !isValid && styles.disabledBtn]}
                    onPress={handleSubmit}
                    disabled={!isValid}>
                    <Text style={styles.primaryBtnTxt}>Generate Password</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.secondaryBtn}
                    onPress={() => {
                      handleReset();
                      resetPasswordState();
                    }}>
                    <Text style={styles.secondaryTxt}>Reset</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </Formik>
        </View>

        {isPasswordGenerated && (
          <View style={[styles.card, styles.cardElevated]}>
            <Text style={styles.subTitle}>Result:</Text>
            <Text style={styles.description}>Long Press to Copy</Text>
            <Text selectable style={styles.generatedPassword}>
              {password}
            </Text>
          </View>
        )}
      </SafeAreaView>
    </ScrollView>
  );
};

export default App;

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    padding: 20,
  },
  formContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  inputWrapper: {
    marginBottom: 15,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  heading: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
    fontFamily: ' ',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 5,
  },
  inputStyle: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 5,
    padding: 10,
    backgroundColor: '#FAFAFA',
    fontSize: 16,
  },
  formAction: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  primaryBtn: {
    backgroundColor: '#29AB87',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    flex: 1,
    marginRight: 5,
  },
  disabledBtn: {
    backgroundColor: '#CCC',
  },
  primaryBtnTxt: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  secondaryBtn: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    flex: 1,
    marginLeft: 5,
    borderWidth: 1,
    borderColor: '#29AB87',
  },
  secondaryTxt: {
    paddingTop: 10,
    color: '#29AB87',
    fontWeight: 'bold',
    fontSize: 16,
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginTop: 20,
    padding: 20,
  },
  cardElevated: {
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  subTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  description: {
    fontSize: 14,
    marginBottom: 10,
    color: '#555',
  },
  generatedPassword: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#29AB87',
  },
});
