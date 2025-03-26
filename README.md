# Base Network Vanity Address Generator

A web application that generates Ethereum-compatible vanity addresses for the Base Network with custom prefixes and suffixes.

![Base Network Vanity Address Generator](./public/vaporwave-bg.jpg)

## Features

- Generate Ethereum addresses with custom prefixes (after 0x)
- Generate Ethereum addresses with custom suffixes
- Case-sensitive matching option
- All processing happens locally in your browser
- Private keys never leave your device
- Performance metrics showing addresses generated per second
- Copy address and private key to clipboard with one click

## Technology Stack

- React 19
- Vite
- Tailwind CSS
- Ethers.js 6
- Web Workers for non-blocking UI

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone this repository:
   ```
   git clone https://github.com/yourusername/base-vanity-generator.git
   cd base-vanity-generator
   ```

2. Install dependencies:
   ```
   npm install
   ```
   or
   ```
   yarn
   ```

3. Start the development server:
   ```
   npm run dev
   ```
   or
   ```
   yarn dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## Building for Production

To create a production build:

```
npm run build
```
or
```
yarn build
```

The build artifacts will be stored in the `dist/` directory.

## Security Notes

- All computation happens locally in your browser
- Private keys are never sent to any server
- Be careful when using generated addresses - store private keys securely
- Consider using hardware wallets for significant funds

## How It Works

1. The application generates random keypairs using the Ethers.js library
2. Each address is checked against your specified criteria (prefix/suffix)
3. When a match is found, the address and private key are displayed
4. Web Workers are used to ensure the UI remains responsive during generation

## License

MIT

## Acknowledgments

- Ethers.js library for Ethereum functionality
- React and Vite for frontend framework
- Tailwind CSS for styling