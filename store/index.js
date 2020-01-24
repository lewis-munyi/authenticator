import cookie from "js-cookie";
import { auth, provider } from "@/plugins/firebase";
import JWTDecode from "jwt-decode";
import cookieparser from "cookieparser";

export const state = () => ({
	user: null
});

export const actions = {
	/*
	 * Called whenever the server initializes with a request or when page loads.
	 * Takes two parameters: store and request object
	 * */
	nuxtServerInit({ commit }, { req }) {
		if (process.server && process.static) return;
		if (!req.headers.cookie) return;

		const { auth_token } = cookieparser.parse(req.headers.cookie);

		if (!auth_token) return;

		try {
			const decoded = JWTDecode(auth_token);
			if (decoded) {
				commit("SET_USER", {
					uid: decoded.user_id,
					email: decoded.email,
					displayName: decoded.name,
					photoURL: decoded.picture
				});
			}
		} catch (e) {
			console.error(e);
		}
	},

	async logout({ commit }) {
		try {
			await auth.signOut();
			// Sign-out successful.
			cookie.remove("auth_token");
		} catch (e) {
			console.error(e);
		}
	},

	async login({ commit }) {
		try {
			// Log in user
			let result = await auth.signInWithPopup(provider);
		} catch (error) {
			// Handle Errors here.
			console.error(error);
		}

		try {
			//Get JWT token
			const token = await auth.currentUser.getIdToken(true);
			console.log(token);

			// Add it to browser cookie
			cookie.set("auth_token", token);
			const { email, uid, displayName, photoURL } = auth.currentUser;

			// Add it to store
			commit("SET_USER", { email, uid, displayName, photoURL });
		} catch (e) {
			console.error(e);
		}
	}
};

export const mutations = {
	SET_USER: (state, authUser) => {
		state.user = authUser;
	}
};
