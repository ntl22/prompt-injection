<script>
	import '../styles.scss';
</script>

<div id="background" class="py-5">
	<slot />
</div>

<style lang="scss">
	#background {
		background: url('/background.png') no-repeat center center fixed;
		background-size: cover;
	}
</style>
