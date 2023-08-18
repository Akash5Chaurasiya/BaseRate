import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Clickable from '@src/components/Interaction/Clickable/Clickable';
import { useAuthContext } from '@src/auth/AuthGuard';

const Dashboard = () => {
    const auth=useAuthContext()
    return (
        <View>
            <Text style={{ color: 'black' }}>Dashboard</Text>
            <Clickable
                onPress={() => {
                    auth.actions.logout();
                }}>
                <View
                    style={{
                        width: '100%',
                        paddingVertical: 16,
                        alignItems: 'center',
                        borderRadius: 8,
                    }}
                    className="bg-indigo-500">
                    <Text
                        className="text-md text-white"
                        style={{ fontFamily: 'Inter-SemiBold' }}>
                        Log Out
                    </Text>
                </View>
            </Clickable>
        </View>
    )
}

export default Dashboard

const styles = StyleSheet.create({})