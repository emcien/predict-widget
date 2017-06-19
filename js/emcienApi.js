window.Emcien = window.Emcien || {};
window.Emcien.Api = (function () {

  // START Private Methods
  var _defaultAjaxSettings = {
    accepts: 'application/json',
    cache: false,
    type: 'GET'
  };

  var _reportOutcomesUrl = function (instanceUrl, reportId) {
    return 'https://' + instanceUrl + '/api/v1/reports/' + reportId + '/outcomes'
  };

  var _reportOutcomeCategoriesUrl = function(instanceUrl, reportId, outcomeId) {
    return 'https://' + instanceUrl + '/api/v1/reports/' + reportId + '/outcomes/' + outcomeId + '/categories'
  };

  // END Private Methods

  return {
    reportOutcomes: function (params) {
      var additionalSettings = {
        error: params.errorCb,
        headers: { Authorization: params.apiKey },
        success: params.successCb,
        url: _reportOutcomesUrl(params.instanceUrl, params.reportId)
      };

      var ajaxSettings = $.extend({}, _defaultAjaxSettings, additionalSettings);

      $.ajax(ajaxSettings);
    },

    reportOutcomeCategories: function (params) {
      var additionalSettings = {
        error: params.errorCb,
        headers: { Authorization: params.apiKey },
        success: params.successCb,
        url: _reportOutcomeCategoriesUrl(params.instanceUrl, params.reportId, params.outcomeId)
      };

      var ajaxSettings = $.extend({}, _defaultAjaxSettings, additionalSettings);

      $.ajax(ajaxSettings);
    }
  }
})();
