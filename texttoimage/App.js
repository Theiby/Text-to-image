/* import React, { useState } from 'react';
import { View, TextInput, Button, Image, StyleSheet, Text, ScrollView } from 'react-native';

const App = () => {
  const [prompt, setPrompt] = useState('');
  const [imageData, setImageData] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const generateImage = async () => {
    try {
      const response = await fetch('http://10.0.2.2:5000/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      if (response.ok) {
        const data = await response.json();
        // Base64 verisini URI'ye dönüştürme
        setImageData(`data:image/png;base64,${data.image}`);
        setErrorMessage('');
      } else {
        const data = await response.json();
        setErrorMessage(`Error: ${data.error}`);
      }
    } catch (error) {
      setErrorMessage(`Error: ${error.message}`);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Stable Diffusion Image Generator</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter prompt"
        value={prompt}
        onChangeText={setPrompt}
      />
      <Button title="Generate Image" onPress={generateImage} />

      {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}

      {imageData && (
        <Image
          source={{ uri: imageData }} // Base64 URI
          style={styles.image}
          resizeMode="contain"
        />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
  },
  image: {
    width: 300,
    height: 300,
    marginTop: 20,
  },
  error: {
    color: 'red',
    marginTop: 10,
  },
});

export default App;
 */
import React, { useState } from 'react';
import { View, TextInput, Button, Image, StyleSheet, Text, ScrollView } from 'react-native';

const App = () => {
  const [prompt, setPrompt] = useState('');
  const [imageData, setImageData] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const generateImage = async () => {
    try {
      const response = await fetch('http://10.0.2.2:5000/generate', {  //10.0.2.2
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      if (response.ok) {
        const data = await response.json();
        // Base64 verisini kontrol et ve uygun MIME türünü kullan
        if (data.image) {
          setImageData(`data:image/png;base64,${data.image}`);
        } else {
          setErrorMessage('No image data received');
        }
        setErrorMessage('');
      } else {
        const data = await response.json();
        setErrorMessage(`Error: ${data.error}`);
      }
    } catch (error) {
      setErrorMessage(`Error: ${error.message}`);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Stable Diffusion Image Generator</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter prompt"
        value={prompt}
        onChangeText={setPrompt}
      />
      <Button title="Generate Image" onPress={generateImage} />

      {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}

      {imageData && (
        <Image
          source={{ uri: imageData }} // Base64 URI
          style={[styles.image, { borderWidth: 2, borderColor: 'red' }]}
          resizeMode="contain"
        />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
  },
  image: {
    width: 300,  // Görüntü genişliği
    height: 300, // Görüntü yüksekliği
    marginTop: 20,
  },
  error: {
    color: 'red',
    marginTop: 10,
  },
});

export default App;



