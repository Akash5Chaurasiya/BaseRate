import AsyncStateFactory from "@src/modules/StateManagement/AsyncState/AsyncStateFactory";
import React from 'react';
import FetchSearchBarAction from "./management/actions/FetchSearchBarAction";
import {
    SafeAreaView,
    ScrollView,
    ScrollViewComponent,
    StyleSheet,
    TextInput,
    View,
} from 'react-native';
import AssetIndex from "@src/assets/AssetIndex";
import Clickable from "@src/components/Interaction/Clickable/Clickable";
import Tab from "./components/Tab/Tab";
import { FlatList } from "react-native-gesture-handler";
import SearchListItem from "./components/SearchListItem/SearchListItem";
import { ScreenIndex } from "@src/globals/screenNames/ScreenName.constant";
export interface RISearchBar {
    navigator: any;
}
export namespace PISearchBar { }

export default function SearchBar({navigation}: any) {
    const initialState: SearchBar.State = {
        searchedData: {
            category: [],
            item: [],
            product: []
        },
        loading: { fetchData: AsyncStateFactory() },
    };
    const [state, setState] = React.useState(initialState);
    const [text, setText] = React.useState('');
    const [selected, setSelected] = React.useState(false);
    const [type, setType] = React.useState<'company'>('company');
    const fetchSearchDataAction = new FetchSearchBarAction(state, setState);
    return ( 
    <>
        <View style={[
            styles.container,
            {
                backgroundColor: selected ? '#fff' : '',
                elevation: selected ? 1 : 0,
            },
        ]}>
            <AssetIndex.SearchMagnifier />
            <TextInput
                onFocus={() => {
                    setSelected(true);
                }}
                onBlur={() => setSelected(false)}
                onChangeText={text => {
                    setText(text);
                    fetchSearchDataAction.fetSearchData(text)
                }}
                className="text-base text-slate-700"
                placeholder="Search"
                placeholderTextColor={'#64748B'}
                style={styles.input}
            />
            {text && (
                <Clickable style={{ paddingHorizontal: 8 }}
                    onPress={() => {
                        setText('');
                    }}>
                    <AssetIndex.SearchBarCrossIcon />
                </Clickable>
            )}
            {text && (
                <View style={styles.searchAssistContainer}>
                    <View
                        className="flex flex-row bg-slate-50"
                        style={{ borderRadius: 8 }}>
                        <Tab
                            isActive={type === 'company'}
                            text="company"
                            onPress={() => {
                                setType('company');
                            }}
                            tabItemCounts={state.searchedData.item.length}
                        />
                    </View>
                    <SafeAreaView style={{ flex: 1 }}>
                        {type === 'company' && (
                            <FlatList
                                nestedScrollEnabled={true}
                                style={{ maxHeight: 300 }}
                                renderItem={v => (
                                    <SearchListItem
                                        assistText={v.item.name}
                                    />
                                )}
                                data={state.searchedData.item}
                            />
                        )}
                    </SafeAreaView>
                </View>
            )}
        </View>
    </>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: '100%',
        borderWidth: 1,
        borderColor: '#CFD3D4',
        borderRadius: 4,
        gap: 10,
        padding: 8,
        alignItems: 'center',
        position: 'relative',
        zIndex: 9999,
    },
    input: {
        flexGrow: 1,
        flexShrink: 1,
        fontFamily: 'Inter-Regular',
        padding: 0,
    },
    searchAssistContainer: {
        backgroundColor: 'white',
        zIndex: 999,
        position: 'absolute',
        top: '180%',
        left: 0,
        right: 0,
        padding: 8,
        borderRadius: 4,
        elevation: 3,
    },
});
