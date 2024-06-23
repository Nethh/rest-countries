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
					<Transition mode="out-in">
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
					</Transition>
				</template>
			</RouterView>
		</el-main>
		<el-footer>
			<div>
				Created by: Thol vanneth
				Github repo : <a href="https://github.com/Nethh/rest-countries"  rel="noopener noreferrer" target="_blank" >Nethh</a>
			</div>
		</el-footer>
	</el-container>
</template>

<style scoped>
@import "element-plus/theme-chalk/index.css";
</style>
