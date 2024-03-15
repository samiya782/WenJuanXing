(function() {
  'use strict';
/*  const events = ["visibilitychange", "webkitvisibilitychange", "msvisibilitychange", "mozvisibilitychange", "blur"];
  const listeners = getEventListeners(document);
  let listenFuncs = [];
  for (e of events) {
    if (e in listeners) {
      listenFuncs.push(listeners[e]);
    }
  }
  for (func of listenFuncs) {
    for (f of func) {
      document.removeEventListener(f.type, f.listener)
    }
  }*/
/*  const events = ["visibilitychange", "webkitvisibilitychange", "msvisibilitychange", "mozvisibilitychange", "blur"];
  const oldAdd = EventTarget.prototype.addEventListener;
  EventTarget.prototype.addEventListener = function (eventName, func, ...args) {
    if (events.indexOf(eventName) != -1) {
      console.log("拦截", eventName, "事件");
      return;
    }
    oldAdd.call(this, eventName, func, ...args);
  }*/

  /*\
|*|
|*|  :: cookies.js ::
|*|
|*|  A complete cookies reader/writer framework with full unicode support.
|*|
|*|  https://developer.mozilla.org/zh-CN/docs/DOM/document.cookie
|*|
|*|  This framework is released under the GNU Public License, version 3 or later.
|*|  http://www.gnu.org/licenses/gpl-3.0-standalone.html
|*|
|*|  Syntaxes:
|*|
|*|  * docCookies.setItem(name, value[, end[, path[, domain[, secure]]]])
|*|  * docCookies.getItem(name)
|*|  * docCookies.removeItem(name[, path], domain)
|*|  * docCookies.hasItem(name)
|*|  * docCookies.keys()
|*|
\*/

  var docCookies = {
    getItem: function (sKey) {
      return (
        decodeURIComponent(
          document.cookie.replace(
            new RegExp(
              "(?:(?:^|.*;)\\s*" +
              encodeURIComponent(sKey).replace(/[-.+*]/g, "\\$&") +
              "\\s*\\=\\s*([^;]*).*$)|^.*$",
            ),
            "$1",
          ),
        ) || null
      );
    },
    setItem: function (sKey, sValue, vEnd, sPath, sDomain, bSecure) {
      if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) {
        return false;
      }
      var sExpires = "";
      if (vEnd) {
        switch (vEnd.constructor) {
          case Number:
            sExpires =
              vEnd === Infinity
                ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT"
                : "; max-age=" + vEnd;
            break;
          case String:
            sExpires = "; expires=" + vEnd;
            break;
          case Date:
            sExpires = "; expires=" + vEnd.toUTCString();
            break;
        }
      }
      document.cookie =
        encodeURIComponent(sKey) +
        "=" +
        encodeURIComponent(sValue) +
        sExpires +
        (sDomain ? "; domain=" + sDomain : "") +
        (sPath ? "; path=" + sPath : "") +
        (bSecure ? "; secure" : "");
      return true;
    },
    removeItem: function (sKey, sPath, sDomain) {
      if (!sKey || !this.hasItem(sKey)) {
        return false;
      }
      document.cookie =
        encodeURIComponent(sKey) +
        "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" +
        (sDomain ? "; domain=" + sDomain : "") +
        (sPath ? "; path=" + sPath : "");
      return true;
    },
    hasItem: function (sKey) {
      return new RegExp(
        "(?:^|;\\s*)" +
        encodeURIComponent(sKey).replace(/[-.+*]/g, "\\$&") +
        "\\s*\\=",
      ).test(document.cookie);
    },
    keys: /* optional method: you can safely remove it! */ function () {
      var aKeys = document.cookie
        .replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "")
        .split(/\s*(?:\=[^;]*)?;\s*/);
      for (var nIdx = 0; nIdx < aKeys.length; nIdx++) {
        aKeys[nIdx] = decodeURIComponent(aKeys[nIdx]);
      }
      return aKeys;
    },
  };
  docCookies.removeItem(window.activityId+"_cheatTimes");
  localStorage.removeItem("preventcheat_" + window.activityId);
  document.onkeydown = function() {
    var e = window.event || arguments[0];
    if (e.keyCode == 122) {
      //	alert('禁止F12');
      return false;
    }
  }
  document.addEventListener('visibilitychange', function(e){e.stopPropagation()}, true);
  const oldRead = window.readCookie;
  const oldWrite = window.setCookie;
  window.readCookie = function (key, ...args) {
    if (key == window.activityId+"_cheatTimes") {
      return 0;
    }
    return oldRead(key, ...args)
  }
  window.setCookie = function (key, value, ...args) {
    if (key == window.activityId+"_cheatTimes") {
      // oldWrite(key, 0, ...args);
      return;
    }
    return oldWrite(key, value, ...args)
  }
  const setItem = function(key, value) {
    if (key == "preventcheat_" + window.activityId) {
      return ;
    }
    return Reflect.set(storageProxy, key, value)
  }
  const getItem = function(key) {
    if (key == "preventcheat_" + window.activityId) {
      return ;
    }
    return Reflect.get(storageProxy, key)
  }
  const removeItem = function(key) {
    return Reflect.deleteProperty(storageProxy, key)
  }

  const clear = function() {
    for (const key in storageProxy) {
      Reflect.deleteProperty(storageProxy, key)
    }
    return false
  }
  const storageProxy = new Proxy(window.localStorage, {
    set: function(ls, key, newValue) {
      if (typeof key === 'string') {
        if ("preventcheat_" + window.activityId) {
          return ;
        }
        return Reflect.set(ls, key, newValue)//EncryptUtil.Encrypt(newValue, 'XXXXX')是数据加密
      }
    },
    get: function(ls, prop) {
      if (typeof prop === 'string' && prop === 'setItem') {
        return setItem
      } else if (prop === 'getItem') {
        return getItem
      } else if (prop === 'clear') {
        return clear
      } else if (prop === 'removeItem') {
        return removeItem
      }
      if (prop == "preventcheat_" + window.activityId) {
        return null;
      }
      return Reflect.get(ls, prop) ?? null // 没值时返回undefined,进行JSON.parse解析会报错
    }
  })
  Object.defineProperty(window, 'localStorage', {
    configurable: true,
    enumerable: true,
    value: storageProxy
  })
})();
