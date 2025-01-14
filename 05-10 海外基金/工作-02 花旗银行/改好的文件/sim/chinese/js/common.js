
(function ($) {

    if (!mobile.detect() && !tablet.detect()) {
        document.write('<link rel="stylesheet" type="text/css" href="/views/css/browser.css">');
        document.write('<script src="/views/js/browser.js"></script>');

    }

    $.fn.setEqualHeight = function (ele) {
        var maxHeight = 0, maxElement = null;
        $(ele).css({
            "height": "auto"
        });
        $(ele).each(function () {
            if (($(this).height() + parseInt($(this).css("padding-bottom")) + parseInt($(this).css("padding-top"))) > maxHeight) {
                maxHeight = $(this).height() + parseInt($(this).css("padding-top")) + parseInt($(this).css("padding-bottom"));
                maxElement = this;
            }
        });
        $(ele).not($(maxElement)).each(function () {
            $(this).height(maxHeight - parseInt($(this).css("padding-top")) - parseInt($(this).css("padding-bottom")))
        });
    };

    $.fn.rgNavigation = function (options) {
        $('li > ul:not(.show)', this).hide();
        $('li > ul li a[class=sublistActive]', this).parents('ul').show().prev('a').addClass('listActive');
        $('li:has(ul)', this).addClass('accordionNavList');
        $('li:has(ul) > a, span', this).on('click.fndtn', function () {
            currentURL = document.location.href;
            gotoLink = $(this).attr('href');
            $(this).toggleClass('listActive');
            $(this).next('span.rightArrow').toggleClass('listActive');
            $(this).next('span.rightArrowSub').toggleClass('listActive');
            $(this).prev('a').toggleClass('listActive listActiveOnlyBold');
            $(this).siblings('ul').slideToggle('fast');
            $(this).parent().siblings('li').children('ul:visible').slideUp('fast')
                .parent('li').find('a, span').removeClass('listActive listActiveDown listActiveOnlyBold');
            if (currentURL.indexOf(gotoLink) != -1 && currentURL.indexOf('.htm') == -1) return false;
            else if (currentURL.indexOf(gotoLink) == -1 || currentURL.indexOf('.htm')) return true;
            else return false;
        });
    };

    $.fn.urlParam = function (name) {
        var results = new RegExp('[\\?&]' + name + '=([^&#]*)').exec(window.location.href);
        return results[1] || 0;
    }

    $.fn.preSelectLftNav = function (navTxt) {
        setTimeout(function () {
            $(".listActive").removeClass("listActive");
            $(".listActiveOnlyBold").removeClass("listActiveOnlyBold");


            var t = $("#leftNav a[title='" + navTxt + "']")

            if (!t.hasClass('hdLinks')) {
                var t = $("#leftNav a[title='" + navTxt + "']").attr({
                    "href": "javascript:;"
                }).addClass("listActive").parents("ul").prev().removeClass("listActive");
                if ($("#leftNav a[title='" + navTxt + "']").addClass("listActive").siblings('ul').hasClass("leftNavSubLinks")) {
                    $("#leftNav a[title='" + navTxt + "']").attr({
                        "href": "javascript:;"
                    }).addClass("listActive listActiveDown listActiveOnlyBold").siblings('ul').show();
                }
                if ($("#leftNav a[title='" + navTxt + "']").parents(".leftNavSubLinks").hasClass("leftNavSubLinks")) {
                    t.parents(".accordionNavList").find("a").eq(0).addClass("listActiveDown")
                }
            } else t.attr({
                "href": "javascript:;"
            }).addClass("listActiveOnlyBold");
            t.trigger("click")
        }, 500);
    };

    $.fn.tab = function (options) {
        $("body").on('click', "ul.tabs li:not('.active')", function () {
            $this = $(this);
            $tabsContainer = $this.parents('.tabsContainer');
            if (!$(this).hasClass("tabClose")) {
                $tabsContainer.find("ul.tabs li:first").removeClass('activeArrow');
                $tabsContainer.find("ul.tabs li.removeActive").removeClass("removeActive");
                $tabsContainer.find("ul.tabs li.active").removeClass('active');
                $this.addClass('active');
                $tabsContainer.siblings('div.tabContentWrap').slideDown(500);
                $tabsContainer.siblings('div').children(".tabContent").hide().removeClass('active_content')
                //.eq($this.index()-1).addClass('active_content').fadeIn(); //display curresponding div of the clicked anchor
                if ($.browser.msie && $.browser.version < 9.0) {
                    $tabsContainer.siblings('div').children(".tabContent").eq((($(this).index()) / 2) - 1).addClass('active_content').fadeIn().css('display', 'block');
                } else {
                    $tabsContainer.siblings('div').children(".tabContent").eq($(this).index() - 1).addClass('active_content').fadeIn().css('display', 'block');
                }
            } else {
                if ($this.hasClass("activeArrow")) {
                    $this.removeClass("activeArrow");
                    $tabsContainer.find("ul.tabs li.removeActive").addClass("active").removeClass("removeActive");
                    $tabsContainer.siblings('div.tabContentWrap').slideDown(500);
                    //$(".tabs li:not(':first') a").css("background-position","0 0px");
                } else {
                    $this.addClass("activeArrow");
                    $tabsContainer.find("ul.tabs li.active").addClass("removeActive").removeClass("active");
                    $tabsContainer.siblings('div.tabContentWrap').slideUp(500);
                    //$(".tabs li:not(':first') a").css("background-position","0 -10px");
                }
            }

            //if (!tablet.detect() && !mobile.detect()) {
            //    $('.scroll-pane').jScrollPane();
            //}

        });
    };



})(jQuery);
$(function () {
    $.when(
        $.getScript("/sim/chinese/js/jquery.mousewheel.js"),
        $.getScript("/sim/chinese/js/jquery.jscrollpane.min.js"),
        $.Deferred(function (deferred) {
            $(deferred.resolve);
        })).done(function () {
            if (!tablet.detect() && !mobile.detect()) {
                $('.scroll-pane').jScrollPane();
            } else {
                $('.tooltip .scroll-pane').jScrollPane({
                    showArrows: true
                });

            }
        });
})

function Select_OpenNewwindow1(url, width, height, options, name) {
    if (!width) width = 250;
    if (!height) height = 250;
    if (!options) options = "scrollbars=yes,menubar=no,toolbar=no,location=yes,status=no,resizable=no";
    if (!name) name = "otherwindows";
    var newWin = window.open(url, name, "width=" + width + ",height=" + height + "," + options);
}

function fb(url) {
    if (confirm('By clicking "OK" you acknowledge that you are leaving a Citibank website to go to a third party website, and that Citibank does not accept any responsibility for the operation of the third party website. \nDo you wish to continue?')) {
        window.open(url);
    }
}

function speedbumpMY(url) {
    if (confirm('You are now leaving the Citibank Malaysia website and entering a third party website. \n\n Any information you may provide on the third party website shall be subject to the confidentiality and security terms of such website and not the privacy policies of Citibank Malaysia, and Citibank Malaysia shall not bear any responsibility for any unauthorised disclosure or breach of confidentiality in relation to such information provided. \n\n Furthermore any link to a third party website contained herein does not constitute an endorsement by Citibank Malaysia of such third party, their website or their products and/or services, and Citibank Malaysia also makes no warranties as to the content of such website. \n\n Would you like to continue?')) {
        window.open(url);
    }
}

function speedbumpMYMic(url) {
    if (confirm("You are now leaving Citibank Website & entering a third party site. Please be advised that you will no longer be subject to or under the protection of the privacy or security policies of Citibank's website. The inclusion of the third party link in Citibank's website does not imply that Citibank endorses or support the content of the third party website. The content of the third party website is solely the responsibility of the provider or the website. Any transaction that you enter into with any vendor, merchant or other party from this site is between you and that vendor, merchant or other party. All information you provide and all dealings between you and the third party will be subject to all terms, conditions, privacy policies, warranties and representations of the applicable third party site. You are advised to read the said terms, conditions, privacy policies, warranties and representations Citibank Malaysia does not accept any liability for information you provide at such third party site or for the content of or for the product and services provided in the third party website. Would you like to continue?")) {
        window.open(url);
    }
}

/*Print Script*/

function printField() { }
/*Print Script*/

