import type { TUploadableFile } from "@/types/FormBot";
import { computed, reactive, ref, type Ref } from "vue";

const xlsx_file = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

class UploadableFile {
  file: File;
  name: string;
  id: unknown;
  url: string;
  status: string | null;
  type: string;
  constructor(file: File) {
    this.file = file;
    this.name = file.name;
    this.id = `${file.name}-${file.size}-${file.lastModified}-${file.type}`;
    this.url = URL.createObjectURL(file);
    this.status = null;
    this.type = file.type;
  }
}

export default function () {
  const selectedFiles = ref<string[]>([]);
  const allSelected = computed(
    () => files.value.length > 0 && selectedFiles.value.length === files.value.length,
  );
  const FormBot = reactive({
    files: [],
  });
  const files = ref<TUploadableFile[]>([]);

  function addFiles(newFiles: File[], files: Ref<TUploadableFile[]>) {
    const toAppend = [...newFiles]
      .filter((file) => {
        if (file.type === xlsx_file && !xlsxfileExists(files)) {
          return true;
        } else if (!fileExists(file.name, files) && !checkXlsxType(file)) {
          return true;
        }
        return false;
      })
      .map((file) => new UploadableFile(file));

    return toAppend;
  }
  function checkXlsxType(file: File) {
    return file.type === xlsx_file;
  }

  function fileExists(otherName: string, files: Ref<TUploadableFile[]>) {
    return files.value.some(({ name }) => name === otherName);
  }

  function xlsxfileExists(files: Ref<TUploadableFile[]>) {
    return files.value.some(({ type }) => type === xlsx_file);
  }

  function toggleSelectAll() {
    if (allSelected.value) {
      selectedFiles.value = [];
    } else {
      selectedFiles.value = files.value.map((f) => f.name);
    }
  }

  function updateSelection(fileName: string, selected: boolean) {
    if (selected) {
      if (!selectedFiles.value.includes(fileName)) selectedFiles.value.push(fileName);
    } else {
      selectedFiles.value = selectedFiles.value.filter((name) => name !== fileName);
    }
  }
  const addfiles_ = (filesAppend: File[]) => {
    const filesPush = addFiles(filesAppend, files);

    FormBot.files.push(...filesPush);
    files.value.push(...filesPush);
  };

  function removeSelectedFiles() {
    selectedFiles.value.forEach((fileName) => {
      const index = files.value.findIndex((file) => file.name === fileName);
      if (index !== -1) {
        files.value.splice(index, 1);
      }
    });
    selectedFiles.value = [];
  }

  const status = ref(false);
  const selected = ref(null);
  const selected2 = ref(null);
  const nextPage = ref(false);
  const disabledStatus = computed({
    get: () => !status.value,
    set: (val: boolean) => {
      status.value = !!val;
      console.log(status.value);
    },
  });

  const variantComputed = computed(() => {
    return disabledStatus.value ? "outline-secondary" : "success";
  });

  const variant = computed(() => {
    return allSelected.value ? "outline-warning" : "outline-primary";
  });

  return {
    status,
    selected,
    selected2,
    nextPage,
    disabledStatus,
    variant,
    variantComputed,
    addFiles,
    removeSelectedFiles,
    addfiles_,
    updateSelection,
    toggleSelectAll,
    allSelected,
    selectedFiles,
    FormBot,
    files,
  };
}
