<script>
import { resolveComponent, h } from "vue";
export default {
  render() {
    const docSearchComponentName = "DocSearch";
    const docSearch = resolveComponent(docSearchComponentName);
    if (docSearch !== docSearchComponentName) {
      return h(docSearch);
    }
    const searchComponentName = "SearchBox";
    const searchbox = resolveComponent("SearchBox");
    if (searchbox !== searchComponentName) {
      return h(searchbox);
    }
    return undefined;
  },
};
</script>
