import AssetIndex, { ImageIndex } from "@src/assets/AssetIndex";
import { useAuthContext } from "@src/auth/AuthGuard";
import Clickable from "@src/components/Interaction/Clickable/Clickable";
import { useEffect, useState } from "react";
import {
    Dimensions, StyleSheet, Text,
    View,Image
} from "react-native";

export interface RINavbar {
    goBack: () => void;
    screenName: string;
}

export namespace PINavbar { }

export default function Navbar({ goBack, ...props }: RINavbar) {
    const { screenName } = props;
    const auth = useAuthContext();
    const [height, setHeight] = useState(0);
    const [viewableHeight, setViewableHeight] = useState<number>(Dimensions.get('window').height);
    useEffect(() => {
        const subscription = Dimensions.addEventListener('change', ({ window }) => {
            setViewableHeight(window.height);
        })
        return () => {
            subscription.remove();
        }
    }, []);
    return (
        <View onLayout={e => {
            setHeight(e.nativeEvent.layout.height);
        }} className="flex flex-row justify-between items-center relative z-50"
            style={styles.navbar}>
                <View style={{flexDirection:'row',flex:1,justifyContent:'space-between',alignItems:'center'}}>
            <Clickable>
                <View >
                    <Image style={{ height: 35,width:130}} source={ImageIndex.Lohawalla}/>
                </View>
            </Clickable>
            <View>
                <Clickable compressAmount={0.9} onPress={() => auth.actions.logout()}>
                    <View style={{ transform: [{ rotate: '360deg' }] }}>
                        <Image style={{ height: 30,width:115 }} source={ImageIndex.Logout}/>
                    </View>
                </Clickable>
            </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    image: {
        width: 40,
        height: 40,
        borderRadius: 200,
        objectFit: 'cover',
    },
    navbar: {
        borderBottomWidth: 1,
        borderTopWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.05)',
        paddingVertical: 15,
        paddingHorizontal: 16,
        backgroundColor: 'white',
        zIndex: 100000,
    },
});

interface DimensionsMetrics {
    window: {
        height: number;
        width: number;
        scale: number;
        fontScale: number;
    };
    screen: {
        height: number;
        width: number;
        scale: number;
        fontScale: number;
    };
}