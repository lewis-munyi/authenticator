<template>
	<div class="container">
		<div class="row justify-content-center">
			<div class="col-lg-6 col-md-8 login-box">
				<div class="col-lg-12 login-title">
					Sign in to continue
				</div>
				<div class="col-lg-12 login-form">
					<div class="col-lg-12 login-form">
						<div class="col-lg-12 loginbttm">
							<div class="col-lg-6 login-btm login-text">
								<!-- Error Message -->
								{{ error }}
							</div>
							<div class="col-lg-12 text-center login-btm login-button">
								<button @click="loginWithGoogle" class="btn btn-outline-primary">Continue with Google</button>
							</div>
						</div>
					</div>
				</div>
				<div class="col-lg-3 col-md-2"></div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: "login",
		data() {
			return {
				authDetails: {
					email: null,
					password: null
				},
				error: null
			};
		},
		methods: {
			loginWithGoogle() {
				this.$store.dispatch("login").then(() => {
					this.$toast.success(`Hello ${this.$store.state.user.displayName.split(" ")[0]}. Welcome!`, { duration: 2000, keepOnHover: true });
					this.$router.push("/dashboard");
				});
			},
			authenticate() {
				console.log("Hello authenticate");
			}
		}
	};
</script>

<style lang="scss" scoped>
	/*@import url(https://fonts.googleapis.com/css?family=Roboto);*/
	.login-box {
		margin-top: 75px;
		height: auto;
		background: #1a2226;
		text-align: center;
		box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
	}

	.login-title {
		margin-top: 15px;
		text-align: center;
		font-size: 30px;
		letter-spacing: 2px;
		margin-top: 30px;
		font-weight: bold;
		color: #ecf0f5;
	}

	.login-form {
		margin-top: 25px;
		text-align: left;
	}

	.form-group {
		margin-bottom: 40px;
		outline: 0px;
	}
	.btn-outline-primary {
		border-color: #0db8de;
		color: #0db8de;
		border-radius: 0px;
		font-weight: bold;
		letter-spacing: 1px;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
	}

	.btn-outline-primary:hover {
		background-color: #0db8de;
		color: #121212;
		right: 0px;
	}

	.login-btm {
		float: left;
	}

	.login-button {
		padding-right: 0px;
		text-align: right;
		margin-bottom: 25px;
	}

	.login-text {
		text-align: left;
		padding-left: 0px;
		color: red;
	}

	.loginbttm {
		padding: 0px;
	}
</style>
