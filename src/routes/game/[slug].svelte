<script context="module" lang="ts">
  export async function load({ fetch, page }) {
    const { slug } = page.params;
    return { props: { slug } };
  }
</script>

<script lang="ts">
  import Room from "$components/Room.svelte";

  export let slug: string = "";
</script>

<Room name={slug} />

<style></style>