$(document).ready(function () {
    var loc = location.href;
    //$("#qrCode").html("<img src='https://api.qrserver.com/v1/create-qr-code/?data="+loc+"&#38;size=106x106&#38;prov=goqrme' alt='' title='' />");

    var s = '', s1 = '', s2 = '', s3 = '', tc = 1;
    if ($(".TermsAndConditions").eq(0).length > 0) { s1 = $(".TermsAndConditions").eq(0).html(); }
    else { s1 = $(".printSection").html(); }
    if ($(".TermsAndConditions").eq(1).length > 0) { s2 = $(".TermsAndConditions").eq(1).html(); }
    if ($(".TermsAndConditions").eq(2).length > 0) { s3 = $(".TermsAndConditions").eq(2).html(); }

    $(".printIcon").each(function () {
        $(this).attr('data-rel', tc);
        tc++;
    })

    $('body').on('click', '.printIcon', function () {
        if ($(".printSection").length > 0) { s = s1; }
        else {
            if ($(this).attr('data-rel') == 1) { s = s1; }
            if ($(this).attr('data-rel') == 2) { s = s2; }
            if ($(this).attr('data-rel') == 3) { s = s3; }
        }
        pWin = window.open('', 'pWin', 'location=yes, menubar=yes, toolbar=yes');
        pWin.document.open();
        pWin.document.write('<html><head><style type="text/css"> table{ font-size:13px; } .clsDisList {height:auto !important;width:100% !important;}</style></head><body><font face= Arial size=2pt>');
        pWin.document.write(s);
        pWin.document.write('</font></body></html>');
        pWin.print();
        pWin.document.close();
        pWin.close();
    });

    /* Filter */
    var allCards = $(".productsMainCont").clone();

    if ($(".cardsTab li:first").hasClass("active")) {
        $(".productsMainCont").remove();
        $details = $(allCards).clone();
        details = $details.find(".hotac_icard").remove().removeClass("left right center");
        $(".productsMain").html(details);
        filter("hotac_icard");
        $(".filterType").text("热门活动")
    } else if ($(".cardsTab li:last").hasClass("active")) {
        $(".productsMainCont").remove();
        $details = $(allCards).clone();
        details = $details.find(".productsList").remove().removeClass("left right center");
        $(".productsMain").html(details);
        filter("productsList");
        $(".filterType").text($(this).text());
    }


    $("body").on("click", ".cardsTab li:not('.active')", function () {
        count = 0;
        $prd = "";
        $("html,body").animate({
            scrollTop: $(this).offset().top
        }, 1000)
        var cardType = $(this).find('a').attr("class");
        $(".cardsTab li").removeClass("active");
        $(this).addClass("active");
        $(".productsMainCont").remove();
        // 投资 filter
        // 所有投资 filter
        if (cardType == "showAll") {
            /*$(".productsMain").html(allCards);*/

            $details = $(allCards).clone();
            details = $details.find(".productsList").remove().removeClass("left right center");
            $(".productsMain").html(details);
            filter("productsList");
            $(".filterType").text("所有投资")
        }
        //end 所有投资 filter
        // 证券投资基金 filter
        if (cardType == "fund") {
            $(".filterType").text("证券投资基金")
            $details = $(allCards).clone();
            details = $details.find(".fund_inve").remove().removeClass("left right center");
            $(".productsMain").html(details);
            filter("fund_inve");
        }
        // end 证券投资基金 filter
        // 投资帐户 filter
        if (cardType == "account") {
            $(".filterType").text("投资帐户")
            $details = $(allCards).clone();
            details = $details.find(".account_inve").remove().removeClass("left right center");
            $(".productsMain").html(details);
            filter("account_inve");
        }
        // end 投资帐户 filter
        // 代客境外理财
        if (cardType == "qdll") {
            $(".filterType").text("代客境外理财")
            $details = $(allCards).clone();
            details = $details.find(".qdll_inve").remove().removeClass("left right center");
            $(".productsMain").html(details);
            filter("qdll_inve");
        }
        // end 代客境外理财
        // 最新刷卡优惠 filter
        // 所有优惠 filter
        if (cardType == "showAlloffer") {
            //$(".productsMain").html(allCards);
            $details = $(allCards).clone();
            details = $details.find(".productsList").remove().removeClass("left right center");
            $(".productsMain").html(details);
            filter("productsList");
            $(".filterType").text("所有优惠");
        }
        //end 所有优惠 filter
        // 热门活动
        if (cardType == "hotac") {
            $details = $(allCards).clone();
            details = $details.find(".hotac_icard").remove().removeClass("left right center");
            $(".productsMain").html(details);
            filter("hotac_icard");
            $(".filterType").text("热门活动")
        }
        // end 热门活动
        // 美食
        if (cardType == "food") {
            $(".filterType").text("美食")
            $details = $(allCards).clone();
            details = $details.find(".food_icard").remove().removeClass("left right center");
            $(".productsMain").html(details);
            filter("food_icard");
        }
        // end 美食

        // 旅游
        if (cardType == "travel") {
            $(".filterType").text("旅游")
            $details = $(allCards).clone();
            details = $details.find(".travel_icard").remove().removeClass("left right center");
            $(".productsMain").html(details);
            filter("travel_icard");
        }
        // end 旅游

        // 生活
        if (cardType == "life") {
            $(".filterType").text("生活")
            $details = $(allCards).clone();
            details = $details.find(".life_icard").remove().removeClass("left right center");
            $(".productsMain").html(details);
            filter("life_icard");
        }
        // end 生活

        // 在线购物
        if (cardType == "buy") {
            $(".filterType").text("在线购物")
            $details = $(allCards).clone();
            details = $details.find(".buy_icard").remove().removeClass("left right center");
            $(".productsMain").html(details);
            filter("buy_icard");
        }
        // end 在线购物

        // 环球礼遇
        if (cardType == "benefit") {
            $(".filterType").text("环球礼遇")
            $details = $(allCards).clone();
            details = $details.find(".benefit_icard").remove().removeClass("left right center");
            $(".productsMain").html(details);
            filter("benefit_icard");
        }
        // end 环球礼遇

        /*Insurance lndex*/
        //所有花旗保險
        if (cardType == "showallInsur") {
            $(".productsMain").html(allCards);
            $(".filterType").text("所有花旗保險");

        }
        //end 所有花旗保險
        //超值保險專案
        if (cardType == "superInsure") {
            $(".filterType").text("超值保險專案")
            $details = $(allCards).clone();
            details = $details.find(".superInsure_ins").remove().removeClass("left right center");
            $(".productsMain").html(details);
            filter("superInsure_ins");
        }
        //end 超值保險專案
        //意外險
        if (cardType == "accidentInsure") {
            $(".filterType").text("意外險")
            $details = $(allCards).clone();
            details = $details.find(".accidentInsure_ins").remove().removeClass("left right center");
            $(".productsMain").html(details);
            filter("accidentInsure_ins");
        }
        //end 意外險
        //健康險
        if (cardType == "healthInsure") {
            $(".filterType").text("健康險");
            $details = $(allCards).clone();
            details = $details.find(".healthInsure_ins").remove().removeClass("left right center");
            $(".productsMain").html(details);
            filter("healthInsure_ins");
        }
        //end 健康險
        //壽險
        if (cardType == "lifeInsure") {
            $(".filterType").text("壽險");
            $details = $(allCards).clone();
            details = $details.find(".lifeInsure_ins").remove().removeClass("left right center");
            $(".productsMain").html(details);
            filter("lifeInsure_ins");
        }
        //end 壽險

        /*Home Loan lndex*/
        //所有房貸
        if (cardType == "showallhl") {
            $(".productsMain").html(allCards);
            $(".filterType").text("所有房貸")
        }
        //end 所有房貸       
        //購屋族
        if (cardType == "iniHomeLoan") {
            $(".filterType").text("購屋族")
            $details = $(allCards).clone();
            details = $details.find(".iniHomeLoan_hl").remove().removeClass("left right center");
            $(".productsMain").html(details);
            filter("iniHomeLoan_hl");
        }
        //end 成購屋族
        //精省息族
        if (cardType == "lowInterestHomeLoan") {
            $(".filterType").text("省息族")
            $details = $(allCards).clone();
            details = $details.find(".lowInterestHomeLoan_hl").remove().removeClass("left right center");
            $(".productsMain").html(details);
            filter("lowInterestHomeLoan_hl");
        }
        //end 省息族
        //增貸族
        if (cardType == "financeHomeLoan") {
            $(".filterType").text("增貸族")
            $details = $(allCards).clone();
            details = $details.find(".financeHomeLoan_hl").remove().removeClass("left right center");
            $(".productsMain").html(details);
            filter("financeHomeLoan_hl");
        }
        //end 增貸族
        //融資族
        if (cardType == "achieveHomeLoan") {
            $(".filterType").text("融資族")
            $details = $(allCards).clone();
            details = $details.find(".achieveHomeLoan_hl").remove().removeClass("left right center");
            $(".productsMain").html(details);
            filter("achieveHomeLoan_hl");
        }
        //end 融資族
        //花旗房貸客戶
        if (cardType == "customerHomeLoan") {
            $(".filterType").text("花旗房貸客戶")
            $details = $(allCards).clone();
            details = $details.find(".customerHomeLoan_hl").remove().removeClass("left right center");
            $(".productsMain").html(details);
            filter("customerHomeLoan_hl");
        }
        //end 花旗房貸客戶
        //熱門
        if (cardType == "promoHot") {
            $(".filterType").text("熱門")
            $details = $(allCards).clone();
            details = $details.find(".promoHot_hl").remove().removeClass("left right center");
            $(".productsMain").html(details);
            filter("promoHot_hl");
        }
        //end 熱門
        //分期
        if (cardType == "promoEasy") {
            $(".filterType").text("分期")
            $details = $(allCards).clone();
            details = $details.find(".promoEasy_hl").remove().removeClass("left right center");
            $(".productsMain").html(details);
            filter("promoEasy_hl");
        }
        //end 分期優惠
        //餐飲
        if (cardType == "promoDining") {
            $(".filterType").text("餐飲")
            $details = $(allCards).clone();
            details = $details.find(".promoDining_hl").remove().removeClass("left right center");
            $(".productsMain").html(details);
            filter("promoDining_hl");
        }
        //end 餐飲
        //旅遊
        if (cardType == "promoTravel") {
            $(".filterType").text("旅遊")
            $details = $(allCards).clone();
            details = $details.find(".promoTravel_hl").remove().removeClass("left right center");
            $(".productsMain").html(details);
            filter("promoTravel_hl");
        }
        //end 旅遊
        //百貨量販
        if (cardType == "promoDPS") {
            $(".filterType").text("百貨量販")
            $details = $(allCards).clone();
            details = $details.find(".promoDPS_hl").remove().removeClass("left right center");
            $(".productsMain").html(details);
            filter("promoDPS_hl");
        }
        //end 百貨
        //線上購物
        if (cardType == "promoOnlineShopping") {
            $(".filterType").text("線上購物")
            $details = $(allCards).clone();
            details = $details.find(".promoOnlineShopping_hl").remove().removeClass("left right center");
            $(".productsMain").html(details);
            filter("promoOnlineShopping_hl");
        }
        //end 線上購物
        //代繳
        if (cardType == "promoUtility") {
            $(".filterType").text("代繳")
            $details = $(allCards).clone();
            details = $details.find(".promoUtility_hl").remove().removeClass("left right center");
            $(".productsMain").html(details);
            filter("promoUtility_hl");
        }
        //end 代繳
        //其它
        if (cardType == "promoOther") {
            $(".filterType").text("其它")
            $details = $(allCards).clone();
            details = $details.find(".promoOther_hl").remove().removeClass("left right center");
            $(".productsMain").html(details);
            filter("promoOther_hl");
        }
        //end 其它

        setTimeout(function () {
            myEqualHeight()
        }, 100);

    });
    /* Filter End*/

    /* Tab open */
    $(".Tabopen").click(function () {
        var opn = $(this).attr('data-rel');
        if (tablet.detect()) {
            switch (opn) {
                case 'first':
                    val = 1;
                    break;
                case 'second':
                    val = 2;
                    break;
                case 'third':
                    val = 3;
                    break;
                case 'fourth':
                    val = 4;
                    break;
                case 'fifth':
                    val = 5;
                    break;
                case 'sixth':
                    val = 6;
                    break;
                case 'seven':
                    val = 7;
                    break;
            }
        } else {
            switch (opn) {
                case 'first':
                    val = 0;
                    break;
                case 'second':
                    val = 1;
                    break;
                case 'third':
                    val = 2;
                    break;
                case 'fourth':
                    val = 3;
                    break;
                case 'fifth':
                    val = 4;
                    break;
                case 'sixth':
                    val = 5;
                    break;
                case 'seven':
                    val = 6;
                    break;
            }
        }
        $(".tabs li:visible:eq(" + val + ")").trigger("click");

    });
    $(document).trigger('pageinit');
    /* Tab open */



    $(".abtClrHead, .dealsHead, .manageHead, .accessibilityHead").each(function () {
        //if ((iPhone5 || iPhone5_1) && screen.width){topper = "40%";}else{topper = "50%"}
        var banerTxtHeight = $(this).find('.left').height() / 2;
        $(this).find('.left').css({
            'margin-top': -banerTxtHeight,
            'top': '52%',
            'position': 'relative'
        });
    });

    $(".bannerProd,.bannerHolder").each(function () {
        //if ((iPhone5 || iPhone5_1) && screen.width){topper = "40%";}else{topper = "50%"}
        var banerTxtHeight = $(this).find('.bannerTitle').height() / 2;
        $(this).find('.bannerTitle').css({
            'margin-top': -banerTxtHeight,
            'top': '50%'
        });
    });

    var val = "",
        tab = "";
    tab = getParameter(tab);
    switch (tab) {
        case "globalTrans":
            val = "CITIBANK GLOBAL TRANSFER";
            break;
        case "travelAsst":
            val = "TRAVEL ASSISTANCE";
            break;
        case "globalView":
            val = "ONLINE GLOBAL VIEW";
            break;

        case "citigold":
            val = "CITIGOLD";
            break;
        case "propertyInvest":
            val = "PROPERTY INVESTMENT";
            break;
        case "marketWR":
            val = "MARKET WATCH & RESEARCH";
            break;

        case "24banking":
            val = "CITIBANK GLOBAL TRANSFER";
            break;
        case "location":
            val = "TRAVEL ASSISTANCE";
            break;
        case "payConv":
            val = "ONLINE GLOBAL VIEW";
            break;

        case "cards":
            val = "CARDS";
            break;
        case "mortgages":
            val = "MORTGAGE";
            break;
        case "readyCredit":
            val = "READY CREDIT";
            break;

        case "CWP":
            val = "CITI WORLD PRIVILEGES";
            break;
        case "citiRewards":
            val = "CITI REWARDS";
            break;
        case "globalLounge":
            val = "GLOBAL LOUNGE ACCESS";
            break;
        case "citiGlobeshopper":
            val = "CITI GLOBESHOPPER";
            break;
        case "loanLifestyle":
            val = "HOME LOAN LIFESTYLE";
            break;
        default:
            val = '';
            break;
    }
    setTimeout(function () {
        $(".tabs li a[title='" + val + "']").trigger('click')
        //if (val !=""){$("body").preSelectLftNav(convert_case(val.toLowerCase()));}
    }, 600);

    $(function () {
        function moveFloatMenu() {
            var menuOffset = menuYloc.top + $(this).scrollTop() + "px";
            $('.socialMedia').animate({
                top: menuOffset
            }, {
                duration: 500,
                queue: false
            });
        }
        menuYloc = $('.socialMedia').offset();
        //$(window).scroll(moveFloatMenu);
        //moveFloatMenu();
    });

    $("body").on("click", "ul.slidesjs-pagination li a", function () {
        if (!$(this).hasClass("active")) {
            $(this).addClass("active");
        }
    });
    $("body").on("click", '.sbToggle, .sbSelector', function () {
        $this = $(this);
        if ($(this).siblings('a').hasClass('sbToggleOpen') || $(this).hasClass('sbToggleOpen')) {
            $(this).siblings('ul.sbOptions').addClass("scroll-pane");
        }
        setTimeout(function () {
            $this.siblings('.scroll-pane').jScrollPane({
                contentWidth: '0px'
            })
        }, 300);
    });

    $(function () {
        $.when(
            $.getScript("/sim/chinese/js/jquery.slides.min1.js"),
            $.Deferred(function (deferred) {
                $(deferred.resolve);
            })).done(function () {
                $('#promotionslides').slidesjs({
                    navigation: false
                });
                $('#promotionslides01').slidesjs({
                    navigation: false
                });
                /*$('#promotionslides02').slidesjs({
                    navigation: false
                });*/
            });
    });

    $('.lftNavMo').click(function () {
        if ($(this).hasClass("active")) {
            $('#sidebar').slideUp('slow', function () {
                $('.lftNavMo.active').removeClass('active');
            });
        } else {
            $('#sidebar').slideDown('slow', function () {
                $('.lftNavMo').addClass('active');
            });
        }
    });


    $t = 0;
    $(document).click(function (e) {
        if (!$(e.target).parents().hasClass("immediatelyApMedia")) {

            $(".immediatelyApMedia").each(function () {
                $(this).animate({
                    "right": "-" + $(".immediatelyApMedia .newcontentWrap").width() - 40
                }, 500);
            })
        };

        if (!$(e.target).parents().hasClass("socialMedia02")) {

            $(".socialMedia02").each(function () {
                $(this).animate({
                    "right": "-" + $(".socialMedia02 .contentWrap").width() - 40
                }, 500);
            })
        };

        if (!$(e.target).parents().hasClass("guanzhuMedia")) {

            $(".guanzhuMedia").each(function () {
                $(this).animate({
                    "right": "-" + $(".guanzhuMedia .contentWrap").width() - 40
                }, 500);
            })
        };

        if (!$(e.target).parents().hasClass("contactMedia")) {

            $(".contactMedia").each(function () {
                $(this).animate({
                    "right": "-" + $(".contactMedia .contentWrap").width() - 40
                }, 500);
            })
        }

    })

    /*立即申请*/
    $(".immediatelyApMedia .atIcon").click(function (evt) {
        evt.stopPropagation();
        $cur = $(this).parents(".immediatelyApMedia");
        if ($cur.siblings(".immediatelyApMedia").css('right') == '0px') {
            $cur.siblings(".immediatelyApMedia").animate({
                "right": "-" + $(".newcontentWrap").width() - 40
            }, 500, function () {
                $cur.animate({
                    "right": "0px"
                }, 500)
            });
        } else {
            if ($cur.css('right') == '0px') {
                $cur.animate({
                    "right": "-" + $(".newcontentWrap").width() - 40
                }, 500)
            } else {
                $cur.animate({
                    "right": "0px"
                }, 500)
            }
        }
        $(".guanzhuMedia").css('right', '-521px');
        $(".contactMedia").css('right', '-591px');
        $(".socialMedia02").css('right', '-791px');
        $(".immediatelyApMedia").css('right', '-840px');

/*		$(this).parents(".immediatelyApMedia").css('position','absolute');
		$(this).parents(".socialMedia").css('position','absolute');
*/    })

    $(".immediatelyApMedia .closeIcon").click(function () {
        $(this).parents(".immediatelyApMedia").animate({
            "right": "-" + $(".newcontentWrap").width() - 40
        }, 500);
        /*$(this).parents(".immediatelyApMedia").css('position','fixed');
        $(this).parents(".socialMedia").css('position','fixed');*/
    })

    /*最新优惠*/
    $(".socialMedia02 .atIcon").click(function (evt) {
        evt.stopPropagation();
        $cur = $(this).parents(".socialMedia02");
        if ($cur.siblings(".socialMedia02").css('right') == '0px') {
            $cur.siblings(".socialMedia02").animate({
                "right": "-" + $(".socialMedia02 .contentWrap").width() - 40
            }, 500, function () {
                $cur.animate({
                    "right": "0px"
                }, 500)
            });
        } else {
            if ($cur.css('right') == '0px') {
                $cur.animate({
                    "right": "-" + $(".socialMedia02 .contentWrap").width() - 40
                }, 500)
            } else {
                $cur.animate({
                    "right": "0px"
                }, 500)
            }
        }
        $(".guanzhuMedia").css('right', '-521px');
        $(".contactMedia").css('right', '-591px');
        $(".immediatelyApMedia").css('right', '-840px');
        /*$(this).parents(".socialMedia02").css('position','absolute');*/
    })

    $(".socialMedia02 .closeIcon").click(function () {
        $(this).parents(".socialMedia02").animate({
            "right": "-" + $(".socialMedia02 .contentWrap").width() - 40
        }, 500);
        /*$(this).parents(".socialMedia02").css('position','fixed');*/
    })


    $(".guanzhuMedia .atIcon").click(function (evt) {
        evt.stopPropagation();
        $cur = $(this).parents(".guanzhuMedia");
        if ($cur.siblings(".guanzhuMedia").css('right') == '0px') {
            $cur.siblings(".guanzhuMedia").animate({
                "right": "-" + $(".guanzhuMedia .contentWrap").width() - 40
            }, 500, function () {
                $cur.animate({
                    "right": "0px"
                }, 500)
            });
        } else {
            if ($cur.css('right') == '0px') {
                $cur.animate({
                    "right": "-" + $(".guanzhuMedia .contentWrap").width() - 40
                }, 500)
            } else {
                $cur.animate({
                    "right": "0px"
                }, 500)
            }
        }
        $(".socialMedia02").css('right', '-791px');
        $(".contactMedia").css('right', '-591px');
        $(".immediatelyApMedia").css('right', '-840px');
        /*$(this).parents(".guanzhuMedia").css('position','absolute');*/
    })

    $(".guanzhuMedia .closeIcon").click(function () {
        $(this).parents(".guanzhuMedia").animate({
            "right": "-" + $(".guanzhuMedia .contentWrap").width() - 40
        }, 500);
        /*$(this).parents(".guanzhuMedia").css('position','fixed');*/
    })



    $(".contactMedia .atIcon").click(function (evt) {
        evt.stopPropagation();
        $cur = $(this).parents(".contactMedia");
        if ($cur.siblings(".contactMedia").css('right') == '0px') {
            $cur.siblings(".contactMedia").animate({
                "right": "-" + $(".contactMedia .contentWrap").width() - 40
            }, 500, function () {
                $cur.animate({
                    "right": "0px"
                }, 500)
            });
        } else {
            if ($cur.css('right') == '0px') {
                $cur.animate({
                    "right": "-" + $(".contactMedia .contentWrap").width() - 40
                }, 500)
            } else {
                $cur.animate({
                    "right": "0px"
                }, 500)
            }
        }
        $(".guanzhuMedia").css('right', '-521px');
        $(".socialMedia02").css('right', '-791px');
        $(".immediatelyApMedia").css('right', '-840px');
        /*$(this).parents(".contactMedia").css('position','absolute');*/
    })

    $(".contactMedia .closeIcon").click(function () {
        $(this).parents(".contactMedia").animate({
            "right": "-" + $(".contactMedia .contentWrap").width() - 40
        }, 500);
        /*$(this).parents(".contactMedia").css('position','fixed');*/
    })




    setTimeout(function () {
        if (!$("#promotionslides02 .slidesjs-pagination li:first").children('a').hasClass("active")) {
            $("#promotionslides02 .slidesjs-pagination li:first").children('a').addClass("active");
            /*$("#promotionslides01 .slidesjs-pagination li:first").children('a').addClass("active")*/
        }
    }, 800);

    $("#socialcall, #socialemail, #socialfb").mouseover(function () {
        var socialval = $(this).find('img').attr('src').replace('-off', '-on');
        $(this).find('img').attr('src', socialval);
        $(this).parents('.mediaIconsList').find('.iconDesc').show();
    });

    $("#socialcall, #socialemail, #socialfb").mouseout(function () {
        $('.iconDesc').hide();
        var socialval = $(this).find('img').attr('src').replace('-on', '-off');
        $(this).find('img').attr('src', socialval);
    });

    if ($("#navScroll").is(':visible')) {
        if (mobile.detect() && !tablet.detect()) {
            //$(".airAsiaTopMnu").css({'position':'inherit','width':'auto'});
            var cc = 0;
            $("#navScroll").animate({
                "scrollLeft": $("#navScroll ul li.activeScroll").offset().left - 60
            }, 400);
            $("#navScroll ul li").each(function () {
                cc += $(this).outerWidth(true);
            })
            $("#navScroll ul").css({
                "width": cc + "px"
            });

            $("body").on('click', '.menuLftArro.active', function () {
                $("#navScroll ul li.activeScroll").addClass('removeScroll');
                $("#navScroll ul li").removeClass('activeScroll');
                $('.removeScroll').prev().addClass('activeScroll');
                var frameWidth = $("#navScroll ul li.activeScroll").outerWidth(true);
                $("#navScroll ul li").each(function () {
                    $(this).removeClass('removeScroll');
                })
                $(".menuRhtArro").addClass('active');
                $("#navScroll").animate({
                    "scrollLeft": "-=" + frameWidth
                }, 1200, function () {
                    if ($("#navScroll").scrollLeft() == 0) {
                        $(".menuLftArro").removeClass('active');
                    } else {
                        $(".menuLftArro").addClass('active');
                    }
                });
            });

            $("body").on('click', '.menuRhtArro.active', function () {
                $("#navScroll ul li.activeScroll").addClass('removeScroll');
                var cc = 0,
                    frameWidth = $("#navScroll ul li.activeScroll").outerWidth(true);
                var imgCount = $("#navScroll ul li").length;
                $("#navScroll ul li").removeClass('activeScroll');
                $('.removeScroll').next().addClass('activeScroll');
                $("#navScroll ul li").each(function () {
                    $(this).removeClass('removeScroll');
                })
                $("#navScroll ul li").each(function () {
                    cc += $(this).outerWidth(true);
                })
                $("#navScroll ul").css({
                    "width": cc + "px"
                })

                $(".menuLftArro").addClass('active');
                $("#navScroll").animate({
                    "scrollLeft": "+=" + frameWidth
                }, 1200, function () {
                    if ($("#navScroll").scrollLeft() + $("#navScroll").width() + 4 >= cc) {
                        $(".menuRhtArro").removeClass('active');
                    } else {
                        $(".menuRhtArro").addClass('active');
                    }
                });
            });
        }
    }

});


