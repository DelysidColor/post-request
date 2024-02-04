import axios from "axios";

const contractsHost = axios.create({
  baseURL: "http://localhost:3000/",
});

export const ContractsAPI = {
  getContracts: async () => {
    const resp = await contractsHost.get("contracts");

    return resp.data;
  },

  submitContract: async (contractData) => {
    try {
      await contractsHost.post("contracts", contractData);
    } catch (error) {
      console.error(error);
    }
  },
};
