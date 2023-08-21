

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
import Clickable from '@src/components/Interaction/Clickable/Clickable';
import { useAuthContext } from '@src/auth/AuthGuard';
import { showMessage, hideMessage } from "react-native-flash-message";

interface CompanyData { }

interface TableviewTableProps {
    item: any;
    updateEditedItems?: (updatedItem: Item) => void;
    editedItems?: Item[];
}
interface Item {
    id?: number;
    cost?: number;
    // Other properties...
}
export const RenderItem: React.FC<TableviewTableProps> = React.memo(({ item, updateEditedItems, editedItems }) => {
    console.log("item", item)
    const [editingCost, setEditingCost] = useState(false);
    const [editedCost, setEditedCost] = useState(item.cost.toString());
    const isEditEnabled = editedCost !== item.cost.toString(); // Check if user edited the cost
    const [localEditedCost, setLocalEditedCost] = useState(editedCost);
    const auth = useAuthContext()
    console.log("editedcost", editedCost)
    console.log("editedITEMMMMMM", editedItems);
    const startEditing = () => {
        console.log("startEditing")
        console.log(item.cost.toString())
        setEditedCost(item.cost.toString());
        setEditingCost(true);

    }

    const updateCost = async (item: any) => {
        setEditingCost(false);
        const updatedItem = {
            ...item,
            cost: parseFloat(editedCost),
        };
        setEditedCost
        console.log("UPPDATEDCOSTII", updatedItem);
        console.log('editedCost', editedItems)
        //updating individual item on tiggering out the box
        // const formedData = {
        //     "list": [{
        //         "priceFieldId": updatedItem.priceFieldId,
        //         "value": updatedItem.cost
        //     }],
        //     "by": {
        //         "name": auth.authData.loginData.name,
        //         "userId": auth.authData.loginData.userId
        //     }
        // }
        // try {
        //     const update = await axios.post(`https://www.lohawalla.com/purchaser/pages/setBasicPrice/saveBasicPrice`, formedData)
        //     showMessage({
        //         message: "Data saved successfully",
        //         type: "success",
        //         duration: 5000,
        //         style: { borderRadius: 50 }
        //     })
        //     if (updateEditedItems) {
        //         updateEditedItems(updatedItem);
        //     }
        // } catch (error) {
        //     showMessage({
        //         message: "Failed to update",
        //         type: "danger",
        //         duration: 5000,
        //         style: { borderRadius: 50 }
        //     })
        // }

    }

    return (<View className="flex-row items-center">
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
            {editingCost ? (
                <TouchableWithoutFeedback>
                    <TextInput
                        style={{
                            color: 'black',
                            fontFamily: 'Inter-Medium',
                            borderWidth: 2,
                            borderRadius: 8,
                            borderColor: isEditEnabled ? '#101010' : '#FFFFFF', // Use different colors for edited and non-edited states
                            textAlignVertical: 'center',
                            textAlign: 'center',
                            paddingVertical: 8,
                            backgroundColor: 'red',
                        }}
                        value={editedCost}
                        onChangeText={text => setEditedCost(text)}
                        onBlur={() => updateCost(item)}
                    // onBlur={handleBlur}
                    />
                </TouchableWithoutFeedback>
            ) : (
                <TouchableOpacity onPress={startEditing}>
                    <Text style={{
                        color: 'black',
                        fontFamily: 'Inter-Medium',
                        borderWidth: 2,
                        borderRadius: 8,
                        borderColor: '#0000001F',
                        textAlignVertical: 'center',
                        textAlign: 'center',
                        paddingVertical: 8,
                        backgroundColor: 'yellow'
                    }}>{editedCost}</Text>
                </TouchableOpacity>
            )}
        </View>
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
    )
});

const TableviewTable: any = ({ searchText }: any) => {
    console.log(searchText);
    const [tableData, setTableData] = useState<any>([]);
    const [filteredData, setFilteredData] = useState<any>([]);
    const [editedItems, setEditedItems] = useState<Array<any>>([]);
    const [editedCosts, setEditedCosts] = useState<any>(0);
    const [final, setFinal] = useState<any>([])


    // console.log("texted", editedCosts);
    const auth = useAuthContext();



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
    }, [
    ]);

    useEffect(() => {
        // Filter data based on clickedAssistText
        if (searchText) {
            const filtered = tableData.filter((item: any) => (
                item.companyName.name.toLowerCase().includes(searchText.toLowerCase())
            ));
            setFilteredData(filtered);
        } else {
            setFilteredData(tableData); // If searchText is empty, show all data
        }
    }, [searchText, tableData]);


    const updateEditedItems = (updatedItem: Item) => {
        setEditedItems((prevEditedItems: any) => [...prevEditedItems, updatedItem]);
        console.log("852741963", editedItems);

    };

    const savePricing = async () => {
        console.log("editedItemms", editedItems)
        for (const editedItem of editedItems) {

            // Call the API to update the cost for this item
            try {
                const formedData = {
                    "list": [{
                        "priceFieldId": editedItem.priceFieldId,
                        "value": editedItem.cost
                    }],
                    "by": {
                        "name": auth.authData.loginData.name,
                        "userId": auth.authData.loginData.userId
                    }
                };
                const update = await axios.post(`https://www.lohawalla.com/purchaser/pages/setBasicPrice/saveBasicPrice`, formedData);
                showMessage({
                    message: "Data saved successfully",
                    type: "success",
                    duration: 5000,
                    style: { borderRadius: 50 }
                });
                if (updateEditedItems) {
                    updateEditedItems(editedItem);
                }
            } catch (error) {
                showMessage({
                    message: "Failed to update",
                    type: "danger",
                    duration: 5000,
                    style: { borderRadius: 50 }
                });
            }
        }

    };




    return (
        <View>
            <SafeAreaView>
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
                                data={filteredData}
                                renderItem={({ item }) => <RenderItem item={item} updateEditedItems={updateEditedItems} editedItems={editedItems} />}
                            />
                        </View>
                    </ScrollView>
                </View>
                <Clickable
                    onPress={savePricing}>
                    <View
                        style={{
                            width: '50%',
                            paddingVertical: 16,
                            alignItems: 'center',
                            borderRadius: 8,
                            marginLeft: '25%'
                        }}
                        className="bg-indigo-600">
                        <Text
                            className="text-md text-white"
                            style={{ fontFamily: 'Inter-SemiBold' }}>
                            Save Pricing
                        </Text>
                    </View>
                </Clickable>
            </SafeAreaView>
        </View>
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
        paddingLeft: 20,
        width: 160,
        // width:80
    },
    tableDataH: {
        paddingVertical: 16,
        paddingLeft: 24,
        width: 160,
        // width:50
    },
    outerView: {
        padding: '6%', borderWidth: 1, borderRadius: 10, marginLeft: '4%',
        marginRight: '4%', borderColor: '#0000001F', height: '76%',
    }, container: {
        // width: '50%',
        // height: '20%',
        backgroundColor: '#fafafa',
    },

})