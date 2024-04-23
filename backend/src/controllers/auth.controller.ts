import { Request, Response } from "express"
import User from "../models/user.model";
import bcrypt from 'bcrypt';
import generateToken from "../utils/token";

export const signup = async (req: Request, res: Response) => {
    try {
        const user = await User.findOne({ userName: req.body.userName })
        if (user) return res.status(400).send('This username has been taken.');

        const hashPwd = bcrypt.hashSync(req.body.password, 6);

        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=Scott${req.body.userName}`;
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=Maria${req.body.userName}`;

        const newUser = new User({
            ...req.body,
            password: hashPwd,
            profilePic: req.body.gender === 'male' ? boyProfilePic : girlProfilePic,
        });

        generateToken(newUser._id, res);
        await newUser.save();

        res.status(201).send('User has been created.');
    } catch (error) {
        res.status(500).send('Internal Error [signup]')
        console.log(error);

    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const user = await User.findOne({ userName: req.body.userName });
        if (!user) return res.status(400).send('Invalid username or password.');

        const passwordCompare = bcrypt.compareSync(req.body.password, user.password);
        if (!passwordCompare) return res.status(400).send('Invalid username or password.');

        generateToken(user._id, res);

        res.status(200).json({
            message: 'Login success!',
            _id: user._id,
            fullName: user.fullName,
            userName: user.userName,
            profilePic: user.profilePic,
        });

    } catch (error) {
        res.status(500).send('Internal Error at [login]')
    }
};

export const logout = (res: Response) => {
    res.cookie('jwt', '', {
        maxAge: 0,
    });

    res.status(200).send('Logout success!');
};