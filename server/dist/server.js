"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const sharp_1 = __importDefault(require("sharp"));
const png_to_ico_1 = __importDefault(require("png-to-ico"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const port = parseInt(process.env.PORT || "5000", 10);
app.use((0, cors_1.default)());
const storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({ storage });
app.post("/convert", upload.single("image"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.file) {
        console.error("No file uploaded.");
        res.status(400).send("No file uploaded.");
        return;
    }
    try {
        const resizedBuffer = yield (0, sharp_1.default)(req.file.buffer)
            .resize(256, 256, {
            fit: "fill",
        })
            .toFormat("png")
            .toBuffer();
        const icoBuffer = yield (0, png_to_ico_1.default)(resizedBuffer);
        res.set("Content-Type", "image/x-icon");
        res.set("Content-Disposition", "attachment; filename=converted.ico");
        res.send(icoBuffer);
    }
    catch (error) {
        console.error("Error during image conversion:", error);
        res.status(500).send("Error during file conversion.");
    }
}));
app.listen(port, '0.0.0.0', () => {
    console.log(`Backend server is running on http://localhost:${port}`);
});
//# sourceMappingURL=server.js.map