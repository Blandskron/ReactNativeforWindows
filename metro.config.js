const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const exclusionList = require('metro-config/src/defaults/exclusionList');
const fs = require('fs');
const path = require('path');

const rnwPath = fs.realpathSync(
    path.resolve(require.resolve('react-native-windows/package.json'), '..'),
);

// Configuración de Metro para manejar SVGs como código fuente
const config = {
    resolver: {
        blockList: exclusionList([
            new RegExp(
                `${path.resolve(__dirname, 'windows').replace(/[/\\]/g, '/')}.*`,
            ),
            new RegExp(`${rnwPath}/build/.*`),
            new RegExp(`${rnwPath}/target/.*`),
            /.*\.ProjectImports\.zip/,
        ]),
        assetExts: getDefaultConfig(__dirname).resolver.assetExts.filter(ext => ext !== 'svg'),
        sourceExts: [...getDefaultConfig(__dirname).resolver.sourceExts, 'svg'],
    },
    transformer: {
        babelTransformerPath: require.resolve('react-native-svg-transformer'),
        getTransformOptions: async () => ({
            transform: {
                experimentalImportSupport: false,
                inlineRequires: true,
            },
        }),
    },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
