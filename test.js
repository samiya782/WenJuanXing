(function() {
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
        let ret = new Array(raw_data.length);
        ret[0] = raw_data[0];
        let promArr = new Array(raw_data.length);
        promArr[0] = Promise.resolve();
        for(let i = 1; i < raw_data.length; ++i) {
            promArr[i] = new Promise((resolve) => {
                fetch('/custManage/packAcpt/queryProdInfoServlet.do',{
                    method: 'POST',
                    headers: {
                        "accept": "application/json, text/javascript, */*; q=0.01",
                        "accept-language": "zh-TW,zh-CN;q=0.9,zh;q=0.8,en;q=0.7,en-GB;q=0.6,en-US;q=0.5",
                        "content-type": "application/x-www-form-urlencoded;charset=UTF-8",
                        "x-requested-with": "XMLHttpRequest"
                    },
                    body: `accNbr=${}&custId=55100089055`,
                }).then((res)=> res.json()).then((data)=> {
                    console.log(data);
                })
            })
        }
        Promise.all(promArr).then(()=> {
            // console.log(ret);
            window.URL.revokeObjectURL(xlsxURL);
            let retsheet = XLSX.utils.aoa_to_sheet(ret);
            let retbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(retbook, retsheet, "Sheet1");
            XLSX.writeFileXLSX(retbook, new Date().valueOf() + ".xlsx", {compression: true});
        });
    }
})();

new Promise((resolve) => {
    fetch("/custManage/portal/custManage/onlyQuery/prod.do", {
        "headers": {
            "accept": "application/json, text/javascript, */*; q=0.01",
            "accept-language": "zh-TW,zh-CN;q=0.9,zh;q=0.8,en;q=0.7,en-GB;q=0.6,en-US;q=0.5",
            "content-type": "application/x-www-form-urlencoded;charset=UTF-8",
            "x-requested-with": "XMLHttpRequest"
        },
        "body": "serviceName=getCustDesensitizationDetail&reqObj=%7B%22custId%22%3A%2255100089055%22%7D",
        "method": "POST",
    }).then((res)=> res.json()).then((data)=> {
        console.log(data);
    })
})

fetch("/custManage/portal/custManage/onlyQuery/prod.do", {
    "headers": {
        "accept": "application/json, text/javascript, */*; q=0.01",
        "accept-language": "zh-TW,zh-CN;q=0.9,zh;q=0.8,en;q=0.7,en-GB;q=0.6,en-US;q=0.5",
        "content-type": "application/x-www-form-urlencoded;charset=UTF-8",
        "x-requested-with": "XMLHttpRequest"
    },
    "body": "serviceName=queryCustList&reqObj=%7B%22accNbr%22%3A%22IPWB1123%22%2C%22codeType%22%3A%22valid_status%22%2C%22limitFlag%22%3A%221%22%7D&pageInfo=%7B%22pageNo%22%3A%221%22%2C%22pageSize%22%3A%225%22%7D",
    "method": "POST",
});

