<script lang="ts">
    import "./textInputField.scss";
    import type { FormField } from "src/app.config";
    import { validate } from "../helpers";

    export let isTextarea: boolean = false;
    export let value: string = '';
    export let name: string;
    export let label: string;
    export let validation: FormField;
    
    const minLength: number = validation.minLength ?? 3;
    const required: boolean = validation.required ?? false;
    $:valid = validate(value, validation);
</script>

<div class="input-field">
    <label for={name} class="form-label {valid ? "valid" : "invalid"}" class:active={value} data-validation={`(min ${minLength})`}>{label}</label>
    {#if isTextarea}
        <textarea id={name} required={required} bind:value name={name} class="form-control" rows="6" />
    {:else}
        <input id={name} required={required} name={name} bind:value class="form-control" type="text" />
    {/if}
    <span class="clear-button" on:click={()=>{value=''}} class:showClear={value.length > 0}>&times;</span>
</div>
