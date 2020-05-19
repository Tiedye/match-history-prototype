"use strict";
/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */
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
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
const app = express_1.default();
app.use(cors_1.default({
    origin: '*'
}));
app.get('/getforward', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    axios_1.default.get(req.query.url, {
        headers: req.query.headers ? JSON.parse(req.query.headers) : undefined,
    }).catch(e => {
        if (e.response) {
            return e.response;
        }
        throw e;
    }).then(r => {
        res.status(r.status);
        res.send(r.data);
    });
}));
const port = process.env.port || 3333;
const server = app.listen(port, () => {
    console.log(`Started`);
});
server.on('error', console.error);
