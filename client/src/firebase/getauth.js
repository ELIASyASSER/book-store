// Trigger the upload only if `urlImg` exists
import { auth } from "./main.config";
export const getTokenId = async()=>{

    const user = auth?.currentUser;
    return await user?.getIdToken(true)||null

}
