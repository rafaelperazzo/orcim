import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { ActivityIndicator, Button, List, MD3Colors } from "react-native-paper";
import { colors } from "../../styles/colors";
import { Container } from "../../components/Container";
import React from "react";
import api from "../../services/api";

export const ListGraphics = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList, "OrçamentoUnidades">) => {
  navigation.setOptions({title: "Unidades", headerTitleStyle: {fontSize: 23}})
  const [loading, setLoading] = React.useState(true);
  const [values_units, setValuesUnit] = React.useState<
    {
      aliquidar: number;
      empenhado: number;
      planejado: number;
      liquidado: number;
      saldo: number;
      ugr: string;
    }[]
  >([]);

  React.useEffect(() => {
    setLoading(true);
    (async function () {
      await api
        .get("https://sci01-ter-jne.ufca.edu.br/webapi/por_ugr.json")
        .then((response) => {
          setValuesUnit(response.data);
          setLoading(false);
        });
    })();
  }, []);
  return (
    <Container>
      {!loading ? (
        <List.Section style={styles.section}>
          {values_units.map((unit) => (
            <Button
              key={unit.ugr}
              style={styles.item}
              mode="outlined"
              onPress={() => {
                navigation.navigate("Grafico1", {
                  title: unit.ugr,
                  data: [
                    { x: "Empenhado", y: unit.empenhado },
                    { x: "Planejado", y: unit.planejado },
                    { x: "A liquidar", y: unit.aliquidar },
                    { x: "Liquidado", y: unit.liquidado },
                  ],
                });
              }}
            >
              {unit.ugr}
            </Button>
          ))}
        </List.Section>
      ) : (
        <View style={styles.loading}>
          <ActivityIndicator animating={true} size={"large"} />
        </View>
      )}
    </Container>
  );
};

const styles = StyleSheet.create({
  section: {
    padding: 10,
    paddingTop: 20,
    minHeight: Dimensions.get("screen").height * 0.55,
    display: "flex",
    justifyContent: "center",
  },
  item: {
    marginVertical: 10,
    // borderRadius: 10,
    borderColor: colors.lightBrown,
    // borderWidth: 1
  },
  loading: {
    display: "flex",
    paddingTop: Dimensions.get("screen").height * 0.15,
    alignItems: "center",
    justifyContent: "center",
  },
});
