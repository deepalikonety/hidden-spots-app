// AddSpotScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  Image,
  Alert,
  Modal,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Slider from '@react-native-community/slider';
import MapView, { Marker } from 'react-native-maps';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import { BACKEND_URL } from '@env';

export default function AddSpotScreen({ navigation }) {
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [vibe, setVibe] = useState('');
  const [customVibe, setCustomVibe] = useState('');
  const [images, setImages] = useState([]);
  const [showMap, setShowMap] = useState(false);
  const [markerCoords, setMarkerCoords] = useState({
    latitude: 26.2183,
    longitude: 78.1984,
  });

  const [ratings, setRatings] = useState({
    uniqueness: 3,
    vibe: 3,
    safety: 3,
    crowd: 3,
  });

  const pickMultipleImages = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) return alert('Permission denied');

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsMultipleSelection: true,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      selectionLimit: 5,
    });

    if (!result.canceled) {
      setImages(result.assets);
    }
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', desc);
      formData.append('vibe', vibe === 'Custom' ? customVibe : vibe);
      formData.append('lat', markerCoords.latitude);
      formData.append('lng', markerCoords.longitude);
      formData.append('uniqueness', ratings.uniqueness);
      formData.append('safety', ratings.safety);
      formData.append('crowd', ratings.crowd);
      formData.append('vibeRating', ratings.vibe);

      images.forEach((img, index) => {
        formData.append('images', {
          uri: img.uri,
          name: `photo_${index}.jpg`,
          type: 'image/jpeg',
        });
      });

      const response = await axios.post(
        `${BACKEND_URL}/api/spots/add`,
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );

      const savedSpot = response.data.spot;
      Alert.alert('Success', 'Spot added to backend!');
      navigation.navigate('Map', { newSpot: savedSpot });
    } catch (error) {
      console.error('❌ Failed to add spot:', error);
      Alert.alert('Error', 'Failed to submit spot.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Spot Info */}
      <View style={styles.section}>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Spot Name</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="e.g. Hidden Garden"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={styles.input}
            value={desc}
            onChangeText={setDesc}
            placeholder="What's special about it?"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Choose a Vibe</Text>
          <Picker
            selectedValue={vibe}
            style={styles.picker}
            onValueChange={(itemValue) => {
              if (itemValue === 'Custom') {
                setVibe('Custom');
              } else {
                setCustomVibe('');
                setVibe(itemValue);
              }
            }}
          >
            <Picker.Item label="Select a vibe..." value="" />
            <Picker.Item label="Romantic" value="Romantic" />
            <Picker.Item label="Serene" value="Serene" />
            <Picker.Item label="Creative" value="Creative" />
            <Picker.Item label="Custom" value="Custom" />
          </Picker>
        </View>

        {vibe === 'Custom' && (
          <View style={styles.formGroup}>
            <Text style={styles.label}>Enter Custom Vibe</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. Mysterious, Cozy..."
              value={customVibe}
              onChangeText={setCustomVibe}
            />
          </View>
        )}
      </View>

      {/* Images */}
      <View style={styles.section}>
        <Button title="Pick Multiple Images" onPress={pickMultipleImages} />
        <ScrollView horizontal style={{ marginTop: 10 }}>
          {images.map((img, index) => (
            <Image key={index} source={{ uri: img.uri }} style={styles.preview} />
          ))}
        </ScrollView>
      </View>

      {/* Location Picker */}
      <View style={styles.section}>
        <Text style={styles.label}>Tap to Select Location (Gwalior only)</Text>
        <Button title="Choose on Map" onPress={() => setShowMap(true)} />
        <Text style={{ marginTop: 5 }}>
          Selected Coordinates: {markerCoords.latitude.toFixed(4)}, {markerCoords.longitude.toFixed(4)}
        </Text>
      </View>

      {/* Ratings */}
      <View style={styles.section}>
        <Text style={styles.label}>Rate this Spot:</Text>
        {['uniqueness', 'vibe', 'safety', 'crowd'].map((key) => (
          <View key={key} style={styles.sliderBlock}>
            <Text>
              {key.charAt(0).toUpperCase() + key.slice(1)}: {ratings[key]}/5
            </Text>
            <Slider
              style={{ width: '100%' }}
              minimumValue={0}
              maximumValue={5}
              step={1}
              value={ratings[key]}
              onValueChange={(value) =>
                setRatings((prev) => ({ ...prev, [key]: value }))
              }
            />
          </View>
        ))}
      </View>

      {/* Submit */}
      <View style={{ marginTop: 20 }}>
        <Button title="Submit Spot" onPress={handleSubmit} />
      </View>

      {/* Map Modal */}
      <Modal visible={showMap} animationType="slide">
        <MapView
          style={{ flex: 1 }}
          initialRegion={{
            latitude: 26.2183,
            longitude: 78.1984,
            latitudeDelta: 0.02,
            longitudeDelta: 0.02,
          }}
          onPress={(e) => setMarkerCoords(e.nativeEvent.coordinate)}
        >
          <Marker coordinate={markerCoords} />
        </MapView>
        <Button title="Done" onPress={() => setShowMap(false)} />
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, paddingBottom: 50 },
  label: { fontWeight: 'bold', marginTop: 5, marginBottom: 3 },
  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 6,
    padding: 10,
    marginTop: 5,
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 10,
  },
  preview: {
    width: 100,
    height: 100,
    marginRight: 10,
    borderRadius: 10,
  },
  sliderBlock: {
    marginTop: 10,
    marginBottom: 15,
  },
  section: {
    marginTop: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  formGroup: {
    marginBottom: 15,
  },
});
