import { FlatList, StyleSheet, Text, View } from 'react-native'
import Clickable from '@src/components/Interaction/Clickable/Clickable';
import { useAuthContext } from '@src/auth/AuthGuard';
import Navbar from '@src/components/Project/Navbar/Navbar';
import React, { useEffect, useState } from 'react';
import SearchBar from '@src/components/Project/SearchBar/SearchBar';
import ToggleSwitch from 'toggle-switch-react-native';
import TableViewCard from '../Body/TableviewCard';
import { ScrollView } from 'react-native-gesture-handler';
import TableviewTable from '../Body/TableviewTable';

export interface RIDashboard { }
export namespace PIDashboard { }

const VirtualizedList = ({
    children,
    style,
}: {
    children: React.ReactNode;
    style: object;
}) => {
    return (
        <FlatList
            data={[]}
            style={style}
            keyExtractor={() => 'key'}
            renderItem={null}
            ListHeaderComponent={<>{children}</>}
        />
    );
};
const Dashboard = ({ navigation }: any) => {
    const auth = useAuthContext();
    const [toggle, setToggle] = useState(false);
    const [searchText, setSearchText] = useState('');
    const handleToggle = () => {

        setToggle(!toggle);
    };
    return (
        <>
            <View style={{ zIndex: 2000000 }}>
                <View>
                    <Navbar screenName={'Dashboard'}
                        goBack={function (): void {
                            navigation.goBack();
                        }} />
                </View>
                <View style={styles.body}>
                    <VirtualizedList style={styles.container}>
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <View style={{ marginBottom: 20 }} >
                                <Text
                                    className="text-xl text-slate-700 "
                                    style={{ fontFamily: 'Inter-Medium' }}>
                                    Welcome Back!
                                </Text>
                                <Text className="text-xs"
                                    style={{ fontFamily: 'Inter-Regular', color: '#969393' }}>
                                    Hello {auth.authData.loginData.name}
                                </Text>
                            </View>
                            <View >
                                <ToggleSwitch
                                    isOn={toggle}
                                    onColor="#414EF1"
                                    offColor="#B0B0B0"
                                    size="small"
                                    onToggle={handleToggle}
                                    label="Table View"
                                    labelStyle={{ color: "black", fontWeight: "600" }}
                                />
                            </View>
                        </View>
                    </VirtualizedList>
                    <View >
                        <Text style={{ color: 'black', fontWeight: '700', fontSize: 18 }}
                            className="text-lg text-black">Base Pricing</Text>
                    </View>

                    <View style={{ marginBottom: 1, zIndex: 2000 }}>
                        <SearchBar onSearch={(searchText: any) => setSearchText(searchText)} />
                    </View>
                </View>
                {toggle ? (
                    <TableViewCard searchText={searchText} />
                ) : (

                    <TableviewTable searchText={searchText} />
                )}
            </View >
        </>

    )
}

export default Dashboard

const styles = StyleSheet.create({
    container: {
        width: '100%',
        // height: '92%',
        // backgroundColor: '#fafafa',
    },
    navbar: {
        borderBottomWidth: 1,
        borderTopWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.05)',
        paddingVertical: 12,
        paddingHorizontal: 16,
        backgroundColor: 'white',
    },
    image: {
        width: 32,
        height: 32,
        borderRadius: 200,
        objectFit: 'cover',
    },
    body: {
        padding: 20,
    },
    popularSearchCard: {
        padding: 14,
        borderRadius: 10,
        marginBottom: 20,
    },
});