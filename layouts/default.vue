<template>
	<div>
		<!--		<Navbar />-->
		<nuxt />
	</div>
</template>
<script>
	import Navbar from "~/components/navbar";
	export default {
		components: { Navbar }
	};
</script>
<style lang="scss">
	/*@import "../assets/css/bootstrap.min.css";*/
	/*@import url(https://bootswatch.com/4/cyborg/bootstrap.min.css);*/
	@import url(https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.5.0/css/font-awesome.min.css);
	@import url(https://fonts.googleapis.com/css?family=Roboto);

	body {
		/*background: #222d32;*/
		font-family: "Roboto", sans-serif;
	}
</style>