$(document).bind('pageinit', function () {

    $(".Tabopen").click(function () {

        if (mobile.detect()) {
            var opn = $(this).attr('id');
            switch (opn) {
                case 'first':
                    val = 1;
                    break;
                case 'second':
                    val = 2;
                    break;
                case 'third':
                    val = 3;
                    break;
                case 'fourth':
                    val = 4;
                    break;
                case 'fifth':
                    val = 5;
                    break;
                case 'sixth':
                    val = 6;
                    break;
            }
            $(".tabs li:eq(" + val + ")").trigger("click");
        }

    });
});

function myEqualHeight() {
    $(".productWrap").each(function () {
        $("body").setEqualHeight($("h2", this));
        $("body").setEqualHeight($("h3", this));
        $("body").setEqualHeight($(".productsListDetails", this));
    })
    /*$(".productsEqualHeight").each(function () {
  $("body").setEqualHeight($(".productsList h2", this));
  $("body").setEqualHeight($(".info", this));
  $("body").setEqualHeight($(".infoTxt", this));
  $("body").setEqualHeight($(".tabInnerListHolder", this));
  $("body").setEqualHeight($(".getDetail", this));
 })*/

    $(".bottomLinksWrap").each(function () {
        $("body").setEqualHeight($("li h3", this));
        $("body").setEqualHeight($("li.left, li.center, li.right", this));
    })
    $(".microAccessLst, .micProdLstDet").each(function () {
        $("body").setEqualHeight($("h3", this));
        $("body").setEqualHeight($("p", this));
        $("body").setEqualHeight($(".left, .center, .right", this));
    })

    $(".dealsDetails").each(function () {
        $("body").setEqualHeight($("li p", this));
        $("body").setEqualHeight($("li a", this));
    })
    $(".promoInnBlock").each(function () {
        $("body").setEqualHeight($("li h3", this));
        $("body").setEqualHeight($("li.left, li.right", this));
    })
    $(".promoInnBlock").each(function () {
        $("body").setEqualHeight($("li h3", this));
        $("body").setEqualHeight($("li.left.features, li.right.features", this));
    })
    $(".promoBoxBlock").each(function () {
        $("body").setEqualHeight($("li h3", this));
        $("body").setEqualHeight($("li.left, li.right", this));
    })
    $(".miciconBlockShow").each(function () {
        $("body").setEqualHeight($("li h3"));
        $("body").setEqualHeight($("li p"));

    })
    $(".mainLst").each(function () {
        $("body").setEqualHeight($("h4", this));
        $("body").setEqualHeight($("p", this));
        $("body").setEqualHeight($("li.left, li.right", this));
    })
    $(".premierMilesLstInn").each(function () {
        $("body").setEqualHeight($("h3", this));
        $("body").setEqualHeight($("p", this));
    })
    $(".mobGetList").each(function () {
        $("body").setEqualHeight($(".mobGetList ul li", this));
        $("body").setEqualHeight($("p", this));
        $("body").setEqualHeight($("h3", this));
    })
}

