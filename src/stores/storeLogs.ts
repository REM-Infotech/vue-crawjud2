import { defineStore } from "pinia";
import { ref } from "vue";

export default defineStore("storeLog", () => {
  const logRef = ref<Array<string>>([]);
  function addLog(new_Log: string) {
    logRef.value.push(new_Log);
  }

  return { logRef, addLog };
});
