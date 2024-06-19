import React, { useState } from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, View, TextInput, Button } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { collection, deleteDoc, doc, getDocs, updateDoc, QueryDocumentSnapshot } from "firebase/firestore";
import { db } from '@/firebase';

interface Projeto {
  id: string;
  nome: string;
  descricao: string;
}

export default function TabTwoScreen() {
  const [data, setData] = useState<Projeto[]>([]);
  const [editId, setEditId] = useState<string | null>(null);
  const [editNome, setEditNome] = useState('');
  const [editDescricao, setEditDescricao] = useState('');

  const fetchData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "projetos"));
      const fetchedData: Projeto[] = querySnapshot.docs.map((doc: QueryDocumentSnapshot) => ({
        id: doc.id,
        ...doc.data(),
      })) as Projeto[];
      setData(fetchedData);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, "projetos", id));
      setData(prevData => prevData.filter(item => item.id !== id));
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleEdit = (item: Projeto) => {
    if (editId === item.id) {
      // Toggle off
      setEditId(null);
    } else {
      // Toggle on
      setEditId(item.id);
      setEditNome(item.nome);
      setEditDescricao(item.descricao);
    }
  };

  const handleSave = async () => {
    if (editId) {
      try {
        const projetoRef = doc(db, "projetos", editId);
        await updateDoc(projetoRef, {
          nome: editNome,
          descricao: editDescricao
        });
        setData(prevData =>
          prevData.map(item =>
            item.id === editId ? { ...item, nome: editNome, descricao: editDescricao } : item
          )
        );
        setEditId(null);
      } catch (error) {
        console.error("Error updating document: ", error);
      }
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.headerText}>Get no firebase</ThemedText>
      <ThemedView style={styles.centeredView}>
        <TouchableOpacity style={styles.button} onPress={fetchData}>
          <ThemedText style={styles.buttonText}>Buscar no FireStore</ThemedText>
        </TouchableOpacity>
      </ThemedView>
      <ScrollView>
        {data.length > 0 && (
          <View style={styles.table}>
            <View style={[styles.tableRow, styles.tableHeader]}>
              <ThemedText style={styles.tableHeaderCell}>Nome</ThemedText>
              <ThemedText style={styles.tableHeaderCell}>Descrição</ThemedText>
              <ThemedText style={styles.tableHeaderCell}>Ações</ThemedText>
            </View>
            {data.map((item) => (
              <View key={item.id}>
                <View style={styles.tableRow}>
                  <ThemedText style={styles.tableCell}>{item.nome}</ThemedText>
                  <ThemedText style={styles.tableCell}>{item.descricao}</ThemedText>
                  <TouchableOpacity onPress={() => handleEdit(item)} style={styles.editButton}>
                    <Ionicons name="create-outline" size={24} color="blue" />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => handleDelete(item.id)} style={styles.deleteButton}>
                    <Ionicons name="close-circle" size={24} color="red" />
                  </TouchableOpacity>
                </View>
                {editId === item.id && (
                  <View style={styles.editRow}>
                    <TextInput
                      style={[styles.input, styles.inputHalf]}
                      value={editNome}
                      onChangeText={setEditNome}
                      placeholder="Nome"
                    />
                    <TextInput
                      style={[styles.input, styles.inputHalf]}
                      value={editDescricao}
                      onChangeText={setEditDescricao}
                      placeholder="Descrição"
                    />
                    <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
                      <ThemedText style={styles.saveButtonText}>Salvar</ThemedText>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 16,
  },
  centeredView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 16,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  table: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    overflow: 'hidden',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    alignItems: 'center',
  },
  tableCell: {
    flex: 1,
    padding: 8,
    textAlign: 'left',
  },
  tableHeader: {
    backgroundColor: '#f5f5f5',
  },
  tableHeaderCell: {
    flex: 1,
    padding: 8,
    fontWeight: 'bold',
  },
  editButton: {
    padding: 8,
  },
  deleteButton: {
    padding: 8,
  },
  editRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 8,
    marginVertical: 4,
    flex: 1,
  },
  inputHalf: {
    flex: 0.45,
  },
  saveButton: {
    marginLeft: 'auto',
  },
  saveButtonText: {
    color: '#007bff',
    fontSize: 16,
    padding: 8,
  },
});
