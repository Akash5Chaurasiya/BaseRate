
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';

interface CardProps {
    item: any;
}
const Card: React.FC<CardProps> = ({ item }) => {
    const [showDescription, setShowDescription] = useState(false);

    const toggleDescription = () => {
        setShowDescription(!showDescription);
    };

    return (
        <View style={styles.card}>
            <Image style={styles.image} source={{ uri: item.companyName.imageURL }} />
            <View style={styles.cardContent}>
                <View style={styles.header}>
                    <Text style={styles.companyName}>{item.companyName.name}</Text>

                </View>
                <Text style={styles.description}>
                    {showDescription ? item.description : item.description.substring(0, 50)}
                </Text>
                <TouchableOpacity onPress={toggleDescription}>
                    <Text style={styles.readMore}>{showDescription ? 'Read Less' : 'Read More'}</Text>
                </TouchableOpacity>
                <View style={styles.priceContainer}>
                    <Text style={styles.price}> {item.cost}</Text>
                </View>
            </View>
        </View>
    );
};

const TableView = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const API_URL = 'https://www.lohawalla.com/purchaser/pages/setBasicPrice/getBasicPrice';
                const response = await axios.get(API_URL);
                const data = response.data;
                setData(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);


    return (
        <FlatList
            data={data}

            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => <Card item={item} />}
        />
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
        marginTop: 3
    },
    price: {
        fontSize: 14,
    },
});

export default TableView;
