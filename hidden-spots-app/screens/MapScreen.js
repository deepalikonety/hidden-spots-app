import React, { useState, useCallback } from 'react';
import { useFocusEffect, useRoute } from '@react-navigation/native';
import {
  StyleSheet,
  View,
  Text,
  Button,
  TouchableOpacity,
} from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { initialSpots } from '../data/spots';
import { ScrollView } from 'react-native';
import { BACKEND_URL } from '@env';

export default function MapScreen({ navigation }) {
  const [spots, setSpots] = useState([]);
  const [userSpots, setUserSpots] = useState([]);
  const [selectedVibe, setSelectedVibe] = useState(null);
  const route = useRoute();

  const vibes = [
    { label: 'All', value: null, color: '#ccc', emoji: '🔁' },
    { label: 'Romantic', value: 'Romantic', color: '#ff69b4', emoji: '💖' },
    { label: 'Serene', value: 'Serene', color: '#87ceeb', emoji: '🌿' },
    { label: 'Creative', value: 'Creative', color: '#ffa500', emoji: '🎨' },
  ];

  const gwaliorCoords = {
    latitude: 26.2183,
    longitude: 78.1984,
    latitudeDelta: 0.04,
    longitudeDelta: 0.04,
  };

  const handleDeleteSpot = (spotId) => {
    setUserSpots((prev) => prev.filter((s) => s.id !== spotId));
    setSpots((prev) => prev.filter((s) => s.id !== spotId));
  };

  useFocusEffect(
    useCallback(() => {
      const fetchAllSpots = async () => {
        try {
          const res = await fetch(`${BACKEND_URL}/api/spots/all`)
;
          const backendSpots = await res.json();

          const formatted = backendSpots
            .filter((spot) => spot.location?.coordinates?.length === 2)
            .map((spot) => ({
              ...spot,
              id: spot._id,
              coordinates: {
                latitude: spot.location.coordinates[1],
                longitude: spot.location.coordinates[0],
              },
              imageUrls: spot.imageUrls || [],
              comments: spot.comments || [],
            }));

          setSpots([...initialSpots, ...formatted, ...userSpots]);
        } catch (err) {
          console.error('❌ Failed to fetch backend spots:', err);
          setSpots([...initialSpots, ...userSpots]);
        }
      };

      const newSpot = route.params?.newSpot;
      if (newSpot) {
        setUserSpots((prev) => [...prev, newSpot]);
        navigation.setParams({ newSpot: null });
      }

      const deletedSpotId = route.params?.deletedSpotId;
      if (deletedSpotId) {
        handleDeleteSpot(deletedSpotId);
        navigation.setParams({ deletedSpotId: null });
      }

      fetchAllSpots();
    }, [route.params?.newSpot, route.params?.deletedSpotId, userSpots])
  );

  const visibleSpots = selectedVibe
    ? spots.filter(
        (spot) => spot.vibe?.toLowerCase() === selectedVibe.toLowerCase()
      )
    : spots;

 const vibeColors = {
  romantic: '#ff69b4',
  serene: '#87ceeb',
  creative: '#ffa500',
};

const getColorByVibe = (vibe) => {
  if (!vibe) return 'red';

  const lowerVibe = vibe.toLowerCase();

  if (vibeColors[lowerVibe]) {
    return vibeColors[lowerVibe];
  }

  const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
  vibeColors[lowerVibe] = randomColor;
  return vibeColors[lowerVibe];
};


  return (
    <View style={styles.container}>
      {/* Filter Buttons */}
      <View style={styles.filterRow}>
        {vibes.map((v) => (
          <TouchableOpacity
            key={v.label}
            style={[
              styles.filterButton,
              {
                backgroundColor:
                  selectedVibe === v.value || (v.value === null && selectedVibe === null)
                    ? v.color
                    : '#f0f0f0',
              },
            ]}
            onPress={() => setSelectedVibe(v.value)}
          >
            <Text style={{ fontWeight: 'bold' }}>
              {v.emoji} {v.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Map */}
      <View style={styles.legendWrapper}>
  <ScrollView
    horizontal
    showsHorizontalScrollIndicator={false}
    contentContainerStyle={styles.legendRow}
  >
    {Array.from(new Set(spots.map((spot) => spot.vibe))).map((vibe, idx) => (
      <View key={idx} style={styles.legendItem}>
        <View
          style={[styles.colorDot, { backgroundColor: getColorByVibe(vibe) }]}
        />
        <Text style={styles.legendText} numberOfLines={1}>
          {vibe}
        </Text>
      </View>
    ))}
  </ScrollView>
</View>


      <MapView style={styles.map} initialRegion={gwaliorCoords}>
        {visibleSpots.map((spot, index) => {
          if (!spot.coordinates?.latitude || !spot.coordinates?.longitude) return null;

          const pinColor = getColorByVibe(spot.vibe);


          return (
            <Marker
              key={spot.id || index}
              coordinate={spot.coordinates}
              pinColor={pinColor}
              title={spot.name}
              description={spot.vibe}
            >
              <Callout
                onPress={() =>
                  navigation.navigate('Details', {
                    spot,
                    isUserSpot: !initialSpots.find((s) => s.id === spot.id),
                  })
                }
              >
                <View style={{ width: 200 }}>
                  <Text style={{ fontWeight: 'bold' }}>{spot.name}</Text>
                  <Text>{spot.vibe}</Text>
                  <Text>Tap to view details ⮕</Text>
                </View>
              </Callout>
            </Marker>
          );
        })}
      </MapView>

      <View style={styles.floatingButton}>
        <Button title="➕ Add Spot" onPress={() => navigation.navigate('AddSpot')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
  filterRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: '#fff',
    zIndex: 10,
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: '#999',
  },
  legendRow: {
  backgroundColor: '#f9f9f9',
  paddingVertical: 8,
  borderBottomWidth: 1,
  borderBottomColor: '#ddd',
},

legendItem: {
  flexDirection: 'row',
  alignItems: 'center',
  marginRight: 15,
},

colorDot: {
  width: 14,
  height: 14,
  borderRadius: 7,
  marginRight: 6,
  borderWidth: 1,
  borderColor: '#555',
},

legendText: {
  fontSize: 14,
  color: '#333',
},

  floatingButton: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    zIndex: 20,
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
  },
  legendWrapper: {
  backgroundColor: '#fff',
  paddingVertical: 8,
  borderBottomColor: '#e5e5e5',
  borderBottomWidth: 1,
  elevation: 2,
},

legendRow: {
  flexDirection: 'row',
  alignItems: 'center',
  paddingHorizontal: 12,
},

legendItem: {
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: '#f2f2f2',
  paddingHorizontal: 10,
  paddingVertical: 6,
  borderRadius: 20,
  marginRight: 10,
},

colorDot: {
  width: 12,
  height: 12,
  borderRadius: 6,
  marginRight: 6,
  borderWidth: 1,
  borderColor: '#666',
},

legendText: {
  fontSize: 13,
  maxWidth: 80,
  color: '#333',
  fontWeight: '500',
},

});