$(document).ready(function () {
    $("#topMnu" + type).attr({
        "href": "javascript:;"
    }).addClass("activeTabHighlight");
    $(".pageTitle").text(pageTitle);
    //alert(pageTitle);

    $('.flyout,.mainNavSignOn').css('z-index', '999');
    $("body").tab();
    $("#leftNav").rgNavigation();


    $("body").on('click', '.hideDetails', function () {
        $(this).removeClass('hideDetails').addClass('showDetails');
        $(".linkListDetails").slideUp();
    });
    $("body").on('click', '.showDetails', function () {
        $(this).removeClass('showDetails').addClass('hideDetails');
        $(".linkListDetails").slideDown();
    });

    $("body").on("click", ".tabContent > div a, .showHideArea .showHideHdr > a,  .showHideArea1 .showHideHdr1 > a,  .micShowHideArea .micShowHideHdr > a", function () {
        if ($(this).children('span').hasClass('hide')) {
            $(this).children('span').removeClass('hide').addClass('show');
            $(this).parent().siblings('div').slideToggle(500);
        } else if ($(this).children('span').hasClass('show')) {
            $(this).children('span').removeClass('show').addClass('hide');
            $(this).parent().siblings('div').slideToggle(500);
        }
    })

    $("body").on("click", ".closeArrow, .openArrow", function () {
        $(this).toggleClass("closeArrow").toggleClass("openArrow");
        $(this).parents(".cardSelectList").find(".cardDetails").slideToggle('slow');
        if (!mobile.detect()) {
            setTimeout(function () {
                $('.scroll-pane').jScrollPane()
            }, 500);
        }
        /*if($(this).hasClass("closeArrow"))
  {
   var pane = $('.cardSelect .scroll-pane');
   pane.jScrollPane(
    {
     showArrows: false,
     animateScroll: true
    }
   );
   var api = pane.data('jsp');
   api.scrollTo(0,$(this).parents('.cardSelectList').position().top);
  }*/
    });

    $('body').on('click', '#leftNav a', function () {
        //var filterTxt = $(this).attr("datarel").toLowerCase();
        var val = "";
        var filterTxt = $(this).attr("title");
        switch (filterTxt) {
            case "Travel Cards":
                val = "travel";
                break;
            case "Reward Points Cards":
                val = "rewards";
                break;
            case "Cash Rebate Cards":
                val = "cashRebate";
                break;
            case "Business Cards":
            case "Business Cards Overview":
                val = "business";
                break;
            default:
                break;
        }
        if (val != '') {
            if ($(".filter .cardsTab li > a." + val).length) {
                if (mobile.detect() && !tablet.detect()) {
                    $(".lftNavMo").trigger("click");
                }
                if (tablet.detect()) {
                    $(".leftNavIconDown").trigger("click");
                }
                setTimeout(function () {
                    $(".filter .cardsTab li > a." + val).trigger("click")
                }, 600);
            }
        }
    });
    /*Mobile Navigations */
    $("body").on("click", ".mainMenuIcon", function () {
        $(this).toggleClass("active");
        $("#nav").slideToggle();
    })
    $("body").on('click', ".leftNavIcon", function () {
        $(this).addClass('leftNavIconDown').removeClass('leftNavIcon');
        $("#sidebar").slideDown();
    });
    $('body').on('click', ".leftNavIconDown", function () {
        $(this).addClass('leftNavIcon').removeClass('leftNavIconDown');
        $("#sidebar").slideUp();
    });
    $(".importantLinks a.dropLink").click(function () {
        $(this).next().slideToggle()
    })
    $("body").on("click", ".hideArrow", function () {
        $(this).removeClass("hideArrow").addClass("showArrow");
        $(this).parents(".productsList, .productsListPro").find(".productsListDetails").slideUp();
    })
    $("body").on("click", ".showArrow", function () {
        $(this).removeClass("showArrow").addClass("hideArrow");
        $(this).parents(".productsList, .productsListPro").find(".productsListDetails").slideDown();
    })

    $("body").on("click", ".hideArrow", function () {
        $(this).removeClass("hideArrow").addClass("showArrow");
        $(this).parents(".productsListMicro").find(".micProdLstDet").slideUp();
    })
    $("body").on("click", ".showArrow", function () {
        $(this).removeClass("showArrow").addClass("hideArrow");
        $(this).parents(".productsListMicro").find(".micProdLstDet").slideDown();
    })


    $("body").on("click", ".showArrow", function () {
        $(this).removeClass("showArrow").addClass("hideArrow");
        $(this).parents(".readyTab1").find(".newCredit").slideDown('slow');
    })

    $("body").on("click", ".showArrow", function () {
        $(this).removeClass("showArrow").addClass("hideArrow");
        $(this).parents(".readyTab2").find(".existingCustomer").slideDown('slow');
    })

    $("body").on("click", ".hideArrow", function () {
        $(this).removeClass("hideArrow").addClass("showArrow");
        $(this).parents(".readyTab1").find(".newCredit").slideUp();
    })
    var lnkLstTop, lnkLstWidth = $(".linkLstWrap").css("top");
    $("body").on("click", "#footerLnk", function (e) {
        e.stopPropagation();
        $(".linkLstWrap").fadeIn(200);
        if (mobile.detect() || tablet.detect()) {
            lnkLstTop = $(".linkLstWrap").outerWidth(true) + parseInt(lnkLstWidth) + 5;
        } else {
            lnkLstTop = $(".linkLstWrap").outerWidth(true) + 10;
        }
        if (!$(".linkLstWrap").hasClass('active')) {
            $(".linkLstWrap").animate({
                'top': '-' + lnkLstTop + 'px',
                'height': $(".linkLstWrap").outerWidth(true)
            }, 800, function () {
                if (mobile.detect() && !tablet.detect()) {
                    $("html,body").animate({
                        "scrollTop": $(".linkLstWrap").offset().top
                    }, 500);
                }
            })
            $(".linkLstWrap").addClass('active');
        } else {
            $(".linkLstWrap").animate({
                'top': lnkLstWidth,
                'height': 0
            }, 800)
            $(".linkLstWrap").removeClass('active').fadeOut(600);
        }
    })

    $("body").on("click", ".hideArrow", function () {
        $(this).removeClass("hideArrow").addClass("showArrow");
        $(this).parents(".readyTab2").find(".existingCustomer").slideUp();
    })

    /*$("body").on("click",".showArrow", function () {
  $(this).removeClass("showArrow").addClass("hideArrow");
  $(this).parents(".microAccessArea").find(".productsListMic").slideDown('slow');
 })
 
 $("body").on("click",".hideArrow", function () {
  $(this).removeClass("hideArrow").addClass("showArrow");
  $(this).parents(".microAccessArea").find(".productsListMic").slideUp();
 })*/

    $("body").on("click", ".collapseUp", function () {
        $(this).removeClass("collapseUp").addClass("collapseDown");
        $(this).parents(".collapseWrap").find(".collapseContent").slideDown('slow');
    })
    $("body").on("click", ".collapseDown", function () {
        $(this).removeClass("collapseDown").addClass("collapseUp");
        $(this).parents(".collapseWrap").find(".collapseContent").slideUp('slow');
    })

    $('.searchIconmMob').click(function () {
        $(this).toggleClass('active');
        $(".searchMobWrap ").toggleClass("active", function () {
            $("#searchBox").text('Search...');
        });
    });

    $(".toolTipLink").click(function (e) {
        $("#text").val(0);
        $("#rm").val("0.00");
        var index = 0;
        var val = $("#tenure > option").eq(index).text();
        $("#tenure > option").eq(index).attr("selected", "selected")
        var str = $("#tenure option:selected").text();
        $("#tenure:first").attr("selected", true);
        $(".sbSelector").text(str);
        $(".tooltip").hide();
        $(this).next().show();
    })
    $(".clsInfoIcon").click(function (e) {
        $(".tooltip").hide();
        $(this).next().show();
        $('.tooltip .scroll-pane').jScrollPane({
            showArrows: true
        });
    })
    $(".tipClose").click(function () {
        $(this).parents(".tooltip").hide();
    })

    $(".tabHeading").click(function () {
        if (!$(this).hasClass("active") && $(this).next().is(":hidden")) {
            //$(this).parents('.tabContentWrap').find(".tabContent").slideUp(400);
            //$(this).parents('.tabContentWrap').find(".tabHeading").removeClass("active");
            $(this).addClass("active").next().slideDown("slow", function () {
                $("html,body").animate({
                    scrollTop: $(this).offset().top - 83
                }, 1000)
            });
        } else {
            $(this).removeClass("active").next().slideUp();
        }
    })

    $("body").on("click", ".appFooterScrolBot", function () {
        $(this).addClass("appFooterScrolTop").removeClass("appFooterScrolBot");
        $(this).parents(".footerMenu").css({
            "height": "auto"
        })
    })
    $("body").on("click", ".appFooterScrolTop", function () {
        $(this).addClass("appFooterScrolBot").removeClass("appFooterScrolTop");
        $(this).parents(".footerMenu").css({
            "height": "16px"
        })
    })

    if (mobile.detect() || param == 'App') {
        $('body').on('click', ".termsMinus", function () {
            $(this).removeClass('termsMinus').addClass('termsPlus');
            $(this).parents('.scrollAreaWrap').siblings('div.TermsAndConditions').slideUp();
        });
        $('body').on('click', ".termsPlus", function () {
            $(this).removeClass('termsPlus').addClass('termsMinus');
            $(this).parents('.scrollAreaWrap').siblings('div.TermsAndConditions').slideDown();
        });
    }

    if (!mobile.detect() && !tablet.detect()) {
        $("body").on("click.fndtn", ".flyout a", function () {
            var parent = $(this).parent().find("div.dropFlyout");
            var object = $(this);
            parent.clearQueue();
            parent.stop();
            $(this).stop();
            if ($(".activeMMenu").size() > 0) {
                $(".activeMMenu").stop(false, false).animate({
                    "top": "-270px"
                }, 500, function () {
                    $(this).removeClass("activeMMenu");
                    $(".megaMenuCnt").css({
                        "height": "0"
                    });
                    $(".activeTab").removeClass("activeTab");
                    if ($(".activeSubMenu").size() > 0) {
                        if (excuted == true) return false;
                        parent.stop();
                        $(".dropFlyoutList").fadeTo("slow", 0, function () {
                            flagDispaly = $(parent).css("display");
                            $(".activeSubMenu").stop(false, false).slideUp('slow', function () {
                                if (flagDispaly != "block") {
                                    parent.addClass("activeSubMenu").stop(false, false).slideToggle(function () {
                                        $(".dropFlyoutList", parent).fadeTo("slow", 1);
                                        $(this).next("css3-container").show();
                                    }).parents("li").addClass("active");
                                }
                            }).removeClass("activeSubMenu").parents("li").removeClass("active");
                        })
                    } else {
                        if (object.parent().find("div.dropFlyout")) {
                            $(".dropFlyoutList", parent).fadeTo("slow", 0);
                            parent.addClass("activeSubMenu").stop(false, false).slideDown(function () {
                                $(".dropFlyoutList", parent).fadeTo("slow", 1);
                                $(this).next("css3-container").show();
                            }).parents("li").addClass("active");
                            excuted = true;
                        }
                    }
                });
            } else {
                if ($(".activeSubMenu").size() > 0) {
                    $(".dropFlyoutList").fadeTo("slow", 0, function () {
                        flagDispaly = $(parent).css("display");
                        $(".activeSubMenu").stop(false, false).slideUp('slow', function () {
                            if (flagDispaly != "block") {
                                parent.addClass("activeSubMenu").stop(false, false).slideToggle(function () {
                                    $(".dropFlyoutList", parent).fadeTo("slow", 1);
                                    $(this).next("css3-container").show();
                                }).parents("li").addClass("active");
                            }
                        }).removeClass("activeSubMenu").parents("li").removeClass("active");
                    })
                } else {
                    if ($(this).parent().find("div.dropFlyout")) {
                        $(".dropFlyoutList", parent).fadeTo("slow", 0);
                        parent.addClass("activeSubMenu").stop(false, false).slideToggle(function () {
                            $(".dropFlyoutList", parent).fadeTo("slow", 1);
                            $(this).next("css3-container").show();
                        }).parents("li").addClass("active");
                    }
                }
            }
        })


        $("body").click(function (e) {
            if (!$(e.target).parents().hasClass("stoppropagationQL")) {
                if ($(".activeSubMenu").size() > 0) {
                    $(".dropFlyoutList").fadeTo("slow", 0, function () {
                        $(".activeSubMenu").stop(false, false).slideUp().removeClass("activeSubMenu").parents("li").removeClass("active");
                    })
                }
            }

            if (!$(e.target).parents(".linkLstWrap").hasClass("active")) {
                $(".linkLstWrap").animate({
                    'top': lnkLstWidth,
                    'height': 0
                }, 800);
                $(".linkLstWrap").removeClass('active').fadeOut(600);
            }

            if (!$(e.target).hasClass("selectTxt")) {
                $('.selectDiv').slideUp('slow');
            }

            if (!$(e.target).hasClass("applyTxt")) {
                $('.applyDiv').slideUp('slow');
            }
            //if($(".cS-generalInfoHolder").css("display") == "block")
            if (!$(e.target).parents().hasClass("cS-holderGeneralInfo")) {
                //$(".generalInfo").parent('div').css({ "position":"relative"});
                $(".generalInfoMenu").fadeOut(200, function () {
                    $(".cS-generalInfoHolder").animate({
                        height: '0px'
                    }, 800, function () {
                        $(this).slideUp('fast', function () {
                            $(".generalInfo").parent('div').animate({
                                width: '175px'
                            }, 1000, function () {
                                $(".generalInfo").parent('div').css("overflow", "hidden");
                                $(".generalInfo").parent('div').css("background-image", "");
                            });
                        });
                        $("a.generalInfo").removeClass("active");
                    });
                });
            }
            if (!$(e.target).hasClass("generalInfoNew")) {
                $('.InfoNew').animate({
                    width: '0px', height: '0px', overflow: 'hidden'
                }), 500
            }
        })
    }

    /*Header Section Start Script*/
    $("#topMnu" + type).attr({
        "href": "javascript:;"
    }).addClass("activeTabHighlight");

    //$(".pageTitle").text(pageTitle)
    //$(".pageTitlePad").text(pageTitle)
    var leftAnimate = {
        "loansSubMenu": "248",
        "CreditSubMenu": "38",
        "lendingSubMenu": "109",
        "homeloanSubmenu": "612",
        "investmentsSubMenu": "181",
        "seviceSubMenu": "385",
        "citibankingSubMenu": "318",
        "citigoldSubMenu": "406"
    };
    $(".mainNavList li").each(function () {
        $("a", this).on('click.fndtn', function (e) {
            e.stopPropagation();
            if ($(".dropFlyout").hasClass("activeSubMenu")) {
                $(".dropFlyout").slideUp().removeClass("activeSubMenu");
                $(".dropFlyout").parent().removeClass("active");
            }
            var object = $(this);
            if ($(this).hasClass("noMegaMenu")) {
                return true;
            }
            if ($(".activeSubMenu").size() > 0) {
                $(".mnuSubCnt").fadeTo("slow", 0, function () {
                    $(".activeSubMenu").stop(false, false).slideUp("slow", function () {
                        showMegaMenu($(object));
                    }).removeClass("activeSubMenu").parents("li").removeClass("active");
                });
            } else showMegaMenu($(this));
            $('.selectDiv').slideUp('slow');
            $(".applyDiv").slideUp('slow');
        })
    })
    $(".mainNavList li").each(function () {
        $("a#commercial", this).on('click.fndtn', function (e) {
            $(".mmSubArrow").hide();
        })
    })

    $(document).click(function (e) {
        if (!$(".top-Navigation").parents(".top-Navigation").hasClass("top-Navigation")) {
            $(".mmSubArrow").hide();
            $(".activeMMenu").animate({
                "top": "-270px"
            }, 1000, function () {
                $(".megaMenuCnt").css({
                    "height": "0"
                });
            })
            $(".activeMMenu").removeClass("activeMMenu");
            $(".activeTab").removeClass("activeTab");
        }
    });

    function showMegaMenu(object) {
        $(".mmSubArrow").hide();
        $(".activeTab").removeClass("activeTab");
        var rel = $(object).addClass('activeTab').attr("rel"),
            id = $(object).attr('id');
        if ($('.activeMMenu').size() > 0) {
            $(".activeMMenu").hide();
            $(".activeMMenu").css('top', "-270px");
            $(object).removeClass("activeMMenu");
            $(".activeTab").removeClass("activeTab");
            $(object).addClass('activeTab');
            $(".megaMenuCnt").css({
                "height": "270px"
            }).promise().done(function () {
                $("#" + rel).addClass('activeMMenu').css("top", "0");
                $("#" + rel).show();
                $(".mmSubArrow").show();
            })
            $(".mmSubArrow").stop(true, false).animate({
                "left": ($('#' + id).position().left - 21 + ($('#' + id).outerWidth(true) - 63) / 2 + 5) + 'px'
            }, 500, function () {
                $(".mmSubArrow").show();
            });
        } else {
            $(".megaMenuCnt").css({
                "height": "270px"
            }).promise().done(function () {
                $("#" + rel).addClass('activeMMenu').animate({
                    "top": "0"
                }, 500, function () {
                    $(".mmSubArrow").show();
                })
                $("#" + rel).show();
            })
            $(".mmSubArrow").css({
                "left": ($('#' + id).position().left - 21 + ($('#' + id).outerWidth(true) - 63) / 2 + 5) + 'px'
            });
        }
    }

    /* all orientation function on page load */
    $("#footer").after("<p id='back-top' style='display:none;'><span></span></p>");

    if ($.browser.msie && $.browser.version <= 9.0) {
        setTimeout(function () {
            $.getScript("/sim/chinese/js/PIE.js", function () {
                if (window.PIE) {
                    $('.rounded, .curvedCorners').each(function () {
                        PIE.attach(this);
                    });
                }
            })
        }, 100);
    }
    $(".tabsmenu li").click(function () {
        $this = $(this);
        $(".tabsmenu li").removeClass('active');
        $(".tabsmenu li > div").removeClass('tabmenutopArrow');
        $this.addClass('active');
        $this.children("div").addClass('tabmenutopArrow');

        $this.parents(".tabsmenuContainer").siblings("div").children(".tabmenuContent").removeClass("active")
            .eq($this.index()).addClass("active");
    });

    $(".tabMenuHeading").click(function () {
        if (!$(this).hasClass("active") && $(this).next().is(":hidden")) {
            $(this).addClass("active").next().slideDown("slow", function () {
                $("html,body").animate({
                    scrollTop: $(this).offset().top - 60
                }, 1000)
            });
        } else {
            $(this).removeClass("active").next().slideUp();
        }
    })
});
$('#commercial').click(function () {
    $(".mmSubArrow").hide();
})