fetch("http://crmauth.crm.anhuitelecom.com:16010/custManage/packAcpt/queryProdInfoServlet.do", {
    "headers": {
        "accept": "application/json, text/javascript, */*; q=0.01",
        "accept-language": "zh-TW,zh-CN;q=0.9,zh;q=0.8,en;q=0.7,en-GB;q=0.6,en-US;q=0.5",
        "content-type": "application/x-www-form-urlencoded;charset=UTF-8",
        "x-kl-ajax-request": "Ajax_Request",
        "x-requested-with": "XMLHttpRequest"
    },
    "body": "accNbr=IPWB1123",
    "method": "POST",
});

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
        let ret = new Array(raw_data.length);
        ret[0] = raw_data[0];
        for (let i = 1; i < raw_data.length; ++i) {
            if(raw_data[i].length <= 2) {
                ret[i] = raw_data[i];
                continue;
            }
            let firstResponse = await fetch("/custManage/portal/custManage/onlyQuery/prod.do", {
                "headers": {
                    "accept": "application/json, text/javascript, */*; q=0.01",
                    "accept-language": "zh-TW,zh-CN;q=0.9,zh;q=0.8,en;q=0.7,en-GB;q=0.6,en-US;q=0.5",
                    "content-type": "application/x-www-form-urlencoded;charset=UTF-8",
                    "x-requested-with": "XMLHttpRequest"
                },
                "body": `serviceName=queryCustList&reqObj=%7B%22accNbr%22%3A%22${raw_data[i][2]}%22%2C%22codeType%22%3A%22valid_status%22%2C%22limitFlag%22%3A%221%22%7D&pageInfo=%7B%22pageNo%22%3A%221%22%2C%22pageSize%22%3A%225%22%7D`,
                "method": "POST",
            });
            let firstJSON = await firstResponse.json()
            let secondResponce = await fetch("/custManage/portal/custManage/onlyQuery/prod.do", {
                "headers": {
                    "accept": "application/json, text/javascript, */*; q=0.01",
                    "accept-language": "zh-TW,zh-CN;q=0.9,zh;q=0.8,en;q=0.7,en-GB;q=0.6,en-US;q=0.5",
                    "content-type": "application/x-www-form-urlencoded;charset=UTF-8",
                    "x-requested-with": "XMLHttpRequest"
                },
                "body": `serviceName=getCustDesensitizationDetail&reqObj=%7B%22custId%22%3A%22${firstJSON.resultObject.customers[0].custId}%22%7D`,
                "method": "POST",
            })
            let secondJSON = await secondResponce.json()
            // 互联网专线请求
            let internetAccessResponce = await fetch("http://crmauth.crm.anhuitelecom.com:16010/custManage/packAcpt/queryProdInfoServlet.do", {
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
            let internetAccessJSON = await internetAccessResponce.json()
            ret[i] = [raw_data[i][0], raw_data[i][1], raw_data[i][2], secondJSON.resultObject.customerDetail.contactsInfo[0].contactName, secondJSON.resultObject.customerDetail.certNum, secondJSON.resultObject.customerDetail.certiTypeName, secondJSON.resultObject.customerDetail.contactsInfo[0].contactTelNbr, internetAccessJSON.resultObject.prodInstDetail.installAddr]
        }
        // console.log(ret);
        window.URL.revokeObjectURL(xlsxURL);
        let retsheet = XLSX.utils.aoa_to_sheet(ret);
        let retbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(retbook, retsheet, "Sheet1");
        XLSX.writeFileXLSX(retbook, new Date().valueOf() + ".xlsx", {compression: true});
    }
})();


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
        let promArr = new Array(len);
        for(let cur = 0; cur < raw_data.length; cur += len) {
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
                const data = await response.json();
                if (data.data) {
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
        // console.log(ret);
        window.URL.revokeObjectURL(xlsxURL);
        let retsheet = XLSX.utils.aoa_to_sheet(raw_data);
        let retbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(retbook, retsheet, "Sheet1");
        XLSX.writeFileXLSX(retbook, new Date().valueOf() + ".xlsx", {compression: true});
    }
})();




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
        let ret = new Array(raw_data.length);
        ret[0] = raw_data[0];
        let len = 500;
        let segment = [];
        for(let i = 1; i < raw_data.length; i += len) {
            let temp = [i, Math.min(i + len - 1, raw_data.length - 1)];
            segment.push(temp);
        }
        let promArr = new Array(raw_data.length);
        let interArr = new Array(raw_data.length);
        let custArr = new Array(raw_data.length);
        let errLog = [];
        for(const seg of segment) {
            for (let i = seg[0]; i <= seg[1]; ++i) {
                ret[i] = raw_data[i];
                if(raw_data[i].length <= 2) {
                    continue;
                }
                promArr[i] = fetch("/custManage/portal/custManage/onlyQuery/prod.do", {
                    "headers": {
                        "accept": "application/json, text/javascript, */*; q=0.01",
                        "accept-language": "zh-TW,zh-CN;q=0.9,zh;q=0.8,en;q=0.7,en-GB;q=0.6,en-US;q=0.5",
                        "content-type": "application/x-www-form-urlencoded;charset=UTF-8",
                        "x-requested-with": "XMLHttpRequest"
                    },
                    "body": `serviceName=queryCustList&reqObj=%7B%22accNbr%22%3A%22${raw_data[i][2]}%22%2C%22codeType%22%3A%22valid_status%22%2C%22limitFlag%22%3A%221%22%7D&pageInfo=%7B%22pageNo%22%3A%221%22%2C%22pageSize%22%3A%225%22%7D`,
                    "method": "POST",
                });
                interArr[i] = fetch("http://crmauth.crm.anhuitelecom.com:16010/custManage/packAcpt/queryProdInfoServlet.do", {
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
            for (let i = seg[0]; i <= seg[1]; ++i) {
                if (!promArr[i]) {
                    continue;
                }
                let custId = (await (await promArr[i]).json()).resultObject?.customers?.[0]?.custId;
                if (!custId) {
                    errLog.push([i, raw_data[i]]);
                    continue;
                }
                // second
                promArr[i] = fetch("/custManage/portal/custManage/onlyQuery/prod.do", {
                    "headers": {
                        "accept": "application/json, text/javascript, */*; q=0.01",
                        "accept-language": "zh-TW,zh-CN;q=0.9,zh;q=0.8,en;q=0.7,en-GB;q=0.6,en-US;q=0.5",
                        "content-type": "application/x-www-form-urlencoded;charset=UTF-8",
                        "x-requested-with": "XMLHttpRequest"
                    },
                    "body": `serviceName=getCustDesensitizationDetail&reqObj=%7B%22custId%22%3A%22${custId}%22%7D`,
                    "method": "POST",
                })
                custArr[i] = fetch("http://crmauth.crm.anhuitelecom.com:16010/custManage/cust/queryCustMgrInfoServlet.do", {
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
            for (let i = seg[0]; i <= seg[1]; ++i) {
                let secondJSON = await (await promArr[i])?.json().then(res => res, () => {errLog.push([i, raw_data[i]]); return undefined});
                let internetAccessJSON = await (await interArr[i])?.json().then(res => res, () => {errLog.push([i, raw_data[i]]); return undefined});
                let custMgrJSON = await (await custArr[i])?.json().then(res => res, () => {errLog.push([i, raw_data[i]]); return undefined});
                ret[i] = [raw_data[i][0], raw_data[i][1], raw_data[i][2], secondJSON?.resultObject?.customerDetail?.contactsInfo?.[0]?.contactName, secondJSON?.resultObject?.customerDetail?.certNum, secondJSON?.resultObject?.customerDetail?.certiTypeName, secondJSON?.resultObject?.customerDetail?.contactsInfo?.[0]?.contactTelNbr, internetAccessJSON?.resultObject?.prodInstDetail?.installAddr, custMgrJSON?.mgrName, custMgrJSON?.mgrMobile]
                console.log(i, 'of', raw_data.length, 'raw_data',raw_data[i], 'result is', ret[i]);
            }
        }
        console.log("errLog", errLog);
        window.URL.revokeObjectURL(xlsxURL);
        let retsheet = XLSX.utils.aoa_to_sheet(ret);
        let retbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(retbook, retsheet, "Sheet1");
        XLSX.writeFileXLSX(retbook, new Date().valueOf() + ".xlsx", {compression: true});
    }
})();
