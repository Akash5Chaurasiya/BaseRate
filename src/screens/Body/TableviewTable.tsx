// import React, { useState, useEffect } from 'react';
// import {
//     View,
//     ScrollView,
//     StyleSheet,
//     Text,
//     FlatList,
//     RefreshControl,
//     TouchableWithoutFeedback,
//     Button,
// } from 'react-native';
// import axios from 'axios';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
// import Clickable from '@src/components/Interaction/Clickable/Clickable';

// interface CompanyData {
//     srNo: number;
//     companyName: { name: string };
//     cost: number;
//     entryTime: string;
// }

// interface TableviewTableProps {
//     searchText: any;
// }
// const VirtualizedList = ({
//     children,
//     style
// }: {
//     children: React.ReactNode;
//     style?: object
// }) => {
//     return (
//         <FlatList
//             data={[]}
//             keyExtractor={() => 'key'}
//             renderItem={null}
//             ListHeaderComponent={<>{children}</>}
//         />
//     );
// };
// const TableviewTable: any = ({ searchText }: any) => {
//     const [tableData, setTableData] = useState<any>([]);
// const [filteredData, setFilteredData] = useState([]);

//     // const [data, setData] = useState<CompanyData[]>([]);
//     const [rate, setRate] = useState([]);//editing 
//     // const [editedValues, setEditedValues] = useState(false);//to set edited value 
//     // const isEditable = (cost:number)=>{
//     //     editedValues[cost]!==undefined && editedValues[cost]

//     // } 
//     const [apiCallFinished, setApiCallFinished] = useState(false);
//     const [edit, setEdit] = useState('');
//     const [editedCosts, setEditedCosts] = useState<any>({});
//     const [editingCost, setEditingCost] = useState(false);
//     const [editedCost, setEditedCost] = useState('');
//     const isEditEnabled = editedCost !== item.cost.toString(); 
//     const handleEditCost = (props: any) => {
//         const { item } = props;
//         console.log("itemmmmmmmmmmmmmm", item);
//     };
//     console.log("Value of 456789", editedCosts);
//     const startEditing = ({ item }: any) => {
//         console.log(item);
//         if (apiCallFinished) { // Only allow editing if API call has finished
//             // setEditedCost(item.cost.toString());
//             setEditingCost(true);
//         }
//     }
//     const updateCost = async (item: any) => {
//         setEditingCost(false);
//         const updatedItem = {
//             ...item,
//             cost: parseFloat(editedCost),
//         };
//     //     console.log("Ia1234568420", updatedItem);
//     //     const formedData = {
//     //         "list": [{
//     //             "priceFieldId": updatedItem.priceFieldId,
//     //             "value": updatedItem.cost
//     //         }],
//     //         "by": {
//     //             "name": auth.authData.loginData.name,
//     //             "userId": auth.authData.loginData.userId
//     //         }
//     //     }
//     //     const update = await axios.post(`https://www.lohawalla.com/purchaser/pages/setBasicPrice/saveBasicPrice`, formedData)
//     //     Alert.alert(update.data);
//     //     if (updateEditedItems) {
//     //         updateEditedItems(updatedItem);
//     //     }
//     // }


// const fetchData = async () => {
//     try {
//         const API_URL = 'https://www.lohawalla.com/purchaser/pages/setBasicPrice/getBasicPrice';
//         const response = await axios.get(API_URL);
//         setTableData(response.data);

//     } catch (err) {
//         console.log('error in table api ', err);
//     }
// };

// useEffect(() => {
//     fetchData();
// }, []);

