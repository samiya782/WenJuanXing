// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        http://wlzy.oss.anhuitelecom.com:10658/inventory/web/product/view/LineCodeSearch@351300000000000000360703?menuid=351300000000000000360703&path=com.ccssoft.inventory.web.product.view.LineCodeSearch
// @icon         https://www.google.com/s2/favicons?sz=64&domain=anhuitelecom.com
// @grant        none
// @require      file://D:/Users/yuchanggeng/Downloads/xlsx.full.min.js
// ==/UserScript==

(async function() {
    'use strict';
    const fileUploadButton = document.createElement('input');
    fileUploadButton.type = "file",
        fileUploadButton.accept = ".xlsx"
    fileUploadButton.innerText = "严总专用按钮";
    fileUploadButton.style.position = 'fixed';
    fileUploadButton.style.top = '50px';
    fileUploadButton.style.left = '20px';
    document.body.appendChild(fileUploadButton);

    fileUploadButton.onchange = async (e) => {
        let file = e.target.files[0];
        console.log(file);
        let xlsxURL = window.URL.createObjectURL(file);
        // console.log(xlsxURL)
        let workbook = XLSX.read(await (await fetch(xlsxURL)).arrayBuffer())
        let worksheet = workbook.Sheets[workbook.SheetNames[5]];
        // let workbook = XLSX.readFile(file.name);
        // let worksheet = workbook.Sheets[workbook.SheetNames[5]];
        // 数组的数组
        let raw_data = XLSX.utils.sheet_to_json(worksheet, {header: 1});
        // 对象的数组
        // let raw_data = XLSX.utils.sheet_to_json(worksheet);
        // console.log(raw_data);
        let ret = new Array(raw_data.length);
        ret[0] = raw_data[0];
        let promArr = new Array(10);
        promArr[0] = Promise.resolve();
        for(let i = 1; i < raw_data.length; ++i) {
            /*fetch('http://wlzy.oss.anhuitelecom.com:10658/PROD-OSS/inventory/product/mgr/queryProductByCode', {
                method: 'POST',
                headers: new Headers({
                    'Content-Type': 'application/json;charset=UTF-8',
                    'Axios-Token': window.localStorage.token
                }),
                body: JSON.stringify({
                    IPCODE: raw_data[i][0]
                })
            }).then((res)=> res.json()).then((data)=> {
                // console.log(data);
                ret[i] = [raw_data[i][0], data.data[0]?.CUSTOMER_NAME, data.data[0]?.ACCESS_CODE];
            });*/
            /*
            promArr[i] = new Promise((resolve) => {
                if(!(/(?:(?:1[0-9][0-9]\.)|(?:2[0-4][0-9]\.)|(?:25[0-5]\.)|(?:[1-9][0-9]\.)|(?:[0-9]\.)){3}(?:(?:1[0-9][0-9])|(?:2[0-4][0-9])|(?:25[0-5])|(?:[1-9][0-9])|(?:[0-9]))/.test(raw_data[i][0]))) {
                    resolve();
                }
                fetch('http://wlzy.oss.anhuitelecom.com:10658/PROD-OSS/inventory/product/mgr/queryProductByCode', {
                    method: 'POST',
                    headers: new Headers({
                        'Content-Type': 'application/json;charset=UTF-8',
                        'Axios-Token': window.localStorage.token
                    }),
                    body: JSON.stringify({
                        IPCODE: raw_data[i][0]
                    })
                }).then((res)=> res.json()).then((data)=> {
                    // console.log(data);
                    if(data.data) {
                        data.data = data.data.filter((prod)=> {
                            return prod.PRODUCT_USE_SERVICE[0].NAME.indexOf('互联网专线') !== -1;
                        });
                        // console.log(data.data);
                        ret[i] = [raw_data[i][0], data.data[0]?.CUSTOMER_NAME, data.data[0]?.ACCESS_CODE];
                    }
                    else {
                        ret[i] = [raw_data[i][0], , ];
                    }
                }).then(()=> resolve());
            });
             */
        }
        // console.log(ret);
        Promise.all(promArr).then(()=> {
            window.URL.revokeObjectURL(xlsxURL);
            console.log(ret);
            let retsheet = XLSX.utils.aoa_to_sheet(ret);
            let retbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(retbook, retsheet, "Sheet1");
            XLSX.writeFileXLSX(retbook, new Date().valueOf() + ".xlsx", {compression: true});
        });
    }
})();

fetch("http://crmauth.crm.anhuitelecom.com:16010/custManage/cust/queryCustMgrInfoServlet.do", {
    "headers": {
        "accept": "application/json, text/javascript, */*; q=0.01",
        "accept-language": "zh-TW,zh-CN;q=0.9,zh;q=0.8,en;q=0.7,en-GB;q=0.6,en-US;q=0.5",
        "content-type": "application/x-www-form-urlencoded;charset=UTF-8",
        "x-kl-ajax-request": "Ajax_Request",
        "x-requested-with": "XMLHttpRequest"
    },
    "referrer": "http://crmauth.crm.anhuitelecom.com:16010/custManage/portal/custManage/custFullView/custInfoView.html",
    "referrerPolicy": "strict-origin-when-cross-origin",
    "body": "entityType=10&entityId=55190349311",
    "method": "POST",
    "mode": "cors",
    "credentials": "include"
});
