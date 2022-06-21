var appsidebarInit = false;
var headerdropdownlistInit = false;
var notificationsmenuInit = false;
var messagemenuscrollInit = false;
var contentscrollInit = false;
var content1scrollInit = false;
var sidebarrightscrollInit = false;


var timerCheckerRefresh;

(function($) {
    "use strict";

    timerCheckerRefresh = setInterval(() => {

        if (appsidebarInit == false) {
            if ($('.app-sidebar') != undefined && $('.app-sidebar').length > 0) {
                appsidebarInit = true;

                const ps = new PerfectScrollbar('.app-sidebar', {
                    useBothWheelAxes: true,
                    suppressScrollX: true,
                    suppressScrollY: false,
                });
            }
        }

        if (headerdropdownlistInit == false) {
            if ($('.header-dropdown-list') != undefined && $('.header-dropdown-list').length > 0) {
                headerdropdownlistInit = true;

                const ps1 = new PerfectScrollbar('.header-dropdown-list', {
                    useBothWheelAxes: true,
                    suppressScrollX: true,
                    suppressScrollY: false,
                });
            }
        }

        if (notificationsmenuInit == false) {
            if ($('.notifications-menu') != undefined && $('.notifications-menu').length > 0) {
                notificationsmenuInit = true;

                const ps2 = new PerfectScrollbar('.notifications-menu', {
                    useBothWheelAxes: true,
                    suppressScrollX: true,
                    suppressScrollY: false,
                });
            }
        }

        if (messagemenuscrollInit == false) {
            if ($('.message-menu-scroll') != undefined && $('.message-menu-scroll').length > 0) {
                messagemenuscrollInit = true;

                const ps3 = new PerfectScrollbar('.message-menu-scroll', {
                    useBothWheelAxes: true,
                    suppressScrollX: true,
                    suppressScrollY: false,
                });
            }
        }

        if (contentscrollInit == false) {
            if ($('.content') != undefined && $('.content').length > 0) {
                contentscrollInit = true;

                const ps5 = new PerfectScrollbar('.content', {
                    useBothWheelAxes: true,
                    suppressScrollX: true,
                });
            }
        }

        if (content1scrollInit == false) {
            if ($('.content-1') != undefined && $('.content-1').length > 0) {
                content1scrollInit = true;

                const ps6 = new PerfectScrollbar('.content-1', {
                    useBothWheelAxes: true,
                    suppressScrollX: true,
                });
            }
        }

        if (sidebarrightscrollInit == false) {
            if ($('.sidebar-right') != undefined && $('.sidebar-right').length > 0) {
                sidebarrightscrollInit = true;
                const ps11 = new PerfectScrollbar('.sidebar-right', {
                    useBothWheelAxes: true,
                    suppressScrollX: true,
                });
            }
        }

        //console.log('irq');
    }, 1000);

    //P-scrolling

})(jQuery);