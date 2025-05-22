import { io } from "@/renderer";
import type { TUploadableFile } from "@/types/FormBot";
import { computed, reactive, ref, type Ref } from "vue";

const xlsx_file = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
const id = crypto.randomUUID();
/**
 * Represents a collection of `File` objects and provides utility methods
 * for managing and filtering files before uploading.
 *
 * @remarks
 * This class is designed to help manage file uploads by ensuring that only
 * unique files (by name and type) are added to a target collection.
 *
 * @example
 * ```typescript
 * const fileCollection = new FileCollection(files);
 * const uniqueFiles = fileCollection.addUniqueFiles(targetFilesRef);
 * ```
 */
class FileCollection {
  private files: File[];

  constructor(files: File[]) {
    this.files = files;
  }

  /**
   * Adds unique files from the current instance's `files` array to the provided `targetFilesRef`.
   * A file is considered unique if it does not already exist in `targetFilesRef` by name or type.
   * Returns an array of the newly added `TUploadableFile` instances.
   *
   * @param targetFilesRef - A Vue ref containing the current list of uploadable files.
   * @returns An array of `TUploadableFile` objects that were newly added.
   */
  addUniqueFiles({
    targetFilesRef,
    percentCounter,
  }: {
    targetFilesRef: Ref<TUploadableFile[]>;
    percentCounter: Ref<number>;
  }): TUploadableFile[] {
    const newFiles: TUploadableFile[] = [];
    const existingFiles = [...targetFilesRef.value];
    percentCounter.value = 0;
    for (let i = 0, len = this.files.length; i < len; i++) {
      const file = this.files[i];

      if (FileCollection.existsByName(file, existingFiles)) {
        setTimeout(() => {
          const new_Value = ((i + 1) / this.files.length) * 100;
          percentCounter.value = new_Value;
        }, 500);
      }

      if (
        !FileCollection.existsByName(file, existingFiles) &&
        !FileCollection.existsByXlsType({ file, files: existingFiles })
      ) {
        const uploadable = new UploadableFile(file);
        newFiles.push(uploadable);
        existingFiles.push(uploadable);

        io.emit("add_file", { file: uploadable, id_temp: id }, () => {
          const new_Value = ((i + 1) / this.files.length) * 100;
          percentCounter.value = new_Value;
        });
      }
    }
    return newFiles;
  }

  static existsByXlsType({ file, files }: { file: File; files: TUploadableFile[] }): boolean {
    return files.some((f) => f.type === file.type && file.type === xlsx_file);
  }

  static existsByName(file: File, files: TUploadableFile[]) {
    return files.some((f) => f.name === file.name);
  }
}

/**
 * Represents a file that can be uploaded, encapsulating its metadata and upload status.
 *
 * @remarks
 * This class wraps a native `File` object and provides additional properties
 * such as a unique identifier, a temporary URL for preview, and upload status tracking.
 *
 * @property file - The original `File` object to be uploaded.
 * @property name - The name of the file.
 * @property id - A unique identifier for the file, generated from its properties.
 * @property url - A temporary object URL for previewing the file.
 * @property status - The current upload status of the file, or `null` if not set.
 * @property type - The MIME type of the file.
 *
 * @example
 * ```typescript
 * const file = new File(["content"], "example.txt", { type: "text/plain" });
 * const uploadable = new UploadableFile(file);
 * console.log(uploadable.url); // Blob URL for preview
 * ```
 */
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

/**
 * Provides reactive file selection logic for a list of uploadable files.
 *
 * @param params - An object containing a `files` ref, which is a reactive array of `TUploadableFile` objects.
 * @returns An object with the following properties and methods:
 * - `selectedFiles`: A ref containing the names of currently selected files.
 * - `allSelected`: A computed boolean indicating if all files are selected.
 * - `toggleSelectAll`: Toggles selection of all files.
 * - `updateSelection`: Updates the selection state of a single file by name.
 * - `removeSelectedFiles`: Removes all currently selected files from the list.
 */
