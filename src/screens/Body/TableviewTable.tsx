
import React, { useState, useEffect } from 'react';
import {
    View,
    ScrollView,
    StyleSheet,
    Text,
    FlatList,
    RefreshControl,
    TouchableWithoutFeedback,
} from 'react-native';
import axios from 'axios';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';

interface CompanyData {
    srNo: number;
    companyName: { name: string };
    cost: number;
    entryTime: string;
}

interface TableviewTableProps {
    data: CompanyData[];
}

const TableviewTable: React.FC<TableviewTableProps> = ({ data: propData }) => {
    const [tableData, setTableData] = useState<CompanyData[]>([]);
    // const [data, setData] = useState<CompanyData[]>([]);
    const [rate, setRate] = useState([]);//editing 
    // const [editedValues, setEditedValues] = useState(false);//to set edited value 
    // const isEditable = (cost:number)=>{
    //     editedValues[cost]!==undefined && editedValues[cost]

    // } 
    const [editedCosts, setEditedCosts] = useState<{ [index: number]: string }>({});

    const handleEditCost = (index: number, value: string) => {
        setEditedCosts(prevEditedCosts => ({
            ...prevEditedCosts,
            [index]: value,
        }));
    };




    const fetchData = async () => {
        try {
            const API_URL = 'https://www.lohawalla.com/purchaser/pages/setBasicPrice/getBasicPrice';
            const response = await axios.get(API_URL);
            setTableData(response.data);

        } catch (err) {
            console.log('error in table api ', err);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);



    return (
        <SafeAreaView style={{ padding: '6%' }}>
            <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: 'blue', width: '30%', marginLeft: '30%', borderRadius: 8, padding: 20 }}>
                <TouchableOpacity>
                    <Text style={{ color: 'white' }}>save pricing</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.outerView}>
                <ScrollView horizontal={true}
                    nestedScrollEnabled
                    style={{ overflow: 'scroll' }}>
                    {/* header */}
                    <View>
                        <View style={styles.tableHeader}>
                            <View style={styles.tableDataH}>
                                <Text
                                    style={{
                                        fontSize: 13,
                                        color: 'white',
                                        fontFamily: 'Inter-Medium',
                                    }}>
                                    SNo.
                                </Text>
                            </View>
                            <View style={styles.tableDataH}>
                                <Text
                                    style={{
                                        fontSize: 13,
                                        color: 'white',
                                        fontFamily: 'Inter-Medium',
                                    }}>
                                    Company
                                </Text>
                            </View>
                            <View style={styles.tableDataH}>
                                <Text
                                    style={{
                                        fontSize: 13,
                                        color: 'white',
                                        fontFamily: 'Inter-Medium',
                                    }}>
                                    Basic Rate
                                </Text>
                            </View>
                            <View style={styles.tableDataH}>
                                <Text
                                    style={{
                                        fontSize: 13,
                                        color: 'white',
                                        fontFamily: 'Inter-Medium',
                                    }}>
                                    Entry Time
                                </Text>
                            </View>
                        </View>

                        {/* body */}
                        <FlatList
                            data={tableData}
                            renderItem={({ item, index }: { item: CompanyData; index: number }) => (
                                <View className="flex-row items-center">
                                    <View style={styles.tableData}>
                                        <View style={{ flexShrink: 1 }}>
                                            <Text
                                                style={{
                                                    color: 'black',
                                                    fontFamily: 'Inter-Medium',
                                                }}>
                                                {item.srNo}
                                            </Text>
                                        </View>
                                    </View>

                                    <View style={styles.tableData}>
                                        <View style={{ flexShrink: 1, flexBasis: '100%' }}>
                                            <Text
                                                style={{
                                                    color: 'black',
                                                    fontFamily: 'Inter-Medium',
                                                }}>
                                                {item.companyName.name}
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={styles.tableData}>
                                        {editedCosts[index] !== undefined ? (
                                            <TextInput
                                                style={{
                                                    color: 'black',
                                                    fontFamily: 'Inter-Medium',
                                                    borderWidth: 2,
                                                    borderRadius: 8,
                                                    borderColor: '#0000001F',
                                                    textAlignVertical: 'center',
                                                    textAlign: 'center',
                                                    paddingVertical: 8
                                                }}
                                                value={editedCosts[index]}
                                                onChangeText={text => handleEditCost(index, text)}
                                            />
                                        ) : (
                                            <TouchableWithoutFeedback
                                                onPress={() => {
                                                    handleEditCost(index, item.cost.toString());
                                                }}
                                            >
                                                <Text
                                                    style={{
                                                        color: 'black',
                                                        fontFamily: 'Inter-Medium',
                                                        borderWidth: 2,
                                                        borderRadius: 8,
                                                        borderColor: '#0000001F',
                                                        textAlignVertical: 'center',
                                                        textAlign: 'center',
                                                        paddingVertical: 8
                                                    }}>
                                                    {item.cost}
                                                </Text>
                                            </TouchableWithoutFeedback>
                                        )}
                                    </View>

                                    {/* <View style={styles.tableData}>


                                        <View style={{ flexShrink: 1 }}>
                                            <Text
                                                style={{
                                                    color: 'black',
                                                    fontFamily: 'Inter-Medium',
                                                    borderWidth: 2,
                                                    borderRadius: 8,
                                                    borderColor: '#0000001F',
                                                    textAlignVertical: 'center',
                                                    textAlign: 'center',
                                                    paddingVertical: 8


                                                }}>
                                                {item.cost}
                                            </Text>
                                        </View>

                                    </View> */}
                                    <View style={styles.tableData}>
                                        <View style={{ flexShrink: 1, flexBasis: '100%' }}>
                                            <Text
                                                style={{
                                                    color: 'black',
                                                    fontFamily: 'Inter-Medium',
                                                }}>
                                                {item.entryTime}
                                            </Text>
                                        </View>
                                    </View>



                                </View>
                            )}
                        />


                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

export default TableviewTable;

const styles = StyleSheet.create({

    tableHeader: {
        backgroundColor: '#2A333E',
        flexDirection: 'row',
        borderRadius: 8
    },
    tableData: {
        paddingVertical: 5,
        paddingLeft: 24,
        width: 160,
    },
    tableDataH: {
        paddingVertical: 16,
        paddingLeft: 24,
        width: 160,
    },
    outerView: {
        padding: '6%', borderWidth: 1, borderRadius: 10, marginLeft: '4%',
        marginRight: '4%', borderColor: '#0000001F'
    },

})
