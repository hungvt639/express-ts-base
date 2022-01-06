import mongoose from "mongoose";
import { MONGO_DB } from "./const";

async function connect() {
    try {
        await mongoose.connect(MONGO_DB);
        console.log("Connect OK");
    } catch (e) {
        console.log("Connect NOT OK");
    }
}
export default connect;
