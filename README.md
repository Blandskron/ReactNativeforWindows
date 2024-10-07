# Configuración del Ambiente para Desarrollar una App con React Native for Windows

Este documento explica cómo preparar el entorno de desarrollo para una aplicación utilizando React Native for Windows.

## Requisitos

- **Node.js** (versión LTS)
- **React Native CLI**
- **Visual Studio** (Community Edition o superior)
- **Chocolatey** (opcional)
- **Windows 10 SDK**
- **Python2 y JDK8**

## Pasos de Configuración

### 1. **Instalar Node.js**
React Native requiere Node.js para gestionar los paquetes. Puedes descargar la última versión LTS desde [aquí](https://nodejs.org/). Después de instalarlo, verifica la instalación ejecutando los siguientes comandos en la terminal:

```bash
node -v
npm -v
```

### 2. **Instalar el CLI de React Native**
Instala el CLI de React Native de manera global en tu sistema:

```bash
npm install -g react-native-cli
```

### 3. **Instalar Visual Studio**
React Native for Windows requiere Visual Studio para compilar el código nativo. Descarga la versión "Community" o superior desde [aquí](https://visualstudio.microsoft.com/downloads/).

Durante la instalación, asegúrate de seleccionar los siguientes componentes:
- **C++ Universal Windows Platform (UWP) development**
- **Windows 10 SDK**
- **MSBuild**

### 4. **Instalar Chocolatey (opcional)**
Chocolatey es un gestor de paquetes para Windows que facilita la instalación de dependencias. Ejecuta el siguiente comando en PowerShell como administrador:

```bash
Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
```

### 5. **Instalar las dependencias para Windows**
Con Chocolatey instalado, puedes usarlo para instalar Python2 y JDK8, que son necesarios para el desarrollo con React Native for Windows:

```bash
choco install -y python2 jdk8
```

### 6. **Configurar React Native for Windows**
Ejecuta el siguiente comando para crear tu primer proyecto React Native:

```bash
npx react-native init MyFirstApp
```

Una vez creado el proyecto, navega a la carpeta del proyecto:

```bash
cd MyFirstApp
```

Para agregar soporte para Windows, ejecuta:

```bash
npx react-native-windows-init --overwrite
```

### 7. **Compilar y ejecutar la aplicación en Windows**
Si todo está configurado correctamente, puedes compilar y ejecutar la aplicación en Windows con el siguiente comando:

```bash
npx react-native run-windows
```

## Herramientas adicionales

- **Visual Studio Code (VS Code)**: Recomendado para la edición de código en JavaScript y TypeScript. Puedes descargarlo desde [aquí](https://code.visualstudio.com/).
- **React Native Tools para VS Code**: Instala la extensión de React Native desde el Marketplace de VS Code para mejorar la experiencia de desarrollo.

## Referencias

Para más detalles sobre la configuración y el desarrollo con React Native for Windows, visita la [documentación oficial](https://microsoft.github.io/react-native-windows/docs/getting-started).
