SalesforceInteractions.init().then(() => {
	
  //page_title取得
  const pageTitle = document.title;
  //provider定義
  const provider = 'Nissay Test Provider'; 
  //sourceUrl取得 （サイトのパターン判断用）
  const sourceUrl = window.location.href;
  let currentPersonalFlag = false;
  
  //-----------↓↓↓20240830ユーザーエージェント追加↓↓↓-------------------------

  // ブラウザのユーザーエージェント文字列を取得する
  const userAgent = navigator.userAgent;
  let browserType = 'Unknown';

  // ユーザーエージェント文字列を確認してブラウザの種類を判定する
  if ((userAgent.includes('Chrome') || userAgent.includes('CriOS')) && userAgent.includes('Safari') && (!userAgent.includes('Edge') && !userAgent.includes('Edg') && !userAgent.includes('OPR') && !userAgent.includes('YaBrowser'))) {
    browserType = 'Chrome';
  } else if (userAgent.includes('Safari') && (!userAgent.includes('Chrome') || userAgent.includes('CriOS'))) {
    browserType = 'Safari';
  } else if (userAgent.includes('Firefox') || userAgent.includes('FxiOS')) {
    browserType = 'Firefox';
  } else if ((userAgent.includes('Edg')) || userAgent.includes('EdgA') || userAgent.includes('EdgiOS') || userAgent.includes('Edge')) {
    browserType = 'Edge';
  } else if (userAgent.includes('Trident') || userAgent.includes('MSIE')) {
    browserType = 'Internet Explorer';
  } else if (userAgent.includes('OPR') || userAgent.includes('Opera')) {
    browserType = 'Opera';
  } else if (userAgent.includes('YaBrowser')) {
    browserType = 'Yandex Browser';
  }
  //-----------↑↑↑20240830ユーザーエージェント追加↑↑↑-------------------------

  //-----------URLから各種値を取得する-------------------------
  //URL取得 （パラメータ取得用）
  const urlPath = window.location.search;
  //URLのパラメータすべて取得
  const urlParams = new URLSearchParams(urlPath);
  //gclid取得
  const gclid = urlParams.get('gclid');
  //utm_source取得
  const utmSource = urlParams.get('utm_source');
  //utm_medium取得
  const utmMedium = urlParams.get('utm_medium');
  //utm_campaign取得
  const utmCampaign = urlParams.get('utm_campaign');
  //utm_term取得
  const utmTerm = urlParams.get('utm_term');
  //utm_content取得
  const utmContent = urlParams.get('utm_content');
  //documentrequestid取得　（URLパラメータからdocumentRequestIDが取得できない場合localStorageの値を使用するので、varとして設定）
  var documentrequestid = urlParams.get('ParameterID');
  //商品ID取得　（商品１はサイトの種類による取得方法が異なるので、varとして設定）
  var SHOHIN1 = urlParams.get('SHOHIN1');
  const SHOHIN2 = urlParams.get('SHOHIN2');
  const SHOHIN3 = urlParams.get('SHOHIN3');
  //-----------URLから各種値を取得終了-------------------------

  //URLパラメータからdocumentRequestIDが取得できない場合、localStorageの値を使用する
  if (!documentrequestid) {
    documentrequestid = localStorage.getItem('documentRequestID');
  } else {
    //URLパラメータからdocumentRequestIDが取得できる場合、localStorageに値を設定する
    localStorage.setItem('documentRequestID', documentrequestid);
  }

  /*-----------------------サイトの種類によるパターン判断-----------------------------
  ■ パターン１：URLパラメータを取得し、値を保存する
　　□ サイト：
    ・https://www.nissay.co.jp/
    ・https://nissay-mpd.smktg.jp/
    ・https://www.account-t.nissay.co.jp/
    ・https://nissay-kojin.my.site.com/
    ・https://mirai-chat.jp/

  ■ パターン２：SHOHIN1はフォームに含まれるテキストを基に判定する　※それ以外はパターン１同様
  　□ サイト（例）：
    ・https://www.nissay.co.jp/okofficial/transactions/kfacdirect._ZRF0010_pai002a
  
  ■ パターン３：SHOHIN1に"まるごとマモル"を固定値として設定　※それ以外はパターン１同様
  　□ サイト（例）：
    ・https://www.nissay.co.jp/oy6direct/transactions/y41siryo._N000303_y0wD01t1
  
  ■ パターン４：SHOHIN1に"スマホ年金"を固定値として設定　※それ以外はパターン１同様
    □ サイト（例）：
    ・https://www2.enq-plus.com/enq/nissay/sumahonenkin_shiryo-seikyu
  ---------------------------------------------------------------------------------*/

  //サイトのURLが「https://www.nissay.co.jp/okofficial」含むの場合、SHOHIN1はフォームに含まれるテキストを基に判定する
  if (sourceUrl.includes('https://nissaydigital--dev1.sandbox.my.salesforce-sites.com/')){
    try {
      //SHOHIN1 = document.querySelector('input[name="OPTIONAL_NAME1"]').value;
    } catch (error) {
      console.error(error);
    }
  }

  //サイトのURLが「https://www.nissay.co.jp/oy6direct」 含むの場合、SHOHIN1に"まるごとマモル"を固定値として設定
  // if (sourceUrl.includes('https://www.nissay.co.jp/oy6direct')){
  //   SHOHIN1 = 'まるごとマモル';
  // }

  // //サイトのURLが「https://www2.enq-plus.com」 含むの場合、SHOHIN1に"スマホ年金"を固定値として設定
  // if (sourceUrl.includes('https://www2.enq-plus.com')){
  //   SHOHIN1 = 'スマホ年金';
  // }
  
  //cookieの初期化を行う
  SalesforceInteractions.updateConsents({ 
    purpose: SalesforceInteractions.ConsentPurpose.Tracking, 
    provider: provider, 
    status: SalesforceInteractions.ConsentStatus.OptIn 
  })
  
  //Cookie取得メソッド
  const getCookie = (cName) => {
    const cookieValue = document.cookie.split('; ').find(row => row.startsWith(cName + '='));
    return cookieValue ? cookieValue.split('=')[1] : null;
  };
  
  const ga = getCookie('_ga');
  const ga_R2F88KZ96Y = getCookie('_ga_R2F88KZ96Y');
  const psuedoId = (() => {
    if (ga) {
        const parts = ga.split('.');
        if (parts.length >= 4) {
            return `${parts[2]}.${parts[3]}`;
        }
    }
    return null;
})();
  document.addEventListener('DOMContentLoaded', () => {
    let flagChangeTimeout;
    const checkboxElement = document.querySelector('#Page\\:regForm\\:personalFlag');
    if (checkboxElement) {
      checkboxElement.addEventListener('change', () => {
        clearTimeout(flagChangeTimeout);
        flagChangeTimeout = setTimeout(sendEventToCDP(), 300);
      });
    }
  });
  function sendEventToCDP() {
      // ▼▼▼ 追加箇所：ここにお好きなメッセージを入れてください ▼▼▼
    console.log("【確認用】CDPイベント送信処理が開始されました (sendEventToCDP)"); 
    console.log("現在のページタイトル:", document.title); // 変数の確認も可能です
    // ▲▲▲ 追加箇所終わり ▲▲▲
    
    //Cookie中の情報を使って、CDP側へ送信する
    const checkboxElement = document.querySelector('#Page\\:regForm\\:personalFlag');
    if (checkboxElement) {
      currentPersonalFlag = checkboxElement.checked;
    }
    SalesforceInteractions.sendEvent({
      interaction: {
        name : "customEventNew",
        purpose : SalesforceInteractions.ConsentPurpose.Tracking,
        provider : SalesforceInteractions.getConsents()[0].consent.provider,
        status : SalesforceInteractions.ConsentStatus.OptIn,
        pagetitle : pageTitle,
        ga : ga,
        garfkzy28896 : ga_R2F88KZ96Y,
        gclid : gclid,
        utmsource : utmSource,
        utmmedium : utmMedium,
        utmcampaign : utmCampaign,
        utmterm : utmTerm,
        utmcontent : utmContent,
        documentrequestid : documentrequestid,
        shohin1 : SHOHIN1,
        shohin2 : SHOHIN2,
        shohin3 : SHOHIN3,
        //-----------↓↓↓20240830ユーザーエージェント追加↓↓↓-------------------------
        useragent : userAgent,
        browsertype : browserType,
        //-----------↑↑↑20240830ユーザーエージェント追加↑↑↑-------------------------
        psuedoId : psuedoId,
        personalFlag : String(currentPersonalFlag)
      },
      source:{
          locale:navigator.language 
      },
      pageView:"true",
    });
  };

  const productPage = {
    name: 'Custom Event New',
    isMatch: () => true,
    listeners: [
      SalesforceInteractions.listener("click", sendEventToCDP()),
      SalesforceInteractions.listener("click", "#btn-next-new", () =>{
        //SalesforceInteractions.log("testclick");
        sendEventToCDP()
      })
    ]
  };

  const pageTypeDefault = {
    name: 'default'
  };
  SalesforceInteractions.initSitemap({
    global:{},
    pageTypeDefault,
    pageTypes: [productPage]
  });
});