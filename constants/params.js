const NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = {
  get REUTERS_TOKEN_URL() {
    if (NODE_ENV === 'production') {
      return 'https://api.rkd.reuters.com/api/TokenManagement/TokenManagement.svc/REST/Anonymous/TokenManagement_1/CreateServiceToken_1';
    }
    return 'https://api.rkd.reuters.com/api/TokenManagement/TokenManagement.svc/REST/Anonymous/TokenManagement_1/CreateServiceToken_1';
  },
  get REUTERS_RATE_URL() {
    if (NODE_ENV === 'production') {
      return 'http://api.rkd.reuters.com/api/Quotes/Quotes.svc/REST/Quotes_1/RetrieveItem_3';
    }
    return 'http://api.rkd.reuters.com/api/Quotes/Quotes.svc/REST/Quotes_1/RetrieveItem_3';
  },
  get REUTERS_RATE_FIELDS() {
    return 'SCALING:CF_LAST:CF_CURRENCY:CF_BID';
  },
  get MARGIN() {
    return 0.25;
  },
  get FRONT_END_HOST() {
    if (NODE_ENV === 'development') {
      return 'http://localhost:4701';
    } else if (NODE_ENV === 'test') {
      return 'http://161.202.19.190:4701';
    } else if (NODE_ENV === 'qa') {
      return 'http://192.168.2.220:4701';
    } else if (NODE_ENV === 'production') {
      return 'http://161.202.19.184:4701';
    }
  },
  get CURRENCY_PAIR() {
    return {
      EURHKD: 'EURHKD=X',
      EURMYR: 'EURMYR=X',
      EURINR: 'EURINR=X',
      EURTHB: 'EURTHB=X',
      EURSGD: 'EURSGD=X',
      EURGBP: 'EURGBP=X',
      EURPHP: 'EURPHP=R',
      EURLKR: 'EURLKR=R',
      EURUSD: 'EUR=X',
      EURCNY: 'EURCNY=X',
      USDGBP: 'USDGBP=R',
      GBPUSD: 'GBP=X',
      USDEUR: 'USDEUR=R',
      USDSGD: 'SGD=X',
      USDTHB: 'THB=X',
      USDINR: 'INR=X',
      USDMYR: 'MYR=X',
      USDPHP: 'PHP=X',
      USDLKR: 'LKR=X',
      USDUSD: 'USD=X',
      USDMOP: 'MOP=X',
      USDTWD: 'TWD=X',
      USDHKD: 'HKD=X',
      USDCNY: 'CNY=X',
      USDJPY: 'JPY=X',
      USDIDR: 'IDR=X',
      USDVND: 'VND=X',
      USDBHD: 'BHD=X',
      USDBGN: 'BGN=X',
      USDCAD: 'CAD=X',
      USDKWD: 'KWD=X',
      USDHRK: 'HRK=X',
      USDCZK: 'CZK=X',
      USDDKK: 'DKK=X',
      USDAED: 'AED=X',
      USDHUF: 'HUF=X',
      USDILS: 'ILS=X',
      USDCHF: 'CHF=X',
      USDSEK: 'SEK=X',
      USDZAR: 'ZAR=X',
      USDSAR: 'SAR=X',
      USDRON: 'RON=X',
      USDQAR: 'QAR=X',
      USDPLN: 'PLN=X',
      USDOMR: 'OMR=X',
      USDNOK: 'NOK=X',
      USDMXN: 'MXN=X',
      USDBDT: 'BDT=X',
      USDNPR: 'NPR=X',
      NZDUSD: 'NZD=X',
      TWDHKD: 'TWDHKD=X',
      TWDMYR: 'TWDMYR=R',
      TWDJPY: 'TWDJPY=X',
      TWDTHB: 'TWDTHB=R',
      TWDIDR: 'TWDIDR=R',
      TWDSGD: 'TWDSGD=X',
      TWDINR: 'TWDINR=R',
      TWDCNY: 'TWDCNY=R',
      TWDPHP: 'TWDPHP=R',
      TWDUSD: 'TWDUSD=R',
      TWDLKR: 'TWDLKR=R',
      TWDGBP: 'TWDGBP=R',
      HKDMOP: 'HKDMOP=R',
      HKDMYR: 'HKDMYR=R',
      HKDJPY: 'HKDJPY=R',
      HKDTHB: 'HKDTHB=R',
      HKDIDR: 'HKDIDR=R',
      HKDVND: 'HKDVND=R',
      HKDSGD: 'HKDSGD=R',
      HKDGBP: 'HKDGBP=R',
      HKDINR: 'HKDINR=R',
      HKDCNY: 'HKDCNY=R',
      HKDPHP: 'HKDPHP=R',
      HKDUSD: 'HKDUSD=R',
      HKDLKR: 'HKDLKR=R',
      HKDTWD: 'HKDTWD=R',
      JPYHKD: 'JPYHKD=R',
      JPYMOP: 'JPYMOP=R',
      JPYMYR: 'JPYMYR=R',
      JPYTHB: 'JPYTHB=R',
      JPYIDR: 'JPYIDR=R',
      JPYVND: 'JPYVND=R',
      JPYSGD: 'JPYSGD=R',
      JPYGBP: 'JPYGBP=R',
      JPYINR: 'JPYINR=R',
      JPYCNY: 'JPYCNY=R',
      JPYPHP: 'JPYPHP=R',
      JPYUSD: 'JPYUSD=R',
      JPYLKR: 'JPYLKR=R',
      JPYTWD: 'JPYTWD=R',
      THBHKD: 'THBHKD=R',
      THBMYR: 'THBMYR=R',
      THBJPY: 'THBJPY=R',
      THBIDR: 'THBIDR=R',
      THBVND: 'THBVND=R',
      THBSGD: 'THBSGD=R',
      THBGBP: 'THBGBP=R',
      THBINR: 'THBINR=R',
      THBCNY: 'THBCNY=R',
      THBPHP: 'THBPHP=R',
      THBUSD: 'THBUSD=R',
      THBLKR: 'THBLKR=R',
      THBTWD: 'THBTWD=R',
      IDRHKD: 'IDRHKD=R',
      IDRMOP: 'IDRMOP=R',
      IDRMYR: 'IDRMYR=R',
      IDRJPY: 'IDRJPY=R',
      IDRTHB: 'IDRTHB=R',
      IDRVND: 'IDRVND=R',
      IDRSGD: 'IDRSGD=R',
      IDRGBP: 'IDRGBP=R',
      IDRINR: 'IDRINR=R',
      IDRCNY: 'IDRCNY=R',
      IDRPHP: 'IDRPHP=R',
      IDRUSD: 'IDRUSD=R',
      IDRLKR: 'IDRLKR=R',
      MYRHKD: 'MYRHKD=R',
      MYRMOP: 'MYRMOP=R',
      MYRJPY: 'MYRJPY=R',
      MYRTHB: 'MYRTHB=R',
      MYRIDR: 'MYRIDR=R',
      MYRVND: 'MYRVND=R',
      MYRSGD: 'MYRSGD=R',
      MYRGBP: 'MYRGBP=R',
      MYRINR: 'MYRINR=R',
      MYRCNY: 'MYRCNY=R',
      MYRPHP: 'MYRPHP=R',
      MYRUSD: 'MYRUSD=R',
      MYRLKR: 'MYRLKR=R',
      MYRTWD: 'MYRTWD=R',
      VNDHKD: 'VNDHKD=R',
      VNDMYR: 'VNDMYR=R',
      VNDJPY: 'VNDJPY=R',
      VNDTHB: 'VNDTHB=R',
      VNDIDR: 'VNDIDR=R',
      VNDSGD: 'VNDSGD=R',
      VNDGBP: 'VNDGBP=R',
      VNDINR: 'VNDINR=R',
      VNDCNY: 'VNDCNY=R',
      VNDPHP: 'VNDPHP=R',
      VNDUSD: 'VNDUSD=R',
      VNDLKR: 'VNDLKR=R',
      VNDTWD: 'VNDTWD=R',
      INRVND: 'INRVND=R',
      INRMOP: 'INRMOP=R',
      INRMYR: 'INRMYR=R',
      INRJPY: 'INRJPY=R',
      INRTHB: 'INRTHB=R',
      INRIDR: 'INRIDR=R',
      INRSGD: 'INRSGD=R',
      INRGBP: 'INRGBP=R',
      INRCNY: 'INRCNY=R',
      INRPHP: 'INRPHP=R',
      INRUSD: 'INRUSD=R',
      INRLKR: 'INRLKR=R',
      INRTWD: 'INRTWD=R',
      CNYHKD: 'CNYHKD=R',
      CNYMOP: 'CNYMOP=R',
      CNYMYR: 'CNYMYR=R',
      CNYJPY: 'CNYJPY=R',
      CNYTHB: 'CNYTHB=R',
      CNYIDR: 'CNYIDR=R',
      CNYSGD: 'CNYSGD=R',
      CNYGBP: 'CNYGBP=R',
      CNYINR: 'CNYINR=R',
      CNYPHP: 'CNYPHP=R',
      CNYUSD: 'CNYUSD=R',
      CNYLKR: 'CNYLKR=R',
      CNYTWD: 'CNYTWD=R',
      PHPHKD: 'PHPHKD=R',
      PHPMYR: 'PHPMYR=R',
      PHPJPY: 'PHPJPY=R',
      PHPTHB: 'PHPTHB=R',
      PHPIDR: 'PHPIDR=R',
      PHPVND: 'PHPVND=R',
      PHPSGD: 'PHPSGD=R',
      PHPGBP: 'PHPGBP=R',
      PHPINR: 'PHPINR=R',
      PHPCNY: 'PHPCNY=R',
      PHPUSD: 'PHPUSD=R',
      PHPLKR: 'PHPLKR=R',
      SGDHKD: 'SGDHKD=R',
      SGDMYR: 'SGDMYR=R',
      SGDJPY: 'SGDJPY=R',
      SGDTHB: 'SGDTHB=R',
      SGDIDR: 'SGDIDR=R',
      SGDVND: 'SGDVND=R',
      SGDGBP: 'SGDGBP=R',
      SGDINR: 'SGDINR=R',
      SGDCNY: 'SGDCNY=R',
      SGDPHP: 'SGDPHP=R',
      SGDUSD: 'SGDUSD=R',
      SGDLKR: 'SGDLKR=R',
      SGDTWD: 'SGDTWD=R',
      GBPHKD: 'GBPHKD=R',
      GBPMOP: 'GBPMOP=R',
      GBPMYR: 'GBPMYR=R',
      GBPJPY: 'GBPJPY=R',
      GBPTHB: 'GBPTHB=R',
      GBPIDR: 'GBPIDR=R',
      GBPVND: 'GBPVND=R',
      GBPSGD: 'GBPSGD=R',
      GBPINR: 'GBPINR=R',
      GBPCNY: 'GBPCNY=R',
      GBPPHP: 'GBPPHP=R',
      GBPLKR: 'GBPLKR=R',
      GBPTWD: 'GBPTWD=R',
      MOPHKD: 'MOPHKD=R',
      MOPMYR: 'MOPMYR=R',
      MOPTHB: 'MOPTHB=R',
      MOPIDR: 'MOPIDR=R',
      MOPSGD: 'MOPSGD=R',
      MOPGBP: 'MOPGBP=R',
      MOPINR: 'MOPINR=R',
      MOPCNY: 'MOPCNY=R',
      MOPPHP: 'MOPPHP=R',
      MOPUSD: 'MOPUSD=R',
      MOPTWD: 'MOPTWD=R',
      MOPJPY: 'MOPJPY=R',
      LKRMYR: 'LKRMYR=R',
      LKRJPY: 'LKRJPY=R',
      LKRIDR: 'LKRIDR=R',
      LKRVND: 'LKRVND=R',
      LKRSGD: 'LKRSGD=R',
      LKRGBP: 'LKRGBP=R',
      LKRINR: 'LKRINR=R',
      LKRCNY: 'LKRCNY=R',
      LKRPHP: 'LKRPHP=R',
      LKRUSD: 'LKRUSD=R',
      LKRTWD: 'LKRTWD=R',
      USDKRW: 'KRW=X',
      AUDUSD: 'AUD=X',
      USDAUD: 'USDAUD=R',
      AUDHKD: 'AUDHKD=R',
      HKDAUD: 'HKDAUD=R',
      USDARS: 'ARS=X',
      USDBRL: 'BRL=X',
      USDCLP: 'CLP=X',
      USDCOP: 'COP=X',
      USDPEN: 'PEN=X',
      USDUYU: 'UYU=X',
      AUDARS: 'AUDARS=R',
      GBPARS: 'GBPARS=R',
      EURARS: 'EURARS=R',
      HKDARS: 'HKDARS=R',
      SGDARS: 'SGDARS=R',
      VNDARS: 'VNDARS=R',
      IDRARS: 'IDRARS=R',
      JPYARS: 'JPYARS=R',
      MYRARS: 'MYRARS=R',
      THBARS: 'THBARS=R',
      AUDBRL: 'AUDBRL=R',
      GBPBRL: 'GBPBRL=R',
      EURBRL: 'EURBRL=R',
      HKDBRL: 'HKDBRL=R',
      SGDBRL: 'SGDBRL=R',
      VNDBRL: 'VNDBRL=R',
      IDRBRL: 'IDRBRL=R',
      JPYBRL: 'JPYBRL=R',
      MYRBRL: 'MYRBRL=R',
      THBBRL: 'THBBRL=R',
      AUDCLP: 'AUDCLP=R',
      GBPCLP: 'GBPCLP=R',
      EURCLP: 'EURCLP=R',
      HKDCLP: 'HKDCLP=R',
      SGDCLP: 'SGDCLP=R',
      VNDCLP: 'VNDCLP=R',
      IDRCLP: 'IDRCLP=R',
      JPYCLP: 'JPYCLP=R',
      MYRCLP: 'MYRCLP=R',
      THBCLP: 'THBCLP=R',
      AUDCOP: 'AUDCOP=R',
      GBPCOP: 'GBPCOP=R',
      EURCOP: 'EURCOP=R',
      HKDCOP: 'HKDCOP=R',
      SGDCOP: 'SGDCOP=R',
      VNDCOP: 'VNDCOP=R',
      IDRCOP: 'IDRCOP=R',
      JPYCOP: 'JPYCOP=R',
      MYRCOP: 'MYRCOP=R',
      THBCOP: 'THBCOP=R',
      AUDPEN: 'AUDPEN=R',
      GBPPEN: 'GBPPEN=R',
      EURPEN: 'EURPEN=R',
      HKDPEN: 'HKDPEN=R',
      SGDPEN: 'SGDPEN=R',
      VNDPEN: 'VNDPEN=R',
      IDRPEN: 'IDRPEN=R',
      JPYPEN: 'JPYPEN=R',
      MYRPEN: 'MYRPEN=R',
      THBPEN: 'THBPEN=R',
      AUDUYU: 'AUDUYU=R',
      GBPUYU: 'GBPUYU=R',
      EURUYU: 'EURUYU=R',
      HKDUYU: 'HKDUYU=R',
      SGDUYU: 'SGDUYU=R',
      VNDUYU: 'VNDUYU=R',
      IDRUYU: 'IDRUYU=R',
      JPYUYU: 'JPYUYU=R',
      MYRUYU: 'MYRUYU=R',
      THBUYU: 'THBUYU=R',
      AUDMXN: 'AUDMXN=R',
      GBPMXN: 'GBPMXN=R',
      EURMXN: 'EURMXN=R',
      HKDMXN: 'HKDMXN=R',
      SGDMXN: 'SGDMXN=R',
      VNDMXN: 'VNDMXN=R',
      IDRMXN: 'IDRMXN=R',
      JPYMXN: 'JPYMXN=R',
      MYRMXN: 'MYRMXN=R',
      THBMXN: 'THBMXN=R',
      NZDARS: 'NZDARS=R',
      NZDBRL: 'NZDBRL=R',
      NZDCLP: 'NZDCLP=R',
      NZDCOP: 'NZDCOP=R',
      NZDPEN: 'NZDPEN=R',
      NZDUYU: 'NZDUYU=R',
      NZDMXN: 'NZDMXN=R',
      AUDKRW: 'AUDKRW=R',
      GBPKRW: 'GBPKRW=R',
      EURKRW: 'EURKRW=R',
      HKDKRW: 'HKDKRW=R',
      SGDKRW: 'SGDKRW=R',
      VNDKRW: 'VNDKRW=R',
      IDRKRW: 'IDRKRW=R',
      JPYKRW: 'JPYKRW=R',
      MYRKRW: 'MYRKRW=R',
      THBKRW: 'THBKRW=R',
      NZDKRW: 'NZDKRW=R',
    };
  },
};