/* call orientation function on orientation change */
$(window).bind('orientationchange', function () {
    setTimeout(function () {
        $(".bannerProd, .bannerHolder").each(function () {
            $(this).show();
            //if ((iPhone5 || iPhone5_1) && screen.width){topper = "40%";}else{topper = "50%"}
            var banerTxtHeight = $(this).find('.bannerTitle').height() / 2;
            $(this).find('.bannerTitle').css({
                'margin-top': -banerTxtHeight,
                'top': '50%'
            });
        })
        $(".dealsHead, .manageHead, .accessibilityHead").each(function () {
            //if ((iPhone5 || iPhone5_1) && screen.width){topper = "40%";}else{topper = "50%"}
            var banerTxtHeight = $(this).find('.left').height() / 2;
            $(this).find('.left').css({
                'margin-top': -banerTxtHeight,
                'top': '52%',
                'position': 'relative'
            });
        })
        myEqualHeight()
    }, 100);
});
$(window).load(function () {
    setTimeout(myEqualHeight, 250);
    $(".lftNavMo").html('<div class="pageTitle visible-phone">' + pageTitle + '</div>');
    setTimeout(function () {
        if (location.href.indexOf("/sim/chinese/readycredit/") > 0 || location.href.indexOf("https://www.citibank.com.my/chinese/forms/readycredit-kana-form.html") > 0) { $(".creditcardIcon").remove() }
    }, 50);
});

