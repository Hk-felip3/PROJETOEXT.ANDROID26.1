from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import cv2
import numpy as np
import base64
import utils

app = FastAPI()

# Configuração de CORS para permitir requisições do React Native
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configurações do Cartão
WIDTH_IMG = 400
HEIGHT_IMG = 700
QUESTIONS = 14
CHOICES = 5
GABARITO = (1, 2, 3, 4, 3, 2, 1, 3, 2, 1, 3, 4, 2, 3)


@app.post("/corrigir-cartao/")
async def corrigir_cartao(file: UploadFile = File(...)):
    try:
        # 1. Ler a imagem enviada pela API
        contents = await file.read()
        nparr = np.frombuffer(contents, np.uint8)
        img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

        if img is None:
            raise HTTPException(status_code=400, detail="Imagem inválida.")

        # 2. Processamento inicial
        img = cv2.resize(img, (WIDTH_IMG, HEIGHT_IMG))
        imgGray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        imgBlur = cv2.GaussianBlur(imgGray, (5, 5), 1)
        imgCanny = cv2.Canny(imgBlur, 10, 50)

        # 3. Encontrar contornos
        contours, _ = cv2.findContours(imgCanny, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_NONE)
        rectCon = utils.rectContour(contours)

        if len(rectCon) == 0:
            raise HTTPException(status_code=400, detail="Cartão resposta não encontrado na imagem.")

        maiorContorno = rectCon[0]
        biggestContour = utils.getCornerPoints(maiorContorno)

        if biggestContour.size == 0:
            raise HTTPException(status_code=400, detail="Cantos do cartão não detectados.")

        # 4. Transformação de Perspectiva
        biggestContour = utils.reorder(biggestContour)
        pt1 = np.float32(biggestContour)
        pt2 = np.float32([[0, 0], [WIDTH_IMG, 0], [0, HEIGHT_IMG], [WIDTH_IMG, HEIGHT_IMG]])
        matrix = cv2.getPerspectiveTransform(pt1, pt2)
        imgWarpColored = cv2.warpPerspective(img, matrix, (WIDTH_IMG, HEIGHT_IMG))

        # 5. Aplicar Threshold e extrair as bolinhas
        imgWarpGray = cv2.cvtColor(imgWarpColored, cv2.COLOR_BGR2GRAY)
        imgThresh = cv2.threshold(imgWarpGray, 150, 255, cv2.THRESH_BINARY_INV)[1]
        boxes = utils.splitBoxes(imgThresh)

        # 6. Identificar Respostas
        myPixelVal = np.zeros((QUESTIONS, CHOICES))
        countC, countR = 0, 0
        for image in boxes:
            totalPixels = cv2.countNonZero(image)
            myPixelVal[countR][countC] = totalPixels
            countC += 1
            if countC == CHOICES:
                countR += 1
                countC = 0

        myIndex = []
        for x in range(0, QUESTIONS):
            arr = myPixelVal[x]
            myIndexVal = np.where(arr == np.amax(arr))
            myIndex.append(int(myIndexVal[0][0]))

        # 7. Avaliar Acertos e Erros
        grading = []
        for x in range(0, QUESTIONS):
            if GABARITO[x] == myIndex[x]:
                grading.append(1)
            else:
                grading.append(0)

        acertos = sum(grading)

        # 8. Gerar a imagem com feedback (bolinhas verdes/vermelhas)
        imgResult = imgWarpColored.copy()
        imgResult = utils.showAnswers(imgResult, myIndex, grading, GABARITO, QUESTIONS, CHOICES)

        # 9. Converter a imagem final para Base64 para enviar ao Front-end
        _, buffer = cv2.imencode('.jpg', imgResult)
        img_base64 = base64.b64encode(buffer).decode('utf-8')

        # 10. Retornar os dados
        return {
            "status": "sucesso",
            "acertos": acertos,
            "total_questoes": QUESTIONS,
            "respostas_aluno": myIndex,
            "gabarito_esperado": GABARITO,
            "imagem_processada": f"data:image/jpeg;base64,{img_base64}"
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))