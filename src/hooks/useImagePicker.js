// useImagePicker hook
// Encapsulates image picking and camera capture logic

import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { Alert } from 'react-native';

export default function useImagePicker() {
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);

    const pickFromGallery = async () => {
        try {
            setLoading(true);
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Permission Required', 'Please grant photo library access to select images.');
                return null;
            }

            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 0.8,
            });

            if (!result.canceled && result.assets?.length > 0) {
                const uri = result.assets[0].uri;
                setImage(uri);
                return uri;
            }
            return null;
        } catch (error) {
            console.error('Error picking image:', error);
            Alert.alert('Error', 'Failed to pick image from gallery.');
            return null;
        } finally {
            setLoading(false);
        }
    };

    const captureFromCamera = async () => {
        try {
            setLoading(true);
            const { status } = await ImagePicker.requestCameraPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Permission Required', 'Please grant camera access to capture photos.');
                return null;
            }

            const result = await ImagePicker.launchCameraAsync({
                allowsEditing: true,
                aspect: [4, 3],
                quality: 0.8,
            });

            if (!result.canceled && result.assets?.length > 0) {
                const uri = result.assets[0].uri;
                setImage(uri);
                return uri;
            }
            return null;
        } catch (error) {
            console.error('Error capturing image:', error);
            Alert.alert('Error', 'Failed to capture photo.');
            return null;
        } finally {
            setLoading(false);
        }
    };

    const pickVideoFromGallery = async () => {
        try {
            setLoading(true);
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Permission Required', 'Please grant photo library access to select videos.');
                return null;
            }

            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Videos,
                allowsEditing: true,
                quality: 0.8,
            });

            if (!result.canceled && result.assets?.length > 0) {
                const uri = result.assets[0].uri;
                return uri;
            }
            return null;
        } catch (error) {
            console.error('Error picking video:', error);
            Alert.alert('Error', 'Failed to pick video from gallery.');
            return null;
        } finally {
            setLoading(false);
        }
    };

    const captureVideoFromCamera = async () => {
        try {
            setLoading(true);
            const { status } = await ImagePicker.requestCameraPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Permission Required', 'Please grant camera access to record videos.');
                return null;
            }

            const result = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Videos,
                allowsEditing: true,
                quality: 0.8,
            });

            if (!result.canceled && result.assets?.length > 0) {
                const uri = result.assets[0].uri;
                return uri;
            }
            return null;
        } catch (error) {
            console.error('Error capturing video:', error);
            Alert.alert('Error', 'Failed to record video.');
            return null;
        } finally {
            setLoading(false);
        }
    };

    const clearImage = () => {
        setImage(null);
    };

    return {
        image,
        loading,
        pickFromGallery,
        captureFromCamera,
        pickVideoFromGallery,
        captureVideoFromCamera,
        clearImage,
        setImage,
    };
}
