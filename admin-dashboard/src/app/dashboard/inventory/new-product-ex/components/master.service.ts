import api from "@/lib/axios";



export interface MasterOption {
  id: number | string;
  name: string;
}



export interface AttributeValueOption extends MasterOption {
  attributeId: number | string;
}


export interface MasterData {
  categories: MasterOption[];
  brands: MasterOption[];
  units: MasterOption[];
  currencies: MasterOption[];
  attributes: MasterOption[];
  attributeValues: AttributeValueOption[];
}

export const masterService = {
  // Fetch all masters
  async getMasterData(): Promise<MasterData> {
    const { data } = await api.get("/masters");
    return data;
  },


};