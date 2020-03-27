export default function({ store, redirect }) {
	const user = store.state.user;
	if (!user) {
		redirect("/login");
	}
}
