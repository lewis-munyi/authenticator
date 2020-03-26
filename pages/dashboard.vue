<template>
	<div>
		<Navbar />
		<div class="container mt-5 mb-5 ">
			<div class="row d-flex justify-content-between">
				<div class="col-sm-9">
					<h1 id="typography">Your projects</h1>
				</div>
				<div class="col-sm-2">
					<button type="button" class="btn btn-primary pull-right" data-toggle="modal" data-target="#newProjectModal">New</button>
				</div>
			</div>
		</div>
		<div class="modal fade" id="newProjectModal" tabindex="-1" role="dialog">
			<div class="modal-dialog modal-dialog-centered" role="document">
				<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title">New Project</h5>
						<button type="button" class="close" data-dismiss="modal" aria-label="Close">
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<div class="modal-body">
						<form>
							<div class="form-group">
								<label for="name">Project name</label>
								<input type="text" v-model = form.name class="form-control" id="name" placeholder="Enter project name">
							</div>
							<div class="form-group">
								<label for="client">Client name</label>
								<input type="text" v-model="form.client" class="form-control" id="client" placeholder="Enter client name">
							</div>
							<div class="form-group">
								<label for="contact">Client contact</label>
								<input type="text" v-model="form.contact" class="form-control" id="contact" placeholder="Enter client name">
							</div>
							<div class="form-group">
								<label for="description">Description</label>
								<textarea class="form-control" id="description" rows="3" v-model="form.description"></textarea>
							</div>
							<div class="form-group">
								<div class="custom-control custom-switch">
									<input type="checkbox" value=true class="custom-control-input" id="newSwitch" checked="" v-model="form.status">
									<label class="custom-control-label" for="newSwitch">{{form.status === true ? "Active" : "Inactive"}}</label>
								</div>
							</div>
						</form>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-primary" @click="newClient">Save changes</button>
						<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
					</div>
				</div>
			</div>
		</div>
		<div class="container mt-3">
			<div class="row justify-content-center" v-show="isClientsLoading">
				<Loader/> <!--Show loader while fetching data-->
			</div>
			<div class="row" v-if="allClients !== null && isClientsLoading === false">
				<div class="col-sm-12 col-lg-3 col-md-6" v-for="client in allClients">
					<div class="jumbotron pr-3 pl-3 pt-4 pb-2">
						<h4 class="display-5">{{client.data.projectName}}</h4>
						<p class="lead">{{client.data.client}}</p>
						<small>{{client.data.clientContact}}</small>
						<hr class="my-4" />
						<p>
							{{client.data.description}}
						</p>
						<p class="lead">
							<div class="form-group">
								<div class="custom-control custom-switch">
									<input v-if="client.data.status === true" type="checkbox" :id="'statusSwitch' + client.id" class="custom-control-input bg-success"  @change="updateStatus(client.id)" checked>
									<input v-else type="checkbox" class="custom-control-input " :id="'statusSwitch' + client.id" @change="updateStatus(client.id)">
									<label class="custom-control-label" :for="'statusSwitch' + client.id">{{client.data.status === true ? "Active" : "Deactivated"}}</label>
								</div>
							</div>
						</p>
					</div>
				</div>
			</div>
		</div>
		<div class="container mt-5 mb-3" v-if="kanyeQuote">
			<blockquote class="blockquote">
				<p class="mb-0">{{kanyeQuote}}</p>
				<footer class="blockquote-footer">Kanye West</footer>
			</blockquote>
		</div>
	</div>
</template>
<script>
	import Navbar from "~/components/navbar";
	import Loader from "~/components/loader";
	import Cookie from "js-cookie";

	const config = {
		headers: {
			Authorization: "Bearer " + Cookie.get("auth_token")
		}
	};

	export default {
		name: "dashboard",
		components: {
			Navbar,
			Loader
		},
		data() {
			return {
				form: {
					name: null,
					client: null,
					contact: null,
					description: null,
					status: false
				},
				projects: {},
				kanyeQuote: null,
				allClients: null,
				isClientsLoading: true
			};
		},
		methods: {
			newClient: async function(){
				if(this.form.name == null || this.form.client == null || this.form.contact == null || this.form.description == null){
					return this.$toast.error("Fill out all the form fields", {duration: 3000});
				}
				try {
					await this.$axios.$post('http://localhost:5000/authenticator-web/us-central1/newClient', this.form, config);
					this.getAllClients();
					$('#newProjectModal').modal({ show: false });
					this.$toast.success(`Added ${name}`, {duration: 2000});
					this.form.name = this.form.client = this.form.contact = this.form.description = null;
					this.form.status = false;
				}
				catch(error){
					this.$toast.error(`Error. ${error.message}`, {duration: 3000})
				}
			},
			getAllClients: async function(){
				try {
					this.isClientsLoading = true;
					let { data } = await this.$axios.get("http://localhost:5000/authenticator-web/us-central1/allClients", config);
					this.allClients = data;
					this.isClientsLoading = false;
				}
				catch(e){
					this.isClientsLoading = false;
					this.$toast.error(`Error fetching clients: ${e.message}`, {duration: 3000})
				}
			},
			updateStatus: async function(id){
				try{
					this.$toast.show("Updating ...", {duration: 3000});
					this.isClientsLoading = true;
					await this.$axios.$post("http://localhost:5000/authenticator-web/us-central1/updateClient", {id: id}, config);
					this.getAllClients();
				}
				catch(e){
					this.$toast.error(`Error updating status. ${e.message}`, {duration: 3000})
				}
			},
		},
		async mounted() {
			this.getAllClients();
			$('#newProjectModal').modal({
				keyboard: false,
				backdrop: false,
				show: false
			});
			let { quote } = await this.$axios.$get('https://api.kanye.rest/');
			this.kanyeQuote = quote;
		}
	};
</script>
<style lang="scss"></style>
