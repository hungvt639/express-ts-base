import { Req, Res, Next } from "../interfaces/Express";
import { FailureError, ServerError } from "../common/error";

// export function errorHandler(err: any, req: Req, res: Res, next: any) {
//     // console.log(err);
//     res.status(400).json({ message: err.message });
// }
export const errorHandler = (err: Error, req: Req, res: Res, next: Next) => {
    if (err) {
        if (err instanceof ServerError) {
            return res
                .status(err.status)
                .json({ message: err.message, data: err.data });
        } else if (err instanceof FailureError) {
            return res
                .status(400)
                .json({ message: err.message, data: err.data });
        }
        return res.status(500).json({ message: "Internal Server Error" });
    }
    return next();
};
