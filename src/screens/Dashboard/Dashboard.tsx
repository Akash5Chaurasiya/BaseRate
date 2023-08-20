import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import Clickable from '@src/components/Interaction/Clickable/Clickable';
import { useAuthContext } from '@src/auth/AuthGuard';
import ToggleSwitch from 'toggle-switch-react-native';
import TableViewCard from '../Body/TableviewCard';
import TableviewTable from '../Body/TableviewTable';

const Dashboard = () => {
    const auth = useAuthContext()
    const [toggle, setToggle] = useState(false);
    const handleToggle = () => {

        setToggle(!toggle);
    };
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
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                <Text style={{ color: 'black', fontWeight: '700', fontSize: 25, padding: 16 }}
                    className="text-lg text-black">Base Pricing</Text>

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
            {toggle ? (
                <TableViewCard />
            ) : (

                <TableviewTable />
            )}
        </View>
    )
}

export default Dashboard

const styles = StyleSheet.create({})