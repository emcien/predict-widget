window.Emcien = window.Emcien || {};
window.Emcien.Api = (function () {

  /**
   * Default settings for API calls
   * @type {{accepts: string, cache: boolean, type: string}}
   * @private
   */
  var _defaultAjaxSettings = {
    accepts: 'application/json',
    cache: false,
    type: 'GET'
  };

  /**
   * Takes a host/url and ensures that it has a protocol prefix
   * @param {string} instanceHost User provided host/url
   * @returns {string} URL with guaranteed protocol
   * @private
   */
  var _withUrlProtocol = function(instanceHost) {
    if (instanceHost.startsWith('http')) {
      return instanceHost
    } else {
      return 'https://' + instanceHost;
    }
  };

  /**
   * Generates the API URL for the Report Outcomes endpoint
   * @param instanceHost Emcien Instance Host
   * @param reportId Emcien Report ID
   * @returns {string} URL for endpoint
   * @private
   */
  var _reportOutcomesUrl = function (instanceHost, reportId) {
    return _withUrlProtocol(instanceHost) + '/api/v1/reports/' + reportId + '/outcomes?size=100'
  };

  /**
   * Generates the API URL for the Report Outcome Categories URL
   * @param instanceHost Emcien Instance Host
   * @param reportId Emcien Report ID
   * @param outcomeId Emcien Outcome ID
   * @returns {string} URL for endpoint
   * @private
   */
  var _reportOutcomeCategoriesUrl = function(instanceHost, reportId, outcomeId) {
    return _withUrlProtocol(instanceHost) + '/api/v1/reports/' + reportId + '/outcomes/' + outcomeId + '/categories?sort=-category_outcome_impact'
  };

  return {
    /**
     * API call for the report Outcomes
     * @param {Object} params Options for API call
     * @param {function} params.errorCb - Callbuck function if the API errors
     * @param {function} params.successCb - Callbuck function if the API succeeds
     * @param {string} params.apiKey - Key for Emcien API
     * @param {string} params.instanceHost - Instance host to call
     * @param {string} params.reportId - Report ID for API call
     */
    reportOutcomes: function (params) {
      var additionalSettings = {
        error: params.errorCb,
        headers: { Authorization: params.apiKey },
        success: params.successCb,
        url: _reportOutcomesUrl(params.instanceHost, params.reportId)
      };

      var ajaxSettings = $.extend({}, _defaultAjaxSettings, additionalSettings);

      $.ajax(ajaxSettings);
    },

    /**
     * API call for the Report Outcomes Categories
     * @param {Object} params Options for API call
     * @param {function} params.errorCb - Callbuck function if the API errors
     * @param {function} params.successCb - Callbuck function if the API succeeds
     * @param {string} params.apiKey - Key for Emcien API
     * @param {string} params.instanceHost - Instance host to call
     * @param {string} params.reportId - Report ID for API call
     * @param {string} params.outcomeId - Outcome ID for API call
     */
    reportOutcomeCategories: function (params) {
      var additionalSettings = {
        error: params.errorCb,
        headers: { Authorization: params.apiKey },
        success: params.successCb,
        url: _reportOutcomeCategoriesUrl(params.instanceHost, params.reportId, params.outcomeId)
      };

      var ajaxSettings = $.extend({}, _defaultAjaxSettings, additionalSettings);

      $.ajax(ajaxSettings);
    }
  }
})();