// useEffect(() => {
//     // Filter data based on clickedAssistText
//     if (searchText) {
//         const filtered = tableData.filter((item: any) => (
//             item.companyName.name.toLowerCase().includes(searchText.toLowerCase())
//         ));
//         setFilteredData(filtered);
//     } else {
//         setFilteredData(tableData); // If searchText is empty, show all data
//     }
// }, [searchText, tableData]);
//     /**style={{
//                                                                 color: 'black',
//                                                                 fontFamily: 'Inter-Medium',
//                                                                 borderWidth: 2,
//                                                                 borderRadius: 8,
//                                                                 borderColor: '#0000001F',
//                                                                 textAlignVertical: 'center',
//                                                                 textAlign: 'center',
//                                                                 paddingVertical: 8
//                                                             }} */
//     return (
//         <View>
//             <SafeAreaView >
//                 <View style={styles.outerView}>
//                     <ScrollView horizontal={true}
//                         nestedScrollEnabled
//                         style={{ overflow: 'scroll' }}>
//                         {/* header */}
//                         <View>
//                             <View style={styles.tableHeader}>
//                                 <View style={styles.tableDataH}>
//                                     <Text
//                                         style={{
//                                             fontSize: 13,
//                                             color: 'white',
//                                             fontFamily: 'Inter-Medium',
//                                         }}>
//                                         SNo.
//                                     </Text>
//                                 </View>
//                                 <View style={styles.tableDataH}>
//                                     <Text
//                                         style={{
//                                             fontSize: 13,
//                                             color: 'white',
//                                             fontFamily: 'Inter-Medium',
//                                         }}>
//                                         Company
//                                     </Text>
//                                 </View>
//                                 <View style={styles.tableDataH}>
//                                     <Text
//                                         style={{
//                                             fontSize: 13,
//                                             color: 'white',
//                                             fontFamily: 'Inter-Medium',
//                                         }}>
//                                         Basic Rate
//                                     </Text>
//                                 </View>
//                                 <View style={styles.tableDataH}>
//                                     <Text
//                                         style={{
//                                             fontSize: 13,
//                                             color: 'white',
//                                             fontFamily: 'Inter-Medium',
//                                         }}>
//                                         Entry Time
//                                     </Text>
//                                 </View>
//                             </View>

//                             {/* body */}
//                             <VirtualizedList >
//                                 <FlatList
//                                     data={filteredData}
//                                     renderItem={({ item, index }: any) => (
//                                         <View className="flex-row items-center">
//                                             <View style={styles.tableData}>
//                                                 <View style={{ flexShrink: 1 }}>
//                                                     <Text
//                                                         style={{
//                                                             color: 'black',
//                                                             fontFamily: 'Inter-Medium',
//                                                         }}>
//                                                         {item.srNo}
//                                                     </Text>
//                                                 </View>
//                                             </View>

//                                             <View style={styles.tableData}>
//                                                 <View style={{ flexShrink: 1, flexBasis: '100%' }}>
//                                                     <Text
//                                                         style={{
//                                                             color: 'black',
//                                                             fontFamily: 'Inter-Medium',
//                                                         }}>
//                                                         {item.companyName.name}
//                                                     </Text>
//                                                 </View>
//                                             </View>
//                                             <View style={styles.tableData}>
//                                                 {editingCost ? (
//                                                     <TouchableWithoutFeedback>
//                                                         <TextInput
//                                                             style={{
//                                                                 color: 'black',
//                                                                 fontFamily: 'Inter-Medium',
//                                                                 borderWidth: 2,
//                                                                 borderRadius: 8,
//                                                                 borderColor: '#0000001F',
//                                                                 textAlignVertical: 'center',
//                                                                 textAlign: 'center',
//                                                                 paddingVertical: 8
//                                                             }}
//                                                             value={item.cost}
//                                                             onChangeText={text => setEditedCost(text)}
//                                                         />
//                                                     </TouchableWithoutFeedback>
//                                                 ) : (
//                                                     <View>
//                                                         <TouchableOpacity onPress={()=>startEditing}>
//                                                             <Text style={{
//                                                                 color: 'black',
//                                                                 fontFamily: 'Inter-Medium',
//                                                                 borderWidth: 2,
//                                                                 borderRadius: 8,
//                                                                 borderColor: '#0000001F',
//                                                                 textAlignVertical: 'center',
//                                                                 textAlign: 'center',
//                                                                 paddingVertical: 8
//                                                             }}> {editedCost}</Text>
//                                                         </TouchableOpacity>
//                                                     </View>
//                                                 )}
//                                                 <TouchableOpacity style={{ marginLeft: 20 }} onPress={() => updateCost(item)}>
//                                                     <Image
//                                                         style={{
//                                                             backgroundColor: isEditEnabled ? '#4B4DED' : 'gray', // Change the background color based on edit status
//                                                             width: 30,
//                                                             height: 30,
//                                                             borderRadius: 6,
//                                                         }}
//                                                         source={ImageIndex.check}
//                                                     />
//                                                 </TouchableOpacity>
//                                             </View>

//                                             {/* <View style={styles.tableData}>


