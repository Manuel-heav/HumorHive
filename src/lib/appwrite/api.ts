import { INewUser } from "@/types";
import { ID } from 'appwrite'
import { account, appwriteConfig, avatars, databases } from "./config";

export async function createUserAccount(user: INewUser){
    try{
        const newAccount = await account.create(
            ID.unique(),
            user.email, 
            user.password, 
            user.name
        )

        if(!newAccount) throw Error;

        const avatarUrl = avatars.getInitials(user.name);

        const newUser = await saveUserToDB({
            accountId: newAccount.$id,
            name: newAccount.name,
            email: newAccount.email,
            // this username is not coming from the new account instead the form, that's why it's user
            username: user.username,
            imageUrl: avatarUrl,
        })
        return newUser;
    }catch(err){
        console.log(err);
        return err
    }
}

export async function saveUserToDB(user: {
    accountId: string,
    email: string,
    name: string,
    imageUrl: URL,
    username?: string,
}){

    try{
        const newUser = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            ID.unique(),
            user,)

            return newUser;
    }catch(err){
        console.log(err)
    }
}