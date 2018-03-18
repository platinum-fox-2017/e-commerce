window.Event = new Vue();

const Companies = {
  template: `
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Modal</th>
        </tr>
      </thead>
      <company v-for="item in companies" :key="item.id" :row="item"></company>
    </table>
  `,
  props: ['companies'],
};

const Company = {
  template: `
    <tr>
      <td v-text="row.name"></td>
      <td><a @click.prevent="toggleModal(row)" href="#">Open Modal</a></td>
    </tr>
  `,
  props: ['row'],
  methods: {
    toggleModal(row) {
      Event.$emit('toggleModal', row);
    }
  }
};

const Modal = {
  template: `
    <div class="modal" :class="{ 'is-active': active }">
      <div class="modal-background"></div>
        <div class="modal-content">
          <div class="box">
            <div class="content">
              <h1 class="title" v-text="modal.name"></h1>
            </div>
          </div>
        </div>
        <button @click.prevent="active = false" class="modal-close is-large" aria-label="close"></button>
    </div>
  `,
  data() {
    return {
      active: false,
      modal: false,
    }
  },
  methods: {
    show() {
      this.active = true;
    }
  },
  created() {
    Event.$on('toggleModal', (row) => {
      this.modal = row;
      this.show();
    });
  }
};


Vue.component('companies', Companies);
Vue.component('company', Company);
Vue.component('company-modal', Modal);


new Vue({
  el: '#app',
  data: {
    companies: [
      { id: 1, name: 'Company 1'},
      { id: 2, name: 'Company 2'},
      { id: 3, name: 'Company 3'},
      { id: 4, name: 'Company 4'},
    ],
  }
});