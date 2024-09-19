<script>
	export let data;

	let levels = data.levels;
	let selectedLevel = 1;
	let attackSuccess = false;

	let input = '';
	$: inputLength = input.length;

	let result = '';

	// @ts-ignore
	async function handleSubmit(event) {
		const form = event.target;
		const formData = new FormData(form);

		if (inputLength === 0) {
			result = 'Please input something.';
			return;
		}

		attackSuccess = false;
		result = 'Loading...';

		const response = await fetch('/api/chat', {
			method: 'POST',
			body: formData
		});

		const data = await response.json();
		result = data.result;
		attackSuccess = data.success;
	}
</script>

<div class="container-fluid w-50 border border-4 px-5 py-2 bg-white">
	<h1 class="h3 text-center my-2">Llama 3 Prompt Injection</h1>
	<p>With maximum <b>80 characaters</b>, please try to extract the secret password.</p>

	<div class="d-flex justify-content-end">
		<select name="level" id="level" bind:value={selectedLevel}>
			{#each levels as level}
				<option value={level.level}>{level.name}</option>
			{/each}
		</select>
	</div>

	<p class="h4">Hint</p>
	<p>{levels.filter((level) => level.level === selectedLevel)[0].description}</p>

	<form class="d-flex flex-column" on:submit|preventDefault={handleSubmit}>
		<textarea
			bind:value={input}
			name="prompt"
			style="resize: none;"
			class="px-2"
			id="prompt"
			rows="5"
			maxlength="80"
		/>

		<input type="number" name="level" hidden value={selectedLevel} />
		<div class="d-flex justify-content-end">
			<button class="btn btn-primary w-25 my-2" type="submit">Submit</button>
		</div>
	</form>

	<textarea
		placeholder="LLM output"
		class={`w-100 px-2 ${attackSuccess ? 'text-white bg-success' : 'text-black bg-light'}`}
		rows="10"
		style="resize: none;"
		readonly>{result}</textarea
	>
</div>