function useFileSelection({ files }: { files: Ref<TUploadableFile[]> }) {
  const selectedFiles = ref<string[]>([]);
  const allSelected = computed(
    () => files.value.length > 0 && selectedFiles.value.length === files.value.length,
  );

  function toggleSelectAll(): void {
    selectedFiles.value = allSelected.value ? [] : files.value.map((f) => f.name);
  }

  function updateSelection(fileName: string, selected: boolean) {
    if (selected) {
      if (!selectedFiles.value.includes(fileName)) selectedFiles.value.push(fileName);
    } else {
      selectedFiles.value = selectedFiles.value.filter((name) => name !== fileName);
    }
  }

  function removeSelectedFiles() {
    selectedFiles.value.forEach((fileName) => {
      const index = files.value.findIndex((file) => file.name === fileName);

      if (index !== -1) {
        const file = files.value[index];
        io.emit("remove_file", { temp_id: id, file: file });
        files.value.splice(index, 1);
      }
    });
    selectedFiles.value = [];
  }

  return {
    selectedFiles,
    allSelected,
    toggleSelectAll,
    updateSelection,
    removeSelectedFiles,
  };
}

// Domain: File Upload
/**
 * Composable function to handle file uploads and manage file collections.
 *
 * @param params - An object containing:
 *   @param files - A Vue ref holding the current list of uploadable files.
 *   @param formBotFiles - An array representing the files associated with the form.
 * @returns An object with an `addFiles` method to append unique files to both `files` and `formBotFiles`.
 *
 * @example
 * const { addFiles } = useFileUpload({ files, formBotFiles });
 * addFiles(selectedFiles);
 */
function useFileUpload({
  files,
  formBotFiles,
  percentProgress,
}: {
  files: Ref<TUploadableFile[]>;
  formBotFiles: TUploadableFile[];
  percentProgress: Ref<number>;
}): { addFiles: (filesAppend: File[]) => void } {
  const addFiles = (filesAppend: File[]) => {
    console.log(percentProgress.value);
    const filesListable = new FileCollection(filesAppend);
    const filesPush = filesListable.addUniqueFiles({
      targetFilesRef: files,
      percentCounter: percentProgress,
    });
    files.value.push(...filesPush);
    formBotFiles.push(...filesPush);
  };

  return { addFiles };
}

// Domain: Form State
/**
 * Composable function to manage form state in a Vue component.
 *
 * @returns An object containing reactive references and computed properties for form state management:
 * - `status`: A `Ref<boolean>` indicating the current status.
 * - `selected`: A `Ref<any>` for the first selected value.
 * - `selected2`: A `Ref<any>` for the second selected value.
 * - `nextPage`: A `Ref<boolean>` indicating if the next page is active.
 * - `disabledStatus`: A `ComputedRef<boolean>` with getter and setter to control the disabled state.
 * - `variantComputed`: A `ComputedRef<string>` that returns the button variant based on the disabled state.
 */
function useFormState() {
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

  const variantComputed = computed(() => (disabledStatus.value ? "outline-secondary" : "success"));

  return {
    status,
    selected,
    selected2,
    nextPage,
    disabledStatus,
    variantComputed,
  };
}

// Composition Root
/**
 * Composable function that provides reactive state and utilities for managing a file upload form.
 *
 * @returns An object containing:
 * - `formState`: Reactive form state and validation helpers.
 * - `fileSelection`: Utilities for selecting and managing files.
 * - `fileUpload`: Utilities for uploading files and tracking upload state.
 * - `variant`: Computed button variant based on file selection.
 * - `FormBot`: Reactive object holding the current files for the form.
 * - `files`: Reactive array of uploadable files.
 *
 * @remarks
 * This composable integrates file selection, upload logic, and form state management for use in resource bot forms.
 */
export default function useFormConfig() {
  const files = ref<TUploadableFile[]>([]);
  const percentProgress = ref(0);
  const FormBot = reactive({ files: [] as TUploadableFile[] });

  const fileSelection = useFileSelection({ files });
  const fileUpload = useFileUpload({
    files,
    formBotFiles: FormBot.files,
    percentProgress: percentProgress,
  });
  const formState = useFormState();

  const variant = computed(() =>
    fileSelection.allSelected.value ? "outline-warning" : "outline-primary",
  );

  return {
    ...formState,
    ...fileSelection,
    ...fileUpload,
    variant,
    FormBot,
    files,
    percentProgress,
  };
}
