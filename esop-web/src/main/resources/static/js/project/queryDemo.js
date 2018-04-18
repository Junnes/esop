require.config({
    paths: {
      //公共js
        'jquery': '../lib/jquery-1.10.2.min',
        'commonData': '../dataController/commonData',
        'common': '../common/common',
        'Module': '../components/Module',
      //组件js
        'form': '../components/form/form',
        'forms': '../components/forms/forms',
        "table": "../components/table/table",
        'TurnPage': '../lib/turnpage',
        "turnPage": '../components/turnPage/turnPage',
        "dateTimePicker": '../lib/jquery.datetimepicker',
        "date": '../components/date/date',
        "dateRange": '../components/dateRange/dateRange',
      //业务js
        'queryDemoBusi': '../businessController/queryDemoBusi',
    }
});
require(['Module', 'jquery', 'queryDemoBusi', 'TurnPage'], function(Module, $, queryDemoBusi, TurnPage) {
    
});