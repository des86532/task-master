FROM node:18

WORKDIR /usr/src/app

# 安裝 pnpm 和 NX CLI
RUN npm install -g pnpm@9.9 nx@19.6.4

# 複製 package.json 和 pnpm-lock.yaml
COPY package*.json pnpm-lock.yaml ./

# 安裝依賴（使用 pnpm）
RUN pnpm install

# 複製其他文件
COPY . .

# 使用 NX CLI 建置並啟動 client 和 server
CMD ["sh", "-c", "nx run client:dev & nx run server:serve"]
