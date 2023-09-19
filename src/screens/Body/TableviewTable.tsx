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
    Alert,
    ActivityIndicator
} from 'react-native';
import axios from 'axios';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import Clickable from '@src/components/Interaction/Clickable/Clickable';
import { useAuthContext } from '@src/auth/AuthGuard';
import { showMessage, hideMessage } from "react-native-flash-message";
import { WINDOWS } from 'nativewind/dist/utils/selector';
import LoadingScreen from '@src/components/loading/LoadingScreen/LoadingScreen';

interface CompanyData { }

interface TableviewTableProps {
    data: any;
}

const TableviewTable: any = ({ searchText }: any) => {
    console.log(searchText);
    const [reloadKey, setReloadKey] = useState(0); // Add a reload key state

    const [tableData, setTableData] = useState<any>([]);
    const [filteredData, setFilteredData] = useState<any>([]);
    const [text, setText] = useState('')
    const [editedItems, setEditedItems] = useState<any>([]);
    const [editedItem, setEditedItem] = useState<Array<any>>([]);
    const [clickCount, setClickCount] = useState(0);
    const [post, setPost] = useState(false)

    const [rate, setRate] = useState([]);//editing  
    const [editedCosts, setEditedCosts] = useState<any>(0);
    const [final, setFinal] = useState<any>([])
    const [isSaving, setIsSaving] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    console.log("texted", editedCosts);
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
    }, [post, reloadKey]);

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
    const startEditing = (index: number, item: any) => {
        const editedCostsCopy = { ...editedCosts };
        console.log(editedCostsCopy);
        editedCostsCopy[index] = item.cost.toString();
        setEditedCosts(editedCostsCopy);
    };

    const handleEditCost = (index: number, item: any, editedValue: string) => {
        const updatedItem = {
            ...item,
            cost: parseFloat(editedValue)
        };
        updateEditedItems(updatedItem);
    };
    const updateEditedItems = (updatedItem: any) => {
        setEditedItem((prevEditedItems: any) => [...prevEditedItems, updatedItem]);
    };
    console.log("852741963", editedItem);
    const savePricing = async () => {
        console.log("counted i am clicked", clickCount);
        if (clickCount == 0) {
            Alert.alert("Press Again to continue....")
            setClickCount(1)
        }
        const formDataArray = editedItem.map((el) => {
            console.log("Mapping my ass", el);
            const formedData = {
                "list": [{
                    "priceFieldId": el.priceFieldId,
                    "value": el.cost
                }],
                "by": {
                    "name": auth.authData.loginData.name,
                    "userId": auth.authData.loginData.userId
                }
            }
            return formedData;
            console.log(formedData);
        })
        setFinal(formDataArray)
        await postCombinedData();
        // Here you can send the edited data to your backend or perform any desired action
    };
    console.log("HAAAAAAAAAAAAAAAAAAAA", final);

    async function postData(dat: any) {
        try {
            const response = await axios.post(`https://www.lohawalla.com/purchaser/pages/setBasicPrice/saveBasicPrice`, dat);
            console.log('API Response:', response.data);
            showMessage({
                message: 'Data updated successfully',
                type: "success",
                duration: 5000,
                style: { borderRadius: 50 }
            });
        } catch (error) {
            showMessage({
                message: "Failed to update",
                type: "danger",
                duration: 5000,
                style: { borderRadius: 50 }
            })
            console.error('API Error:', error);
        }
    }
    async function postCombinedData() {
        try {
            setIsLoading(true);
            for (const dataItem of final) {
                await postData(dataItem);
            }
            setReloadKey(prevKey => prevKey + 1); // Increment the reload key to trigger a reload
            // All postData requests completed successfully
            // Now fetch the updated data
            fetchData().then(() =>setIsLoading(false))
        } catch (error) {
            console.error('Error during postCombinedData:', error);
        }
    }
    if(isLoading){
        return <ActivityIndicator size="large" color="#0000ff"/>
    }
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
                                                <TouchableWithoutFeedback>
                                                    <TextInput
                                                        style={{
                                                            color: 'black',
                                                            fontFamily: 'Inter-Medium',
                                                            borderWidth: 2,
                                                            borderRadius: 8,
                                                            borderColor: editedCosts[index] !== undefined ? '#FFFFFF' : '#101010', // Use different colors for edited and non-edited states
                                                            textAlignVertical: 'center',
                                                            textAlign: 'center',
                                                            paddingVertical: 8,
                                                        }}
                                                        value={editedCosts[index]}
                                                        onChangeText={(text) => {
                                                            const editedCostsCopy = { ...editedCosts };
                                                            editedCostsCopy[index] = +text;
                                                            setEditedCosts(editedCostsCopy);
                                                        }}
                                                        onBlur={() => handleEditCost(index, item, editedCosts[index])}
                                                    />
                                                </TouchableWithoutFeedback>
                                            ) : (
                                                <TouchableOpacity onPress={() => startEditing(index, item)}>
                                                    <Text style={{
                                                        color: 'black',
                                                        fontFamily: 'Inter-Medium',
                                                        borderWidth: 2,
                                                        borderRadius: 8,
                                                        borderColor: '#0000001F',
                                                        textAlignVertical: 'center',
                                                        textAlign: 'center',
                                                        paddingVertical: 8,
                                                    }}>{item.cost}</Text>
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
                                )}
                            />
                        </View>
                    </ScrollView>
                </View>
                <TouchableOpacity
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
                </TouchableOpacity>
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