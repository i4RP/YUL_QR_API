const express = require("express");
const QRCodeStyling = require("qr-code-styling-node");

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/qrcode", async (req, res) => {
  const data = req.query.data || "https://example.com";

  const qrCode = new QRCodeStyling({
    width: 300,
    height: 300,
    data,
    type: "canvas",
    dotsOptions: {
      type: "rounded",
      color: "#000000"
    },
    backgroundOptions: {
      color: "#ffffff"
    },
    cornersSquareOptions: {
      type: "extra-rounded"
    }
  });

  try {
    const buffer = await qrCode.getRawData("png");
    res.set("Content-Type", "image/png");
    res.send(buffer);
  } catch (err) {
    console.error("QR生成失敗:", err);
    res.status(500).send("QRコード生成に失敗しました");
  }
});

app.listen(PORT, () => {
  console.log(`✅ サーバー起動中: http://localhost:${PORT}/qrcode?data=xxx`);
});
