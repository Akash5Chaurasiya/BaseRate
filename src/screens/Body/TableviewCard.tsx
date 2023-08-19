
import React, { useEffect, useRef, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { ScrollView, TextInput, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { ImageIndex } from '@src/assets/AssetIndex';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface CardProps {
    item: any;
    apiCallFinished: boolean;
}
const VirtualizedList = ({
    children,
    style
}: {
    children: React.ReactNode;
    style?: object
}) => {
    return (
        <FlatList
            data={[]}
            keyExtractor={() => 'key'}
            renderItem={null}
            ListHeaderComponent={<>{children}</>}
        />
    );
};
const Card: React.FC<CardProps> = ({ item, apiCallFinished }) => {
    const [showDescription, setShowDescription] = useState(false);
    const [editingCost, setEditingCost] = useState(false);
    const [editedCost, setEditedCost] = useState(item.cost.toString());
    const isEditEnabled = editedCost !== item.cost.toString(); // Check if user edited the cost
    const toggleDescription = () => {
        setShowDescription(!showDescription);
    };
    const startEditing = () => {
        if (apiCallFinished) { // Only allow editing if API call has finished
            setEditedCost(item.cost.toString());
            setEditingCost(true);
        }
    }
    const updateCost = () => {
        setEditingCost(false)
    }
    return (
        <View style={styles.card}>
            <Image style={styles.image} source={{ uri: item.companyName.imageURL }} />
            <View style={styles.cardContent}>
                <View style={styles.header}>
                    <Text style={styles.companyName}>{item.companyName.name}</Text>

                </View>
                <Text style={styles.description}>
                    {showDescription ? item.description : item.description.substring(0, 30)}
                </Text>
                <TouchableOpacity onPress={toggleDescription}>
                    <Text style={styles.readMore}>{showDescription ? 'Read Less' : 'Read More'}</Text>
                </TouchableOpacity>
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                    {editingCost ? (
                        <TouchableWithoutFeedback>
                            <TextInput
                                style={styles.priceContainer}
                                value={editedCost}
                                onChangeText={text => setEditedCost(text)}
                            />
                        </TouchableWithoutFeedback>
                    ) : (
                        <View style={styles.priceContainer}>
                            <TouchableOpacity onPress={startEditing}>
                                <Text style={styles.price}> {editedCost}</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                    <TouchableOpacity style={{ marginLeft: 20 }} onPress={updateCost}>
                        <Image
                            style={{
                                backgroundColor: isEditEnabled ? '#4B4DED' : 'gray', // Change the background color based on edit status
                                width: 30,
                                height: 30,
                                borderRadius: 6,
                            }}
                            source={ImageIndex.check}
                        />
                    </TouchableOpacity>
                </View>

            </View>
        </View>
    );
};

const TableView = () => {
    const [data, setData] = useState([]);
    const [apiCallFinished, setApiCallFinished] = useState(false); // Flag to track API call completion

    useEffect(() => {
        const fetchData = async () => {
            try {
                const API_URL = 'https://www.lohawalla.com/purchaser/pages/setBasicPrice/getBasicPrice';
                const response = await axios.get(API_URL);
                const data = response.data;
                await AsyncStorage.setItem('Base', JSON.stringify(data));
                setApiCallFinished(true);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const getDataFromStorage = async () => {
            try {
                const dataFromStorage = await AsyncStorage.getItem('Base');

                if (dataFromStorage !== null) {
                    const parsedData = JSON.parse(dataFromStorage);
                    setData(parsedData);
                } else {
                    console.log('Data not found in AsyncStorage');
                }
            } catch (error) {
                console.error('Error getting data from storage:', error);
            }
        };

            getDataFromStorage(); // Call this function after the API call has finished
    }, []);
    
    const renderSkeletonItem = () => {
        const skeletonCount = 50; // Number of times to repeat the skeleton item
        const skeletonItems = Array.from({ length: skeletonCount }, (_, index) => (
            <SkeletonPlaceholder key={index}>
                <View style={{ padding: 12 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{ width: '100%', height: 100, borderRadius: 4 }} />
                    </View>
                </View>
            </SkeletonPlaceholder>
        ));

        return skeletonItems;
    };
    return (
        <VirtualizedList>
                <FlatList
                    style={styles.container}
                    data={data}
                    ListEmptyComponent={renderSkeletonItem}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => <Card item={item} apiCallFinished={apiCallFinished} />}
                />
        </VirtualizedList>
    );
};

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        padding: 30,
        marginBottom: 10,
        backgroundColor: '#fff',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ddd',
        elevation: 1,
        marginLeft: '5%',
        marginRight: '5%'
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    cardContent: {
        marginLeft: 20,
        justifyContent: 'center',

    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 5,
    },
    companyName: {
        fontSize: 16,
        fontWeight: '600',
        color: 'black',
    },
    readMore: {
        color: 'black',
        fontSize: 12,
    },
    description: {
        fontSize: 14,
        marginBottom: 5,
        color: '#000000BF',
        fontWeight: '400'
    },
    priceContainer: {
        backgroundColor: 'white',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 3,
        alignSelf: 'flex-start',
        borderWidth: 0.3,
        borderColor: 'black',
        marginTop: 3,
        color: 'black'
    },
    price: {
        fontSize: 14,
        color: 'black'
    },
    container: {
        width: '100%',
        height: '500%',
        backgroundColor: '#fafafa',
    },
});

export default TableView;
