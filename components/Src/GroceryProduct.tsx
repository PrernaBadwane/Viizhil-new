import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import TabHeader from '@/app/commonComponts/TabHeader';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronRight, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { MARGIN, PADDING } from '@/constants/Colors';

const GroceryProduct = () => {
    const [selectedCategory, setSelectedCategory] = useState("ALL");
    const renderCategoryItem = (title:any, count:any) => (
        <TouchableOpacity style={styles.card}>
            <View style={styles.textContainer}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.subtitle}>Number Of Sub Category - {count}</Text>
            </View>
            <FontAwesomeIcon icon={faChevronRight} size={20} color='#2B2827' />
        </TouchableOpacity>
    );
    return (
        <View style={{ flex: 1 }}>
            <TabHeader />
            <View style={styles.container}>
                {/* Search Bar */}
                <View style={styles.searchContainer}>
                    <TextInput placeholder="Search for add-on" placeholderTextColor="#8E8E8E" style={styles.input} />
                    <FontAwesomeIcon icon={faMagnifyingGlass} size={20} color="#26B24B" style={styles.icon} />
                </View>

                {/* Categories */}
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <View style={{ flexDirection: "row" }}>
                        {['ALL', 'Groceries', 'Vegetable & Fruits', 'Fish & Meat', 'Household Items'].map((category) => (
                            <TouchableOpacity key={category} onPress={() => setSelectedCategory(category)}>
                                <View style={[styles.categoryContainer, selectedCategory === category && styles.selectedCategory]}>
                                    <Text style={selectedCategory === category ? styles.selectedText : styles.categoryText}>{category}</Text>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>
                </ScrollView>

                {/* Category Items */}
                <ScrollView>
                    {selectedCategory === "ALL" && (
                        <View>
                            {renderCategoryItem("Grocery", 12)}
                            {renderCategoryItem("Vegetable & Fruits", 2)}
                            {renderCategoryItem("Fish & Meat", 3)}
                            {renderCategoryItem("Household Items", 6)}
                        </View>
                    )}
                    {selectedCategory === "Groceries" && (
                        <View>
                            {renderCategoryItem("Packaged Food", 8)}
                            {renderCategoryItem("Masala & Dry Fruits", 5)}
                            {renderCategoryItem("Atta, Rice, Oil & Dals", 7)}
                        </View>
                    )}
                </ScrollView>
            </View>
        </View>
    );
};



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        padding: PADDING.largePad,
    },
    searchContainer: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 12,
        paddingHorizontal: 15,
        backgroundColor: "#fff",
        height: 50,
        justifyContent: "space-between",
        marginVertical: 10,
    },
    input: {
        flex: 1,
        fontSize: 14,
        color: "#000",
    },
    icon: {
        marginLeft: 10,
    },
    categoryContainer: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 20,
        marginHorizontal: 5,
        backgroundColor: "#f8f8f8",
    },
    selectedCategory: {
        backgroundColor: "#376E46",
    },
    categoryText: {
        fontSize: 16,
        color: "#333",
        fontWeight: '700',
    },
    selectedText: {
        fontSize: 16,
        color: "#FFF",
        fontWeight: "700",
    },
    card: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    textContainer: {
        flex: 1,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    subtitle: {
        marginTop: MARGIN.miniMar,
        fontSize: 14,
        color: '#666',
    },
});

export default GroceryProduct;
