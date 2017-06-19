window.Emcien = window.Emcien || {};
window.Emcien.ConfigFormHelpers = (function () {
  var _configForm = $('#config-form');

  return {
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
