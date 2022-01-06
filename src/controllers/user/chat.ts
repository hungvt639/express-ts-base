import { Req, Res } from "../../interfaces/Express";
import ChatModel, { STT_CHAT } from "../../models/chat";

export async function getListChat(req: Req, res: Res, next) {
    try {
        let chats = await ChatModel.find(
            { member: req.user._id },
            "_id member"
        );
        const idMember: String = req.query.id_menber as String;
        if (idMember) {
            chats = chats.filter((c) => c.member.includes(idMember));
            // chats = await ChatModel.find(
            //     { member: { $in: [idMember, req.user._id] } },
            //     "_id member"
            // );
        }
        res.json(chats).status(200);
    } catch (err) {
        next(err);
    }
}

export async function createChatRoom(req: Req, res: Res, next) {
    try {
        const listMenber = req.body.idFriend;
        if (!listMenber) {
            res.json({ message: "Danh sách không được để trống" }).status(400);
        }
        const chat = await ChatModel.create({
            member: [req.user._id].concat(listMenber),
            status: STT_CHAT.DEFAULT,
        });
        res.json(chat).status(200);
    } catch (err) {
        next(err);
    }
}

export async function getChatUser(req: Req, res: Res, next) {
    try {
        const idMember: String = req.params.id as String; //id menber
        console.log(idMember);

        if (!idMember) {
            res.json({ message: "Lỗi request" }).status(404);
            return;
        }
        let chats = await ChatModel.find(
            { member: req.user._id },
            "_id member"
        );
        chats = chats.filter(
            (c) => c.member.includes(idMember) && c.member.length === 2
        );
        if (chats.length) {
            res.json(chats[0]).status(200);
        } else {
            const chat = await ChatModel.create({
                member: [req.user._id].concat(idMember),
                status: STT_CHAT.DEFAULT,
            });
            res.json(chat).status(200);
        }
    } catch (err) {
        next(err);
    }
}

export async function getMessageChat(req: Req, res: Res, next) {
    try {
        const id: String = req.params.id as String; //id chat
        if (!id) {
            res.json({ message: "Lỗi request" }).status(404);
            return;
        }
        let chat = await ChatModel.findById(id);

        res.json(chat).status(200);
    } catch (err) {
        next(err);
    }
}
