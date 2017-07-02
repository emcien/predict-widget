window.Emcien = window.Emcien || {};
window.Emcien.ConfigForm = (function () {
  /**
   * Selector for the config form
   * @type {jQuery}
   * @private
   */
  var _configForm = $('#config-form');

  return {
    /**
     * Retrieves the values of the form inputs and returns them
     * @returns Object with values from the form
     */
    extractConfigFormVals: function () {
      var inputs = _configForm.find('input');
      var vals = {};
      inputs.each(function () {
        vals[this.name] = $(this).val()
      });
      return vals;
    }
  }
})();
