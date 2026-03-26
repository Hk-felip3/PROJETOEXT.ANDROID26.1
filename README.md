# Tesseract - Scanner de Cartão Resposta

Este projeto consiste em um aplicativo Android desenvolvido com React Native integrado a um backend em Python utilizando OpenCV. O objetivo é capturar imagens de cartões resposta, processá-las e retornar automaticamente os resultados.

---

## Estrutura do Projeto

Importante: o nome da pasta raiz do projeto deve ser exatamente:

```
tesseract
```

Estrutura esperada:

```
tesseract/
├── backend/
├── mobile-app/
```

---

## Instalação das Dependências

### Backend (Python)

Acesse a pasta do backend:

```bash
cd backend
```

Crie um ambiente virtual:

```bash
python -m venv venv
```

Ative o ambiente:

```bash
# Windows
.\venv\Scripts\activate

# Linux / Mac
source venv/bin/activate
```

Instale as dependências necessárias:

```bash
pip install opencv-python numpy fastapi uvicorn python-multipart
```

---

### Frontend (React Native com Expo)

Acesse a pasta do aplicativo:

```bash
cd mobile-app
```

Instale as dependências:

```bash
npm install
```

Instale as bibliotecas adicionais necessárias:

```bash
npx expo install expo-camera expo-image-picker axios
```

---

## Como Executar o Projeto

### 1. Iniciar o Backend

```bash
cd backend
.\venv\Scripts\activate

uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

A API estará disponível em:

```
http://localhost:8000
```

---

### 2. Iniciar o Aplicativo

```bash
cd mobile-app
npx expo start
```

Após iniciar, pressione:

```
a
```

para abrir o aplicativo no emulador Android.

---

## Comunicação com a API

Para que o aplicativo consiga acessar o backend rodando localmente, utilize o seguinte endereço:

```
http://10.0.2.2:8000
```

O uso de `localhost` não funcionará dentro do emulador Android.

---

## Requisitos

- Node.js (versão LTS)
- Python 3.x
- Android Studio (para emulador Android)
- VS Code ou outro editor de código

---

## Observações

O backend é responsável pelo processamento das imagens utilizando OpenCV. O aplicativo mobile realiza a captura da imagem e envia para a API, que retorna os dados processados.

---

## Licença

Projeto desenvolvido para fins educacionais.
