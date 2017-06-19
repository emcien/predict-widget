window.Emcien = window.Emcien || {};
window.Emcien.OutcomeOptionsHelpers = (function () {
  var _outcomeSelect = $('#outcome-select');

  var _buildOutcomeOption = function (item) {
    return $('<option>', {
      value: item.id,
      text: item.item_identifier
    });
  };

  return {
    setOutcomeOptions: function (outcomes) {
      _outcomeSelect.append('<option value="" disabled selected hidden>Select One</option>');
      $.each(outcomes, function (i, item) {
        var option = _buildOutcomeOption(item);
        _outcomeSelect.append(option);
      });
    },
    clearOutcomeOptions: function () {
      _outcomeSelect
        .find('option')
        .remove();
    }
  }
})();
