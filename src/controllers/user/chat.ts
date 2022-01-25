import { Req, Res } from "../../interfaces/Express";
import { STT_CHAT } from "../../models/chat";
import UserModel from "../../models/user";

export async function getListChat(req: Req, res: Res, next) {
    try {
        const id = req.user?._id;
        let user = await UserModel.findById(id).select({
            "chats._id": 1,
            "chats.name": 1,
        });
        let chats = user.chats;
        res.json(chats).status(200);
    } catch (err) {
        next(err);
    }
}

export async function createChatRoom(req: Req, res: Res, next) {
    try {
        let listMenber: String[] = req.body.idFriend;
        if (!listMenber) {
            res.json({ message: "Danh sách không được để trống" }).status(400);
        }
        const id = req.user?._id;
        listMenber = listMenber.concat(id);
        const lengthListMember = listMenber.length;
        let users = [];
        // let chats = [];
        for (let i = 0; i < lengthListMember; i++) {
            users[i] = await UserModel.findById(
                listMenber[i],
                "_id fullname chats"
            );
        }

        for (let i = 0; i < lengthListMember; i++) {
            let name = "";
            for (let j = 0; j < lengthListMember; j++) {
                if (users[i]._id != users[j]._id) {
                    name += users[j].fullname;
                }
            }
            users[i].chats.push({ name: name, status: STT_CHAT.DEFAULT });
        }
        for (let i = 0; i < lengthListMember; i++) {
            let lChat = users[i].chats.length - 1;
            for (let j = 0; j < lengthListMember; j++) {
                if (users[i]._id != users[j]._id) {
                    users[i].chats[lChat].member.push({
                        idUser: users[j]._id,
                        idChat: users[j].chats[users[j].chats.length - 1]._id,
                    });
                }
            }
            users[i].save();
        }
        res.json(
            users[lengthListMember - 1].chats[
                users[lengthListMember - 1].chats.length - 1
            ]
        ).status(200);
    } catch (err) {
        console.log("err", err);

        next(err);
    }
}

export async function getChatUser(req: Req, res: Res, next) {
    try {
        const idMember: String = req.params.id as String; //id menber
        const id = req.user?._id;
        console.log(idMember);
        if (!idMember) {
            res.json({ message: "Lỗi request" }).status(404);
            return;
        }
        const user = await UserModel.findById(id, "chats");
        let chats = user.chats;
        chats = chats.filter(
            (chat) =>
                chat.member.length === 1 &&
                chat.member.filter((m) => m.idUser === idMember).length
        );
        if (chats.length) {
            res.json(chats[0]).status(200);
        } else {
            let listMenber: String[] = [idMember];
            listMenber = listMenber.concat(id);
            const lengthListMember = listMenber.length;
            let users = [];
            // let chats = [];
            for (let i = 0; i < lengthListMember; i++) {
                users[i] = await UserModel.findById(
                    listMenber[i],
                    "_id fullname chats"
                );
            }

            for (let i = 0; i < lengthListMember; i++) {
                let name = "";
                for (let j = 0; j < lengthListMember; j++) {
                    if (users[i]._id != users[j]._id) {
                        name += users[j].fullname;
                    }
                }
                users[i].chats.push({ name: name, status: STT_CHAT.DEFAULT });
            }
            for (let i = 0; i < lengthListMember; i++) {
                let lChat = users[i].chats.length - 1;
                for (let j = 0; j < lengthListMember; j++) {
                    if (users[i]._id != users[j]._id) {
                        users[i].chats[lChat].member.push({
                            idUser: users[j]._id,
                            idChat: users[j].chats[users[j].chats.length - 1]
                                ._id,
                        });
                    }
                }
                users[i].save();
            }
            res.json(
                users[lengthListMember - 1].chats[
                    users[lengthListMember - 1].chats.length - 1
                ]
            ).status(200);
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
        const _id = req.user?._id;
        const user = await UserModel.findById(_id, "chats");
        const chats = user.chats?.filter((c) => c._id == id);
        if (chats.length) {
            res.json(chats[0]).status(200);
        } else {
            res.status(400).json({ message: "Không tồn tại" });
        }
    } catch (err) {
        next(err);
    }
}
