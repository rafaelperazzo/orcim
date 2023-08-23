# Orcim

* App para acompanhamento da execução orçamentário da UFCA

## Desenvolvedores

* Ana Lais
* Gilvan
* Matheus Dutra
* Marcos Renan

## Supervidores

* Rafael Perazzo
* Valderez Filgueira

## Recursos

* Execução do planejamento por UGR

## Sobre

* Projeto desenvolvido na disciplina CC0043 - Programação para dispositivos Móveis, em Junho/2023.

## Repositório original

[https://github.com/mdutras/CC0043-orcamento](https://github.com/mdutras/CC0043-orcamento)

## Deploy

* Copiar da pasta APP/Orcim (no drive da UFCA) [https://drive.google.com/drive/u/1/folders/1JqySTH6VG6bm9kknQSpeDHeqWk0cioI7](https://drive.google.com/drive/u/1/folders/1JqySTH6VG6bm9kknQSpeDHeqWk0cioI7) upload-key.keystore e google-services.json para android/app.

* Copiar as linhas abaixo para o arquivo android/gradle.properties

```console
MYAPP_UPLOAD_STORE_FILE=upload-key.keystore
MYAPP_UPLOAD_KEY_ALIAS=orcim
MYAPP_UPLOAD_STORE_PASSWORD=SENHA DO BITWARDEN
MYAPP_UPLOAD_KEY_PASSWORD=SENHA DO BITWARDEN orcim
```

* Adicionar o código release abaixo no arquivo android/app/build.gradle

```console
signingConfigs {
        debug {
            storeFile file('debug.keystore')
            storePassword 'android'
            keyAlias 'androiddebugkey'
            keyPassword 'android'
        }
        release {
            if (project.hasProperty('MYAPP_UPLOAD_STORE_FILE')) {
                storeFile file(MYAPP_UPLOAD_STORE_FILE)
                storePassword MYAPP_UPLOAD_STORE_PASSWORD
                keyAlias MYAPP_UPLOAD_KEY_ALIAS
                keyPassword MYAPP_UPLOAD_KEY_PASSWORD
            }
        }
    }

    buildTypes {
        debug {
            signingConfig signingConfigs.debug
        }
        release {
            // Caution! In production, you need to generate your own keystore >
            // see https://reactnative.dev/docs/signed-apk-android.
            signingConfig signingConfigs.release
            minifyEnabled enableProguardInReleaseBuilds
            proguardFiles getDefaultProguardFile("proguard-android.txt"), "pro>
        }
    }
```

* Gerar apk

```console
npx react-native build-android --mode=release
```

* Gerar aab

```console

cd android
./gradlew bundleRelease
```

* Testando o app

```console
npm run android -- --mode="release"
```

