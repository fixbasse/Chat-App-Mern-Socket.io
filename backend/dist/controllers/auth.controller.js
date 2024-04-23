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
exports.logout = exports.login = exports.signup = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const token_1 = __importDefault(require("../utils/token"));
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_model_1.default.findOne({ userName: req.body.userName });
        if (user)
            return res.status(400).send('This username has been taken.');
        const hashPwd = bcrypt_1.default.hashSync(req.body.password, 6);
        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=Scott${req.body.userName}`;
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=Maria${req.body.userName}`;
        const newUser = new user_model_1.default(Object.assign(Object.assign({}, req.body), { password: hashPwd, profilePic: req.body.gender === 'male' ? boyProfilePic : girlProfilePic }));
        (0, token_1.default)(newUser._id, res);
        yield newUser.save();
        res.status(201).send('User has been created.');
    }
    catch (error) {
        res.status(500).send('Internal Error [signup]');
        console.log(error);
    }
});
exports.signup = signup;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_model_1.default.findOne({ userName: req.body.userName });
        if (!user)
            return res.status(400).send('Invalid username or password.');
        const passwordCompare = bcrypt_1.default.compareSync(req.body.password, user.password);
        if (!passwordCompare)
            return res.status(400).send('Invalid username or password.');
        (0, token_1.default)(user._id, res);
        res.status(200).json({
            message: 'Login success!',
            _id: user._id,
            fullName: user.fullName,
            userName: user.userName,
            profilePic: user.profilePic,
        });
    }
    catch (error) {
        res.status(500).send('Internal Error at [login]');
    }
});
exports.login = login;
const logout = (res) => {
    res.cookie('jwt', '', {
        maxAge: 0,
    });
    res.status(200).send('Logout success!');
};
exports.logout = logout;
