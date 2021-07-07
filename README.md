<table class="table" >
  <thead class="thead-dark">
    <tr>
      <th scope="col">No</th>
      <th scope="col">Name</th>
      <th scope="col" v-on:click="changeOrder">Point</th>
    </tr>
  </thead>
  <tbody v-for="leader in data_leader" v-if="!data_search.length">
    <tr>
      <th scope="row">{{data_leader.indexOf(leader) + 1}}</th>
      <td >{{leader.name}}</td>
      <td>{{leader.point}}</td>
    </tr>
  </tbody>
  <tbody v-for="leader in data_search" v-if="data_search.length">
    <tr>
      <th scope="row">{{data_search.indexOf(leader) + 1}}</th>
      <td >{{leader.name}}</td>
      <td>{{leader.point}}</td>
    </tr>
  </tbody>

</table>
