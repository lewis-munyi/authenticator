<template>
	<nav class="navbar navbar-expand-lg navbar-dark bg-primary justify-content-between">
		<div class="container">
			<h4 class="display-4">Authenticator</h4>
			<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
				<span class="navbar-toggler-icon"></span>
			</button>
			<div class="collapse navbar-collapse d-lg-flex justify-content-lg-end" id="navbarColor01">
				<div class="dropdown">
					<img data-toggle="dropdown" :src="this.$store.state.user.photoURL" id="userDetails" alt="" aria-haspopup="true" aria-expanded="false" />
					<div class="dropdown-menu dropdown-menu-lg-right dropdown-menu-sm-left" aria-labelledby="userDetails">
						<a class="dropdown-item" href="#">{{ this.$store.state.user.displayName }}</a>
						<a class="dropdown-item" href="#">{{ this.$store.state.user.email }}</a>
						<div class="dropdown-divider"></div>
						<a class="dropdown-item" @submit.prevent="signOut" @click="signOut">Sign out</a>
					</div>
				</div>
			</div>
		</div>
	</nav>
</template>
<script>
	export default {
		name: "navbar",

		data() {
			return {
				isOpen: false,
				bannerMessage: false,
				user: {
					name: null,
					photo: null,
					email: null,
					uid: null
				}
			};
		},
		methods: {
			signOut: function() {
				this.$store.dispatch("logout").then(() => {
					this.$router.push("/login");
				});
			}
		},
		created() {
			if (process.client) {
				const handleEscape = e => {
					if (e.key === "Esc" || e.key === "Escape") {
						this.isOpen = false;
					}
				};
				document.addEventListener("keydown", handleEscape);
				this.$once("hook:beforeDestroy", () => {
					document.removeEventListener("keydown", handleEscape);
				});
			}
		}
	};
</script>
<style lang="scss" scoped>
	img {
		width: 50px;
		border-radius: 50%;
	}
	/*.navbar-brand {*/
	/*	color: white;*/
	/*}*/
</style>