$(function () {
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('#back-top').fadeIn();
        } else {
            $('#back-top').fadeOut();
        }
    });

    // scroll body to 0px on click
    $('#back-top span').click(function () {
        $('body,html').animate({
            scrollTop: 0
        }, 800);
        return false;
    });

});



if (mobile.detect() || tablet.detect()) {
    /*Zepto for Css3 */
    if ('__proto__' in {}) {
        document.write("<script src='/sim/chinese/js/zepto.js'></script>");
        $(function () {
            Zepto("body,html").tap(function (e) {
                if (!Zepto(e.target).hasClass("mainMenuIcon") && !Zepto(e.target).parents(".mainNav").hasClass("mainNav")) {
                    $("#nav").slideUp();
                    $(".mainMenuIcon ").removeClass("active");
                }
                if (!Zepto(e.target).hasClass("leftNavIcon") && !Zepto(e.target).hasClass("leftNavIconDown") && !Zepto(e.target).parents("#sidebar").is(":visible")) {
                    $("#sidebar").slideUp();
                    $('.leftNavIconDown').removeClass('leftNavIconDown').addClass('leftNavIcon');
                }
                if (!Zepto(e.target).hasClass("lftNavMo") && !Zepto(e.target).hasClass("active") && !Zepto(e.target).parents("#sidebar").is(":visible")) {
                    $("#sidebar").slideUp();
                    $('.lftNavMo').removeClass('active');
                }
                if (!Zepto(e.target).parents(".importantLinks").hasClass("importantLinks") && $(".dropdown").is(":visible")) {
                    $(".dropdown").slideUp();
                }
            })
        })
    }
    /*Zepto for Css3 */
}


