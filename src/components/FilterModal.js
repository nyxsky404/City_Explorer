import React, { useState } from 'react';
import {
    View,
    Text,
    Modal,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    TouchableWithoutFeedback,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import FilterSection from './FilterSection';


const FilterModal = ({ visible, onClose, filters, onApply, type = 'food' }) => {
    const [localFilters, setLocalFilters] = useState(filters);
    const [expandedSections, setExpandedSections] = useState({
        price: true,
        dietary: true,
        accessibility: true,
    });


    const priceOptions = type === 'food'
        ? [
            { label: 'Under ₹500', value: 'Under ₹500' },
            { label: '₹500 - ₹1500', value: '₹500 - ₹1500' },
            { label: 'Over ₹1500', value: 'Over ₹1500' },
        ]
        : [
            { label: 'Free', value: 'Free' },
            { label: '₹ (Under ₹500)', value: '₹' },
            { label: '₹₹ (₹500-1500)', value: '₹₹' },
            { label: '₹₹₹ (Over ₹1500)', value: '₹₹₹' },
        ];


    const dietaryOptions = [
        { label: '🌱 Vegan', value: 'vegan' },
        { label: '🥬 Vegetarian', value: 'vegetarian' },
        { label: '🌾 Gluten-Free', value: 'gluten-free' },
        { label: '🥛 Dairy-Free', value: 'dairy-free' },
        { label: '🥜 Nut-Free', value: 'nut-free' },
    ];


    const accessibilityOptions = type === 'food'
        ? [
            { label: '♿ Wheelchair Accessible', value: 'wheelchair' },
            { label: '🅿️ Parking Available', value: 'parking' },
            { label: '🌳 Outdoor Seating', value: 'outdoor' },
        ]
        : [
            { label: '♿ Wheelchair Accessible', value: 'wheelchair' },
            { label: '🅿️ Parking Available', value: 'parking' },
            { label: '🤟 Sign Language', value: 'signLanguage' },
        ];

    const toggleFilter = (filterType, value) => {
        setLocalFilters(prev => {
            const currentValues = prev[filterType] || [];
            const newValues = currentValues.includes(value)
                ? currentValues.filter(v => v !== value)
                : [...currentValues, value];

            return { ...prev, [filterType]: newValues };
        });
    };

    const toggleSection = (section) => {
        setExpandedSections(prev => ({
            ...prev,
            [section]: !prev[section],
        }));
    };

    const handleApply = () => {
        onApply(localFilters);
        onClose();
    };

    const handleReset = () => {
        const resetFilters = {
            priceRanges: [],
            dietary: [],
            accessibility: [],
        };
        setLocalFilters(resetFilters);
    };

    const getActiveCount = () => {
        let count = 0;
        if (localFilters.priceRanges) count += localFilters.priceRanges.length;
        if (localFilters.dietary) count += localFilters.dietary.length;
        if (localFilters.accessibility) count += localFilters.accessibility.length;
        return count;
    };

    return (
        <Modal
            visible={visible}
            animationType="slide"
            transparent={true}
            onRequestClose={onClose}
        >
            <TouchableWithoutFeedback onPress={onClose}>
                <View style={styles.overlay}>
                    <TouchableWithoutFeedback>
                        <View style={styles.modalContainer}>

                            <View style={styles.header}>
                                <Text style={styles.headerTitle}>Filters</Text>
                                <TouchableOpacity onPress={onClose}>
                                    <Ionicons name="close" size={28} color="#FFFFFF" />
                                </TouchableOpacity>
                            </View>


                            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>

                                <FilterSection
                                    title="Price Range"
                                    options={priceOptions}
                                    selectedOptions={localFilters.priceRanges || []}
                                    onToggle={(value) => toggleFilter('priceRanges', value)}
                                    expanded={expandedSections.price}
                                    onToggleExpand={() => toggleSection('price')}
                                />


                                {type === 'food' && (
                                    <FilterSection
                                        title="Dietary Options"
                                        options={dietaryOptions}
                                        selectedOptions={localFilters.dietary || []}
                                        onToggle={(value) => toggleFilter('dietary', value)}
                                        expanded={expandedSections.dietary}
                                        onToggleExpand={() => toggleSection('dietary')}
                                    />
                                )}


                                <FilterSection
                                    title="Accessibility"
                                    options={accessibilityOptions}
                                    selectedOptions={localFilters.accessibility || []}
                                    onToggle={(value) => toggleFilter('accessibility', value)}
                                    expanded={expandedSections.accessibility}
                                    onToggleExpand={() => toggleSection('accessibility')}
                                />
                            </ScrollView>


                            <View style={styles.footer}>
                                <TouchableOpacity
                                    style={styles.resetButton}
                                    onPress={handleReset}
                                >
                                    <Text style={styles.resetButtonText}>Reset All</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={styles.applyButton}
                                    onPress={handleApply}
                                >
                                    <Text style={styles.applyButtonText}>
                                        Apply {getActiveCount() > 0 ? `(${getActiveCount()})` : ''}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        justifyContent: 'flex-end',
    },
    modalContainer: {
        backgroundColor: '#1E1E1E',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        maxHeight: '80%',
        borderWidth: 1,
        borderColor: '#333',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#333',
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    content: {
        padding: 20,
    },
    footer: {
        flexDirection: 'row',
        padding: 16,
        gap: 12,
        borderTopWidth: 1,
        borderTopColor: '#333',
    },
    resetButton: {
        flex: 1,
        paddingVertical: 14,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#333',
        alignItems: 'center',
        backgroundColor: '#2C2C2C',
    },
    resetButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#AAAAAA',
    },
    applyButton: {
        flex: 2,
        paddingVertical: 14,
        borderRadius: 12,
        backgroundColor: '#266E3F',
        alignItems: 'center',
    },
    applyButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: 'white',
    },
});

export default FilterModal;
