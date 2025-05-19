interface botRecord {
  id: string;
  display_name: string;
  system: string;
  state: string;
  client: string;
  type: string;
  form_cfg: string;
  classification: string;
  text: string;
  img_src?: string;
  img_width?: string;
  img_height?: string;
}

export type { botRecord };
