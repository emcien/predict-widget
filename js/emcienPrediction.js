window.Emcien = window.Emcien || {};
window.Emcien.Prediction = (function () {

  /**
   * Renders data into the table
   * @param {object} data Data returned by the API
   * @private
   */
  var _setTableValues = function (data) {
    Emcien.DataTableHelpers.renderDriverNames(data);
    Emcien.DataTableHelpers.renderImpactRow(data);
    Emcien.DataTableHelpers.renderItemDriverRows(data);
  };

  return {
    /**
     * Handles submission of the config form by clearing the table and the options dropdown.
     * Then it calls the API to get the outcomes and sets it in the UI.
     */
    handleConfigFormSubmit: function () {
      Emcien.DataTableHelpers.clearDataTable();
      Emcien.OutcomeOptionsHelpers.clearOutcomeOptions();
      var apiOptions = $.extend({
        successCb: function (data) {
          Emcien.OutcomeOptionsHelpers.setOutcomeOptions(data.data);
        },
        errorCb: function (error) {
          alert('Error:' + error);
        }
      }, Emcien.ConfigFormHelpers.extractConfigFormVals());

      Emcien.Api.reportOutcomes(apiOptions);
    },
    /**
     * Handler for the outcome dropdown. It clears the data table, makes an API call,
     * then sets values in the UI
     * @param {domElement} select The select element that created the change
     */
    handleOutcomeChange: function (select) {
      Emcien.DataTableHelpers.clearDataTable();
      var apiOptions = $.extend({
        outcomeId: $(select).val(),
        successCb: function (data) {
          _setTableValues(data);
        },
        errorCb: function (error) {
          var fakeData = [
            {
              "category_id": 1,
              "category_name": "Plasma glucose concentration 2",
              "category_outcome_impact": 5467.919675888159,
              "outcome_descriptor": "Yes",
              "outcome_id": 1,
              "top_item_drivers": [
                {
                  "item_id": 7219908,
                  "item_name": "Yes",
                  "impact_size": 122
                },
                {
                  "item_id": 7219909,
                  "item_name": "No",
                  "impact_size": 1000
                }
              ]
            },
            {
              "category_id": 1,
              "category_name": "Plasma glucose concentration",
              "category_outcome_impact": 5467.919675888159,
              "outcome_descriptor": "Yes",
              "outcome_id": 1,
              "top_item_drivers": [
                {
                  "item_id": 7219908,
                  "item_name": "Yes",
                  "impact_size": 122
                },
                {
                  "item_id": 7219909,
                  "item_name": "No",
                  "impact_size": 1000
                }
              ]
            },
            {
              "category_id": 1,
              "category_name": "Plasma glucose concentration",
              "category_outcome_impact": 5467.919675888159,
              "outcome_descriptor": "Yes",
              "outcome_id": 1,
              "top_item_drivers": [
                {
                  "item_id": 7219908,
                  "item_name": "Yes",
                  "impact_size": 122
                },
                {
                  "item_id": 7219909,
                  "item_name": "No",
                  "impact_size": 1000
                }
              ]
            }
          ];
          _setTableValues(fakeData);
          alert('Error:' + error.statusText);
          console.log(error);
        }
      }, Emcien.ConfigFormHelpers.extractConfigFormVals());
      Emcien.Api.reportOutcomeCategories(apiOptions)
    }
  }
})();
