import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import TabHeader from '@/app/commonComponts/TabHeader';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronRight, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { CommonStyles, MARGIN, PADDING } from '@/constants/Colors';

const GroceryProduct = () => {
    const [selectedTab, setSelectedTab] = useState('All');

    return (
        <View style={{ flex: 1 }}>
            <TabHeader />
            <View style={styles.container}>
                {/* Search Bar */}
                <View style={styles.searchContainer}>
                    <TextInput placeholder="Search for add-on" placeholderTextColor="#8E8E8E" style={styles.input} />
                    <FontAwesomeIcon icon={faMagnifyingGlass} size={20} color="#26B24B" style={styles.icon} />
                </View>
                <View>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollViewContent}>

                        <View style={[styles.tabWrapper]}>

                            <View style={styles.Tabcontainer}>
                                <TouchableOpacity
                                    style={[styles.button, selectedTab === 'All' && styles.selectedButton]}
                                    onPress={() => setSelectedTab('All')}
                                >
                                    <Text style={[styles.text, selectedTab === 'All' && styles.selectedText]}>All</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={styles.Tabcontainer}>
                                <TouchableOpacity
                                    style={[styles.button, selectedTab === 'Groceries' && styles.selectedButton]}
                                    onPress={() => setSelectedTab('Groceries')}
                                >
                                    <Text style={[styles.text, selectedTab === 'Groceries' && styles.selectedText]}>Groceries</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={styles.Tabcontainer}>
                                <TouchableOpacity
                                    style={[styles.button, selectedTab === 'Vegetable & Fruits' && styles.selectedButton]}
                                    onPress={() => setSelectedTab('Vegetable & Fruits')}
                                >
                                    <Text style={[styles.text, selectedTab === 'Vegetable & Fruits' && styles.selectedText]}>Vegetable & Fruits</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={styles.Tabcontainer}>
                                <TouchableOpacity
                                    style={[styles.button, selectedTab === 'Fish & Meat' && styles.selectedButton]}
                                    onPress={() => setSelectedTab('Fish & Meat')}
                                >
                                    <Text style={[styles.text, selectedTab === 'Fish & Meat' && styles.selectedText]}>Fish & Meat</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={styles.Tabcontainer}>
                                <TouchableOpacity
                                    style={[styles.button, selectedTab === 'Household Items' && styles.selectedButton]}
                                    onPress={() => setSelectedTab('Household Items')}
                                >
                                    <Text style={[styles.text, selectedTab === 'Household Items' && styles.selectedText]}>Household Items</Text>
                                </TouchableOpacity>
                            </View>

                        </View>
                    </ScrollView>
                </View>
                <View style={{ ...styles.textcontainer }}>
                    <ScrollView>
                        <TouchableOpacity style={styles.card}>
                            <View style={styles.textContainer}>
                                <Text style={styles.title}>Grocery</Text>
                                <Text style={styles.subtitle}>Number of Sub category - 12</Text>
                            </View>
                         <FontAwesomeIcon icon={faChevronRight} size={20} color='#2B2827' />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.card}>
                            <View style={styles.textContainer}>
                                <Text style={styles.title}>Vegetable & fruits</Text>
                                <Text style={styles.subtitle}>Number of Sub category - 2</Text>
                            </View>
                         <FontAwesomeIcon icon={faChevronRight} size={20} color='#2B2827' />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.card}>
                            <View style={styles.textContainer}>
                                <Text style={styles.title}>Fish & Meat</Text>
                                <Text style={styles.subtitle}>Number of Sub category - 3</Text>
                            </View>
                         <FontAwesomeIcon icon={faChevronRight} size={20} color='#2B2827' />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.card}>
                            <View style={styles.textContainer}>
                                <Text style={styles.title}>Household Items</Text>
                                <Text style={styles.subtitle}>Number of Sub category - 6</Text>
                            </View>
                         <FontAwesomeIcon icon={faChevronRight} size={20} color='#2B2827' />
                        </TouchableOpacity>
                    </ScrollView>
                </View>
            </View>
        </View>
    );
};



const styles = StyleSheet.create({
    container: {
        // flex: 1,
        backgroundColor: "#F9F9F9",
        padding: PADDING.largePad,
        height: '100%'
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
    scrollViewContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    tabWrapper: {
        flexDirection: 'row',
        height: "13%",
        alignItems: 'center',
        borderRadius: 20,
        maxHeight: 100,
    },
    Tabcontainer: {
        marginRight: 10,
    },
    button: {
        height: 40,
        paddingHorizontal: 20,
        borderWidth: 1,
        borderColor: '#939393',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    selectedButton: {
        borderColor: '#376E46',
        backgroundColor: '#376E46',
    },
    text: {
        color: '#939393',
        fontWeight: 'bold',
    },
    selectedText: {
        color: '#FFF',
        fontWeight: 'bold'
    },
    textcontainer: {
        flex: 1,
        marginTop: MARGIN.largeMar
    },
    card: {
        flexDirection: 'row',
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
      },
      textContainer: {
        flex: 1,
      },
      title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#222',
      },
      subtitle: {
        fontSize: 14,
        color: '#666',
        marginTop: MARGIN.miniMar,
      },
});

export default GroceryProduct;