//                                         <View style={{ flexShrink: 1 }}>
//                                             <Text
//                                                 style={{
//                                                     color: 'black',
//                                                     fontFamily: 'Inter-Medium',
//                                                     borderWidth: 2,
//                                                     borderRadius: 8,
//                                                     borderColor: '#0000001F',
//                                                     textAlignVertical: 'center',
//                                                     textAlign: 'center',
//                                                     paddingVertical: 8


//                                                 }}>
//                                                 {item.cost}
//                                             </Text>
//                                         </View>

//                                     </View> */}
//                                             <View style={styles.tableData}>
//                                                 <View style={{ flexShrink: 1, flexBasis: '100%' }}>
//                                                     <Text
//                                                         style={{
//                                                             color: 'black',
//                                                             fontFamily: 'Inter-Medium',
//                                                         }}>
//                                                         {item.entryTime}
//                                                     </Text>
//                                                 </View>
//                                             </View>



//                                         </View>
//                                     )}
//                                 />
//                             </VirtualizedList>

//                         </View>
//                     </ScrollView>
//                 </View>
// <Clickable
//     onPress={() => {
//         handleEditCost
//     }}>
//     <View
//         style={{
//             width: '50%',
//             paddingVertical: 16,
//             alignItems: 'center',
//             borderRadius: 8,
//             marginLeft: '25%'
//         }}
//         className="bg-indigo-600">
//         <Text
//             className="text-md text-white"
//             style={{ fontFamily: 'Inter-SemiBold' }}>
//             Save Pricing
//         </Text>
//     </View>
// </Clickable>
//             </SafeAreaView>
//         </View>
//     );
// };

// export default TableviewTable;

// const styles = StyleSheet.create({

//     tableHeader: {
//         backgroundColor: '#2A333E',
//         flexDirection: 'row',
//         borderRadius: 8
//     },
//     tableData: {
//         paddingVertical: 5,
//         paddingLeft: 20,
//         width: 160,
//         // width:80
//     },
//     tableDataH: {
//         paddingVertical: 16,
//         paddingLeft: 24,
//         width: 160,
//         // width:50
//     },
//     outerView: {
//         padding: '6%', borderWidth: 1, borderRadius: 10, marginLeft: '4%',
//         marginRight: '4%', borderColor: '#0000001F', height: '76%',
//     }, container: {
//         // width: '50%',
//         // height: '20%',
//         backgroundColor: '#fafafa',
//     },

// })

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

interface CompanyData { }

interface TableviewTableProps {
    data: any;
}

const TableviewTable: any = ({ searchText }: any) => {
    console.log(searchText);
    const [tableData, setTableData] = useState<any>([]);
    const [filteredData, setFilteredData] = useState([]);
    const [text, setText] = useState('')
    const [editedItems, setEditedItems] = useState<any>([]);

    // const [data, setData] = useState<CompanyData[]>([]);
    const [rate, setRate] = useState([]);//editing 
    // const [editedValues, setEditedValues] = useState(false);//to set edited value 
    // const isEditable = (cost:number)=>{
    //     editedValues[cost]!==undefined && editedValues[cost]

    // } 
    const [editedCosts, setEditedCosts] = useState<any>({});
    console.log("texted", text);
    const startEditing = ({item}:any) => {
        // setEditedCosts(item.cost.toString());
        console.log("sqqqqqqqqqqqq",item);
    }
    const handleEditCost = (index: number, value: {}) => {
        const updatedItem = {
            ...value,
            cost: parseFloat(text),
        };
        updateEditedItems(updatedItem)
        console.log("hurray", updatedItem);
        setEditedCosts((prevEditedCosts: any) => ({
            ...prevEditedCosts,
            [index]: value,
        }));
        console.log("Valued", value);
    };
    const updateEditedItems = (updatedItem: any) => {
        setEditedItems((prevEditedItems:any) => [...prevEditedItems, updatedItem]);
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
                                data={tableData}
                                renderItem={({ item, index }: { item: any, index: number }) => (
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
                                                <TouchableOpacity onPress={()=>startEditing(item)}>
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
                                                        value={item.cost}
                                                        onChangeText={text => setText(text)}
                                                    />
                                                </TouchableOpacity>
                                            ) : (
                                                <TouchableWithoutFeedback
                                                    onPress={() => {
                                                        handleEditCost(index, item);
                                                        setText(text)
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
                <Clickable
                    onPress={() => {
                        handleEditCost
                    }}>
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