function getParameter(parmeter) {
    var sli = ""
    var a = top.window.location;
    str = new String(a)
    var index = str.indexOf(parmeter);
    if (index != -1) {
        var str1 = str.substring(index);
        var index1 = str1.indexOf("&");
        if (index1 == -1) {
            var index = str1.indexOf("=");
            var sli = str1.slice(index + 1);
        } else {
            var index = str1.indexOf("=");
            var sli = str1.slice(index + 1, index1);
        }
    }
    return sli;
}

/*For Footer Links*/
var externallinkty = 0;

function toggleExternalLinks() {
    if (externallinkty == 0) {
        document.getElementById("externallinkscontainer").style.display = "";
        moveUpExternalLink();
    } else moveDownExternalLink();
}

function moveUpExternalLink() {
    if (externallinkty > -190) {
        externallinkty -= 10;
        $('#externallinks').animate({
            top: '-=10'
        }, 30, moveUpExternalLink);
    } else {

    }
}

function moveDownExternalLink() {
    if (externallinkty < 0) {
        externallinkty += 10;
        $('#externallinks').animate({
            top: '+=10'
        }, 30, moveDownExternalLink);
    } else document.getElementById("externallinkscontainer").style.display = "none";
}

function populateExternalLink() {
    var out = '<div id="externallinksviewarea"><div id="externallinks"><p><a href="https://www.asia.citibank.com/malaysia/corporate" target="_blank">Corporate Banking</a></p>' +
        '<p><a href="javascript:top.Createlink(\'http://www.bnm.gov.my/,null,1,Y,null,null\')">Bank Negara Malaysia</a></p>' +
        '<p><a href="javascript:top.Createlink(\'http://bankinginfo.com.my,null,1,Y,null,null\')">Banking Info</a></p> ' +
        '<p><a href="javascript:top.Createlink(\'http://www.pidm.gov.my/,null,1,Y,null,null\')">Malaysia Deposit Insurance Corporation (PIDM)</a></p> ' +
        '<p><a href="javascript:top.Createlink(\'http://www.fmb.org.my/,null,1,Y,null,null\')">Financial Mediation Bureau (FMB)</a></p>' +
        '<p><a href="javascript:top.Createlink(\'http://www.mifc.com/,null,1,Y,null,null\')">Malaysia International Islamic Financial Center (MIFC)</a></p> ' +
        '<p><a href="javascript:top.Createlink(\'http://www.smeinfo.com.my/,null,1,Y,null,null\')">SMEinfo Portal</a></p>' +
        '<p><a href="javascript:top.Createlink(\'http://www.speaksens.com.my/,null,1,Y,null,null\')">Speaksens</a></p>' +
        '<p><a href="javascript:top.Createlink(\'http://www.akpk.org.my/,null,1,Y,null,null\')">Credit Counseling and Debt Management Agency (AKPK)</a></p></div></div>';
    if (document.getElementById("externallinkscontainer") != undefined) {
        document.getElementById("externallinkscontainer").style.display = "none";
        document.getElementById("externallinkscontainer").innerHTML = out;
    }
}

