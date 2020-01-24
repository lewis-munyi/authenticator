<template>
	<div>
		<Navbar />
		Hello Dashboard
	</div>
</template>
<script>
	import Navbar from "~/components/navbar";

	export default {
		name: "dashboard",
		components: {
			Navbar
		},
		data() {
			return {};
		}
	};
</script>
