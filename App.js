// App.js
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import axios from 'axios';

const API_URL = 'https://apihub.staging.appply.link/chatgpt';

const App = () => {
  const [heroName, setHeroName] = useState('');
  const [plot, setPlot] = useState('');
  const [story, setStory] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const generateStory = async () => {
    if (!heroName.trim()) {
      alert('Please enter a hero name');
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post(API_URL, {
        messages: [
          { role: "system", content: "You are a creative fairy tale writer. Create a short, engaging fairy tale for children featuring the provided hero name and plot." },
          { role: "user", content: `Write a fairy tale with a hero named ${heroName} and the following plot: ${plot}` }
        ],
        model: "gpt-4o"
      });
      const { data } = response;
      setStory(data.response);
    } catch (error) {
      console.error('Error generating story:', error);
      alert('Failed to generate story. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Fairy Tale Generator</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter hero name"
        value={heroName}
        onChangeText={setHeroName}
      />
      <TextInput
        style={[styles.input, styles.plotInput]}
        placeholder="Enter plot (optional)"
        value={plot}
        onChangeText={setPlot}
        multiline
      />
      <TouchableOpacity 
        style={[styles.button, isLoading && styles.disabledButton]} 
        onPress={generateStory}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="#FFFFFF" />
        ) : (
          <Text style={styles.buttonText}>Generate Fairy Tale</Text>
        )}
      </TouchableOpacity>
      <ScrollView style={styles.storyContainer}>
        <Text style={styles.storyText}>{story}</Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F0F0F0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    height: 40,
    borderColor: '#999',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: '#FFFFFF',
  },
  plotInput: {
    height: 80,
    textAlignVertical: 'top',
    paddingTop: 10,
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#A5D6A7',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  storyContainer: {
    marginTop: 20,
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    padding: 15,
  },
  storyText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
  },
});

export default App;
// End of App.js