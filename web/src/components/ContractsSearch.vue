<template>
  <v-container fluid>
    <v-col align="center">
      <h3 class="mb-4">Заключенные договоры</h3>
      <v-card style="padding-bottom: 10px">
        <v-data-table
          :headers="[
            { text: 'Номер', value: 'number' },
            { text: 'Описание', value: 'description' },
            { text: 'Платеж', value: 'payment' },
          ]"
          :items="contracts">
          <template #item.payment="{ item }">
            <span>{{ +item.firstPayment + +item.lastPayment }}</span>
          </template>
        </v-data-table>
        <v-btn @click="openContractForm">Добавить контракт</v-btn>
        <v-dialog v-model="contractFormDialog" max-width="500">
          <v-card>
            <v-card-title> Новый контракт </v-card-title>
            <v-card-text>
              <v-form @submit.prevent="submitContract">
                <v-text-field
                  v-model="newContract.number"
                  label="Номер"></v-text-field>
                <v-text-field
                  v-model="newContract.description"
                  label="Описание"></v-text-field>
                <v-text-field
                  v-model="newContract.firstPayment"
                  label="Первый платеж"></v-text-field>
                <v-text-field
                  v-model="newContract.lastPayment"
                  label="Последний платеж"></v-text-field>
                <v-btn type="submit">Добавить</v-btn>
              </v-form>
            </v-card-text>
          </v-card>
        </v-dialog>
      </v-card>
    </v-col>
  </v-container>
</template>
<script>
import { ContractsAPI } from "@/api/contracts-api";

export default {
  name: "ContractsSearch",

  data() {
    return {
      contractsLoading: false,
      contracts: [],
      contractFormDialog: false,
      newContract: {
        number: "",
        description: "",
        firstPayment: "",
        lastPayment: "",
      },
    };
  },
  async created() {
    await this.loadContracts();
  },
  methods: {
    openContractForm() {
      this.contractFormDialog = true;
    },
    async loadContracts() {
      this.contractsLoading = true;
      try {
        this.contracts = await ContractsAPI.getContracts();
      } catch (e) {
        console.log(e);
      } finally {
        this.contractsLoading = false;
      }
    },
    async submitContract() {
      try {
        await ContractsAPI.submitContract(this.newContract);
        this.contractFormDialog = false;
        await this.loadContracts();
        this.newContract = {
          number: "",
          description: "",
          firstPayment: "",
          lastPayment: "",
        };
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
<style scoped></style>
