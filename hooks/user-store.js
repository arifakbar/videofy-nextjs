import { create } from 'zustand';

export const UserStore = create((set, get) => ({
    user: {
        email: "",
        name: "",

        profilePic: ""
    },
    token: "",
    loggedInUser: (idTokenResult, user) => {
        set({
            token: idTokenResult.token,
            user: {
                email: user?.data?.data?.email,
                name: user?.data?.data?.name,
                profilePic: user?.data?.data?.profilePic
            }
        });
    },
    logoutUser: () => {
        set({
            token: "",
            user: {
                email: "",
                name: "",
                profilePic: ""
            },
        })
    }
}));