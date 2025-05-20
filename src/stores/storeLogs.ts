import type { LogData } from "@/types/logsbot";
import { defineStore } from "pinia";
import { ref } from "vue";

export default defineStore("storeLog", () => {
  const logRef = ref<LogData[]>([]);
  const currentItem = ref<LogData>(null);
  const pid = ref("");
  function addLog(new_Log: LogData) {
    logRef.value.push(new_Log);
  }

  function catchNewValue(): LogData {
    const index = logRef.value.length - 1;
    return logRef.value[index];
  }

  function reset() {
    logRef.value = [];
  }

  return { logRef, addLog, catchNewValue, reset, currentItem, pid };
});
