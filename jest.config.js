module.exports = {
    verbose: true,
    roots: ['<rootDir>/components'],
    moduleNameMapper: {
        '\\.(css|less|scss)$': 'identity-obj-proxy',
        '^uik$': '<rootDir>/components/index.tsx',
        '^uik/lib(.*)$': '<rootDir>/components/$1',
        // '^components(.*)$': '<rootDir>/components/$1',
    },
    testRegex: '(/test/.*|\\.(test|spec))\\.(ts|tsx|js)$',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
    testPathIgnorePatterns: ['/node_modules/', '/lib/', '/esm/', '/dist/'],
    preset: 'ts-jest',
    testEnvironment: 'jsdom'
}
