<script lang="ts">
    import "./textInputField.scss";

    export let isTextarea: boolean = false;
    export let required: boolean = false;
    export let value: string = '';
    export let name: string;
    export let label: string;
</script>

<div class="input-field">
    <label for={name} class="form-label" class:active={value}>{label}</label>
    {#if isTextarea}
        <textarea id={name} required={required} bind:value name={name} class="form-control" rows="6" />
    {:else}
        <input id={name} required={required} name={name} bind:value class="form-control" type="text" />
    {/if}
    <span class="clear-button" on:click={()=>{value=''}} class:showClear={value.length > 0}>&times;</span>
</div>
