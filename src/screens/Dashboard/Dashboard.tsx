import { FlatList, StyleSheet, Text, View } from 'react-native'
import Clickable from '@src/components/Interaction/Clickable/Clickable';
import { useAuthContext } from '@src/auth/AuthGuard';
import Navbar from '@src/components/Project/Navbar/Navbar';
import React, { useEffect } from 'react';
import SearchBar from '@src/components/Project/SearchBar/SearchBar';

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
    const auth = useAuthContext()
    return (
        <>
            <View style={{ zIndex: 2000000 }}>
                <View>
                    <Navbar screenName={'Dashboard'}
                        goBack={function (): void {
                            navigation.goBack();
                        }} />
                </View>
                <VirtualizedList style={styles.container}>
                    <View style={styles.body}>
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
                        <View style={{ marginBottom: 32, zIndex: 2000 }}>
                            <SearchBar navigation={navigation} />
                        </View>
                    </View>
                </VirtualizedList>
            </View>
        </>
    )
}

export default Dashboard

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: '#fafafa',
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