import React from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StyleSheet, Dimensions, View } from "react-native";
import { Container } from "../../components/Container";
import { colors } from "../../styles/colors";
import {
  VictoryAxis,
  VictoryBar,
  VictoryChart,
  VictoryTheme,
} from "victory-native";
import { Card } from "../../components/Card";

const numberFormatter = Intl.NumberFormat("pt-BR", {
  minimumFractionDigits: 2,
});


export const Grafico1 = ({
  navigation, route
}: NativeStackScreenProps<RootStackParamList, "Grafico1">) => {
  const title_memo = React.useMemo(()=> route.params.title, [route.params])
  const data_memo = React.useMemo(()=> route.params.data, [route.params])
  navigation.setOptions({title: title_memo})

  const titleColors = {
    "Planejado": colors.yellow,
    "Empenhado": colors.blue,
    "A liquidar": colors.green,
    "Liquidado": colors.orange,
  }

  return (
    <Container>
      <View style={style.Content}>
        <View style={style.Chart}>
          <VictoryChart
            horizontal
            width={Dimensions.get("screen").width * 0.95}
            height={Dimensions.get("screen").height * 0.3}
            theme={VictoryTheme.material}
            padding={{
              left: 87,
              bottom: 20,
              top: 15,
              right: 100,
            }}
          >
            <VictoryAxis
              crossAxis
              style={{
                axis: {
                  stroke: colors.brown,
                  strokeWidth: 2,
                },
                tickLabels: {
                  fontSize: 13,
                  fill: colors.black,
                },
                ticks: {
                  stroke: colors.brown,
                  size: 5,
                  strokeWidth: 2,
                },
              }}
              offsetX={84}
              domain={[0.6, 4.5]}
            />
            <VictoryBar
              style={{
                data: {
                  fill: ({ datum }: any) => titleColors[datum.x] ,
                  width: 20,
                },
                labels: {
                  fill: colors.black
                }
              }}
              cornerRadius={{ top: 2 }}
              animate={{
                duration: 1000,
                onLoad: { duration: 1000 },
              }}
              labels={({ datum }: any) => {
                const value = "R$ " + numberFormatter.format(datum.y);
                return value;
              }}
              data={data_memo}
              x="x"
              y="y"
              sortKey="y"
            />
          </VictoryChart>
        </View>
        <View style={style.Cards}>
          <Card
            title="Valor Planejado"
            content={"R$ " + numberFormatter.format((data_memo && data_memo[1]?.y) ?? 0)}
          />
          <Card
            title="Valor Executado"
            content={"R$ " + numberFormatter.format((data_memo && data_memo[0]?.y) ?? 0)}
            />
        </View>
        <View style={style.Cards}>
          <Card
            title="Saldo"
            content={"R$ " + numberFormatter.format((data_memo && data_memo[2]?.y) ?? 0)}
          />
          <Card
            title="Executado"
            content={
              ((data_memo && data_memo[0]?.y) ?? 0) != 0
                ? ((((data_memo && data_memo[0]?.y) ?? 0) * 100) / ((data_memo && data_memo[1]?.y) ?? 0)).toFixed(2) + " %"
                : "0.0 %"
            }
          />
        </View>
      </View>
    </Container>
  );
};

const style = StyleSheet.create({
  Content: {
    flex: 1,
    justifyContentFlex: "start",
    alignItems: "center",
    paddingTop: 15,
  },
  Chart: {
    paddingBottom: 20,
  },
  Cards: {
    flexDirection: "row",
  },
});
