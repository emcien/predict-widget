window.Emcien = window.Emcien || {};
window.Emcien.Prediction = (function () {

  var _setTableValues = function (data) {
    window.Emcien.DataTableHelpers.renderDriverNames(data);
    window.Emcien.DataTableHelpers.renderImpactRow(data);
    window.Emcien.DataTableHelpers.renderItemDriverRows(data);
  };

  return {
    submitConfigForm: function () {
      window.Emcien.DataTableHelpers.clearDataTable();
      window.Emcien.OutcomeOptionsHelpers.clearOutcomeOptions();
      var apiOptions = $.extend({
        successCb: function (data) {
          window.Emcien.OutcomeOptionsHelpers.setOutcomeOptions(data.data);
        },
        errorCb: function (error) {
          alert('Error:' + error);
        }
      }, window.Emcien.ConfigFormHelpers.extractConfigFormVals());

      window.Emcien.Api.reportOutcomes(apiOptions);
    },

    changeOutcome: function (select) {
      window.Emcien.DataTableHelpers.clearDataTable();
      var apiOptions = $.extend({
        outcomeId: $(select).val(),
        successCb: function (data) {
          _setTableValues(data);
        },
        errorCb: function (error) {
          // TODO: Clear the table
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
      }, window.Emcien.ConfigFormHelpers.extractConfigFormVals());
      window.Emcien.Api.reportOutcomeCategories(apiOptions)
    }
  }
})();
