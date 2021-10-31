<template>
  <v-main>
    <!-- Welcome title -->
    <v-container fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" align="center" justify="center">
          <blockquote>
            Welcome {{validUserName}}!
          </blockquote>
        </v-col>
        <v-col  cols="12" md="10" lg="10" align="center" justify="center">
          <v-alert v-if="showMsg === 'new'"
                   dismissible
                   :value="true"
                   type="success"
          >
            New stock has been added.
          </v-alert>
          <v-alert v-if="showMsg === 'update'" dismissible
                   :value="true"
                   type="success"
          >
            Stock information has been updated.
          </v-alert>
          <v-alert v-if="showMsg === 'deleted'" dismissible
                   :value="true"
                   type="success"
          >
            Selected Stock has been deleted.
          </v-alert>
        </v-col>
      </v-row>

      <!-- Data table -->
      <v-row align="center" justify="center">
        <v-col cols="12" md="10" v-resize="onResize">
            <v-data-table
              :headers="headers"
              :items="stocks"
              class="elevation-1"
              style="max-height: 300px; overflow-y: auto"
              v-if="isMobile"
            >
                    <template v-slot:item="props">
                      <tr>
                        <td align="left">{{ props.item.cust_number }}</td>
                        <td align="left">{{ props.item.symbol }}</td>
                        <td align="left">{{ props.item.name }}</td>
                        <td align="left">{{ props.item.shares }}</td>
                        <td align="left">{{ props.item.purchase_price }}</td>
                        <td align="left">{{ props.item.purchase_date }}</td>
                        <td  @click="updateStock(props.item)" align="center"><v-icon >mdi-pencil</v-icon></td> <!-- [@click="updateStock(props.item)"] -->
                        <td @click="deleteStock(props.item)" align="center"><v-icon >mdi-delete</v-icon></td> <!-- [@click="deleteStock(props.item)"] -->
                      </tr>  
                    </template>
              </v-data-table>
              <v-data-iterator 
                :items="movies"
                hide-default-footer
                v-else
              >
                <template v-slot:default="{ items, isExpanded, expand }">
                  <v-row>
                    <v-col
                      v-for="item in items"
                      :key="item.name"
                      cols="12"
                    >
                      <v-card>
                        <v-card-title class="pb-0 pt-0 pl-0">
                          <v-col cols="9" class="text-left body-2 text-truncate">{{ item.name }}</v-col>
                          <v-col cols="3" class="text-center">
                            <v-card-actions>
                              <v-icon @click="updateStock(item)" class="small">mdi-pencil</v-icon> <!-- [@click="updateStock(item)"] -->
                              <v-icon @click="deleteStock(item)" class="small">mdi-delete</v-icon> <!-- [@click="deleteStock(item)"] -->
                              <v-icon @click.native="expand(item, !isExpanded(item))" class="small">mdi-dots-horizontal</v-icon> <!-- [@click.native="expand(item, !isExpanded(item))"] -->
                            </v-card-actions>
                          </v-col>
                        </v-card-title>
                        <v-divider></v-divider>

                        <v-list v-show="isExpanded(item)" dense>
                          <v-list-item>
                            <v-list-item-content class="align-end">{{ item.description }}</v-list-item-content>
                          </v-list-item>
                          <v-list-item>
                            <v-list-item-content>Year:</v-list-item-content>
                            <v-list-item-content class="align-end">{{ item.year }}</v-list-item-content>
                          </v-list-item>
                          <v-list-item>
                            <v-list-item-content>Rating:</v-list-item-content>
                            <v-list-item-content class="align-end">{{ item.rating }}</v-list-item-content>
                          </v-list-item>
                        </v-list>
                      </v-card>
                    </v-col>
                  </v-row>
                </template>     
              </v-data-iterator>  
              <v-btn class="blue mt-4 white--text" @click="addNewStock" >Add Stock</v-btn>  <!-- [@click="addNewMovie"] -->
        </v-col>  
      </v-row>
    </v-container>  
  </v-main>
</template>


<script>

  import router from '../router';
  import {APIService} from '../http/APIService';
  const apiService = new APIService();

  export default {
    name: "StockList",
    data: () => ({
      stocks: [],
      validUserName: "Guest",
      stockSize: 0,
      showMsg: '',
      isMobile: false,
      headers: [
        {text: 'Customer Number', sortable: false, align: 'left',},
        {text: 'Symbol', sortable: false, align: 'left',},
        {text: 'Name', sortable: false, align: 'center',},
        {text: 'Shares', sortable: false, align: 'center',},
        {text: 'Purchase Price', sortable: false, align: 'center',},
        {text: 'Purchase Date', sortable: false, align: 'center',},
      ],

    }),
    mounted() {
      this.getStocks();
      this.showMessages();
    },
    methods: {
      onResize() {
          if (window.innerWidth > 600)
            this.isMobile = true;
          else  
            this.isMobile = false;
        },
      showMessages(){
        console.log(`hmm ${this.$route.params.msg}`)
        if (this.$route.params.msg) {
          this.showMsg = this.$route.params.msg;
        }
      },
      getStocks() {
        apiService.getStockList().then(response => {
          this.stocks = response.data.data;
          console.log(response.data.data);
          console.log(response.data);
          this.stockSize = this.stocks.length;
          if (localStorage.getItem("isAuthenticates")
            && JSON.parse(localStorage.getItem("isAuthenticates")) === true) {
            this.validUserName = JSON.parse(localStorage.getItem("log_user"));
          }
        }).catch(error => {
          if (error.response.status === 401) {
            localStorage.removeItem('isAuthenticates');
            localStorage.removeItem('log_user');
            localStorage.removeItem('token');
            router.push("/auth");
          }
        });
      },
      addNewStock() {
        if (localStorage.getItem("isAuthenticates")
          && JSON.parse(localStorage.getItem("isAuthenticates")) === true) {
          router.push('/stock-create');
        } else {
          router.push("/auth");
        }
      },
      updateStock(stock) {
        router.push('/stock-update/' + stock.pk);
      },
      deleteStock(stock) {
        apiService.deleteStock(stock.pk).then(response => {
          if (response.status === 204) {
            router.push('/stock-list/')
            this.getStocks()
          }
        }).catch(error => {
          if (error.response.status === 401) {
            localStorage.removeItem('isAuthenticates');
            localStorage.removeItem('log_user');
            localStorage.removeItem('token');
            router.push("/auth");
          }
        });
      }
    }
  };
</script>
