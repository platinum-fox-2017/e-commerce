<template>
  <div>
    <!-- Modal -->
    <div class="modal fade" id="myModal" role="dialog">
      <div class="modal-dialog">

        <!-- Modal content-->
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal">&times;</button>
            <h4 class="modal-title">Buy This Product</h4>
            <p>product: {{ product }}</p>
          </div>
          <div class="modal-body">
            <form class="form-horizontal">
              <div class="form-group">
                <label for="disabledInput" class="col-sm-3 control-label">Name : </label>
                <div class="col-sm-9">
                  <input class="form-control" id="disabledInput" type="text" :value="product.name" disabled>
                </div>
                <label for="disabledInput" class="col-sm-3 control-label">Price ($): </label>
                <div class="col-sm-9">
                  <input class="form-control" id="disabledInput" type="text" :value="product.price" disabled>
                </div>
                <label for="disabledInput" class="col-sm-3 control-label">Category: </label>
                <div class="col-sm-9">
                  <input class="form-control" id="disabledInput" type="text" :value="product.category" disabled>
                </div>
                <label for="focusedInput" class="col-sm-3 control-label">Qty : </label>
                <div class="col-sm-9">
                  <input class="form-control" id="focusedInput" type="text" value=1>
                </div>
              </div>
            </form>

          </div>
          <div class="modal-footer">
            <router-link to="/checkout">
              <a class="btn btn-success" style="float: right">
                <span class="fa fa-shopping-cart"> Buy This Product</span>
              </a>
            </router-link>
            <button type="button" class="btn btn-default" style="float: left" data-dismiss="modal">Close</button>
          </div>
        </div>

      </div>
    </div>
    <!-- End of Modal -->
  </div>
</template>

<script>
  export default {
    props: ['product', 'item', 'row']
  }

</script>

<style>


</style>
