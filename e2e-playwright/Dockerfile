FROM mcr.microsoft.com/playwright:v1.48.2-focal

WORKDIR /e2e-playwright

COPY . .

RUN npm install

CMD [ "npx", "playwright", "test", "--reporter=list" ]