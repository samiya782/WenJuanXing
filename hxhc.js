(async function() {
  'use strict';
  const fileUploadButton = document.createElement('input');
  fileUploadButton.type = "file";
  fileUploadButton.accept = ".xlsx";
  fileUploadButton.innerText = "严总专用按钮";
  fileUploadButton.style.position = 'fixed';
  fileUploadButton.style.top = '50px';
  fileUploadButton.style.left = '20px';
  document.body.appendChild(fileUploadButton);

  fileUploadButton.onchange = async (e) => {
    let file = e.target.files[0];
    let xlsxURL = window.URL.createObjectURL(file);
    let workbook = XLSX.read(await (await fetch(xlsxURL)).arrayBuffer())
    let worksheet = workbook.Sheets[workbook.SheetNames[0]];
    // let workbook = XLSX.readFile(file.name);
    // let worksheet = workbook.Sheets[workbook.SheetNames[5]];
    // 数组的数组
    let raw_data = XLSX.utils.sheet_to_json(worksheet, {header: 1});
    // 对象的数组
    // let raw_data = XLSX.utils.sheet_to_json(worksheet);
    // 分段请求
    let len = 500;
    const errLog = [];
    for(let cur = 0; cur < raw_data.length; cur += len) {
      const promArr = new Array(len);
      for (let i = cur; i < Math.min(cur + len, raw_data.length); ++i) {
        if (!(/(?:(?:1[0-9][0-9]\.)|(?:2[0-4][0-9]\.)|(?:25[0-5]\.)|(?:[1-9][0-9]\.)|(?:[0-9]\.)){3}(?:(?:1[0-9][0-9])|(?:2[0-4][0-9])|(?:25[0-5])|(?:[1-9][0-9])|(?:[0-9]))/.test(raw_data[i][0]))) {
          console.log('第', i, '行，ip为', raw_data[i][0], '不是IPv4地址');
          continue;
        }
        promArr[i % len] = fetch('http://wlzy.oss.anhuitelecom.com:10658/PROD-OSS/inventory/product/mgr/queryProductByCode', {
          method: 'POST',
          headers: new Headers({
            'Content-Type': 'application/json;charset=UTF-8',
            'Axios-Token': window.localStorage.token
          }),
          body: JSON.stringify({
            IPCODE: raw_data[i][0]
          })
        })
      }
      for (let i = cur; i < Math.min(cur + len, raw_data.length); ++i) {
        if (!promArr[i % len]) {
          continue;
        }
        const response = await promArr[i % len];
        if (!response.ok) {
          console.log('第', i, '行，ip为', raw_data[i][0], '请求失败');
        }
        const data = await response.json().then(res => res, () => {errLog.push([i, raw_data[i]]); return undefined});
        if (data?.data) {
          data.data = data.data.filter((prod) => {
            return prod.PRODUCT_USE_SERVICE[0].NAME.indexOf('互联网专线') !== -1;
          });
          for (const val of data.data) {
            if (val.hasOwnProperty('CUSTOMER_NAME') || val.hasOwnProperty('ACCESS_CODE'))
              raw_data[i].push(val?.CUSTOMER_NAME, val?.ACCESS_CODE);
          }
        }
        console.log(i, 'of', raw_data.length, raw_data[i]);
      }
    }
    console.log("errLog", errLog);
    window.URL.revokeObjectURL(xlsxURL);
    let retsheet = XLSX.utils.aoa_to_sheet(raw_data);
    let retbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(retbook, retsheet, "Sheet1");
    XLSX.writeFileXLSX(retbook, new Date().valueOf() + ".xlsx", {compression: true});
  }
})();
