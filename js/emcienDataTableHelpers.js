window.Emcien = window.Emcien || {};
window.Emcien.DataTableHelpers = (function () {
  var _dataTable = $('#data-table');

  var _categoryOutcomeImpacts = function (data) {
    return $.map(data, function (elem) {
      return elem.category_outcome_impact
    });
  };

  var _categoryOutcomeImpactsHtml = function (impacts) {
    var str = '<tr><td class="text-center active">Impact</td>';
    $.each(impacts, function (i, name) {
      str += '<td>' + name + '</td>';
    });
    str += '</tr>';
    return str

  };

  var _driverNames = function (data) {
    return $.map(data, function (elem) {
      return elem.category_name
    });
  };

  var _driverNamesHtml = function (names) {
    var str = '<tr class="active"><th></th>';
    $.each(names, function (i, name) {
      str += '<th>' + name + '</th>';
    });
    str += '</tr>';
    return str
  };

  var _itemDrivers = function (data) {
    return $.map(data, function (elem) {
      return [elem.top_item_drivers];
    });
  };

  var _itemDriverRowsHtml = function (itemDrivers) {
    var str = '';
    for (var x = 0; x < 5; x++) {
      str += '<tr><td class="text-center active">' + (x + 1) + '</td>';
      for (var y = 0; y < itemDrivers.length; y++) {
        var topDrivers = itemDrivers[y] || [];
        var topDriver = topDrivers[x] || {};
        var itemName = topDriver.item_name || '';
        str += '<td>' + itemName + '</td>';
      }
      str += '</tr>';
    }
    return str;
  };

  return {
    clearDataTable: function () {
      _dataTable
        .find('tr')
        .remove()
    },
    renderDriverNames: function (data) {
      var names = _driverNames(data);
      var html = _driverNamesHtml(names);
      _dataTable
        .find('thead')
        .append(html);
    },
    renderImpactRow: function (data) {
      var categoryOutcomeImpacts = _categoryOutcomeImpacts(data);
      var html = _categoryOutcomeImpactsHtml(categoryOutcomeImpacts);
      _dataTable
        .find('tbody')
        .append(html);
    },
    renderItemDriverRows: function (data) {
      var itemDrivers = _itemDrivers(data);
      var html = _itemDriverRowsHtml(itemDrivers);
      _dataTable
        .find('tbody')
        .append(html)
    }
  }
})();
