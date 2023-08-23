import React, { useState } from 'react';
import {StyleSheet, View, Button, TextInput, Dimensions, Pressable, Text, Image} from 'react-native';
import auth from '@react-native-firebase/auth';
import { Container } from "../../components/Container";
import { colors } from '../../styles/colors';
import { ActivityIndicator } from 'react-native-paper';

export function LoginPage(): JSX.Element {
    const [login, setLogin] = useState<string>('');
    const [pass, setPass] = useState<string>('');
    const [loginWarning, setLoginWarning] = useState<string|null>('');
    const [passWarning, setPassWarning] = useState<string|null>('');
    const [loading, setLoading] = useState<boolean>(false);

    const handleLogin = () => {
        setLoading(true)
        
        auth().signInWithEmailAndPassword(login, pass).then(() => {
            setLoading(false)
        },
        (error)=>{
            setLoading(false)
            if(error.code == "auth/invalid-email"){
                setLoginWarning("Formato de email inválido!")
                setPassWarning("")
            } else if(error.code == "auth/user-not-found"){
                setLoginWarning("Usuário inexistente!")
            } else{
                setPassWarning("Senha inválida!")
            };
        })
    }
    
return (
    <Container>
        <View style={styles.container}>
            <Image
              style={{
                width: Dimensions.get("screen").width*0.4,
                height: Dimensions.get("screen").height*0.3,
                resizeMode: "center",
              }}
              source={require("../../assets/logo.png")}
            />
            <Text style={[styles.title]}>
                ORÇAMENTOS
            </Text>
        <TextInput
            style={[styles.input, {borderBottomColor:!loginWarning?'gray':'red'}]}
            placeholder='Insira o login'
            onChangeText={t => setLogin(t)}
            value={login}
            onPressIn={t => setLoginWarning('')}
        />
        <Text style={styles.warning}>{loginWarning}</Text>
        <TextInput
            style={[styles.input, {borderBottomColor:!passWarning?'gray':'red'}]}
            secureTextEntry={true}
            placeholder='Insira a senha'
            onChangeText={t => setPass(t)}
            value={pass}
            onPressIn={t => setPassWarning('')}
        />
        <Text style={styles.warning}>{passWarning}</Text>
        {loading? (
            <View style={[styles.button]}> 
                <ActivityIndicator animating={true} size={"small"} />
            </View>):(
            <Pressable style={[styles.button, {backgroundColor: !login || !pass?'gray': colors.lightBrown}]} disabled={!login || !pass} onPress={handleLogin}>
                <Text style={{color:!!login && !!pass?"#fff":"#ccc"}}>Entrar</Text>
            </Pressable>)}
        
        </View>
    </Container>
);}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    input : {
        height: 40,
        width: Dimensions.get('window').width*0.8,
        borderBottomWidth:1,
        borderBottomColor:'gray',
        marginBottom:10
    },
    button : {
        height: 40,
        width: Dimensions.get('window').width*0.5,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
        marginTop:10,
    },
    warning : {
        color: 'red',
        fontSize:11,
        justifyContent: 'flex-start',
        width: Dimensions.get('window').width*0.8,
    },
    title : {
        color: colors.brown,
        fontSize: 25,
        fontWeight: "800",
        marginTop: -35,
        marginBottom: 25,
    }
  });