<template>
  <v-main>
    <!-- Welcome title -->
    <v-container fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" align="center" justify="center">
          <blockquote>
            Welcome {{validUserName}}!
            <footer>
              <small>
                <em>&mdash; Every great film should seem new every time you see it. - Roger Ebert</em>
              </small>
            </footer>
          </blockquote>
        </v-col>
        <v-col  cols="12" md="10" lg="10" align="center" justify="center">
          <v-alert v-if="showMsg === 'new'"
                   dismissible
                   :value="true"
                   type="success"
          >
            New movie has been added.
          </v-alert>
          <v-alert v-if="showMsg === 'update'" dismissible
                   :value="true"
                   type="success"
          >
            Movie information has been updated.
          </v-alert>
          <v-alert v-if="showMsg === 'deleted'" dismissible
                   :value="true"
                   type="success"
          >
            Selected Movie has been deleted.
          </v-alert>
        </v-col>
      </v-row>

      <!-- Data table -->
      <v-row align="center" justify="center">
        <v-col cols="12" md="10" v-resize="onResize">
            <v-data-table
              :headers="headers"
              :items="customers"
              class="elevation-1"
              style="max-height: 300px; overflow-y: auto"
              v-if="isMobile"
            >
                    <template v-slot:item="props">
                      <tr>
                        <td align="left">{{ props.item.name }}</td>
                        <td align="left">{{ props.item.address }}</td>
                        <td align="left">{{ props.item.cust_number }}</td>
                        <td align="left">{{ props.item.city }}</td>
                        <td align="left">{{ props.item.state }}</td>
                        <td align="left">{{ props.item.zipcode }}</td>
                        <td align="left">{{ props.item.email }}</td>
                        <td align="left">{{ props.item.cell_phone }}</td>
                        <td  @click="updateCustomers(props.item)" align="center"><v-icon >mdi-pencil</v-icon></td> <!-- [@click="updateCustomers(props.item)"] -->
                        <td @click="deleteCustomer(props.item)" align="center"><v-icon >mdi-delete</v-icon></td> <!-- [@click="deleteCustomer(props.item)"] -->
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
                              <v-icon @click="updateCustomers(item)" class="small">mdi-pencil</v-icon> <!-- [@click="updateCustomers(item)"] -->
                              <v-icon @click="deleteCustomer(item)" class="small">mdi-delete</v-icon> <!-- [@click="deleteCustomer(item)"] -->
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
              <v-btn class="blue mt-4 white--text" @click="addNewCustomer" >Add Customer</v-btn>  <!-- [@click="addNewMovie"] -->
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
    name: "CustomerList",
    data: () => ({
      customers: [],
      validUserName: "Guest",
      customerSize: 0,
      showMsg: '',
      isMobile: false,
      headers: [
        {text: 'Name', sortable: false, align: 'left'},
        {text: 'Address', sortable: false, align: 'left',},
        {text: 'Customer Number', sortable: false, align: 'left',},
        {text: 'City', sortable: false, align: 'left',},
        {text: 'State', sortable: false, align: 'center',},
        {text: 'Zipcode', sortable: false, align: 'center',},
        {text: 'Email', sortable: false, align: 'center',},
        {text: 'Cell Phone', sortable: false, align: 'center',},
        {text: 'Update Customer', sortable: false, align: 'center',},
        {text: 'Delete Customer', sortable: false, align: 'center',},
      ],

    }),
    mounted() {
      this.getCustomers();
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
      getCustomers() {
        apiService.getCustomerList().then(response => {
          this.customers = response.data.data;
          console.log(response.data.data);
          console.log(response.data);
          this.customerSize = this.customers.length;
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
      addNewCustomer() {
        if (localStorage.getItem("isAuthenticates")
          && JSON.parse(localStorage.getItem("isAuthenticates")) === true) {
          router.push('/customer-create');
        } else {
          router.push("/auth");
        }
      },
      updateCustomers(customer) {
        router.push('/customer-update/' + customer.pk);
      },
      deleteCustomer(customer) {
        apiService.deleteCustomer(customer.pk).then(response => {
          if (response.status === 204) {
            router.push('/customer-list/')
            this.getCustomers()
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
