import React, { useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, Modal, StyleSheet, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const PhotoGallery = ({ photos }) => {
    const [selectedPhoto, setSelectedPhoto] = useState(null);

    if (!photos || photos.length === 0) {
        return null;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Photos ({photos.length})</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                {photos.map((photo) => (
                    <TouchableOpacity key={photo.id} onPress={() => setSelectedPhoto(photo)}>
                        <Image source={{ uri: photo.uri || photo.image }} style={styles.thumbnail} />
                    </TouchableOpacity>
                ))}
            </ScrollView>

            <Modal visible={!!selectedPhoto} transparent={true} animationType="fade">
                <View style={styles.modalContainer}>
                    <TouchableOpacity
                        style={styles.closeButton}
                        onPress={() => setSelectedPhoto(null)}
                    >
                        <Ionicons name="close" size={30} color="white" />
                    </TouchableOpacity>

                    {selectedPhoto && (
                        <Image
                            source={{ uri: selectedPhoto.uri || selectedPhoto.image }}
                            style={styles.fullImage}
                            resizeMode="contain"
                        />
                    )}

                    {selectedPhoto && selectedPhoto.userName && (
                        <View style={styles.photoFooter}>
                            <Text style={styles.photoUser}>Posted by {selectedPhoto.userName}</Text>
                        </View>
                    )}
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 20,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 12,
        color: '#333',
        paddingHorizontal: 20,
    },
    scrollContent: {
        paddingHorizontal: 16,
    },
    thumbnail: {
        width: 120,
        height: 120,
        borderRadius: 8,
        marginRight: 12,
        backgroundColor: '#f0f0f0',
    },
    modalContainer: {
        flex: 1,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
    },
    closeButton: {
        position: 'absolute',
        top: 50,
        right: 20,
        zIndex: 1,
        padding: 10,
    },
    fullImage: {
        width: width,
        height: width,
    },
    photoFooter: {
        position: 'absolute',
        bottom: 50,
        left: 0,
        right: 0,
        alignItems: 'center',
    },
    photoUser: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
});

export default PhotoGallery;
