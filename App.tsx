import React, { useEffect, useState } from "react";
import type { PropsWithChildren } from "react";
import {
  Alert,
  Button,
  Dimensions,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
} from "react-native";

import {
  Header,
  ReloadInstructions,
} from "react-native/Libraries/NewAppScreen";
import { Icon } from "react-native-elements";
import { Container } from "./components/Container";
import {
  ActivityIndicator,
  Provider as PaperProvider,
} from "react-native-paper";
import auth from "@react-native-firebase/auth";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { theme } from "./styles/theme";
import { ListGraphics } from "./pages/ListUnits";
import { Grafico1 } from "./pages/Grafico1";
import { LoginPage } from "./pages/login";
import { colors } from "./styles/colors";
import { Menu } from "./pages/Menu";

const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {
  const [initializing, setInitializing] = useState<boolean>(true);
  const [user, setUser] = useState<any>();

  function onAuthStateChanged(user: any) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  if (initializing)
    <>
      <View style={styles.loading}>
        <ActivityIndicator animating={true} size={"large"} />
      </View>
    </>;

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        {user?(<><Stack.Navigator
          initialRouteName={"Menu"}
          screenOptions={{
            headerStyle: { backgroundColor: colors.lightBrown },
            headerTitleStyle: {
              color: colors.cream,
              fontSize: 25,
            },
            headerTintColor: colors.cream,
            headerShadowVisible: false,
          }}
        >
          <Stack.Screen
            name="Menu"
            component={Menu}
            options={{
              headerRight: () => (
                <Icon
                  name={"exit-to-app"}
                  color={colors.cream}
                  onPress={(a) => {
                    auth().signOut();
                  }}
                />
              ),
            }}
          />
          <Stack.Screen
            name="OrçamentoUnidades"
            component={ListGraphics}
            options={{
              headerRight: () => (
                <Icon
                  name={"exit-to-app"}
                  color={colors.cream}
                  onPress={(a) => {
                    auth().signOut();
                  }}
                />
              ),
            }}
          />
          <Stack.Screen
            name="Grafico1"
            component={Grafico1}
            options={{
              headerRight: () => (
                <Icon
                  name={"exit-to-app"}
                  color={colors.cream}
                  onPress={(a) => {
                    auth().signOut();
                  }}
                />
              ),
            }}
          />
        </Stack.Navigator></>):(<><Stack.Navigator
          initialRouteName={"loginPage"}
          screenOptions={{
            headerStyle: { backgroundColor: colors.lightBrown },
            headerTitleStyle: {
              color: colors.cream,
              fontSize: 25,
            },
            headerTintColor: colors.cream,
            headerShadowVisible: false,
          }}
        >
          <Stack.Screen
            name="loginPage"
            component={LoginPage}
            options={{ title: "" }}
          />
        </Stack.Navigator></>)}
      </NavigationContainer>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "600",
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: "400",
  },
  highlight: {
    fontWeight: "700",
  },
  loading: {
    display: "flex",
    paddingTop: Dimensions.get("screen").height * 0.15,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default App;
