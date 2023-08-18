import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Clickable from '@src/components/Interaction/Clickable/Clickable';
import { useAuthContext } from '@src/auth/AuthGuard';
import Navbar from '@src/components/Project/Navbar/Navbar';

const Dashboard = ({ navigation }: any) => {
    const auth = useAuthContext()
    return (
        <View>
            <Navbar screenName={'Dashboard'}
                goBack={function (): void {
                    navigation.goBack();
                }} />
        </View>
    )
}

export default Dashboard

const styles = StyleSheet.create({})