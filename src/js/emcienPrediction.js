window.Emcien = window.Emcien || {};
window.Emcien.Prediction = (function () {
  return {
    /**
     * Handles submission of the config form by clearing the table and the options dropdown.
     * Then it calls the API to get the outcomes and sets it in the UI.
     */
    handleConfigFormSubmit: function () {
      Emcien.DataTable.clearDataTable();
      Emcien.OutcomeOptions.clearOutcomeOptions();
      var apiOptions = $.extend({
        successCb: function (data) {
          Emcien.OutcomeOptions.setOutcomeOptions(data.data);
        },
        errorCb: function (error) {
          alert('Error:' + error.statusText);
          console.log(error);
        }
      }, Emcien.ConfigForm.extractConfigFormVals());

      Emcien.Api.reportOutcomes(apiOptions);
    },
    /**
     * Handler for the outcome dropdown. It clears the data table, makes an API call,
     * then sets values in the UI
     * @param {domElement} select The select element that created the change
     */
    handleOutcomeChange: function (select) {
      Emcien.DataTable.clearDataTable();
      var apiOptions = $.extend({
        outcomeId: $(select).val(),
        successCb: function (data) {
          Emcien.DataTable.setTableValues(data.data);
        },
        errorCb: function (error) {
          alert('Error:' + error.statusText);
          console.log(error);
        }
      }, Emcien.ConfigForm.extractConfigFormVals());
      Emcien.Api.reportOutcomeCategories(apiOptions)
    }
  }
})();
