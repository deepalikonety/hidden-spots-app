import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TextInput,
  Button,
  Alert,
  Dimensions,
} from 'react-native';
import Slider from '@react-native-community/slider';
import { BACKEND_URL } from '@env';

export default function SpotDetailScreen({ route, navigation }) {
  const { spot, isUserSpot, onDelete } = route.params;
  const [comments, setComments] = useState(spot.comments || []);
  const [newComment, setNewComment] = useState('');
  const [commentName, setCommentName] = useState('');
  const [userRatings, setUserRatings] = useState({
    uniqueness: 0,
    vibe: 0,
    safety: 0,
    crowd: 0,
  });
  const [ratingCount, setRatingCount] = useState(1);
  const [ratingsSubmitted, setRatingsSubmitted] = useState(false);

  const handleSubmitRatings = () => {
    const newRatings = {
      uniqueness:
        (spot.ratings.uniqueness * ratingCount + userRatings.uniqueness) / (ratingCount + 1),
      vibe:
        (spot.ratings.vibe * ratingCount + userRatings.vibe) / (ratingCount + 1),
      safety:
        (spot.ratings.safety * ratingCount + userRatings.safety) / (ratingCount + 1),
      crowd:
        (spot.ratings.crowd * ratingCount + userRatings.crowd) / (ratingCount + 1),
    };

    spot.ratings = newRatings;
    setRatingCount(ratingCount + 1);
    setRatingsSubmitted(true);
    Alert.alert('Thank you!', 'Your ratings have been addedsuccessfully!');
  };

  const handleAddComment = () => {
    if (!newComment.trim()) return;
    const updated = [
      ...comments,
      {
        text: newComment.trim(),
        user: commentName.trim() || 'Anonymous',
      },
    ];
    setComments(updated);
    setNewComment('');
    setCommentName('');
    Alert.alert('Success', 'Comment added locally!');
  };

  const handleDelete = async () => {
    try {
      const res = await fetch(
       `${BACKEND_URL}/api/spots/${spot.id}`,
        {
          method: 'DELETE',
          headers: {
            Accept: 'application/json',
          },
        }
      );

      if (!res.ok) {
        const contentType = res.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          const errData = await res.json();
          throw new Error(errData.error || 'Failed to delete');
        } else {
          throw new Error('Unexpected server response');
        }
      }

      onDelete?.();
      Alert.alert('Deleted', 'Spot removed!');
      navigation.navigate('Map', { deletedSpotId: spot.id });
    } catch (err) {
      console.error('❌ Delete error:', err);
      Alert.alert('Error', err.message || 'Could not delete spot.');
    }
  };

  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
      {/* Image Gallery */}
      {Array.isArray(spot.imageUrls) && spot.imageUrls.length > 0 ? (
        <ScrollView horizontal pagingEnabled style={styles.gallery}>
          {spot.imageUrls.map((url, idx) => (
            <Image key={idx} source={{ uri: url }} style={styles.image} />
          ))}
        </ScrollView>
      ) : Array.isArray(spot.images) && spot.images.length > 0 ? (
        <ScrollView horizontal pagingEnabled style={styles.gallery}>
          {spot.images.map((img, idx) => (
            <Image key={idx} source={img} style={styles.image} />
          ))}
        </ScrollView>
      ) : (
        <Text style={{ color: '#888', marginBottom: 10 }}>No images available</Text>
      )}

      <Text style={styles.title}>{spot.name}</Text>
      <Text style={styles.desc}>{spot.description}</Text>

      {/* Ratings Block */}
      <View style={styles.block}>
        <Text style={styles.section}>📊 Spot Ratings</Text>
        <Text>🌟 Uniqueness: {Math.round(spot.ratings.uniqueness)}/5</Text>
        <Text>🧘 Vibe: {Math.round(spot.ratings.vibe)}/5</Text>
        <Text>🛡️ Safety: {Math.round(spot.ratings.safety)}/5</Text>
        <Text>👥 Crowd: {Math.round(spot.ratings.crowd)}/5</Text>

        {ratingsSubmitted && (
          <View style={{ marginTop: 10 }}>
            <Text style={{ fontWeight: 'bold' }}>🎯 Your Submitted Ratings:</Text>
            <Text>Uniqueness: {userRatings.uniqueness}/5</Text>
            <Text>Vibe: {userRatings.vibe}/5</Text>
            <Text>Safety: {userRatings.safety}/5</Text>
            <Text>Crowd: {userRatings.crowd}/5</Text>
          </View>
        )}
      </View>

      {/* Submit Rating */}
      <View style={styles.block}>
        <Text style={styles.section}>⭐ Rate this Spot</Text>
        {['uniqueness', 'vibe', 'safety', 'crowd'].map((key) => (
          <View key={key} style={styles.sliderRow}>
            <Text>
              {key.charAt(0).toUpperCase() + key.slice(1)}: {userRatings[key]}
            </Text>
            <Slider
              style={{ width: '100%' }}
              minimumValue={0}
              maximumValue={5}
              step={1}
              value={userRatings[key]}
              onValueChange={(value) =>
                setUserRatings((prev) => ({ ...prev, [key]: value }))
              }
            />
          </View>
        ))}
        <Button title="Submit Ratings" onPress={handleSubmitRatings} />
      </View>

      {/* Comments Section */}
      <View style={styles.block}>
        <Text style={styles.section}>💬 Comments</Text>
        {comments.map((comment, index) => (
          <View key={index} style={styles.comment}>
            <Text>{comment.text}</Text>
            <Text style={styles.commentUser}>– {comment.user}</Text>
          </View>
        ))}

        <Text style={{ fontWeight: 'bold', marginTop: 15 }}>Your Name</Text>
        <TextInput
          style={styles.input}
          placeholder="(optional)"
          value={commentName}
          onChangeText={setCommentName}
        />

        <Text style={{ fontWeight: 'bold', marginTop: 10 }}>Your Comment</Text>
        <TextInput
          style={styles.input}
          placeholder="Add a comment..."
          value={newComment}
          onChangeText={setNewComment}
        />
        <Button title="Post Comment" onPress={handleAddComment} />
      </View>

      {/* Delete Button */}
      {isUserSpot && (
        <View style={{ marginTop: 20 }}>
          <Button
            title="🗑️ Delete this Spot"
            color="red"
            onPress={handleDelete}
          />
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingBottom: 30,
    backgroundColor: '#fff',
  },
  gallery: {
    width: '100%',
    height: 220,
    marginBottom: 20,
    borderRadius: 12,
  },
  image: {
    width: Dimensions.get('window').width - 40,
    height: 220,
    borderRadius: 12,
    marginRight: 12,
  },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  desc: { fontSize: 16, marginBottom: 20 },
  block: {
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    padding: 15,
    marginVertical: 15,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  section: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 10,
    color: '#333',
  },
  comment: {
    backgroundColor: '#f0f0f0',
    marginTop: 10,
    padding: 10,
    borderRadius: 6,
  },
  commentUser: {
    fontSize: 12,
    color: '#777',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    marginTop: 8,
    marginBottom: 16,
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  sliderRow: {
    marginBottom: 18,
  },
});
