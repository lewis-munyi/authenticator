<template>
	<header class="border-b md:flex md:items-center md:justify-between sm:justify-around p-4 md:p-2 pb-0 shadow-lg md:pb-4 mb-5 bg-light">
		<!-- Logo text or image -->
		<div class="flex items-center justify-between mb-4 md:mb-0">
			<h1 class="leading-none text-3xl text-grey-darkest">
				<a class="no-underline text-grey-darkest hover:text-black" href="#">
					Authenticator
				</a>
			</h1>
		</div>
		<!-- END Logo text or image -->

		<!-- Global navigation -->
		<nav>
			<ul class="list-reset md:flex md:items-center">
				<li class="md:ml-4">
					<a class="block no-underline hover:underline py-2 text-grey-darkest hover:text-black md:border-none md:p-0" href="#">
						<div class="relative">
							<button @click="isOpen = !isOpen" class="relative z-10 block h-8 w-8 rounded-full overflow-hidden border-2 border-gray-600 focus:outline-none focus:border-white">
								<img class="h-full w-full object-cover" :src="this.$store.state.user.photoURL" alt="Your avatar" />
							</button>
							<button v-if="isOpen" @click="isOpen = false" tabindex="-1" class="fixed inset-0 h-full w-full bg-black opacity-50 cursor-default"></button>
							<div v-if="isOpen" class="absolute right-0 mt-2 py-2 w-70 bg-white rounded-lg shadow-xl">
								<a href="#" class="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white">{{ this.$store.state.user.displayName }}</a>
								<a href="#" class="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white">{{ this.$store.state.user.email }}</a>
								<a href="#" @submit="signOut" @click="signOut" class="block px-4 py-2 text-gray-800 hover:bg-red-500 hover:text-white">Sign out</a>
							</div>
						</div>
					</a>
				</li>
			</ul>
		</nav>
		<!-- END Global navigation -->
	</header>
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
