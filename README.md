## Getting Started

1. **Clone the Repository:**
```bash
git clone https://github.com/TaiserAI/mcp-server.git
```

```bash
cd mcp-server
```

2. **Add a ETH PK:**
```bash
cp .env.example .env
```

Then add your ETH_CREDITS_NFT_PRIVATE_KEY to the `.env` file.

3. **Install Dependencies and Build:**
```bash
npm install
```

```bash
npm run build
```

4. **Interact with the MCP server:**

```bash
npm run inspector
```

Open [http://127.0.0.1:6274/](http://127.0.0.1:6274/) with your browser.

Example:
```bash
> Connect 
> List tools
> IPOR-VAULT

Amount to deposit: 1
vault: 0x45aa96f0b3188D47a1DaFdbefCE1db6B37f58216
rcpUrl: https://mainnet.base.org/
```