function capitaliseTxt(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

String.prototype.capitalize = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

function convert_case(str) {
    return str.toLowerCase().replace(/(^| )(\w)/g, function (x) {
        return x.toUpperCase();
    });
}

function sb(url) {
    var name = confirm("You are now leaving the Citibank Malaysia website and entering a third party website.\n\nAny information you may provide on the third party website shall be subject to the confidentiality and security terms of such website and not the privacy policies of Citibank Malaysia, and Citibank Malaysia shall not bear any responsibility for any unauthorised disclosure or breach of confidentiality in relation to such  information provided.\n\nFurthermore any link to a third party website contained herein does not constitute an endorsement by Citibank Malaysia of such third party, their website or their products and/or services, and Citibank Malaysia also makes no warranties as to the content of such website.\n\nWould you like to continue?");
    if (name) {
        window.open(url);
    }
}

function filter(card) {
    var m, e = 0,
        i;
    var $prd = '';
    for (m = 0; m < Math.ceil($("." + card).length / 3); m++) {
        $prd += '<div class="productWrap">';
        for (i = e; i <= e + 2; i++) {
            if ($('.productsList').eq(i).is(':visible')) {
                $prd += '<div class="productsList ' + card + '">' + $('.productsList').eq(i).html() + '</div>';
            }
        }
        e = i;
        $prd += '</div>';
    }
    $(".productsMain").html('').html($prd);
    count = 1;
    $("." + card).each(function (i) {
        if (count == 1) {
            $(this).addClass("left");
        }
        if (count == 2) {
            $(this).addClass("center");
        }
        if (count == 3) {
            $(this).addClass("right");
        }
        count++;
        if (count == 4) {
            count = 1;
        }
    });
    $(".productWrap:last").addClass('last');
}


//user agent &  Mobile Login appAlertWrapper
$(document).ready(function () {
    var deviceIphone = "iphone";
    var deviceIpod = "ipod";
    var deviceIpad = "ipad";
    var devicePalm = "palm";
    var deviceS60 = "series60";
    var deviceSymbian = "symbian";
    var engineWebKit = "webkit";
    var deviceAndroid = "android";
    var deviceWinMob = "windows ce";
    var deviceWinPhone = "windows phone";
    var deviceBB = "blackberry";
    //Initialize our user agent string to lower case.
    var uagent = navigator.userAgent.toLowerCase();
    if (uagent.search(deviceIphone) > -1 || uagent.search(deviceIpad) > -1 || uagent.search(deviceIpod) > -1) {
        $('.appStoreWrap').html('<a href="http://itunes.apple.com/us/app/citibank-cn/id444660435?mt=8"><img src="/sim/chinese/images/mobile/appStore.png" alt="App Store" /></a>');
    }
    else if (uagent.search(deviceAndroid) > -1) {
        $('.appStoreWrap').html('<a href="https://www.citibank.com.cn/chinese/mbol/app/Citibank_CN.apk"><img src="/sim/chinese/images/mobile/android.png" alt="App Store" /></a>');
    }
    else {
        $('.appStoreWrap').remove();
    }
    if ((navigator.userAgent.match(/(iPhone|Android)/i))) {
        $(window).resize(function () {
            winResize();
        });
        winResize();

        function winResize() {
            console.log('resize');
            var winWidth = $(window).width();
            $('.popupminsingleNew').css({ width: winWidth - 56 });
        }
    }
    else {
        $('.popupminsingleNew').css({ width: 500 });
    }
});


function showSwitchService(o) {
    var list = $('div[id^=switch_L]');
    list.hide();
    document.getElementById(o).style.display = "block";
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'relative';
    if (document.getElementById('position')) {
        var bullets01 = document.getElementById('position').getElementsByTagName('li');
        var banner01 = Swipe(document.getElementById('mySwipe'), {
            continuous: true,
            disableScroll: false,
            callback: function (pos) {
                var i = bullets01.length;
                while (i--) {
                    bullets01[i].className = ' ';
                }
                bullets01[pos].className = 'cur';
            }
        })
    }
    if (document.getElementById('position02')) {
        var bullets02 = document.getElementById('position02').getElementsByTagName('li');
        var banner02 = Swipe(document.getElementById('mySwipe02'), {
            continuous: true,
            disableScroll: false,
            callback: function (pos) {
                var i = bullets02.length;
                while (i--) {
                    bullets02[i].className = ' ';
                }
                bullets02[pos].className = 'cur';
            }
        })
    }

    if (document.getElementById('position03')) {
        var bullets03 = document.getElementById('position03').getElementsByTagName('li');
        var banner03 = Swipe(document.getElementById('mySwipe03'), {
            continuous: true,
            disableScroll: false,
            callback: function (pos) {
                var i = bullets03.length;
                while (i--) {
                    bullets03[i].className = ' ';
                }
                bullets03[pos].className = 'cur';
            }
        })
    }
}
function hideSwitchService(o) {
    document.getElementById(o).style.display = "none";
    document.body.style.overflow = 'auto';
}
// 获取初始菜单默认加载
$(document).ready(function () {
    $.extend({
        getUrlVars: function () {
            var vars = [], hash;
            var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
            for (var i = 0; i < hashes.length; i++) {
                hash = hashes[i].split('=');
                vars.push(hash[0]);
                vars[hash[0]] = hash[1];
            }
            return vars;
        },
        getUrlVar: function (name) {
            return $.getUrlVars()[name];
        }
    });

    // Get object of URL parameters
    var allVars = $.getUrlVars();

    // Getting URL var by its nam
    var byName = $.getUrlVar('name');
    if (byName == "lilv") {
        $("#lilv").click();
    }
    if (byName == "doll") {
        $("#doll").click();
    }

    if (byName == "juli") {
        $("#juli").click();
    }


});


$(function () {
    $('.popupminsingle').bind('touchmove', function () {
        $('.zhishi').hide();
    }).bind('touchend', function () {
        $('.zhishi').show();
    });
});

$(document).ready(function () {
    $(".minusAp").toggle(
        function () {
            $(this).addClass('plusAm');
            $(this).siblings('.newggbox .newgg').show();
        },
        function () {
            $(this).removeClass('plusAm');
            $(this).siblings('.newggbox .newgg').hide();
        }
    );
});


//Cookie
function setExpiration(cookieLife) {
    var today = new Date();
    var expr = new Date(today.getTime() + cookieLife * 24 * 60 * 60 * 1000);
    return expr.toGMTString();
}
function setCookie(name, value, expires, path, domain, secure) {
    cookieStr = name + "=" + escape(value) + "; ";

    if (expires) {
        expires = setExpiration(expires);
        cookieStr += "expires=" + expires + "; ";
    }
    if (path) {
        cookieStr += "path=" + path + "; ";
    }
    if (domain) {
        cookieStr += "domain=" + domain + "; ";
    }
    if (secure) {
        cookieStr += "secure; ";
    }

    document.cookie = cookieStr;
}
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1);
        if (c.indexOf(name) != -1) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
if (location.href.search('/english/') != -1 || location.href.search('/english/') != -1 || location.href.search('/global_docs/english/') != -1 || location.href.search('/e-welcome/english/') != -1) {
    if (navigator.cookieEnabled) {
        var english_count = getCookie("english");
        if (english_count == "") {
            setCookie("english", '1', 900, '/');
        } else {
            setCookie("english", parseInt(english_count) + 1, 900, '/');
        }
    }
    else {

    }
}

if (location.href.search('/chinese/') != -1 || location.href.search('/chinese/') != -1 || location.href.search('/global_docs/chinese/') != -1 || location.href.search('/e-welcome/chinese/') != -1) {
    if (navigator.cookieEnabled) {
        var chinese_count = getCookie("hk_chinese");
        if (chinese_count == "") {
            setCookie("chinese", '1', 900, '/');
        } else {
            setCookie("chinese", parseInt(chinese_count) + 1, 900, '/');
        }
    }
}

//shortcut
$(document).ready(function () {
    var sc_r = document.createElement("script");
    sc_r.type = "text/javascript";
    if (location.href.search("/english/") != -1 || location.href.search("/english/") != -1 || location.href.search("/eng/") != -1 || location.href.search("/en/") != -1) {
        sc_r.src = "/sim/english/js/cookies.js";
    }
    else {
        sc_r.src = "/sim/chinese/js/cookies.js";
    }
    $("head").append(sc_r);
});
