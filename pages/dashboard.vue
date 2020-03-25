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
								<input type="text" class="form-control" id="name" placeholder="Enter project name">
							</div>
							<div class="form-group">
								<label for="client">Client contact</label>
								<input type="text" class="form-control" id="client" placeholder="Enter client contact/name">
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
						<button type="button" class="btn btn-primary">Save changes</button>
						<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
					</div>
				</div>
			</div>
		</div>
		<div class="container mt-3">
			<div class="row">
				<div class="col-sm-12 col-lg-3 col-md-6">
					<div class="jumbotron pr-3 pl-3 pt-4 pb-2">
						<h4 class="display-5">Project name</h4>
						<p class="lead">test@example.com</p>
						<hr class="my-4" />
						<p>
							Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut eum non obcaecati optio provident recusandae repellendus? Dolorem doloremque exercitationem nesciunt nisi
							obcaecati odit quam quibusdam saepe, sint tempora temporibus ut!
						</p>
						<p class="lead">
							<div class="form-group">
								<div class="custom-control custom-switch">
									<input type="checkbox" class="custom-control-input" id="statusSwitch" checked="">
									<label class="custom-control-label" for="statusSwitch">Status</label>
								</div>
							</div>
						</p>
					</div>
				</div>
				<div class="col-sm-12 col-lg-3 col-md-6">
					<div class="jumbotron pr-3 pl-3 pt-4 pb-2">
						<h4 class="display-5">Project name</h4>
						<p class="lead">test@example.com</p>
						<hr class="my-4" />
						<p>
							Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut eum non obcaecati optio provident recusandae repellendus? Dolorem doloremque exercitationem nesciunt nisi
							obcaecati odit quam quibusdam saepe, sint tempora temporibus ut!
						</p>
						<p class="lead">
							<div class="form-group">
								<div class="custom-control custom-switch">
									<input type="checkbox" class="custom-control-input" id="statusSwitch" checked="">
									<label class="custom-control-label" for="statusSwitch">Status</label>
								</div>
							</div>
						</p>
					</div>
				</div>
				<div class="col-sm-12 col-lg-3 col-md-6">
					<div class="jumbotron pr-3 pl-3 pt-4 pb-2">
						<h4 class="display-5">Project name</h4>
						<p class="lead">test@example.com</p>
						<hr class="my-4" />
						<p>
							Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut eum non obcaecati optio provident recusandae repellendus? Dolorem doloremque exercitationem nesciunt nisi
							obcaecati odit quam quibusdam saepe, sint tempora temporibus ut!
						</p>
						<p class="lead">
							<div class="form-group">
								<div class="custom-control custom-switch">
									<input type="checkbox" class="custom-control-input" id="statusSwitch" checked="">
									<label class="custom-control-label" for="statusSwitch">Status</label>
								</div>
							</div>
						</p>
					</div>
				</div>
				<div class="col-sm-12 col-lg-3 col-md-6">
					<div class="jumbotron pr-3 pl-3 pt-4 pb-2">
						<h4 class="display-5">Project name</h4>
						<p class="lead">test@example.com</p>
						<hr class="my-4" />
						<p>
							Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut eum non obcaecati optio provident recusandae repellendus? Dolorem doloremque exercitationem nesciunt nisi
							obcaecati odit quam quibusdam saepe, sint tempora temporibus ut!
						</p>
						<p class="lead">
							<div class="form-group">
								<div class="custom-control custom-switch">
									<input type="checkbox" class="custom-control-input" id="statusSwitch" checked="">
									<label class="custom-control-label" for="statusSwitch">Status</label>
								</div>
							</div>
						</p>
					</div>
				</div>
				<div class="col-sm-12 col-lg-3 col-md-6">
					<div class="jumbotron pr-3 pl-3 pt-4 pb-2">
						<h4 class="display-5">Project name</h4>
						<p class="lead">test@example.com</p>
						<hr class="my-4" />
						<p>
							Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut eum non obcaecati optio provident recusandae repellendus? Dolorem doloremque exercitationem nesciunt nisi
							obcaecati odit quam quibusdam saepe, sint tempora temporibus ut!
						</p>
						<p class="lead">
							<div class="form-group">
								<div class="custom-control custom-switch">
									<input type="checkbox" class="custom-control-input" id="statusSwitch" checked="">
									<label class="custom-control-label" for="statusSwitch">Status</label>
								</div>
							</div>
						</p>
					</div>
				</div>
			</div>
		</div>
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
			return {
				form: {
					name: null,
					client: null,
					description: null,
					status: false
				},
				projects: {}
			};
		},
		mounted() {
			$('#newProjectModal').modal({
				keyboard: false,
				backdrop: false,
				show: false
			})
		}
	};
</script>
<style lang="scss"></style>
