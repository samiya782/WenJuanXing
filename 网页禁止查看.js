//禁用右键 //禁用右键开关
document.onkeydown = function() {
  var e = window.event || arguments[0];
  if (e.keyCode == 123) {
    //	alert('禁止F12');
    return false;
  } else if ((e.ctrlKey) && (e.shiftKey) && (e.keyCode == 73)) {
    //	alert('禁止Ctrl+Shift+I');
    return false;
  } else if ((e.ctrlKey) && (e.keyCode == 85)) {
    //	alert('禁止Ctrl+u');
    return false;
  } else if ((e.ctrlKey) && (e.keyCode == 83)) {
    //	alert('禁止Ctrl+s');
    return false;
  }
}
// 屏蔽鼠标右键
document.oncontextmenu = function() {
  //alert('禁止右键');
  return false;
}

((function () {
    var callbacks = []
      , timeLimit = 50
      , open = false;
    setInterval(loop, 1);
    return {
      addListener: function (fn) {
        callbacks.push(fn);
      },
      cancleListenr: function (fn) {
        callbacks = callbacks.filter(function (v) {
          return v !== fn;
        });
      }
    }

    function loop () {
      var startTime = new Date();
      debugger;
      if (new Date() - startTime > timeLimit) {
        if (!open) {
          callbacks.forEach(function (fn) {
            fn.call(null);
          });
        }
        open = true;
        window.stop();
        alert('禁止查看');
        window.location.reload();
      } else {
        open = false;
      }
    }
  }
)())
  .addListener(function () {
    window.location.reload();
  });
