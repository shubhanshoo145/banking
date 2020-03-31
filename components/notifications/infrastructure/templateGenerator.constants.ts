/**
 * @enum
 * @description This enum describes all of the possible types of template items
 */
export enum TemplateItemType {
  STRING = 'STRING',
  TABLE = 'TABLE',
}

/**
 * @constant
 * @description This constant describes all of the available templates
 */
export const TEMPLATES = {
  // tslint:disable-next-line:max-line-length
  internal: `
  <!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
  <html> 
  <head> 
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"> 
  </head> 
  <body> 
  <div style="margin:0;padding:0;font-family:Titillium Web,sans-serif;height:100%;background-color:#fff;width:100%!important"> 
  <table height="100%" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0;padding:0;font-family:Titillium Web,sans-serif"> 
  <tbody> 
  <tr style="margin:0;padding:0;font-family:Titillium Web,sans-serif"> 
  <td valign="top" style="margin:0;padding:0;font-family:Titillium Web,sans-serif"> 
  <div style="margin:0 auto;padding:0;font-family:Titillium Web,sans-serif;max-width:600px;display:block"> 
  <table border="0" cellspacing="0" cellpadding="0" style="margin:0;padding:0;font-family:Titillium Web,sans-serif;width:100%;padding-bottom:20px;background-repeat:no-repeat;background-position:top center"> 
  <tbody> 
  <tr style="margin:0;padding:0;font-family:Titillium Web,sans-serif"> 
  <td style="margin:0;padding:0;font-family:Titillium Web,sans-serif;"> 
  <img alt="Nium" src="https://masspay.instarem.com/images/nium_email_logo.png" width="65px" height="90px" style="object-fit:contain;display:block;margin:0 auto;padding:0;font-family:Titillium Web,sans-serif;max-width:100%;margin-bottom: 45px;"> 
  <br/> 
  <table cellpadding="5" style="border-collapse:collapse;width:100%;table-layout:fixed;"> 
  <tbody style="margin:0;padding:0;font-family:Titillium Web,sans-serif;font-weight:300;font-size:14px;line-height:1.6;color:#4c4c4b"> $TABLE_BODY$ 
  </tbody> 
  </table> 
  <br style="margin:0;padding:0;font-family:Titillium Web,sans-serif"> 
  </td>
  </tr>
  </tbody> 
  </table> 
  </div>
  <table cellspacing="0" cellpadding="0" border="0" style="margin:0;padding:0;font-family:Titillium Web,sans-serif;width:100%;border-top:1px solid #eae7e7;background-color:#fafaf0;clear:both!important"> 
  <tbody> 
  <tr style="margin:0;padding:0;font-family:Titillium Web,sans-serif"> 
  <td style="margin:0 auto!important;padding:10px!important;display:block!important;max-width:620px!important;clear:both!important"> 
  <div style="margin:0 auto;padding:0;max-width:600px;display:block"> 
  <table cellspacing="0" cellpadding="0" border="0" style="margin:0;padding:0;width:100%"> 
  <tbody> 
  <tr> 
  <td> 
  <p style="margin:0;padding:0;font-weight:400;font-size:12px;line-height:1.6;color:#b2b2b2;"> 
  <span style="margin:0;padding:0;font-family:Titillium Web,sans-serif;font-weight:600"> Confidentiality Note: 
  </span> This e-mail and any attachments are confidential and may be protected by legal privilege. If you are not the intended recipient, be aware that any disclosure, copying, distribution or use of this e-mail or any attachment is prohibited. If you have received this e-mail in error, please notify us immediately by returning it to the sender and delete this copy from your system. Thank you for your cooperation. 
  </p>
  </td>
  </tr>
  </tbody> 
  </table> 
  </div>
  </td>
  </tr>
  </tbody> 
  </table> 
  </td>
  </tr>
  </tbody> 
  </table> 
  </div>
  </body>
  </html>` as string,
  // tslint:disable-next-line:max-line-length
  external: `
  <!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
  <html> 
  <head> 
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"> 
  </head> 
  <body> 
  <div style="margin:0;padding:0;font-family:Titillium Web,sans-serif;height:100%;background-color:#fff;width:100%!important"> 
  <table height="100%" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0;padding:0;font-family:Titillium Web,sans-serif"> 
  <tbody> 
  <tr style="margin:0;padding:0;font-family:Titillium Web,sans-serif"> 
  <td valign="top" style="margin:0;padding:0;font-family:Titillium Web,sans-serif"> 
  <div style="margin:0 auto;padding:0;font-family:Titillium Web,sans-serif;max-width:600px;display:block"> 
  <table border="0" cellspacing="0" cellpadding="0" style="margin:0;padding:0;font-family:Titillium Web,sans-serif;width:100%;padding-bottom:20px;background-repeat:no-repeat;background-position:top center"> 
  <tbody> 
  <tr style="margin:0;padding:0;font-family:Titillium Web,sans-serif"> 
  <td style="margin:0;padding:0;font-family:Titillium Web,sans-serif;"> 
  <img alt="Nium" src="https://masspay.instarem.com/images/nium_email_logo.png" width="65px" height="90px" style="object-fit:contain;display:block;margin:0 auto;padding:0;font-family:Titillium Web,sans-serif;max-width:100%;margin-bottom: 45px;"> 
  <br/> 
  <table cellpadding="5" style="border-collapse:collapse;width:100%;table-layout:fixed;"> 
  <tbody style="margin:0;padding:0;font-family:Titillium Web,sans-serif;font-weight:300;font-size:14px;line-height:1.6;color:#4c4c4b"> $TABLE_BODY$ 
  </tbody> 
  </table> 
  <br style="margin:0;padding:0;font-family:Titillium Web,sans-serif"> 
  <p style="margin:0;padding-top:6;font-family:&#39;Titillium Web&#39;,sans-serif;font-weight:300;font-size:14px;color:#4c4c4b;font-weight:bold;text-align:center;">NIUM Pte Ltd. (formerly known as InstaReM Pte. Limited) is the holding company of NIUM subsidiaries globally. It is regulated by MAS under RA No. 01454 in Singapore.</p>
  </td>
  </tr>
  </tbody> 
  </table> 
  </div>
  <table cellspacing="0" cellpadding="0" border="0" style="margin:0;padding:0;font-family:Titillium Web,sans-serif;width:100%;border-top:1px solid #eae7e7;background-color:#fafaf0;clear:both!important"> 
  <tbody> 
  <tr style="margin:0;padding:0;font-family:Titillium Web,sans-serif"> 
  <td style="margin:0 auto!important;padding:10px!important;display:block!important;max-width:620px!important;clear:both!important"> 
  <div style="margin:0 auto;padding:0;max-width:600px;display:block"> 
  <table cellspacing="0" cellpadding="0" border="0" style="margin:0;padding:0;width:100%"> 
  <tbody> 
  <tr> 
  <td> 
  <p style="margin:0;padding:0;font-weight:400;font-size:12px;line-height:1.6;color:#b2b2b2;"> 
  <span style="margin:0;padding:0;font-family:Titillium Web,sans-serif;font-weight:600"> Confidentiality Note: 
  </span> This e-mail and any attachments are confidential and may be protected by legal privilege. If you are not the intended recipient, be aware that any disclosure, copying, distribution or use of this e-mail or any attachment is prohibited. If you have received this e-mail in error, please notify us immediately by returning it to the sender and delete this copy from your system. Thank you for your cooperation. 
  </p>
  </td>
  </tr>
  </tbody> 
  </table> 
  </div>
  </td>
  </tr>
  </tbody> 
  </table> 
  </td>
  </tr>
  </tbody> 
  </table> 
  </div>
  </body>
  </html>` as string,
};
