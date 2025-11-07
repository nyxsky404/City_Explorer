import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

/**
 * FilterSection component for collapsible filter groups
 * @param {String} title - Section title
 * @param {Array} options - Array of filter options
 * @param {Array} selectedOptions - Currently selected options
 * @param {Function} onToggle - Callback when option toggled
 * @param {Boolean} expanded - Whether section is expanded
 * @param {Function} onToggleExpand - Callback to toggle expansion
 */
const FilterSection = ({
    title,
    options,
    selectedOptions,
    onToggle,
    expanded = true,
    onToggleExpand
}) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.header}
                onPress={onToggleExpand}
            >
                <Text style={styles.title}>{title}</Text>
                <Ionicons
                    name={expanded ? 'chevron-up' : 'chevron-down'}
                    size={20}
                    color="#666"
                />
            </TouchableOpacity>

            {expanded && (
                <View style={styles.optionsContainer}>
                    {options.map((option) => {
                        const isSelected = selectedOptions.includes(option.value);

                        return (
                            <TouchableOpacity
                                key={option.value}
                                style={styles.option}
                                onPress={() => onToggle(option.value)}
                            >
                                <View style={[
                                    styles.checkbox,
                                    isSelected && styles.checkboxSelected
                                ]}>
                                    {isSelected && (
                                        <Ionicons name="checkmark" size={16} color="white" />
                                    )}
                                </View>
                                <Text style={styles.optionText}>{option.label}</Text>
                            </TouchableOpacity>
                        );
                    })}
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 16,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
    },
    optionsContainer: {
        paddingTop: 8,
    },
    option: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
    },
    checkbox: {
        width: 24,
        height: 24,
        borderRadius: 6,
        borderWidth: 2,
        borderColor: '#ddd',
        marginRight: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    checkboxSelected: {
        backgroundColor: '#4CAF50',
        borderColor: '#4CAF50',
    },
    optionText: {
        fontSize: 15,
        color: '#333',
    },
});

export default FilterSection;
