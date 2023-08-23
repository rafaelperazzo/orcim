import { useState } from "react";
import { Platform, StyleSheet, View } from "react-native";
import { Appbar, Divider, Menu } from "react-native-paper";
import { transparent } from "react-native-paper/lib/typescript/src/styles/themes/v2/colors";
import { colors } from "../../styles/colors";

interface IHeader {
    title: string;
    goBack?: boolean;
}

const MORE_ICON = Platform.OS === 'ios' ? 'dots-horizontal' : 'dots-vertical';

export const MyHeader = (props: IHeader) => {
  const [visible, setVisible] = useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);
  return (
    <View style={styles.container}>
      <Appbar.Header style={{backgroundColor: 'transparent'}}>
      {props.goBack && <Appbar.BackAction onPress={() => {}} />}
        <Appbar.Content title={props.title}  />
      </Appbar.Header>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
    },
  });