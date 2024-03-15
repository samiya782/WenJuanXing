// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      2024-03-13
// @description  try to take over the world!
// @author       You
// @match        https://ks.wjx.top/vm/*.aspx
// @icon         https://www.google.com/s2/favicons?sz=64&domain=mozilla.org
// @grant        GM_xmlhttpRequest
// ==/UserScript==

(async function() {
  'use strict';
  const session = await (await GM_xmlhttpRequest("https://chat.openai.com/api/auth/session", {
    "headers": {
      "accept": "*/*",
      "accept-language": "zh-CN,zh;q=0.9,en;q=0.8",
      "if-none-match": "W/\"vgezvzqf5c1bo\"",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "none"
    },
    "referrerPolicy": "strict-origin-when-cross-origin",
    "body": null,
    "method": "GET",
    "mode": "no-cors",
    "credentials": "include"
  })).json();
  console.log(session);
  const date = new Date();
  const token = await (await fetch(`https://chat.openai.com/backend-api/accounts/check/v4-${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate()}`, {
    "headers": {
      "accept": "*/*",
      "accept-language": "zh-CN,zh;q=0.9,en;q=0.8",
      "authorization": `Bearer ${session["accessToken"]}`,
      "content-type": "application/json",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "none"
    },
    "referrerPolicy": "strict-origin-when-cross-origin",
    "body": null,
    "method": "GET",
    "mode": "cors",
    "credentials": "include"
  })).json();
  console.log(token);
})();

