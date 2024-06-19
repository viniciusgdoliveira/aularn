import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

const Index = () => {
  const [name, setName] = useState<string>('');

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Seja bem vindo ao Curso de React Native utilizando Expo e Firebase</Text>
      <TextInput 
        style={styles.input} 
        placeholder="Digite seu nome" 
        value={name}
        onChangeText={(text) => setName(text)} 
      />
      <Text style={styles.nameText}>{name}</Text>
    </View>
  );
}

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  welcomeText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    width: '80%',
  },
  nameText: {
    fontSize: 16,
    color: 'blue',
  },
});
