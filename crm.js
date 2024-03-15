(function () {
  'use strict';
  // Your code here...
  const fileUploadButton = document.createElement('input');
  fileUploadButton.type = "file"
  fileUploadButton.accept = ".xlsx"
  fileUploadButton.innerText = "严总专用按钮";
  fileUploadButton.style.position = 'fixed';
  fileUploadButton.style.top = '20px';
  fileUploadButton.style.left = '20px';
  fileUploadButton.style.zIndex = '9999';
  document.querySelector("#jQUi > div.header").appendChild(fileUploadButton);
  //document.body.appendChild(fileUploadButton);
  fileUploadButton.onchange = async (e) => {
    let file = e.target.files[0];
    console.log(file);
    let xlsxURL = window.URL.createObjectURL(file);
    let workbook = XLSX.read(await (await fetch(xlsxURL)).arrayBuffer())
    let worksheet = workbook.Sheets[workbook.SheetNames[0]];
    let raw_data = XLSX.utils.sheet_to_json(worksheet, {header: 1});
    console.log(raw_data)
    let len = 500;
    const errLog = [];
    for(let cur = 0; cur < raw_data.length; cur += len) {
      const promArr = new Array(len);
      const interArr = new Array(len);
      const custArr = new Array(len);
      for (let i = cur; i < Math.min(cur + len, raw_data.length); ++i) {
        if(raw_data[i].length <= 2) {
          continue;
        }
        promArr[i % len] = fetch("/custManage/portal/custManage/onlyQuery/prod.do", {
          "headers": {
            "accept": "application/json, text/javascript, */*; q=0.01",
            "accept-language": "zh-TW,zh-CN;q=0.9,zh;q=0.8,en;q=0.7,en-GB;q=0.6,en-US;q=0.5",
            "content-type": "application/x-www-form-urlencoded;charset=UTF-8",
            "x-requested-with": "XMLHttpRequest"
          },
          "body": `serviceName=queryCustList&reqObj=%7B%22accNbr%22%3A%22${raw_data[i][2]}%22%2C%22codeType%22%3A%22valid_status%22%2C%22limitFlag%22%3A%221%22%7D&pageInfo=%7B%22pageNo%22%3A%221%22%2C%22pageSize%22%3A%225%22%7D`,
          "method": "POST",
        });
        interArr[i % len] = fetch("http://crmauth.crm.anhuitelecom.com:16010/custManage/packAcpt/queryProdInfoServlet.do", {
          "headers": {
            "accept": "application/json, text/javascript, */*; q=0.01",
            "accept-language": "zh-TW,zh-CN;q=0.9,zh;q=0.8,en;q=0.7,en-GB;q=0.6,en-US;q=0.5",
            "content-type": "application/x-www-form-urlencoded;charset=UTF-8",
            "x-kl-ajax-request": "Ajax_Request",
            "x-requested-with": "XMLHttpRequest"
          },
          "body": `accNbr=${raw_data[i][2]}`,
          "method": "POST",
        });
      }
      for (let i = cur; i < Math.min(cur + len, raw_data.length); ++i) {
        if (!promArr[i]) {
          continue;
        }
        let custId = (await (await promArr[i]).json()).resultObject?.customers?.[0]?.custId;
        if (!custId) {
          errLog.push([i, raw_data[i]]);
          continue;
        }
        // second
        promArr[i % len] = fetch("/custManage/portal/custManage/onlyQuery/prod.do", {
          "headers": {
            "accept": "application/json, text/javascript, */*; q=0.01",
            "accept-language": "zh-TW,zh-CN;q=0.9,zh;q=0.8,en;q=0.7,en-GB;q=0.6,en-US;q=0.5",
            "content-type": "application/x-www-form-urlencoded;charset=UTF-8",
            "x-requested-with": "XMLHttpRequest"
          },
          "body": `serviceName=getCustDesensitizationDetail&reqObj=%7B%22custId%22%3A%22${custId}%22%7D`,
          "method": "POST",
        })
        custArr[i % len] = fetch("http://crmauth.crm.anhuitelecom.com:16010/custManage/cust/queryCustMgrInfoServlet.do", {
          "headers": {
            "accept": "application/json, text/javascript, */*; q=0.01",
            "accept-language": "zh-TW,zh-CN;q=0.9,zh;q=0.8,en;q=0.7,en-GB;q=0.6,en-US;q=0.5",
            "content-type": "application/x-www-form-urlencoded;charset=UTF-8",
            "x-kl-ajax-request": "Ajax_Request",
            "x-requested-with": "XMLHttpRequest"
          },
          "body": `entityType=10&entityId=${custId}`,
          "method": "POST",
        });
      }
      for (let i = cur; i < Math.min(cur + len, raw_data.length); ++i) {
        let secondJSON = await (await promArr[i % len])?.json().then(res => res, () => {errLog.push([i, raw_data[i]]); return undefined});
        let internetAccessJSON = await (await interArr[i % len])?.json().then(res => res, () => {errLog.push([i, raw_data[i]]); return undefined});
        let custMgrJSON = await (await custArr[i % len])?.json().then(res => res, () => {errLog.push([i, raw_data[i]]); return undefined});
        raw_data[i] = [raw_data[i][0], raw_data[i][1], raw_data[i][2], secondJSON?.resultObject?.customerDetail?.contactsInfo?.[0]?.contactName, secondJSON?.resultObject?.customerDetail?.certNum, secondJSON?.resultObject?.customerDetail?.certiTypeName, secondJSON?.resultObject?.customerDetail?.contactsInfo?.[0]?.contactTelNbr, internetAccessJSON?.resultObject?.prodInstDetail?.installAddr, custMgrJSON?.mgrName, custMgrJSON?.mgrMobile]
        console.log(i, 'of', raw_data.length, 'result is', raw_data[i]);
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
