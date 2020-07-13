<template>
	<div>
		<component-a></component-a>
		<component-b></component-b>
		<component-c></component-c>
	</div>
</template>
<script>
import { event } from './index'
import componentA from "./A.vue";
import componentB from "./B.vue";
import componentC from "./C.vue";
export default {
	components: {
		componentA,
		componentB,
		componentC
	},
};
</script>
<style scoped>
</style>