fetch("https://chat.openai.com/backend-api/conversation", {
  "headers": {
    "accept": "text/event-stream",
    "accept-language": "zh-CN,zh;q=0.9,en;q=0.8",
    "authorization": "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik1UaEVOVUpHTkVNMVFURTRNMEZCTWpkQ05UZzVNRFUxUlRVd1FVSkRNRU13UmtGRVFrRXpSZyJ9.eyJodHRwczovL2FwaS5vcGVuYWkuY29tL3Byb2ZpbGUiOnsiZW1haWwiOiJ5dWNoYW5nZ2VuZzFAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWV9LCJodHRwczovL2FwaS5vcGVuYWkuY29tL2F1dGgiOnsicG9pZCI6Im9yZy1Sb0NOUTBnQmFBSURxdnY2UUdtUGZOTkQiLCJ1c2VyX2lkIjoidXNlci1rUFowNk5ZUGtaUDFyRGE4TFpyQTZmbUEifSwiaXNzIjoiaHR0cHM6Ly9hdXRoMC5vcGVuYWkuY29tLyIsInN1YiI6Imdvb2dsZS1vYXV0aDJ8MTA3OTAyODMzMTUxMTMzMjE0NzEwIiwiYXVkIjpbImh0dHBzOi8vYXBpLm9wZW5haS5jb20vdjEiLCJodHRwczovL29wZW5haS5vcGVuYWkuYXV0aDBhcHAuY29tL3VzZXJpbmZvIl0sImlhdCI6MTcxMDI5OTQyMSwiZXhwIjoxNzExMTYzNDIxLCJhenAiOiJUZEpJY2JlMTZXb1RIdE45NW55eXdoNUU0eU9vNkl0RyIsInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZW1haWwgbW9kZWwucmVhZCBtb2RlbC5yZXF1ZXN0IG9yZ2FuaXphdGlvbi5yZWFkIG9yZ2FuaXphdGlvbi53cml0ZSBvZmZsaW5lX2FjY2VzcyJ9.byoVUwrw-AZHJrh_QZc8TdJGIMSApD-arwZ-j8QYJaiS9z3fyCtXMi9t0X9N7EU5W5FpHV1O_0MSaFXfknZIwh309UbiaFFMnQF5VlrIINs1vRotCtVEAqFS-skc3_b_Iotg6Yrx-5PpLDfTV7sxaQSp7tYl9swBZ4AIjrK_1lzOynalGUWUljLjr8xNAJtxJtZ5cTVtd_kFZuP-Y57oX5keVP0mYzhCyUuWsWLLw0U402pRxhVU94UmpPJ2wwJtFDJaO28Fv2THqvvGZrrYaMgb6KEJiMODoKgw5L98qLzHvqdEwlaYgYDo_yk6EghS6VqsI7QP6Jugk69bUWFTfw",
    "content-type": "application/json",
    "oai-device-id": "1dbac3e7-c430-41b0-9aa6-9436d2ce5feb",
    "oai-language": "zh-Hans",
    "openai-sentinel-chat-requirements-token": "gAAAAABl8V2CV6pz-2ptIX5G1Lpmz6J8FzltgADG15A4LWoIHQsZppjQJC3IQk0ElvT_uy37EjaDkGxjPPPWYcmZ5FIE3KdGaRSyh2wUcaM1Q1wES83U5SAU0otoZmi5PvqNlRLmb00fCbdn-5fdyGwOs_XD9GO8tq3Qj44KQx34lmSSU5d7SoK6N93sIjNPJnfwYzBGKSfUznTfClSJANkXP_zuhxbmAuJKBF3chK3tYq_uBQC3iio=",
    "sec-ch-ua": "\"Chromium\";v=\"122\", \"Not(A:Brand\";v=\"24\", \"Google Chrome\";v=\"122\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "cookie": "oai-did=1dbac3e7-c430-41b0-9aa6-9436d2ce5feb; cf_clearance=ayef_XWI8LuaVB_Z5GfB9zKeuYRce5A2bXn8eR9LNbY-1710299406-1.0.1.1-I8fClERS5ZOxdc3GFTO2caiR3QZ870S0AAkhGwFraOy9e2QV7EmaEyFk2hJRp5bHx1IgYLV6XU8wF4R8bQ.vEQ; cf_clearance=EUrHHwTwmbOaRvI0JPoPvTKVBOCZ2SZW_kqFVj5LMW4-1710299537-1.0.1.1-k9EyNt7CXRRIHXi2meNffEh.ROMrwfRTIP0gNdDezY.rcjHXrzWIS.Q0Lrry3NFW5bY2jWpEFfxtUFhwAqi9Lg; ajs_user_id=user-kPZ06NYPkZP1rDa8LZrA6fmA; intercom-device-id-dgkjq2bp=f713be2c-9e15-4fe5-aa8d-1c0788de9bdd; __Host-next-auth.csrf-token=5ea72baa101a2b59b46302ceddf6ab04b37352f948092101ab63f8e03f034335%7C29a11d2b3181f16d26b4094b46fbdb2215b67ffc8844fccc908aac0f7c5878e9; _cfuvid=NtZNZqoCEQh9FYrIS9R1vUBmkKUErnS.3hioSS5BWY4-1710309846750-0.0.1.1-604800000; intercom-session-dgkjq2bp=Rk1NRnJyNEtWVjBmQnNIU09adG9kR3dBLzQyK2xqUUgzWXptNmwyRTZ4YVB0NWN0Ukw5ZFVXQ2VuVndxelV1eS0tUjFKaGN2R0FDNkx0cGo0NHN5UlBHZz09--3d147a0a7e59aa9aed63c4d56cebfd28502fe70d; __cflb=0H28vVfF4aAyg2hkHFTZ1MVfKmWgNcKErwgx3iy5GrR; __cf_bm=ClG3eMvSkWC9hCXfThxO5u83LL306x5NcdnmY.ZIWC8-1710316768-1.0.1.1-ZKvCCI7psVQAwEmvXmdgfCKYTZjdsVsg88nV_bbH0ZgkNdCYqvJbah27VkmDOVI5l20WZR31peeygiRZb4tylg; __Secure-next-auth.callback-url=https%3A%2F%2Fchat.openai.com; __Secure-next-auth.session-token=eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..iaopm7-7KkknBV3A.npCqr6S8jdCUyR8xo_5qbbWONNVRBsV1tDtvWB23aK2MfE8dhHNz2jIDK1VKez7Vukq_pf_ZGzM_pS0uPhu0l5qjvCMNp43ShruJZxDh9rqV_zaiH1gk1_Wz4BG43UwUbRg27AVLPVlm2K4bP208pJLWCI6OImXTgkxViy-FthzT7ofpaCnVF15iWCyI58ky9pl6LpFV2pD2aBcYUShz-C9_KRYpzD07BpbJ_O4QQpFL4e0tSFRi2pkfLCymkkjswcOXvhNe1dbfD5D8zTK5COtKuvZn3W121vSWeSVURYSTbm-eHK1qn-eMkuFsdK5uSK3PytgwJZP12EKyhAl1dQpZ5YzXz1is1wIZKHZKRfXf2kJB2ypUkZXSCC4PB1ApQVwvZQ6O5ni-8JzHsmeq8X6t07GYxwLPBsp-fwvyI_ouP6rwIKPSXhVskmEumcEqhl7zK0jEWK1ElacEFEwgLX0oU3051VZGilOjB4IYpBnV-JaUb_bG5ZwmishRRpOj7EJgz30jTf7oe-KcJ03AvZ9wPp4k9XtMWHeW82_xlztBO6Nryt0SK2Hgi-Y4GHNPlLqujkZpVUcNDcmflgwB1Ao4NJdk0W2Cd8CbEJbjHtIjSSE5ezQd9il6z2aGW7ZCg9QqlQIwnP_Wdok9Ha5BF0ZALvx8M_bWN5vpJnOT-KbFN8LnJtIUqAslE2FCR4_WB0vKeOqQDPVSgUY9E-cABXE6nMZ1mZ5dInUNv_7Qvrmi0wYMPnd_Mv6iwYiqWV2fpIIiKCeEAlMFLlo2ePGzen4PRgeLOnJEcfPrpF2m4rsuw2KQ2cwKj3CH3C2i96naLgKOOWKQlUftr9-CMbQiAxcHtgKyO7dRFKj2UsLR4uoc27gX_MYy39L4RBdkxdqN9zEm1rhE8yjpTaN7LsOGCo583glUGUeL5euYV-uQy2NCC9XbG8-Zr41T31hA5CFqUd5AU1bVQ9DYRLfwbf2riAxqORCeMhY8Lo5TE-ZS0pX1KEgUqvxDckowERSgLG1q9smi7l9g3RLSVRH0d8Ljrl0QZ63bpy5i_kx4MS6AoPX-DMJDuyYRTmXhJlKj0KR8Xvce1DyhKXok-tuXWmX7vY_5p7TcQKwKL1s99nGW1jHMzwLGnubjRovNvWC90swuaDuYPZIlGaj4OrlLvml5cAgFB3MG0eIwRiCe4UGIw7zfOndpQUV8Cjt1RZsqWTdIWEn7Hv3-WU0P6MjYk7r9bQfr4bMPCpzTJCIx7C0cuBsWziT_7pI2H0TLmSsIb80yVtE6T_iYcDVoviUxagQpfYKtJ93VHuRZ_IkVZtFiqA-3RThEbgaMgNiUX_Wo9vY5E9yhnLxSgGoHbfdIYNfIwWAoUFOGP2ndDFt-SeIf-_Guu7fV5f16CoVaHPca1sWQemiFIKVgCOtueJm4-xF_vxgJjtn70CVoMWIL4ZZD_KtsVdLPMXE5vLmREf4JrgicgTiKJ0TrudlXBlQHkMq0G1w5LNN6WzTkfxNbZkcakAPentWlSlGTd9MPyXo533zZOmB8cz51Jc8cFBFL1eDARvcaPvwMSGhzFYQ093v_PLW5j0wy8tNlKDLkD1k79u3w3sPdafDUfhnh9QbX0IUViunqP-zykU5vNcaaYe6G3cSA_dgbQg6RxTtOohnj4x3d9AwQ-d22LDb8wFW7Pn0syskRKSKa_57Bs8yfsnbIOCHuWVp90ikUSCjVbtmGKoFjgikz4Rj-2S6wz8731ctaeyHFM54e1mIO_pKeLB6AeM_B8svBMllsh-6bVQ1eUoTcF2Ox-o9gwi4mo162ydapLha9V6r5MUFRWvJ_C8pPYwGj1iwdA3PAGYKudg5J8QowSyKmfWiiYnWMjjBTxU9cVrY8f-2TC1JZcUnJBUd6Jv5YpGww_SfStIEgExk4WmKyX10I83yLpbNebsUIn2GeU1XHWAlye6hPZB0ebdocZsR7pUhbYwtJ7NxlSIaIMne_54W1b2pR2ebux5cPYdGBqsFiADd38UGCeUpcjJ70H5AjIdFtFl0BJWBh_3HaNR6uP3lsCcwbNFF-XxSU1xbBS6EUeDrxufE4u7lEE7v16ygUe3dPQs2pF76urGEU2Y3AEXpYdHEpnmvfJyfyXLVVs-IJKSQgop51Gc7SantaFHJewonb7kRIwcwq5LBaco-8x6wM6pYiHTg43BHfuZ3jG2E6ruR8_D15g7lENo2SUVJFnCY_GgiqLOWKvhMelf1wSQhak5iVfKohXViMAbFmSdLdK3CpLGCL1QEtna_Ydq6NUm7XBki6MAjVM8X7AbE04022o-4UKygKbX42lAJ1wcH4xiFc8nI5UapY47_K-vcgiLUJE0Xt0wm3b8GtPa1-d0JaU_9Ll_9F6tJn8cxHlUHdITcsNjkSjOugt0zesirV5ffpwF-0yt9vF3e-CZyli6PxngO-YF6NGl_CU--KpLYesn5tgg6C3SwlZamxv4RUPohTxGitxPYQVXRnAlmkL47acmxRN0eKuWJliLHk5fl696ip-_HQFqieZtrFt63uUZ_opj58Dr6S02p4FGjmhsyby9bzcjPzHSRdtk7pO3bkhItdgpQkelahIZATPH1QAEPEfgQUyPs37aHe995eRN2Ig3luqf6l1JhVnBl5gyia6vmROdkTM56KX_tjlsAbFqxOaZqsEGZPuAWw08EuGpRw4l7Wrqyn0QElR4sjVFXTEmBRqFhXc1Rs_zL1JIh6AkvEz0hUZV-GCQqVCcEBIXtaEJ3yKHmRaXHliTKRpfGwsjJ7BcKaepetnXWWJIz4eqqG.Ndf9zgWtlf41DtSAhvRFUw; _uasid=\"Z0FBQUFBQmw4VjF2T0FUdHc1akdndXloOEttajdEem9WYnpOREt1blpYZHVJNFVDTVlUN3RZUXJiQ2o2SV8wRTh1YWFaUlFRblpaZlBMNEtEaDJHcHlyeVlaM1NHbFV0dlZLT18ySkFCcmhUYXhxUU1vRkkzMUphR1k0SVhHRmxRRFo5OHBZU0g1YTFlUVNfQmFxTTdoaE1rVDFJazZHT0dYd3l1X0FtelpoVURYb0luZVE3eUxiT3M4ejBKNTd5Rm93UjJTQkkzQWFEdFJabXQxdWxKdEdhcGhOT2M4LU1EdFIzS2F3aUo3dWFtRGgyYTFsN2lxbDIxdFVSakg5M1dsZWRlTEFDZERJdE9QZ2ZIaTB1T3BaOWlqdzFCNFZGVTRoSUVjb1o3ZlM1WkdrWHdoejItVlJTUzFiRFlfMzluR2ZuUmg3RXpmVTd2ZUF6bW1TVHc3b1NIOFUwUm83OFB3PT0=\"; _umsid=\"Z0FBQUFBQmw4VjF2OTgxRkRpN01tOG5JNWV3MXMwOWo0WFB0VEstN3FwMGtEWmdiT3hhTlpkNnZSWmtVa00tUW5ucDMySjZGRVdtdG5FbHM4TlN2MVlIQWlUUzdRNDExUWxrVE9UQ0xzbnVhTVpRR2hES0J6cnplaGRhSFBLLXEzSWRENmRlZ1lxcXAtcFE5c2tkZTF2RmxCRV9MVU9tdmIweXNDend0TWNUeVJ4cmhVSE5EN2ZGcm9sU0lCVk9KNmMxUFlEMGhNaVNxUFUwOGVZUW15bFQwS1RwMkk3cjFUd042YTdmZkZ2aGt6U0xyYmxOMnpKVT0=\"; _dd_s=rum=0&expire=1710317837113",
    "Referer": "https://chat.openai.com/c/225e0436-fe0b-4e83-911f-3fabb5a8373f",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": "{\"action\":\"next\",\"messages\":[{\"id\":\"aaa24194-6488-421f-8792-e104db216361\",\"author\":{\"role\":\"user\"},\"content\":{\"content_type\":\"text\",\"parts\":[\"你是谁\"]},\"metadata\":{}}],\"conversation_id\":\"225e0436-fe0b-4e83-911f-3fabb5a8373f\",\"parent_message_id\":\"2ca19b6f-c4b2-4fa0-b809-6078d6b0004e\",\"model\":\"text-davinci-002-render-sha\",\"timezone_offset_min\":-480,\"suggestions\":[],\"history_and_training_disabled\":false,\"conversation_mode\":{\"kind\":\"primary_assistant\"},\"force_paragen\":false,\"force_rate_limit\":false,\"websocket_request_id\":\"bcdf590d-9493-46b6-a8d3-bc99d0fca07e\"}",
  "method": "POST"
});

fetch("https://chat.openai.com/backend-api/conversation", {
  "headers": {
    "accept": "text/event-stream",
    "accept-language": "zh-CN,zh;q=0.9,en;q=0.8",
    "authorization": "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik1UaEVOVUpHTkVNMVFURTRNMEZCTWpkQ05UZzVNRFUxUlRVd1FVSkRNRU13UmtGRVFrRXpSZyJ9.eyJodHRwczovL2FwaS5vcGVuYWkuY29tL3Byb2ZpbGUiOnsiZW1haWwiOiJ5dWNoYW5nZ2VuZzFAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWV9LCJodHRwczovL2FwaS5vcGVuYWkuY29tL2F1dGgiOnsicG9pZCI6Im9yZy1Sb0NOUTBnQmFBSURxdnY2UUdtUGZOTkQiLCJ1c2VyX2lkIjoidXNlci1rUFowNk5ZUGtaUDFyRGE4TFpyQTZmbUEifSwiaXNzIjoiaHR0cHM6Ly9hdXRoMC5vcGVuYWkuY29tLyIsInN1YiI6Imdvb2dsZS1vYXV0aDJ8MTA3OTAyODMzMTUxMTMzMjE0NzEwIiwiYXVkIjpbImh0dHBzOi8vYXBpLm9wZW5haS5jb20vdjEiLCJodHRwczovL29wZW5haS5vcGVuYWkuYXV0aDBhcHAuY29tL3VzZXJpbmZvIl0sImlhdCI6MTcxMDI5OTQyMSwiZXhwIjoxNzExMTYzNDIxLCJhenAiOiJUZEpJY2JlMTZXb1RIdE45NW55eXdoNUU0eU9vNkl0RyIsInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZW1haWwgbW9kZWwucmVhZCBtb2RlbC5yZXF1ZXN0IG9yZ2FuaXphdGlvbi5yZWFkIG9yZ2FuaXphdGlvbi53cml0ZSBvZmZsaW5lX2FjY2VzcyJ9.byoVUwrw-AZHJrh_QZc8TdJGIMSApD-arwZ-j8QYJaiS9z3fyCtXMi9t0X9N7EU5W5FpHV1O_0MSaFXfknZIwh309UbiaFFMnQF5VlrIINs1vRotCtVEAqFS-skc3_b_Iotg6Yrx-5PpLDfTV7sxaQSp7tYl9swBZ4AIjrK_1lzOynalGUWUljLjr8xNAJtxJtZ5cTVtd_kFZuP-Y57oX5keVP0mYzhCyUuWsWLLw0U402pRxhVU94UmpPJ2wwJtFDJaO28Fv2THqvvGZrrYaMgb6KEJiMODoKgw5L98qLzHvqdEwlaYgYDo_yk6EghS6VqsI7QP6Jugk69bUWFTfw",
    "content-type": "application/json",
    "oai-device-id": "1dbac3e7-c430-41b0-9aa6-9436d2ce5feb",
    "oai-language": "zh-Hans",
    "openai-sentinel-chat-requirements-token": "gAAAAABl8V35TQYlHjGS6PLH5M1tyZn4_ELdPZrfOa0YZl7IMCJNqRk5ta_ZoQGae7rMUUV4aNTSUDgeI9xhKI7_N0owTegYQyzOZiK_0CGE7vuQkqmmOhNQdGhnKVWsxVMyLKM8EFfMqml86XpAsy13je79DrLmIGoWWRGvgjkeplABnEDC3JnITp9xJXjxEQ_3xXvpXmV5wDJ7-Qd4gYvEG1vaxRP-l_O9XD1RWSEu9cKzuTrcP5E=",
    "sec-ch-ua": "\"Chromium\";v=\"122\", \"Not(A:Brand\";v=\"24\", \"Google Chrome\";v=\"122\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "cookie": "oai-did=1dbac3e7-c430-41b0-9aa6-9436d2ce5feb; cf_clearance=ayef_XWI8LuaVB_Z5GfB9zKeuYRce5A2bXn8eR9LNbY-1710299406-1.0.1.1-I8fClERS5ZOxdc3GFTO2caiR3QZ870S0AAkhGwFraOy9e2QV7EmaEyFk2hJRp5bHx1IgYLV6XU8wF4R8bQ.vEQ; cf_clearance=EUrHHwTwmbOaRvI0JPoPvTKVBOCZ2SZW_kqFVj5LMW4-1710299537-1.0.1.1-k9EyNt7CXRRIHXi2meNffEh.ROMrwfRTIP0gNdDezY.rcjHXrzWIS.Q0Lrry3NFW5bY2jWpEFfxtUFhwAqi9Lg; ajs_user_id=user-kPZ06NYPkZP1rDa8LZrA6fmA; intercom-device-id-dgkjq2bp=f713be2c-9e15-4fe5-aa8d-1c0788de9bdd; __Host-next-auth.csrf-token=5ea72baa101a2b59b46302ceddf6ab04b37352f948092101ab63f8e03f034335%7C29a11d2b3181f16d26b4094b46fbdb2215b67ffc8844fccc908aac0f7c5878e9; _cfuvid=NtZNZqoCEQh9FYrIS9R1vUBmkKUErnS.3hioSS5BWY4-1710309846750-0.0.1.1-604800000; intercom-session-dgkjq2bp=Rk1NRnJyNEtWVjBmQnNIU09adG9kR3dBLzQyK2xqUUgzWXptNmwyRTZ4YVB0NWN0Ukw5ZFVXQ2VuVndxelV1eS0tUjFKaGN2R0FDNkx0cGo0NHN5UlBHZz09--3d147a0a7e59aa9aed63c4d56cebfd28502fe70d; __cflb=0H28vVfF4aAyg2hkHFTZ1MVfKmWgNcKErwgx3iy5GrR; __cf_bm=ClG3eMvSkWC9hCXfThxO5u83LL306x5NcdnmY.ZIWC8-1710316768-1.0.1.1-ZKvCCI7psVQAwEmvXmdgfCKYTZjdsVsg88nV_bbH0ZgkNdCYqvJbah27VkmDOVI5l20WZR31peeygiRZb4tylg; __Secure-next-auth.callback-url=https%3A%2F%2Fchat.openai.com; __Secure-next-auth.session-token=eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..iaopm7-7KkknBV3A.npCqr6S8jdCUyR8xo_5qbbWONNVRBsV1tDtvWB23aK2MfE8dhHNz2jIDK1VKez7Vukq_pf_ZGzM_pS0uPhu0l5qjvCMNp43ShruJZxDh9rqV_zaiH1gk1_Wz4BG43UwUbRg27AVLPVlm2K4bP208pJLWCI6OImXTgkxViy-FthzT7ofpaCnVF15iWCyI58ky9pl6LpFV2pD2aBcYUShz-C9_KRYpzD07BpbJ_O4QQpFL4e0tSFRi2pkfLCymkkjswcOXvhNe1dbfD5D8zTK5COtKuvZn3W121vSWeSVURYSTbm-eHK1qn-eMkuFsdK5uSK3PytgwJZP12EKyhAl1dQpZ5YzXz1is1wIZKHZKRfXf2kJB2ypUkZXSCC4PB1ApQVwvZQ6O5ni-8JzHsmeq8X6t07GYxwLPBsp-fwvyI_ouP6rwIKPSXhVskmEumcEqhl7zK0jEWK1ElacEFEwgLX0oU3051VZGilOjB4IYpBnV-JaUb_bG5ZwmishRRpOj7EJgz30jTf7oe-KcJ03AvZ9wPp4k9XtMWHeW82_xlztBO6Nryt0SK2Hgi-Y4GHNPlLqujkZpVUcNDcmflgwB1Ao4NJdk0W2Cd8CbEJbjHtIjSSE5ezQd9il6z2aGW7ZCg9QqlQIwnP_Wdok9Ha5BF0ZALvx8M_bWN5vpJnOT-KbFN8LnJtIUqAslE2FCR4_WB0vKeOqQDPVSgUY9E-cABXE6nMZ1mZ5dInUNv_7Qvrmi0wYMPnd_Mv6iwYiqWV2fpIIiKCeEAlMFLlo2ePGzen4PRgeLOnJEcfPrpF2m4rsuw2KQ2cwKj3CH3C2i96naLgKOOWKQlUftr9-CMbQiAxcHtgKyO7dRFKj2UsLR4uoc27gX_MYy39L4RBdkxdqN9zEm1rhE8yjpTaN7LsOGCo583glUGUeL5euYV-uQy2NCC9XbG8-Zr41T31hA5CFqUd5AU1bVQ9DYRLfwbf2riAxqORCeMhY8Lo5TE-ZS0pX1KEgUqvxDckowERSgLG1q9smi7l9g3RLSVRH0d8Ljrl0QZ63bpy5i_kx4MS6AoPX-DMJDuyYRTmXhJlKj0KR8Xvce1DyhKXok-tuXWmX7vY_5p7TcQKwKL1s99nGW1jHMzwLGnubjRovNvWC90swuaDuYPZIlGaj4OrlLvml5cAgFB3MG0eIwRiCe4UGIw7zfOndpQUV8Cjt1RZsqWTdIWEn7Hv3-WU0P6MjYk7r9bQfr4bMPCpzTJCIx7C0cuBsWziT_7pI2H0TLmSsIb80yVtE6T_iYcDVoviUxagQpfYKtJ93VHuRZ_IkVZtFiqA-3RThEbgaMgNiUX_Wo9vY5E9yhnLxSgGoHbfdIYNfIwWAoUFOGP2ndDFt-SeIf-_Guu7fV5f16CoVaHPca1sWQemiFIKVgCOtueJm4-xF_vxgJjtn70CVoMWIL4ZZD_KtsVdLPMXE5vLmREf4JrgicgTiKJ0TrudlXBlQHkMq0G1w5LNN6WzTkfxNbZkcakAPentWlSlGTd9MPyXo533zZOmB8cz51Jc8cFBFL1eDARvcaPvwMSGhzFYQ093v_PLW5j0wy8tNlKDLkD1k79u3w3sPdafDUfhnh9QbX0IUViunqP-zykU5vNcaaYe6G3cSA_dgbQg6RxTtOohnj4x3d9AwQ-d22LDb8wFW7Pn0syskRKSKa_57Bs8yfsnbIOCHuWVp90ikUSCjVbtmGKoFjgikz4Rj-2S6wz8731ctaeyHFM54e1mIO_pKeLB6AeM_B8svBMllsh-6bVQ1eUoTcF2Ox-o9gwi4mo162ydapLha9V6r5MUFRWvJ_C8pPYwGj1iwdA3PAGYKudg5J8QowSyKmfWiiYnWMjjBTxU9cVrY8f-2TC1JZcUnJBUd6Jv5YpGww_SfStIEgExk4WmKyX10I83yLpbNebsUIn2GeU1XHWAlye6hPZB0ebdocZsR7pUhbYwtJ7NxlSIaIMne_54W1b2pR2ebux5cPYdGBqsFiADd38UGCeUpcjJ70H5AjIdFtFl0BJWBh_3HaNR6uP3lsCcwbNFF-XxSU1xbBS6EUeDrxufE4u7lEE7v16ygUe3dPQs2pF76urGEU2Y3AEXpYdHEpnmvfJyfyXLVVs-IJKSQgop51Gc7SantaFHJewonb7kRIwcwq5LBaco-8x6wM6pYiHTg43BHfuZ3jG2E6ruR8_D15g7lENo2SUVJFnCY_GgiqLOWKvhMelf1wSQhak5iVfKohXViMAbFmSdLdK3CpLGCL1QEtna_Ydq6NUm7XBki6MAjVM8X7AbE04022o-4UKygKbX42lAJ1wcH4xiFc8nI5UapY47_K-vcgiLUJE0Xt0wm3b8GtPa1-d0JaU_9Ll_9F6tJn8cxHlUHdITcsNjkSjOugt0zesirV5ffpwF-0yt9vF3e-CZyli6PxngO-YF6NGl_CU--KpLYesn5tgg6C3SwlZamxv4RUPohTxGitxPYQVXRnAlmkL47acmxRN0eKuWJliLHk5fl696ip-_HQFqieZtrFt63uUZ_opj58Dr6S02p4FGjmhsyby9bzcjPzHSRdtk7pO3bkhItdgpQkelahIZATPH1QAEPEfgQUyPs37aHe995eRN2Ig3luqf6l1JhVnBl5gyia6vmROdkTM56KX_tjlsAbFqxOaZqsEGZPuAWw08EuGpRw4l7Wrqyn0QElR4sjVFXTEmBRqFhXc1Rs_zL1JIh6AkvEz0hUZV-GCQqVCcEBIXtaEJ3yKHmRaXHliTKRpfGwsjJ7BcKaepetnXWWJIz4eqqG.Ndf9zgWtlf41DtSAhvRFUw; _uasid=\"Z0FBQUFBQmw4VjJKRGFoNmRfMG84OUQ5UUxsQk9xT1pGUXlnZ3JFeVlyOFUwNUh6bVhwTEtzZWhnTEpjVWdyYmVkUWE3RFZLazV4c19SaWpKTElUN2o3WG9IMlA2Z1NVeWRIUktNVDRfYlU3NXJZMWlWQmp0ckM2UkR2Ym5oUDN5MS0zQU85OWdHN094VlBVQnVQQkxKdE5rdlQ1cGJTSlpKVWxBdjZPUnFTeE0yR3NQRXNJdGw3Nm00dm1lY0hRRFBkQVJRVzZJSE9LSm5FRmRKeFpKSjBqVHdoZmU3ckUzVWJqMkZMV1BseDdrZ09qVVhBMmVYRHRpVVNneTBKOUx6VmNpczdYR2dpdXJWa0NlX0xKTXhHc1diSldVbmJlcGRxbFBhZWZ1M25Vdk5yS0VSb0p3Z2NrWEdUa2puZjJrN2NHTk5qdEhiQ0wySGdNY2psNERBWUdYUTdTaFNMc3FBPT0=\"; _umsid=\"Z0FBQUFBQmw4VjJKdjlCaUR6Tk84NE83MHZPM2g3ZFlYY2tDWGlzeHl3NVllYm5XZDJVakdwQlMxT09mNm9ldmZhRm5Zb0tHa3hwS2JnX3FQTXVSOVIyN0dYMEQ0X2pVQjNwd2pMdjVIbVB6My04UUdFeXNlZVhEVEFVRTB6enhHdHpuajN6cEpHTmtlV2xnUWpiZTc3dVJkV09LTXJTRnB0NWFucmlERG4xT1ZzN1ZaNkFpMWhEaHJpbEE1UldQTjVMd1J1NVVSS3FnOXB4a20xMXpOd2dYYTNZdFQ3M3VsazNmQlFrRlpYWTlxbC1XVDBPQnBQYz0=\"; _dd_s=rum=0&expire=1710317954152",
    "Referer": "https://chat.openai.com/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": "{\"action\":\"next\",\"messages\":[{\"id\":\"aaa2c20b-9d95-41b5-8b05-bce1b4246053\",\"author\":{\"role\":\"user\"},\"content\":{\"content_type\":\"text\",\"parts\":[\"你是谁\"]},\"metadata\":{}}],\"parent_message_id\":\"aaa137c3-e09c-4a33-a2ed-bd71cf2a5c06\",\"model\":\"text-davinci-002-render-sha\",\"timezone_offset_min\":-480,\"suggestions\":[\"你能帮我想出7个针对小型书店客户忠诚计划的主意吗？\",\"创建一个章程来成立一个每周举办放映和讨论的电影俱乐部\",\"编写一个Python脚本，用于自动发送每日电子邮件报告，并指导我如何设置。\",\"你能为我们班级的一个演讲嘉宾写一封简短的感谢信吗？她来我们班级分享了她的职业生涯，每个人都说她的分享非常鼓舞人心。\"],\"history_and_training_disabled\":false,\"conversation_mode\":{\"kind\":\"primary_assistant\"},\"force_paragen\":false,\"force_rate_limit\":false,\"websocket_request_id\":\"83a2f64a-03a0-4f8a-8729-e9f2765b62dc\"}",
  "method": "POST"
});
