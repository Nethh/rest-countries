<script setup lang="ts">
</script>

<template>
	<el-container>
		<el-header>
			Countries catalog
		</el-header>
		<el-main>
			<RouterView v-slot="{ Component }">
				<template v-if="Component">
					<KeepAlive>
						<Suspense>
							<!-- main content -->
							<component :is="Component"></component>

							<!-- loading state -->
							<template #fallback>
								<el-skeleton animated :count="4"></el-skeleton>
							</template>
						</Suspense>
					</KeepAlive>
				</template>
			</RouterView>
		</el-main>
		<el-footer>
			<div>
				<b>Created by</b>: Thol vanneth
				<br>
				<b>Github repo </b>: <el-link class="!text-base" type="primary" href="https://github.com/Nethh/rest-countries" target="_blank"  rel="noopener noreferrer">Nethh</el-link>
			</div>
		</el-footer>
	</el-container>
</template>

<style scoped>
</style>
