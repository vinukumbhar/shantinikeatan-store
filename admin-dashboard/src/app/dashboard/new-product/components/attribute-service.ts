import api from "@/lib/axios";

export interface MasterOption {
  id: number | string;
  name: string;
}

export interface AttributeValueOption extends MasterOption {
  attributeId: number | string;
}

export interface MasterData {
  attributes: MasterOption[];
  attributeValues: AttributeValueOption[];
}

export const masterService = {
  async getAttributeMaster(): Promise<MasterData> {
    const { data } = await api.get("/masters/attribute");
    return data;
  },
};