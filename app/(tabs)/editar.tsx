import React, { useState } from 'react';
import { Image, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { collection, addDoc } from "firebase/firestore"; 
import { db } from '@/firebase';

export default function HomeScreen() {
  const [nome, setNome] = useState<string>('');
  const [descricao, setDescricao] = useState<string>('');

  const handleButton = async () => {
    try {
      const docRef = await addDoc(collection(db, "projetos"), {
        nome: nome,
        descricao: descricao,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    setNome('');
    setDescricao('');
  }

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.headerText}>
        Insira o nome do seu projeto e clique em "Cadastrar Projeto" para começar.
      </ThemedText>
      <ThemedText style={styles.labelText}>Nome do Projeto</ThemedText>
      <TextInput 
        style={styles.input}
        placeholder='Digite o nome do seu projeto:' 
        onChangeText={text => setNome(text)}
        value={nome}
      />
      
      <ThemedText style={styles.labelText}>Descrição do projeto</ThemedText>
      <TextInput 
        style={styles.input}
        placeholder='Descreva o seu projeto:' 
        onChangeText={text => setDescricao(text)}
        value={descricao}
      />
      
      <TouchableOpacity style={styles.button} onPress={handleButton}>
        <ThemedText style={styles.buttonText}>Cadastrar Projeto</ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',  // Light background color for better readability
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  labelText: {
    fontSize: 16,
    marginVertical: 10,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    backgroundColor: '#fff',  // White background for the input fields
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});
