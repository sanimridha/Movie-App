import { StatusBar } from "expo-status-bar";
import { Image, Platform, StyleSheet } from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";

export default function ModalScreen({ props }) {
    console.log(props);
    return (
        <View style={styles.container}>
            <Image
                source={{
                    uri: "https://static.wikia.nocookie.net/film-vault/images/0/05/Inceptionpost.png/revision/latest?cb=20171130225008",
                }}
                resizeMode="cover"
                style={{ height: 300 }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: "center",
        // justifyContent: "center",
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: "80%",
    },
});
